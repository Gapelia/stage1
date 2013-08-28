from gapelia.utils import sanitize_text

from models import TaggedItem, Tag, TagType


def get_tag_type(*args, **kwargs):
    return TagType.objects.get(*args, **kwargs)


def get_user_tag(*args, **kwargs):
    try:
        return TaggedItem.objects.get(*args, **kwargs)
    except TaggedItem.DoesNotExist:
        return


def create_tag(*args, **kwargs):
    return Tag.objects.create(*args, **kwargs)


def create_user_tag(*args, **kwargs):
    return TaggedItem.objects.create(*args, **kwargs)


def get_all_tags(*args, **kwargs):
    return Tag.objects.filter(*args, **kwargs)


def delete_user_tag(*args, **kwargs):
    pass


def get_or_create_tag(tag_name):
    tag, created = Tag.objects.get_or_create(name=sanitize_text(tag_name))
    return tag


def create_tagged_item(tag_name, tag_type_name, user, obj):
    tag = get_or_create_tag(tag_name)
    tag_type = TagType.objects.get(name=tag_type_name)
    try:
        # INFO: Looking for already TaggedItem for user, tag_type,
        # content_type, object_id
        taggeditem_obj = TaggedItem.objects.get(
            tag_type=tag_type, created_by=user, updated_by=user,
            object_id=obj.id, content_type=obj.get_content_type)
        if taggeditem_obj.tag.name != tag_name:
            taggeditem_obj.tag = tag
            taggeditem_obj.save()
            return taggeditem_obj
    except TaggedItem.DoesNotExist:
        return TaggedItem.objects.create(
            tag_type=tag_type, created_by=user, tag=tag, updated_by=user,
            object_id=obj.id, content_type=obj.get_content_type)


def create_user_tagged_item(tag_name, user):
    tag = get_or_create_tag(tag_name)
    tag_type = TagType.objects.get(name='user')
    return TaggedItem.objects.create(
        tag_type=tag_type, created_by=user, tag=tag,
        object_id=user.user_profile.id, updated_by=user,
        content_type=user.user_profile.get_content_type)


def delete_user_tagged_item(user, slug):
    user_profile = user.user_profile
    ct = user_profile.get_content_type
    tag_type = TagType.objects.get(name='user')
    try:
        tag = Tag.objects.get(slug=slug)
        ti = TaggedItem.objects.get(
            content_type=ct, object_id=user_profile.id,
            tag=tag, tag_type=tag_type)
        if ti:
            ti.delete()
        return True
    except Tag.DoesNotExist:
        return False
