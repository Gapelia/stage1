from django.contrib import admin
from tagging.models import TagType, Tag, TaggedItem

admin.site.register(TagType)
admin.site.register(Tag)
admin.site.register(TaggedItem)
