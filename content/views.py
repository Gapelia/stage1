# App imports
from tagging import tag_dbapi
from services.places import Place
from geo import dbapi as geo_dbapi
from content import dbapi as con_dbapi
from gapelia.utils import succeeded, failed
from gapelia.messages import RESPONSE_MESSAGES

# Django Imports
from django.http import Http404
from django.http import QueryDict
from django.views.generic import View
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

class BookView(View):
    POST_PARAMS = ('title', 'description', 'dimension',)

    def __validate(self, request):
        if request.method == 'GET':
            param_keys = request.GET.keys()
            req_params = self.GET_PARAMS
        elif request.method == 'POST':
            param_keys = request.POST.keys()
            req_params = self.POST_PARAMS
        else:
            return
        for req_param in req_params:
            if req_param not in param_keys:
                return failed({'message': '%s is a required parameter.'
                               % req_param}, status=400)
        return

    @method_decorator(login_required)
    def get(self, request, book_slug=None):
        context = RequestContext(request)
        user = request.user
        if book_slug:
            book = con_dbapi.get_book(
                slug=book_slug, created_by=user, deleted=False)
            if book is None:
                raise Http404()
            pages = book.pages.filter(deleted=False).order_by('position')
            context['book'] = book
            context['pages'] = pages
            if pages:
                context['first_page'] = pages[0]
            context['PAGE_LAYOUTS'] = con_dbapi.PAGE_LAYOUTS
            return render_to_response(
                'books/book-editor.html', context_instance=context)

        context['books'] = con_dbapi.get_user_books(user)
        return render_to_response('books/books.html', context_instance=context)

    @method_decorator(login_required)
    def post(self, request, book_slug=None):
        if book_slug:
            return failed({}, status=405)
        is_not_valid = self.__validate(request)
        if is_not_valid:
            return is_not_valid

        user = request.user
        title = request.POST.get('title')
        dimension = request.POST.get('dimension')
        description = request.POST.get('description')
        location = request.POST.get('geo_tag')
        # INFO: Get the location information
        place_instance = Place()
        place_info = place_instance.get_details(location)
        location_obj, created = geo_dbapi.add_location(**place_info)

        tags = {
            'passion': request.POST.get('passion'),
            'feeling': request.POST.get('feeling')}
        book = con_dbapi.create_book(
            created_by=user, updated_by=user, title=title,
            dimension=dimension, description=description,
            location=location_obj)

        for tag_type_name, tag_name in tags.iteritems():
            if tag_name and tag_name.strip():
                tag_dbapi.create_tagged_item(
                    tag_name=tag_name, tag_type_name=tag_type_name,
                    user=self.request.user, obj=book)

        return succeeded({'book_slug': book.slug, 'success': True})

    @method_decorator(login_required)
    def put(self, request, book_slug):
        user = request.user
        book = con_dbapi.get_book(slug=book_slug, created_by=user)
        if book is None:
            raise Http404()

        params = QueryDict(request.body, request.encoding)

        title = params.get('title', book.title)
        description = params.get('description', book.description)
        dimension = params.get('dimension', book.dimension)
        # published = params.get('publish', book.published)
        location = params.get('location', book.location)
        place_instance = Place()
        place_info = place_instance.get_details(location)
        location_obj, created = geo_dbapi.add_location(**place_info)

        published = True if params.get('publish') in ['true', 'True'] \
            else book.published

        tags = {
            'passion': params.get('passion'),
            'feeling': params.get('feeling')}

        con_dbapi.update_book(
            book.id, updated_by=user, title=title,
            dimension=dimension, description=description, published=published)

        for tag_type_name, tag_name in tags.iteritems():
            if tag_name and tag_name.strip():
                tag_dbapi.create_tagged_item(
                    tag_name=tag_name, tag_type_name=tag_type_name,
                    user=self.request.user, obj=book)

        return succeeded({'book': book.as_dict})

    def delete(self, request, book_slug):
        user = request.user
        book = con_dbapi.get_book(slug=book_slug, created_by=user)
        if book is None:
            raise Http404()
        # INFO: Soft deleting the book.
        con_dbapi.update_book(
            book.id, updated_by=user, deleted=True)

        return succeeded({})


