from django.contrib import admin

from models import Invitee
from forms import InviteeForm

class InviteeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'status', 'user_type', 'code',)
    list_filter = ('status', 'user_type',)
    form = InviteeForm

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        obj.updated_by = request.user
        obj.save()

admin.site.register(Invitee, InviteeAdmin)
