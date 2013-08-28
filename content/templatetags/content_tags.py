from django import template

from django.conf import settings
from content import dbapi as con_dbapi
from content.models import PAGE_LAYOUTS

import json

register = template.Library()


@register.inclusion_tag('incl/layout.html', takes_context=True)
def show_layouts(context):
    context.update({
        'STATIC_URL': settings.STATIC_URL,
        'layouts': con_dbapi.PAGE_LAYOUT_CHOICES})
    return context


@register.inclusion_tag('incl/license.html', takes_context=True)
def show_licences(context):
    context.update({'licenses': con_dbapi.PAGE_LICENSE_CHOICES})
    return context


@register.filter
def get_page_location(page):
    if page and page.location:
        return page.location.full_address()
    return ''


@register.filter
def get_page_tag(page, tag_type):
    tag = page.get_tag(tag_type)
    return tag if tag else ''


@register.filter
def dump(d):
    return json.dumps([p.as_dict for p in d])


@register.filter
def dump_as_array(d):
    return json.dumps([d.as_dict])


@register.filter
def layout_class(layout):
    if layout == PAGE_LAYOUTS.VIDEO:
        return "layout-video"
    if layout == PAGE_LAYOUTS.TEXT:
        return "layout-text"
    return "layout-image"
