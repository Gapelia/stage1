import pygeoip
from django.conf import settings

geoIP = pygeoip.GeoIP(settings.GEO_DATA_FILE, pygeoip.STANDARD)


def region(request):
    ip_addr = request.META.get('HTTP_X_REAL_IP', "127.0.0.1")
    place = geoIP.record_by_addr(ip_addr)
    # FIXME: This should be removed!
    cur_loc = "Boston, Massachusetts, USA"
    city = "Boston"
    if place:
        city = place.get("city")
        country_name = place.get("country_name")
        cur_loc = city + ", " + country_name

    return {
        'CURRENT_LOCATION': cur_loc,
        'CURRENT_CITY': city,
    }
