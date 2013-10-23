from django.contrib import admin
from django.conf.urls import patterns, include, url

from accounts.views import get_user_profile
from gapelia.settings import STATIC_ROOT, MEDIA_ROOT, DEBUG
from content.urls import create_patterns, me_patterns, featured_patterns, book_patterns, drafts_patterns, dimensions_patterns, pulse_patterns, art_patterns, wow_patterns, life_patterns, flow_patterns, wonder_patterns

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
	url(r'^books/', include(book_patterns)),
	url(r'^drafts/', include(drafts_patterns)),
	url(r'^dimensions/', include(dimensions_patterns)),
	url(r'^dimensions/pulse/', include(pulse_patterns)),
	url(r'^dimensions/art/', include(art_patterns)),
	url(r'^dimensions/wow/', include(wow_patterns)),
	url(r'^dimensions/life/', include(life_patterns)),
	url(r'^dimensions/flow/', include(flow_patterns)),
	url(r'^dimensions/wonder/', include(wonder_patterns)),

	url(r'^accounts/', include('accounts.urls')),
	url(r'^tags/', include('tagging.urls')),
	url(r'^services/', include('services.urls')),
	url(r'^staff/', include(admin.site.urls)),

	# (r'^Project/$', 'mysite.app.views.project'),
	# url(r'^featured/', include(book_patterns)),

	# Django URLs
	url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': STATIC_ROOT}),
	url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': MEDIA_ROOT}),

	# Username URLs
	url(r'^(?P<username>.+)/$', get_user_profile, name='user-profile')
)
