# App imports
from content.models import Book, Page, PAGE_LAYOUT_CHOICES,\
    PAGE_LICENSE_CHOICES, ContentMedia, PAGE_LAYOUTS
from gapelia.settings import DEFAULT_PAGE_MEDIA

# This is just a hack to silence flake8
PAGE_LAYOUT_CHOICES = PAGE_LAYOUT_CHOICES
PAGE_LICENSE_CHOICES = PAGE_LICENSE_CHOICES
PAGE_LAYOUTS = PAGE_LAYOUTS


# All Book related functions
def get_book(*args, **kwargs):
    try:
        return Book.objects.get(*args, **kwargs)
    except Book.DoesNotExist:
        return


def get_user_book(book_id, user):
    try:
        return Book.objects.get(id=book_id, created_by=user)
    except Book.DoesNotExist:
        return None


def get_user_books(user):
    return Book.objects.filter(
        created_by=user, deleted=False).order_by('created_on')


def create_book(*args, **kwargs):
    return Book.objects.create(*args, **kwargs)


def update_book(book_id, *args, **kwargs):
    return Book.objects.filter(id=book_id).update(*args, **kwargs)


# All Page related functions
def get_page(*args, **kwargs):
    try:
        return Page.objects.get(*args, **kwargs)
    except Page.DoesNotExist:
        return


def get_all_pages(book, order_by='position'):
    return Page.objects.filter(
        book=book, deleted=False).order_by(order_by)


def create_page(*args, **kwargs):
    return Page.objects.create(*args, **kwargs)


def update_page(page, *args, **kwargs):
    page.title = kwargs.get('title', page.title)
    page.description = kwargs.get('description', page.description)
    page.updated_by = kwargs.get('updated_by', page.updated_by)
    page.copyright_license = kwargs.get(
        'copyright_license', page.copyright_license)
    page.layout = kwargs.get('layout', page.layout)
    page.position = kwargs.get('position', page.position)
    page.custom_link = kwargs.get('custom_link', page.custom_link)
    page.location = kwargs.get('location', page.location)
    page.deleted = kwargs.get('deleted', page.deleted)
    return page.save()


# All ContentMedia related functions
def create_content_media(*args, **kwargs):
    return ContentMedia.objects.create(*args, **kwargs)


def create_default_media():
    return create_content_media(
        url=DEFAULT_PAGE_MEDIA['URL'],
        filename=DEFAULT_PAGE_MEDIA['FILE_NAME'],
        mimetype=DEFAULT_PAGE_MEDIA['MIME_TYPE'])


def update_content_media(media_id, *args, **kwargs):
    return ContentMedia.objects.filter(id=media_id).update(*args, **kwargs)
