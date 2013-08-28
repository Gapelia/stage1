from django import forms
from django.template.defaultfilters import slugify
from django.contrib.auth.forms import SetPasswordForm

import acc_dbapi
from gapelia.utils import get_first_last_name

class SigninForm(forms.ModelForm):
    """A model form for signin.
    """
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput())

    def clean_email(self):
        email = self.cleaned_data['email']
        if not email:
            raise forms.ValidationError('This field is required.')
        elif not acc_dbapi.get_user(**{'email': email}):
            raise forms.ValidationError('This email is not registered with us.')
        return email

    class Meta:
        model = acc_dbapi.User
        fields = ('email', 'password')


class SignupForm(forms.ModelForm):
    username = forms.CharField(max_length=30)

    class Meta:
        model = acc_dbapi.User
        fields = ('email', 'password')

    def clean_email(self):
        email = self.cleaned_data['email']
        if not email:
            raise forms.ValidationError('This field is required.')
        elif acc_dbapi.get_user(**{'email': email}):
            raise forms.ValidationError('This email is already taken.')
        return email

    def save(self, username=None, commit=True):
        user = super(SignupForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if username:
            user.username = acc_dbapi.get_unique_username(slugify(username))
            user.first_name, user.last_name = get_first_last_name(username)
        if commit:
            user.save()
        return user


class CustomSetPasswordForm(SetPasswordForm):
    min_password_length = 6

    def clean_new_password1(self):
        password1 = self.cleaned_data.get('new_password1', '')
        if len(password1) < self.min_password_length:
            raise forms.ValidationError("Password must have at least %i characters" % self.min_password_length)
        else:
            return password1

    def clean_new_password2(self):
        password2 = self.cleaned_data.get('new_password2', '')
        if len(password2) < self.min_password_length:
            raise forms.ValidationError("Password must have at least %i characters" % self.min_password_length)
        password1 = self.cleaned_data.get('new_password1')
        if password1 and password2:
            if password1 != password2:
                raise forms.ValidationError("The two password fields didn't match.")
        return password2

