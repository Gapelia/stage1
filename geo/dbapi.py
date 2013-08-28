from geo.models import Location

def add_location(*args, **kwargs):
    return Location.objects.get_or_create(*args, **kwargs)
