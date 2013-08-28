from django import template
from django.conf import settings

register = template.Library()

@register.filter
def get_user_avatar(user):
    if user.user_profile.picture:
        return user.user_profile.picture.url
    elif user.user_profile.avatar:
        return user.user_profile.avatar
    else:
        return settings.DEFAULT_USER_AVATAR