class PageView(View):
    POST_PARAMS = ()
    GET_PARAMS = ()

    # FIXME: This should be a decorator!
    def __validate(self, request):
        if request.method == 'GET':
            param_keys = request.GET.keys()
            req_params = self.GET_PARAMS
        elif request.method == 'POST':
            param_keys = request.POST.keys()
            req_params = self.POST_PARAMS
        else:
            return
        for req_param in req_params:
            if req_param not in param_keys:
                return failed({'message': '%s is a required parameter.'
                               % req_param}, status=400)
        return

    @method_decorator(login_required)
    def get(self, request, book_slug, page_id=None):
        if page_id:
            return failed({}, status=405)

        book = con_dbapi.get_book(slug=book_slug)
        if book is None:
            return failed(
                {'message': RESPONSE_MESSAGES.get('invalid-book-id')})

        pages = map(lambda page: page.as_dict, con_dbapi.get_all_pages(book))
        return succeeded({'book': book.as_dict, 'pages': pages})

    @method_decorator(login_required)
    def post(self, request, book_slug, page_id=None):
        if page_id:
            return failed({}, status=405)

        is_not_valid = self.__validate(request)
        if is_not_valid:
            return is_not_valid

        book = con_dbapi.get_book(slug=book_slug)
        if book is None:
            return failed(
                {'message': RESPONSE_MESSAGES.get('invalid-book-id')})

        url = request.POST.get('url')
        filename = request.POST.get('filename')
        mimetype = request.POST.get('mimetype')

        page_params = {'book': book, 'created_by': request.user,
                       'updated_by': request.user, }

        if mimetype != 'text/plain':
            media = con_dbapi.create_content_media(
                url=url, filename=filename, mimetype=mimetype)
            page_params.update({'media': media})

        page = con_dbapi.create_page(**page_params)
        return succeeded({'page': page.as_dict})

    @method_decorator(login_required)
    def put(self, request, book_slug, page_id):
        book = con_dbapi.get_book(slug=book_slug, created_by=request.user)
        page = con_dbapi.get_page(id=page_id)

        if not book or not page:
            return failed({}, status=404)
        params = QueryDict(request.body, request.encoding)

        title = params.get('title', page.title)
        description = params.get('description', page.description)
        position = params.get('position', page.position)
        layout = params.get('layout', page.layout)
        custom_link = params.get('wiki', page.custom_link)
        copyright_license = params.get('license', page.copyright_license)

        location = params.get('location')
        if location:
            place_instance = Place()
            place_info = place_instance.get_details(location)
            location_obj, created = geo_dbapi.add_location(**place_info)
        else:
            location_obj = None

        tags = {
            'passion': params.get('passion'),
            'feeling': params.get('feeling')
        }

        mimetype = params.get('mimetype')
        if page.media and mimetype != 'text/plain':
            url = params.get('url', page.media.url)
            filename = params.get('filename', page.media.filename)
            mimetype = params.get('mimetype', page.media.mimetype)

            con_dbapi.update_content_media(
                page.media.id, url=url, filename=filename, mimetype=mimetype)

        con_dbapi.update_page(
            page, title=title, description=description,
            updated_by=request.user, copyright_license=copyright_license,
            layout=layout, position=position, custom_link=custom_link,
            location=location_obj)

        for tag_type_name, tag_name in tags.iteritems():
            if tag_name and tag_name.strip():
                tag_dbapi.create_tagged_item(
                    tag_name=tag_name, tag_type_name=tag_type_name,
                    user=self.request.user, obj=page)

        return succeeded({'page': page.as_dict})

    def delete(self, request, book_slug, page_id):
        book = con_dbapi.get_book(slug=book_slug, created_by=request.user)
        page = con_dbapi.get_page(id=page_id)
        if not book or not page:
            return failed({}, status=404)

        # INFO: Soft deleting the page.
        con_dbapi.update_page(page, updated_by=request.user, deleted=True)
        return succeeded({})

class FullView(View):

    @method_decorator(login_required)
    def get(self, request, book_slug, page_id):
        book = con_dbapi.get_book(slug=book_slug)
        page = con_dbapi.get_page(id=page_id)
        if not book or not page:
            return failed({}, status=404)
        context = RequestContext(request)
        pages = book.pages.filter(deleted=False).order_by('position')
        context['book'] = book
        context['pages'] = pages
        context['page'] = page
        context['first_page'] = page
        context['PAGE_LAYOUTS'] = con_dbapi.PAGE_LAYOUTS
        return render_to_response(
            'books/full-view/{0}.html'.format(page.layout),
            context_instance=context)


class CreateView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['create'] = user
        return render_to_response('create/index.html', context_instance=context)


class MeView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['me'] = user
        return render_to_response('me/index.html', context_instance=context)


class FeaturedView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['featured'] = user
        return render_to_response('featured/index.html', context_instance=context)


class DraftsView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['drafts'] = user
        return render_to_response('drafts/index.html', context_instance=context)


class DimensionsView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['dimensions'] = user
        return render_to_response('dimensions/index.html', context_instance=context)


class PulseView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['pulse'] = user
        return render_to_response('dimensions/pulse.html', context_instance=context)


class ArtView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['art'] = user
        return render_to_response('dimensions/art.html', context_instance=context)



class WowView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['wow'] = user
        return render_to_response('dimensions/wow.html', context_instance=context)



class LifeView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['life'] = user
        return render_to_response('dimensions/life.html', context_instance=context)



class FlowView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['flow'] = user
        return render_to_response('dimensions/flow.html', context_instance=context)



class WonderView(View):

    @method_decorator(login_required)
    def get(self, request):
        context = RequestContext(request)
        user = request.user

        context['wonder'] = user
        return render_to_response('dimensions/wonder.html', context_instance=context)

