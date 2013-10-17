import simplejson as json

# Django Imports
from django.contrib import auth
from django.conf import settings
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.shortcuts import get_object_or_404
from django.template.defaultfilters import slugify
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render_to_response
from django.contrib.auth.tokens import default_token_generator
from django.http import HttpResponse, HttpResponseRedirect, Http404,\
    HttpResponseBadRequest
from django.utils.http import base36_to_int, int_to_base36
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm

# Application imports
import acc_dbapi
from invitations import inv_dbapi
from gapelia.mail import send_email
from accounts.google import GoogleClient
from gapelia.utils import get_first_last_name
from gapelia.messages import send_acknowledgment
from forms import SignupForm, SigninForm, CustomSetPasswordForm
from accounts.facebook import auth_url, get_access_token_from_code,\
    GraphAPI


def _manage_invitation_code(request):
    inv_code = request.session.get('signup-code')
    inv_obj = inv_dbapi.get_invitee(code=inv_code)
    if inv_obj:
        # INFO: Setting status to "Accepted"
        request.session.pop('signup-code')
        return inv_dbapi.update_invitee(inv_obj, '1')


def signup(request, code=None):
    """A view to signup for an account.
    """
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('me'))

    if code:
        inv_obj = get_object_or_404(inv_dbapi.Invitee, code=code, status='0')
        request.session['signup-code'] = code

    context = RequestContext(request)
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            obj = form.save(form.cleaned_data['username'])
            inv_obj = _manage_invitation_code(request)
            if inv_obj:
                acc_dbapi.update_user_profile(obj, user_type=inv_obj.user_type)
            user = auth.authenticate(
                username=obj.email, password=form.cleaned_data['password'])
            auth.login(request, user)
            # send_acknowledgment(request, 'signup-successful')
            return HttpResponseRedirect(reverse('me'))
        else:
            context['errors'] = form.errors
        context['form'] = form
    return render_to_response(
        'accounts/signup.html', context_instance=context)


def signin(request):
    """A view to signin for an account.
    """
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('me'))

    context = RequestContext(request)
    request.session['next'] = request.GET.get('next') if \
        request.GET.get('next') else reverse('home')

    if request.method == 'POST':
        form = SigninForm(request.POST)
        if form.is_valid():
            user = auth.authenticate(
                username=form.cleaned_data['email'],
                password=form.cleaned_data['password'])
            if user:
                if not user.is_active:
                    acc_dbapi.update_user(user.id, **{'is_active': True})
                auth.login(request, user)
                return HttpResponseRedirect(reverse('home'))
            else:
                form.errors['Email/Password'] = 'Invalid email or password.'
        context['errors'] = form.errors
        context['form'] = form
    return render_to_response(
        'accounts/login.html', context_instance=context)


def facebook_authentication(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('me'))

    request.session['next_url'] = request.GET.get('next', '/')
    redirect_url = auth_url(
        settings.FACEBOOK_APP_ID, settings.FACEBOOK_REDIRECT_URL,
        perms=settings.FACEBOOK_PERMS)
    return HttpResponseRedirect(redirect_url)


def facebook_callback(request):
    code = request.GET.get('code', None)
    error = request.GET.get('error', None)
    if code is None:
        ack_key = 'fb-denied' if \
            error and error == 'access_denied' else 'fb-error'
        send_acknowledgment(request, ack_key)
        return HttpResponseRedirect(reverse('home'))

    try:
        access_token = get_access_token_from_code(
            code, settings.FACEBOOK_REDIRECT_URL, settings.FACEBOOK_APP_ID,
            settings.FACEBOOK_APP_SECRET).get('access_token')
    except:
        send_acknowledgment(request, 'fb-error')
        return HttpResponseRedirect(reverse('home'))
        # return redirect('/')
    graph = GraphAPI(access_token)
    profile = graph.get_object('me', fields=settings.FACEBOOK_FIELDS)
    user_profile = acc_dbapi.get_social_signup(
        social_id=profile.get('id'), source='FB')
    if not user_profile:
        # INFO: New Signup
        first_name, last_name = profile.get('first_name'), \
            profile.get('last_name')
        username = acc_dbapi.get_unique_username(
            slugify(first_name + last_name))
        user = acc_dbapi.create_user(
            username=username, email=profile.get('email'),
            first_name=first_name, last_name=last_name)

        #Commenting Unused variable
        # social_signup = \
        acc_dbapi.create_social_signup(
            user=user, social_id=profile.get('id'),
            source='FB', auth_token=access_token)

        avatar = profile.get('picture', {}).get('data', {}).get('url')
        inv_obj = _manage_invitation_code(request)
        user_type = inv_obj.user_type if inv_obj else 'NCC'

        user_profile = acc_dbapi.update_user_profile(
            user=user, about=profile.get('bio'), avatar=avatar,
            location=profile.get('location', {}).get('name'),
            user_type=user_type)

    # INFO: This user is already signed up with us using facebook.
    user_profile.user.backend = 'accounts.backend.EmailBackend'

    if not user_profile.user.is_active:
        acc_dbapi.update_user(user_profile.user.id, **{'is_active': True})
    auth.login(request, user_profile.user)
    return HttpResponseRedirect(reverse('me'))


