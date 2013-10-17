# Django settings for gapelia project.
import os

PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))

# ALLOWED_HOSTS = ['gapelia.launchyard.com']
ALLOWED_HOSTS = ['']

try:
    from local_settings import DEBUG
except ImportError:
    DEBUG = False

TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Atif Haider', 'atif@launchyard.com'),
		('Paul Anthony Webb', 'paul@dsgn.pw-software.com'),
)

MANAGERS = ADMINS

LOGIN_URL = '/accounts/signin/'

try:
    from local_settings import BASE_URL
except ImportError:
    BASE_URL = 'http://gapelia.com'

try:
    from local_settings import DATABASES
except ImportError:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'gapelia',
            'USER': '',
            'PASSWORD': '',
            'HOST': '',
            'PORT': ''
            }
        }

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = '%s/../%s' % (PROJECT_PATH, 'media')

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = BASE_URL + '/media/'

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
STATIC_ROOT = '%s/../%s' % (PROJECT_PATH, 'static')

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = BASE_URL + '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    os.path.join(STATIC_ROOT, 'static'),
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # 'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

AUTHENTICATION_BACKENDS = (
    'accounts.backend.EmailBackend',
    )
# Make this unique, and don't share it with anybody.
SECRET_KEY = 'l!k8w&amp;z-+cf@ekjip!s6edae)q-wr!&amp;c1yz(yo%f53eeh!4#h7'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
    # 'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'gapelia.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'gapelia.wsgi.application'

TEMPLATE_DIRS = (os.path.join(PROJECT_PATH, '../templates'),)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'accounts',
    'tagging',
    'invitations',
    'content',
    'geo',
    # 'files',
    'services',
    'content',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

FORGOT_PASSWORD = PROJECT_PATH + \
    '/../templates/notifications/password-reset.html'
SIGNUP_INVITATION = PROJECT_PATH + \
    '/../templates/notifications/signup-invitation.html'

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
# EMAIL_HOST_USER = 'no-reply@launchyard.com'
EMAIL_HOST_USER = 'no-reply@gapelia.com'
EMAIL_HOST_PASSWORD = 'testing1'
EMAIL_USE_TLS = True
EMAIL_FROM_NAME = 'Gapelia'
DEFAULT_FROM_EMAIL = 'Gapelia <no-reply@gapelia.com>'

# FACEBOOK_APP_ID = '521376384578891'
# FACEBOOK_APP_SECRET = '090b401b64a576f075f879b979dfaebe'
FACEBOOK_APP_ID = '256426991173100'
FACEBOOK_APP_SECRET = '728fb8501ab04da9eab22fbf0b8befad'
FACEBOOK_REDIRECT_URL = BASE_URL + '/accounts/facebook/callback'
# FACEBOOK_REDIRECT_URL = BASE_URL + '/me'
FACEBOOK_FIELDS = 'id,name,email,first_name,last_name,picture,bio,username,\
        location,hometown'
FACEBOOK_PERMS = ['email', 'user_about_me', 'user_location', 'user_hometown']

GOOGLE_REDIRECT_URI = '%s/accounts/google/callback' % BASE_URL

try:
    from local_settings import GOOGLE_OAUTH2_CLIENT_ID,\
        GOOGLE_OAUTH2_CLIENT_SECRET, GOOGLE_API_KEY
except ImportError:
    GOOGLE_OAUTH2_CLIENT_ID = ''
    GOOGLE_OAUTH2_CLIENT_SECRET = ''
    GOOGLE_API_KEY = 'AIzaSyBfXzIbS1cGZr57cgFxnUiTF_lCqBJcvlE'

try:
    from local_settings import ROME2RIO_URL
except ImportError:
    ROME2RIO_URL = 'http://travel.gapelia.com'

DEFAULT_USER_AVATAR = STATIC_URL + '/images/avatar-spacecakes.jpg'

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.tz",
    "django.contrib.messages.context_processors.messages",
    "django.core.context_processors.request",
    "services.context.region",
)

GEO_DATA_FILE = "GeoLiteCity.dat"
try:
    from local_settings import FILEPICKER_API_KEY
except ImportError:
    FILEPICKER_API_KEY = "AI64IEXbTBOTCMcUXllQHz"

DEFAULT_PAGE_MEDIA = {
    'URL': "https://www.filepicker.io/api/file/SHYr30UISWioKMdgkaJM",
    'FILE_NAME': "grey-pixel.png",
    'MIME_TYPE': "image/png",
}
