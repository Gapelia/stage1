from django.contrib import messages

RESPONSE_MESSAGES = {'signup-successful':  'Awesome, you have signed up successfully.',
                     'forgot-password': 'We have sent you an email with instructions to reset your password.',
                     'reset-password': 'Your new password has been set.',
                     'facebook-denied': "You didn't give us enough access on Facebook to take you into our system :(",
                     'facebook-error': 'Some problem occurred while authenticating you via Facebook.',
                     'google-denied': "You didn't give us enough access on Google to take you into our system :(",
                     'deactivate-account': "Your account has been successfully deactivated. You can activate your account by signing in again.",
                     'invalid-book-id': 'Invalid book id.',
                     'invalid-page-id': 'Invalid page id.'
                     }


def send_acknowledgment(request, message_key, data={}):
    message_str = RESPONSE_MESSAGES.get(message_key)
    messages.success(request, message_str.format(**data))
