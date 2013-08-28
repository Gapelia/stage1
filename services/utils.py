import pygeoip
from gapelia.settings import GEO_DATA_FILE

geoIP = pygeoip.GeoIP(GEO_DATA_FILE, pygeoip.STANDARD)


def region(request):
    city = ""
    country_name = ""
    cur_loc = ""
    place = {}
    ip_addr = request.META.get('HTTP_X_REAL_IP')
    if ip_addr:
        place = geoIP.record_by_addr(ip_addr)
    if place:
        city = place.get("city")
        country_name = place.get("country_name")
        if city and country_name:
            cur_loc = city + ", " + country_name
        elif country_name:
            cur_loc = country_name
        else:
            cur_loc = city
    return cur_loc, city
