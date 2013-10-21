from django.contrib import admin
from django.conf.urls import patterns, include, url

from accounts.views import get_user_profile
from gapelia.settings import STATIC_ROOT, MEDIA_ROOT, DEBUG
from content.urls import create_patterns, me_patterns, featured_patterns, drafts_patterns, book_patterns

admin.autodiscover()

urlpatterns = []

if DEBUG:
	debug_urls = patterns(
		"",
		url(r'^debug/', include('debugapp.urls'))
	)

	urlpatterns += debug_urls

urlpatterns += patterns(
	'',

	# App URLs
	url(r'^$', 'gapelia.views.home', name='home'),
	url(r'^create/', include(create_patterns)),
	url(r'^me/', include(me_patterns)),
	url(r'^featured/', include(featured_patterns)),
	url(r'^drafts/', include(drafts_patterns)),
	url(r'^staff/', include(admin.site.urls)),
	url(r'^accounts/', include('accounts.urls')),
	url(r'^tags/', include('tagging.urls')),
	url(r'^services/', include('services.urls')),
	url(r'^books/', include(book_patterns)),

	# (r'^Project/$', 'mysite.app.views.project'),
	# url(r'^featured/', include(book_patterns)),

	# Django URLs
	url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': STATIC_ROOT}),
	url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': MEDIA_ROOT}),

	# Username URLs
	url(r'^(?P<username>.+)/$', get_user_profile, name='user-profile')
)
