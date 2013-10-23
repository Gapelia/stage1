from django.conf.urls import patterns, url
from content.views import CreateView, MeView, FeaturedView, DraftsView, BookView, PageView, FullView, DimensionsView, PulseView, ArtView, WowView, LifeView, FlowView, WonderView

create_patterns = patterns(
	'',
	url(r'^$', CreateView.as_view(), name='create')
)

me_patterns = patterns(
	'',
	url(r'^$', MeView.as_view(), name='me')
)

featured_patterns = patterns(
	'',
	url(r'^$', FeaturedView.as_view(), name='featured')
)

drafts_patterns = patterns(
	'',
	url(r'^$', DraftsView.as_view(), name='drafts')
)

dimensions_patterns = patterns(
	'',
	url(r'^$', DimensionsView.as_view(), name='dimensions')
)

pulse_patterns = patterns(
	'',
	url(r'^$', PulseView.as_view(), name='pulse')
)

art_patterns = patterns(
	'',
	url(r'^$', ArtView.as_view(), name='art')
)

wow_patterns = patterns(
	'',
	url(r'^$', WowView.as_view(), name='wow')
)

life_patterns = patterns(
	'',
	url(r'^$', LifeView.as_view(), name='life')
)

flow_patterns = patterns(
	'',
	url(r'^$', FlowView.as_view(), name='flow')
)

wonder_patterns = patterns(
	'',
	url(r'^$', WonderView.as_view(), name='wonder')
)



book_patterns = patterns(
	'',
	url(r'^(?P<book_slug>[\w-]+)/full-view/(?P<page_id>\d+)/$', FullView.as_view(), name='book-full-view'),
	url(r'^(?P<book_slug>[\w-]+)/pages/$', PageView.as_view(), name='all-pages'),
	url(r'^(?P<book_slug>[\w-]+)/pages/(?P<page_id>\d+)/$', PageView.as_view(), name='page'),

	# url(r'/(?P<book_id>\d+)/pages/$', PageView.as_view(), name='page'),
	# url(r'(?P<book_id>\d+)/attachment/$', AttachmentView.as_view(), name='book-attachment'),

	url(r'^(?P<book_slug>[\w-]+)/$', BookView.as_view(), name='book'),
	url(r'^$', BookView.as_view(), name='books')
)
