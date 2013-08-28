import requests
from urllib import urlencode
# import json
from gapelia.settings import GOOGLE_API_KEY

# Required params: key, sensor, input
AUTOCOMPLETE = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
# Required params: key, sensor, query
TEXTSEARCH = "https://maps.googleapis.com/maps/api/place/textsearch/json"
# Required params: key, sensor, reference
DETAILS = "https://maps.googleapis.com/maps/api/place/details/json"


def sanatize(name):
    name = name.replace(", ", " ")
    name = name.replace(" ", "-")
    return name


def _sanatize_details(d, region):
    city = ""
    country = ""
    latitude = 0.0
    longitude = 0.0
    loc = None
    if d and d.get('result'):
        d = d.get('result')
        for component in d.get('address_components'):
            types = component.get('types')
            name = component.get('long_name')
            if 'locality' in types:
                city = name
            elif 'administrative_area_level_1' in types:
                region = name
            elif 'country' in types:
                country = name
        d = d.get('geometry')
        if d:
            loc = d.get('location')
        if loc:
            latitude = loc.get('lat')
            longitude = loc.get('lng')
    return {
        "city": city,
        "region": region,
        "country": country,
        "latitude": latitude,
        "longitude": longitude}


def _get_json(base_url, params):
    for key in params:
        params[key] = params[key].encode('ascii', 'ignore')
    url = base_url + '?' + urlencode(params)
    resp = requests.get(url)
    return resp.json()


class Place:

    def __init__(self):
        self.params = {
            "key": GOOGLE_API_KEY,
            "sensor": "false",
        }

    def auto_complete(self, input):
        self.params['input'] = input
        d = _get_json(AUTOCOMPLETE, self.params)
        return [p['description'] for p in d['predictions']]

    def _search(self, query):
        self.params['query'] = query
        d = _get_json(TEXTSEARCH, self.params)
        if d.get('results'):
            return d['results'][0].get('reference')
        return None

    def get_details(self, query):
        ref = self._search(query)
        if not ref:
            return _sanatize_details({}, query)
        self.params['reference'] = ref
        d = _get_json(DETAILS, self.params)
        return _sanatize_details(d, query)
