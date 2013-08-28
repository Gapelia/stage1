import uuid
import datetime
import os.path

from django.db import models
from django.contrib.contenttypes import generic
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.models import ContentType

from gapelia.models import BaseEntity, DeletableEntity


def generate_random_token(offset=10):
    return uuid.uuid5(
        uuid.uuid4(), datetime.datetime.now().isoformat()).hex[offset:]


class File(BaseEntity, DeletableEntity):
    def __get_file_path(obj, filename):
        book_name = obj.file_for.title
        return '/'.join([
            slugify(book_name),
            generate_random_token() + os.path.splitext(filename)[1]])
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    file_for = generic.GenericForeignKey('content_type', 'object_id')

    _file = models.FileField(
        upload_to=__get_file_path, verbose_name=_('Actual file object.'))
    original_filename = models.CharField(
        max_length=100, verbose_name=_('Stores the original filename'))

    @classmethod
    def get_for(self, obj):
        ctype = ContentType.objects.get_for_model(obj)
        return File.objects.filter(content_type=ctype, object_id=obj.id)

    def __unicode__(self):
        return _(u'File for %s') % self.file_for

    def delete(self, permanent=True, **kwargs):
        if permanent:
            super(File, self).delete(**kwargs)
        else:
            self.deleted = True
            self.save()

    @property
    def as_dict(self):
        res = {'id': self.id,
               'object_id': self.object_id,
               'file_url': self._file.url,
               'filename': self.original_filename,
               'content_type': self.content_type.model, }
        res.update(BaseEntity.as_full_dict(self))
        res.update(DeletableEntity.as_full_dict(self))
        return res
