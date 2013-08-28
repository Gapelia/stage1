from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _
from tagging.models import TaggedItem
from django.contrib.contenttypes.models import ContentType

SIGNUP_SOURCES = (
    (u'GO', u'Google'),
    (u'FB', u'Facebook'),
    (u'TW', u'Twitter'),
)

USER_TYPE_SOURCES = (
    (u'CC', u'Content Creator'),
    (u'NCC', u'Non Content Creator'),
)


class SocialSignup(models.Model):
    """A model to hold the facebook/twitter/google signup general information.
    """
    user = models.ForeignKey(User, null=False, related_name='social_signups')
    social_id = models.CharField(max_length=254, null=True)
    source = models.CharField(max_length=3, choices=SIGNUP_SOURCES)
    auth_token = models.CharField(max_length=254)

    class Meta:
        db_table = 'accounts_social_signups'


class UserProfile(models.Model):
    """A model to hold the user general information.
    """
    def __get_file_path(instance, filename):
        return '/'.join([str(instance.user.username), filename])

    user = models.OneToOneField(User, related_name='user_profile')
    user_type = models.CharField(
        max_length=3, default='NCC', choices=USER_TYPE_SOURCES)

    avatar = models.URLField(null=True, blank=True)
    picture = models.ImageField(
        null=True, upload_to=__get_file_path, blank=True)
    about = models.TextField(blank=True, null=True)
    background_image = models.FileField(
        null=True, upload_to=__get_file_path, blank=True)
    location = models.CharField(max_length=100, null=True)

    facebook_profile = models.URLField(
        null=True, verbose_name=_('Facebook profile link'))
    twitter_profile = models.URLField(
        null=True, verbose_name=_('Twitter profile link'))
    tumblr_profile = models.URLField(
        null=True, verbose_name=_('Tumblr profile link'))

    def __unicode__(self,):
        return self.user.username

    def get_basic_info(self):
        res = {
            'id': self.id,
            'avatar': self.avatar,
            'about': self.about,
        }
        if self.picture:
            res.update({'picture': {
                        'name': self.picture.name,
                        'url': self.picture.url
                        }})
        return res

    @property
    def get_content_type(self):
        return ContentType.objects.get_for_model(self)

    @property
    def tagged_items(self):
        return TaggedItem.objects.filter(
            content_type=self.get_content_type, object_id=self.id)

    class Meta:
        db_table = 'accounts_profile'


def create_user_profile(sender, instance, **kwargs):
    if not kwargs.get('created'):
        return
    user_profile, created = UserProfile.objects.get_or_create(user=instance)
    # def __get_profile_url(profile_url):
    #     if UserProfile.objects.filter(profile_url=profile_url).count() == 0:
    #         return profile_url
    #     return __get_profile_url(profile_url+str(instance.id))

    # user_profile.profile_url = __get_profile_url(slugify(instance.username))
    # user_profile.save()

post_save.connect(
    create_user_profile, sender=User,
    dispatch_uid='user-profile-creation-signal')