def google_authentication(request):
    if request.user and request.user.is_authenticated():
        return HttpResponseRedirect(reverse('me'))

    request.session['next_url'] = request.GET.get('next', '/')
    client = GoogleClient(
        settings.GOOGLE_OAUTH2_CLIENT_ID, settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        settings.GOOGLE_REDIRECT_URI)
    auth_url = client.get_auth_url()
    return redirect(auth_url)


def google_callback(request):
    error = request.GET.get('error', None)
    # Commenting out unused variable
    #state = request.GET.get('state')
    if error:
        send_acknowledgment(request, 'google-auth-denied')
        return redirect('/')
    code = request.GET.get('code')
    if not code:
        return redirect('/')
    client = GoogleClient(
        settings.GOOGLE_OAUTH2_CLIENT_ID,
        settings.GOOGLE_OAUTH2_CLIENT_SECRET, settings.GOOGLE_REDIRECT_URI)
    access_token = client.get_user_tokens(code)
    profile = client.get_user_info(access_token)
    user_profile = acc_dbapi.get_social_signup(
        social_id=profile.get('id'), source='GO')
    if not user_profile:
        # INFO: New Signup
        first_name, last_name = profile.get('given_name'), \
            profile.get('family_name')
        username = acc_dbapi.get_unique_username(slugify(
            first_name + last_name))

        user = acc_dbapi.create_user(
            username=username, email=profile.get('email'),
            first_name=first_name, last_name=last_name)

        # Commenting out unused variable
        # social_signup = \
        acc_dbapi.create_social_signup(
            user=user, social_id=profile.get('id'), source='GO',
            auth_token=access_token)

        inv_obj = _manage_invitation_code(request)
        user_type = inv_obj.user_type if inv_obj else 'NCC'

        user_profile = acc_dbapi.update_user_profile(
            user=user, avatar=profile.get('picture'), user_type=user_type)

    user_profile.user.backend = 'accounts.backend.EmailBackend'
    if not user_profile.user.is_active:
        acc_dbapi.update_user(user_profile.user.id, **{'is_active': True})
    auth.login(request, user_profile.user)
    return HttpResponseRedirect(reverse('me'))


PROFILE_FIELD_NAME_MAP = (('facebook', 'facebook_profile'),
                          ('tumblr', 'tumblr_profile'),
                          ('twitter', 'twitter_profile'),
                          ('location', 'location'))


