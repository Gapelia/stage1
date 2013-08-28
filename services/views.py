# System imports
import json

# Third party imports
from services.utils import region
from services.places import Place
from services.wikipedia import wiki_article
from services.vimeo import Vimeo
from gapelia.utils import succeeded

# Django imports
from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from django.views.decorators.cache import cache_page
from django.shortcuts import render_to_response
from django.template.context import RequestContext

CACHE_PERIOD = 60 * 60 * 24 * 7  # A weak


class ServicesView(View):

    def get(self, request):
        context = RequestContext(request)
        context['CURRENT_LOCATION'], context['CURRENT_CITY'] = region(request)
        return render_to_response(
            'services.html', context_instance=context)


@cache_page(CACHE_PERIOD)
def wiki(request):
    location = request.GET.get('l')
    text = ""
    if location:
        text = wiki_article(location)
    return HttpResponse(json.dumps({
        'success': True, 'wiki': text}))


@cache_page(CACHE_PERIOD)
def rome2rio(request):
    context = RequestContext(request)
    context['ROUTE'] = request.GET.get('route')
    context['ROME2RIO_URL'] = settings.ROME2RIO_URL
    return render_to_response(
        'rome2rio.html', context_instance=context)


@cache_page(CACHE_PERIOD)
def places(request):
    term = request.GET.get('term')
    plcs = []
    if term:
        plcs = Place()
        ac = plcs.auto_complete(term)
    return HttpResponse(json.dumps(ac))


@cache_page(CACHE_PERIOD)
def vimeo(request, video_id):
    vimeo = Vimeo(video_id)
    return succeeded({'thumbnail': vimeo.thumbnail()})
