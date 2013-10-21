# Application imports
from geo.models import Location
from positions import PositionField
from tagging.models import TaggedItem
from gapelia.unique_slugify import unique_slugify
from gapelia.models import BaseEntity, DeletableEntity

# Django imports
from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.db.models.signals import post_save
from django.contrib.contenttypes.models import ContentType

class PAGE_LAYOUTS:
    FRONT_COVER = '0'
    PHOTO = '1'
    TEXT = '2'
    HORIZONTAL = '3'
    OVERLAY = '4'
    PHOTOTEXT = '5'
    INTEGRATED = '6'
    VIDEO = '7'

TYPE_CHOICES = (
    ('UNKNOWN', 'Unknown'),
    ('AUDIO', 'Audio'),
    ('VIDEO', 'Video'),
    ('IMAGE', 'Image'), )

DIMENSION_CHOICES = (
    ('FLOW', 'flow'),
    ('ART', 'art'),
    ('LIFE', 'life'),
    ('PULSE', 'pulse'),
    ('WOW', 'wow'),
    ('WONDER', 'wonder')
)

PAGE_LAYOUT_CHOICES = (
    (PAGE_LAYOUTS.FRONT_COVER, 'Front Cover'),
    (PAGE_LAYOUTS.PHOTO, 'Photo'),
    (PAGE_LAYOUTS.TEXT, 'Text'),
    (PAGE_LAYOUTS.HORIZONTAL, 'Horizontal'),
    (PAGE_LAYOUTS.OVERLAY, 'Overlay'),
    (PAGE_LAYOUTS.PHOTOTEXT, 'Photo/Text'),
    (PAGE_LAYOUTS.INTEGRATED, 'Integrated'),
    (PAGE_LAYOUTS.VIDEO, 'Video')
)

PAGE_LICENSE_CHOICES = (
    ('0', 'CC BY'),
    ('1', 'CC BY-SA'),
    ('2', 'CC BY-ND'),
    ('3', 'CC BY-NC'),
    ('4', 'CC BY-NC-SA'),
    ('5', 'CC BY-NC-ND'))


class ContentMedia(models.Model):
    url = models.CharField(max_length=256)
    filename = models.CharField(max_length=256)
    mimetype = models.CharField(max_length=50)

    def __unicode__(self):
        return self.url

class Book(BaseEntity, DeletableEntity):
    """A model to hold the book information.
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    published = models.BooleanField(default=False)
    description = models.TextField()
    wiki_link = models.CharField(max_length=250, null=True, blank=True)
    location = models.ForeignKey(Location, null=True, blank=True)
    collaborators = models.ManyToManyField(User, default=BaseEntity.updated_by)
    dimension = models.CharField(max_length=10, choices=DIMENSION_CHOICES)
    cover_image = models.ForeignKey(
        ContentMedia, null=True, related_name='cover_image_media')

    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        unique_slugify(self, self.title)
        super(Book, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('book', kwargs={'book_slug': self.slug})

    @property
    def get_content_type(self):
        return ContentType.objects.get_for_model(self)

    @property
    def tagged_items(self):
        return TaggedItem.objects.filter(
            object_id=self.id, content_type=self.get_content_type,
            deleted=False)

    @property
    def get_first_page(self):
        """docstring for get_first_page"""
        try:
            return self.pages.get(position=0)
        except Exception:
            return None

    @property
    def as_dict(self):
        d = super(Book, self).as_dict()
        d.update({
            'title': self.title,
            'id': self.slug,
            'dimension': self.dimension,
            'detail_url': self.get_absolute_url(),
            'published': self.published,
            'description': self.description,
            'tags': map(lambda t_item: t_item.as_dict, self.tagged_items),
            'location': self.location.as_dict if self.location else '',
        })
        return d


class Page(BaseEntity, DeletableEntity):
    """A model to hold the page information.
    """
    title = models.CharField(
        max_length=200, blank=True, default="This is a title")
    book = models.ForeignKey(Book, related_name='pages')
    position = PositionField(collection='book')
    layout = models.CharField(
        max_length=2, choices=PAGE_LAYOUT_CHOICES,
        default=PAGE_LAYOUTS.PHOTO, blank=True)
    copyright_license = models.CharField(
        max_length=2, choices=PAGE_LICENSE_CHOICES, null=True, blank=True)
    location = models.ForeignKey(Location, null=True, blank=True)
    description = models.TextField(
        null=True, blank=True, default="Start writing your idea here...")
    custom_link = models.CharField(max_length=250, null=True, blank=True)
    media = models.ForeignKey(
        ContentMedia, related_name='page_media', null=True)

    @property
    def get_content_type(self):
        return ContentType.objects.get_for_model(self)

    @property
    def tagged_items(self):
        return TaggedItem.objects.filter(
            object_id=self.id, content_type=self.get_content_type,
            deleted=False)

    def get_tag(self, tag_type_name):
        try:
            tagged_obj = TaggedItem.objects.get(
                object_id=self.id, content_type=self.get_content_type,
                tag_type__name=tag_type_name, deleted=False)
        except TaggedItem.DoesNotExist:
            return
        return tagged_obj.tag.name

    @property
    def as_dict(self):
        d = super(Page, self).as_dict()
        tagged_items = TaggedItem.objects.filter(
            object_id=self.id, content_type=self.get_content_type,
            deleted=False)

        d.update({
            'title': self.title,
            'description': self.description,
            'position': self.position,
            'layout': self.layout,
            'custom_link': self.custom_link,
            'tags': map(lambda t_item: t_item.as_dict, tagged_items),
            'location': self.location.as_dict if self.location else '',
            'url': self.media.url if self.media else '',
            'filename': self.media.filename if self.media else '',
            'mimetype': self.media.mimetype if self.media else '',
        })
        return d

    def get_next_by_position(self):
        pages = Page.objects.filter(book=self.book).filter(
            position__gt=self.position).order_by('position')
        return pages[0] if pages else None

    def get_previous_by_position(self):
        pages = Page.objects.filter(book=self.book).filter(
            position__lt=self.position).order_by('-position')
        return pages[0] if pages else None


@receiver(post_save, sender=Page)
def page_post_save_signal(sender, **kwargs):
    obj = kwargs.get('instance')
    book = obj.book
    if not kwargs.get('created'):
        if obj.layout == PAGE_LAYOUTS.FRONT_COVER and not obj.position == 0:
            old_cover_page = book.get_first_page
            old_cover_page.layout = PAGE_LAYOUTS.PHOTO
            old_cover_page.save()
            obj.position = 0
            obj.title = book.title
            obj.description = book.description
            obj.save()
            book.cover_image = obj.media
            book.save()
        return
    if book.pages.count() == 1:
        obj.title = book.title
        obj.description = book.description
        obj.layout = PAGE_LAYOUTS.FRONT_COVER
        book.cover_image = obj.media
        book.save()

    obj.custom_link = book.wiki_link
    obj.location = book.location

    if obj.media and obj.media.mimetype == 'video/embed':
        obj.layout = PAGE_LAYOUTS.VIDEO

    if not obj.media:
        obj.layout = PAGE_LAYOUTS.TEXT

    #INFO: Assign book tags to the newly created page.
    for tagged_item in book.tagged_items:
        cloned_to = tagged_item.clone()
        cloned_to.content_type = obj.get_content_type
        cloned_to.object_id = obj.id
        cloned_to.save()
    if not book.cover_image:
        book.cover_image = obj.media
        book.save()
    obj.save()
