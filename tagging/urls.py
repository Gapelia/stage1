from django.conf.urls import patterns, include, url

from tagging.views import TagListView, TagDetailView

urlpatterns = patterns('',
    (r'^$', TagListView.as_view()),
    (r'^(?P<slug>.+)/$', TagDetailView.as_view()),
)
