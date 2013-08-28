import random

from models import User, UserProfile, SocialSignup,\
    USER_TYPE_SOURCES

# Functions related to User
def get_user(*args, **kwargs):
    try:
        return User.objects.get(*args, **kwargs)
    except User.DoesNotExist:
        return

def create_user(*args, **kwargs):
    try:
        return User.objects.create(*args, **kwargs)
    except User.DoesNotExist:
        return

def update_user(_id, **kwargs):
    queryset = User.objects.filter(id=_id)
    queryset.update(**kwargs)
    return queryset[0]

# Functions related to UserProfile
def get_user_profile(*args, **kwargs):
    try:
        return UserProfile.objects.get(*args, **kwargs)
    except UserProfile.DoesNotExist:
        return

def create_user_profile(*args, **kwargs):
    try:
        return UserProfile.objects.create(*args, **kwargs)
    except UserProfile.DoesNotExist:
        return

def update_user_profile(user, **kwargs):
    user_profile = UserProfile.objects.filter(user=user)
    if not user_profile:
        return
    user_profile.update(**kwargs)
    return user_profile[0]

def update_background_image(user, background_image):
    user_profile = user.user_profile
    user_profile.background_image = background_image
    user_profile.save()
    return user_profile

def update_picture(user, picture):
    user_profile = user.user_profile
    user_profile.picture = picture
    user_profile.save()
    return user_profile

# Functions related to SocialSignup
def create_social_signup(*args, **kwargs):
    try:
        return SocialSignup.objects.create(*args, **kwargs)
    except SocialSignup.DoesNotExist:
        return

def get_social_signup(*args, **kwargs):
    try:
        return SocialSignup.objects.get(*args, **kwargs)
    except SocialSignup.DoesNotExist:
        return

def get_unique_username(username):
    if User.objects.filter(username=username).count() == 0:
        return username
    else:
        return get_unique_username(username + str(random.randint(1, 10)))
