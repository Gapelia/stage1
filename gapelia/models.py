from django.db import models
from django.contrib.auth.models import User

class DeletableEntity(models.Model, object):
    deleted = models.BooleanField(default=False)

    class Meta:
        abstract = True

class BaseEntity(models.Model, object):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, related_name='%(app_label)s_%(class)s_created')
    updated_by = models.ForeignKey(User, related_name='%(app_label)s_%(class)s_updated')

    def clone(self):
        """A method to create an identical object.
        """
        new_kwargs = dict([(fld.name, getattr(self, fld.name)) \
                           for fld in self._meta.fields if fld.name != 'id']);
        return self.__class__.objects.create(**new_kwargs)

    def as_dict(self):
        return {
            'id': self.id,
            'created_on': self.created_on.strftime('%b %d, %Y at %H:%M') if self.created_on is not None else None,
            'updated_on': self.updated_on.strftime('%b %d, %Y at %H:%M') if self.updated_on is not None else None,
            'created_on_iso': self.created_on.isoformat(sep=' ') if self.created_on else None,
            'updated_on_iso': self.updated_on.isoformat(sep=' ') if self.updated_on else None,
            'created_by': self.created_by_id,
            'updated_by': self.updated_by_id
        }

    def as_full_dict(self):
        return {
            # 'id': self.id,
            'created_on': self.created_on.strftime('%b %d, %Y at %H:%M') if self.created_on is not None else None,
            'updated_on': self.updated_on.strftime('%b %d, %Y at %H:%M') if self.updated_on is not None else None,
            'created_on_iso': self.created_on.isoformat(sep=' ') if self.created_on else None,
            'updated_on_iso': self.updated_on.isoformat(sep=' ') if self.updated_on else None,
            'created_by': {
                'id': self.created_by_id,
                'name': self.created_by.get_full_name(),
                'first_name': self.created_by.first_name,
                'email': self.created_by.email,
            },
            'updated_by': {
                'id': self.updated_by_id,
                'name': self.updated_by.get_full_name(),
                'first_name': self.updated_by.first_name,
                'email': self.updated_by.email,
            }
        }

    class Meta:
        abstract = True
        ordering = ['-created_on']
