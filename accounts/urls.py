from django.conf.urls import patterns, include, url

urlpatterns = patterns('accounts.views',
    # Examples:
    url(r'signup/?$', 'signup', name='signup'),

    url(r'facebook/?$', 'facebook_authentication', name='facebook-auth'),
    url(r'facebook/callback/?$', 'facebook_callback', name='facebook-callback'),

    url(r'google/?$', 'google_authentication', name='google-auth'),
    url(r'google/callback/?$', 'google_callback', name='facebook-callback'),

    url(r'signin/?$', 'signin', name='signin'),
    url(r'signout/?$', 'signout', name='signout'),
    url(r'edit/?$', 'edit_profile', name='edit-profile'),
    url(r'settings/?$', 'user_profile_settings', name='profile-settings'),
    url(r'settings/password/?$', 'user_password_settings', name='password-settings'),
    url(r'forgot-password/?$', 'forgot_password', name='forgot-password'),
    url(r'deactivate/?$', 'deactivate_account', name='deactivate-account'),
    url(r'^reset-password/(?P<uidb36>[0-9A-Za-z]+)-(?P<token>.+)/$', 'reset_password', name='reset-password'),

    url(r'signup/(?P<code>.+)/$', 'signup', name='creator-signup'),
)
