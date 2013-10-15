from django.contrib import admin
from django.conf.urls import patterns, include, url

from accounts.views import get_user_profile
from gapelia.settings import STATIC_ROOT, MEDIA_ROOT, DEBUG
from content.urls import book_patterns

admin.autodiscover()

urlpatterns = []

if DEBUG:
    debug_urls = patterns(
        "",
        url(r'^debug/', include('debugapp.urls')),
    )
    urlpatterns += debug_urls

urlpatterns += patterns(
    '',

    # App URLs
    url(r'^$', 'gapelia.views.home', name='home'),
    url(r'^staff/', include(admin.site.urls)),
    url(r'^accounts/', include('accounts.urls')),
    url(r'^tags/', include('tagging.urls')),
    url(r'^services/', include('services.urls')),
    url(r'^books/', include(book_patterns)),
		url(r'^featured/', include(book_patterns)),

    # Django URLs
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': STATIC_ROOT}),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': MEDIA_ROOT}),

    # Username URLs
    url(r'^(?P<username>.+)/$', get_user_profile, name='user-profile'),
)
