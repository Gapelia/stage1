from django.db import models
from django.utils.translation import ugettext_lazy as _
from gapelia.unique_slugify import unique_slugify
from gapelia.models import BaseEntity, DeletableEntity
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import generic


class TagType(models.Model):
    name = models.CharField(max_length=20)

    def __unicode__(self):
        return self.name

    @property
    def as_dict(self):
        return {
            'name': self.name,
        }


class Tag(models.Model):
    """A model to hold the tag information.
    """
    name = models.CharField(max_length=50, verbose_name=_('Tag name'))
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        unique_slugify(self, self.name)
        super(Tag, self).save(*args, **kwargs)

    def __unicode__(self):
        return self.name

    @property
    def as_dict(self):
        return {
            'name': self.name,
            'slug': self.slug}

    # class Meta:
    #     db_table = 'tags'


class TaggedItem(BaseEntity, DeletableEntity):
    """A model to hold the tagged object information.
    """
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    tagged_on = generic.GenericForeignKey('content_type', 'object_id')

    tag = models.ForeignKey(Tag, related_name='tagged_items')
    tag_type = models.ForeignKey(TagType)

    def __unicode__(self):
        return str(self.tag_type) + " - " + str(self.tag)

    @property
    def as_dict(self):
        # d = super(TaggedItem).as_dict()
        d = {}
        d.update({'tag': self.tag.name})
        d.update({'tag_type': self.tag_type.name})
        return d
