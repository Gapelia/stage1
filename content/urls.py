from django.conf.urls import patterns, url
from content.views import BookView, PageView, FullView

book_patterns = patterns(
	'',
	url(r'^(?P<book_slug>[\w-]+)/full-view/(?P<page_id>\d+)/$',
		FullView.as_view(), name='book-full-view'),
	url(r'^(?P<book_slug>[\w-]+)/pages/$',
		PageView.as_view(), name='all-pages'),
	url(r'^(?P<book_slug>[\w-]+)/pages/(?P<page_id>\d+)/$',
		PageView.as_view(), name='page'),

	# url(r'/(?P<book_id>\d+)/pages/$',
	# 	PageView.as_view(), name='page'),
	# url(r'(?P<book_id>\d+)/attachment/$',
	# 	AttachmentView.as_view(), name='book-attachment'),

	url(r'^(?P<book_slug>[\w-]+)/$',
		BookView.as_view(), name='book'),
	url(r'^$',
		BookView.as_view(), name='books'),
)

me_patterns = patterns(
	'',
	url(r'^(?P<book_slug>[\w-]+)/full-view/(?P<page_id>\d+)/$',
		FullView.as_view(), name='book-full-view'),
	url(r'^(?P<book_slug>[\w-]+)/pages/$',
		PageView.as_view(), name='all-pages'),
	url(r'^(?P<book_slug>[\w-]+)/pages/(?P<page_id>\d+)/$',
		PageView.as_view(), name='page'),

	# url(r'/(?P<book_id>\d+)/pages/$',
	# 	PageView.as_view(), name='page'),
	# url(r'(?P<book_id>\d+)/attachment/$',
	# 	AttachmentView.as_view(), name='book-attachment'),

	url(r'^(?P<book_slug>[\w-]+)/$',
		BookView.as_view(), name='book'),
	url(r'^$',
		BookView.as_view(), name='books'),
)
