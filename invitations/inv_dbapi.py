from models import Invitee

def get_invitee(*args, **kwargs):
    try:
        return Invitee.objects.get(*args, **kwargs)
    except Invitee.DoesNotExist:
        return

def update_invitee(obj, status):
    obj.status = status
    obj.save()
    return obj
