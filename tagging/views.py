import simplejson as json

from django.http import HttpResponse
from django.views.generic import View
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

import tag_dbapi


class TagListView(View):
    POST_PARAM = ('name')

    @method_decorator(login_required)
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(TagListView, self).dispatch(*args, **kwargs)

    def get(self, request):
        all_tags = tag_dbapi.get_all_tags()
        if request.GET.get('format') == 'auto-suggest':
            tags = map(lambda tag: {
                'label': tag.name, 'value': tag.slug}, all_tags)
            return HttpResponse(json.dumps(tags))
        else:
            tags = map(lambda tag: tag.as_dict, all_tags)
        return HttpResponse(json.dumps({
            'total': all_tags.count(), 'tags': tags}))

    def post(self, request):
        tag_name = request.POST.get('name')
        tag_type = request.POST.get('tag_type')
        if tag_name is None:
            return HttpResponse(json.dumps({
                'success': False, 'message': 'name is required parameter'}))
        if not tag_type:
            tag_type = 'default'
        user = request.user
        tag_obj = tag_dbapi.create_user_tagged_item(tag_name, user)
        return HttpResponse(json.dumps({
            'success': True, 'tag': tag_obj.as_dict}))


class TagDetailView(View):

    @method_decorator(login_required)
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(TagDetailView, self).dispatch(*args, **kwargs)

    def get(self, request, slug):
        tag_obj = get_object_or_404(tag_dbapi.Tag, slug=slug)
        return HttpResponse(json.dumps({
            'success': True, 'tag': tag_obj.as_dict}))

    def delete(self, request, slug):
        success = tag_dbapi.delete_user_tagged_item(request.user, slug)
        return HttpResponse(json.dumps({'success': success}))
