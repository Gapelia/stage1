from django.conf.urls import patterns, url
from debugapp.views import DebugView

urlpatterns = patterns(
    '',
    url(r'$', DebugView.as_view(), name="debug"),
)
