from django import forms

from models import Invitee

class InviteeForm(forms.ModelForm):
    class Meta:
        model = Invitee
        fields = ('name', 'email', 'user_type',)

