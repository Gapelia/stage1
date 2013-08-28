from django.db import models
from django.conf import settings
from django.core.urlresolvers import reverse
from django.db.models.signals import post_save

from accounts import acc_dbapi
from gapelia.mail import send_email
from gapelia.utils import generate_random_token
from gapelia.models import BaseEntity, DeletableEntity

class Invitee(BaseEntity):
    CHOICES = (('0', 'Invited'),
               ('1', 'Accepted'))

    name = models.CharField(max_length=150)
    user_type = models.CharField(max_length=3, default='0',\
                                     choices=acc_dbapi.USER_TYPE_SOURCES)
    email = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=1, default='0', choices=CHOICES)

    def save(self, *args, **kwargs):
        if not self.code:
            def __get_unique_code():
                code = generate_random_token()
                if Invitee.objects.filter(code=code).count() > 0:
                    return __get_unique_code()
                return code
            self.code = __get_unique_code()
        super(Invitee, self).save(*args, **kwargs)

    def __unicode__(self,):
        return self.email

    @property
    def is_valid(self):
        return True if self.status == '0' else False

    @property
    def get_signup_url(self):
        return reverse('creator-signup', kwargs={'code': self.code})


def invitee_post_save_signal(sender, instance, **kwargs):
    if not kwargs.get('created'):
        return
    url = settings.BASE_URL + instance.get_signup_url
    send_email(instance.email, 'signup-invitation', **{'url': url})

post_save.connect(invitee_post_save_signal, sender=Invitee, dispatch_uid='invitee-post-save-signal')
