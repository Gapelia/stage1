from django.conf.urls import patterns, url
from services.views import ServicesView,\
    wiki, rome2rio, places, vimeo

urlpatterns = patterns(
    '',
    url(r'^$', ServicesView.as_view(), name="debug"),
    url(r'^wiki/$', wiki, name="wiki"),
    url(r'^map/$', rome2rio, name="rome2rio"),
    url(r'^places/$', places, name="places"),
    url(r'^vimeo/(?P<video_id>.*)/$', vimeo, name="vimeo"),
)
