import simplejson as json
from django.utils.http import urlencode
import requests

GOOGLE_OAUTH2_SERVER = 'accounts.google.com'
GOOGLE_OATUH2_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/auth'
GOOGLE_OAUTH2_SCOPE = ['https://www.googleapis.com/auth/userinfo.email',
                       'https://www.googleapis.com/auth/userinfo.profile']
GOOGLEAPIS_EMAIL = 'https://www.googleapis.com/userinfo/email'
GOOGLEAPIS_PROFILE = 'https://www.googleapis.com/oauth2/v1/userinfo'
ACCESS_TOKEN_URL = 'https://accounts.google.com/o/oauth2/token'

class GoogleClient(object):
    def __init__(self, client_id, client_secret, redirect_uri):
        self.client_id = client_id
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri

    def get_scope_string(self):
        return ' '.join(GOOGLE_OAUTH2_SCOPE)

    def get_auth_url(self, state=''):
        params = {'scope': ' '.join(GOOGLE_OAUTH2_SCOPE),
                  'redirect_uri': self.redirect_uri,
                  'response_type': 'code',
                  'client_id': self.client_id}
        if state != '' and isinstance(state, basestring):
            params.update({'state': state})

        return '%s?%s' % (GOOGLE_OATUH2_AUTHORIZATION_URL, urlencode(params))

    def get_user_tokens(self, code):
        params = {
            'code': code,
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'redirect_uri': self.redirect_uri,
            'grant_type': 'authorization_code'
        }

        response = requests.post(ACCESS_TOKEN_URL, data=params)
        if response.status_code == 200:
            return json.loads(response.content)['access_token']
        return None

    def get_user_info(self, access_token):
        response = requests.get('%s?access_token=%s' % (GOOGLEAPIS_PROFILE, access_token))
        if response.status_code == 200:
            return json.loads(response.content)
        return None