@login_required
@csrf_exempt
def edit_profile(request):
    context = RequestContext(request)
    user = request.user
    if request.method == 'POST':
        type_ = request.POST.get('type')
        val = request.POST.get('value')
        background_image = request.FILES.get('file')
        picture = request.FILES.get('avatar')
        if type_ and val is None:
            return HttpResponseBadRequest(json.dumps({
                'success': False, "type": type_,
                'message': 'type or value is missing.'}))
        if type_ == 'username':
            # slugified_username = slugify(val)
            if user.username != val:
                # INFO: If username has been changed.
                # username = acc_dbapi.get_unique_username(slugified_username)
                if acc_dbapi.get_user(username=val):
                    return HttpResponseBadRequest(json.dumps({
                        'success': False, "type": type_,
                        'message': 'This username is already taken.'}))

                user = acc_dbapi.update_user(user.id, **{'username': val})
            val = user.username
        elif type_ == 'name':
            first_name, last_name = get_first_last_name(val)
            user = acc_dbapi.update_user(
                user.id, **{'first_name': first_name, 'last_name': last_name})
        elif type_ == 'email':
            if user.email != val:
                if acc_dbapi.get_user(email=val):
                    return HttpResponseBadRequest(json.dumps({
                        'success': False, "type": type_,
                        'message': 'This email is already taken.'}))
                user = acc_dbapi.update_user(user.id, **{'email': val})
        elif background_image:
            user_profile = acc_dbapi.update_background_image(
                user, **{'background_image': background_image})
            return HttpResponse(json.dumps({
                'success': True,
                'background_image': user_profile.background_image.url}))
        elif picture:
            user_profile = acc_dbapi.update_picture(
                user, **{'picture': picture})
            return HttpResponse(json.dumps({
                'success': True, 'avatar': user_profile.picture.url}))
        else:
            field_name = dict(PROFILE_FIELD_NAME_MAP).get(type_)
            acc_dbapi.update_user_profile(user, **{field_name: val})
        return HttpResponse(json.dumps({
            'success': True, 'type': type_, 'value': val}))

    context['tags'] = json.dumps(map(
        lambda item: item.tag.as_dict, user.user_profile.tagged_items))
    return render_to_response(
        'accounts/edit-profile.html', context_instance=context)


#@login_required
def get_user_profile(request, username):
    obj = get_object_or_404(acc_dbapi.User, username=username, is_active=True)
    context = RequestContext(request)
    context['profile'] = obj
    return render_to_response(
        'accounts/profile.html', context_instance=context)


@login_required
def user_profile_settings(request):
    context = RequestContext(request)
    user = request.user
    context['tags'] = json.dumps(map(
        lambda item: item.tag.as_dict, user.user_profile.tagged_items))
    return render_to_response(
        'accounts/settings.html', context_instance=context)


@login_required
def user_password_settings(request):
    context = RequestContext(request)
    if request.method == 'POST':
        form = CustomSetPasswordForm(request.user, request.POST)
        if form.is_valid():
            form.save()
            send_acknowledgment(request, 'reset-password')
            return HttpResponseRedirect(reverse('password-settings'))
    else:
        # GET request
        form = CustomSetPasswordForm(None)
    context['errors'] = form.errors
    context['form'] = form
    return render_to_response(
        'accounts/password-settings.html', context_instance=context)


@login_required
def signout(request):
    auth.logout(request)
    return HttpResponseRedirect(reverse('home'))


@login_required
def deactivate_account(request):
    acc_dbapi.update_user(request.user.id, **{'is_active': False})
    auth.logout(request)
    send_acknowledgment(request, 'deactivate-account')
    return HttpResponseRedirect(reverse('home'))


def forgot_password(request):
    context = RequestContext(request)
    if request.method == 'POST':
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            user_obj = acc_dbapi.get_user(email=email)

            token = default_token_generator.make_token(user_obj)
            uid = int_to_base36(user_obj.id)

            domain_url = settings.BASE_URL
            url = domain_url + reverse(
                'reset-password', kwargs={'uidb36': uid, 'token': token})
            print url
            send_email(user_obj.email, 'password-reset', **{'url': url})
            send_acknowledgment(request, 'forgot-password')
            return HttpResponseRedirect(reverse('forgot-password'))
    else:
        form = PasswordResetForm()
    context['errors'] = form.errors
    return render_to_response(
        'accounts/forgot-password.html', context_instance=context)


def reset_password(request, uidb36=None, token=None):
    assert uidb36 is not None and token is not None  # checked by URLconf

    try:
        uid_int = base36_to_int(uidb36)
        user = acc_dbapi.get_user(id=uid_int)
    except ValueError:
        user = None
    context = RequestContext(request)
    if user is not None and default_token_generator.check_token(user, token):
        if request.method == 'POST':
            form = SetPasswordForm(user, request.POST)
            if form.is_valid():
                form.save()
                send_acknowledgment(request, 'reset-password')
                return HttpResponseRedirect(reverse('signin'))
        else:
            # GET request
            form = SetPasswordForm(None)
    else:
        raise Http404()

    context['errors'] = form.errors
    context['uidb36'] = uidb36
    context['token'] = token
    return render_to_response(
        'accounts/reset-password.html', context_instance=context)
