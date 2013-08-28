import re
import uuid
import json
import datetime

from django.http import HttpResponse

# Regexs to clean text
NON_ALPHA_RE = re.compile("[^a-z ]+")
SPACES_RE = re.compile(" +")
EDGE_SPACE = re.compile("^[ ]+|[ ]+$")


def generate_random_token(offset=22):
    return uuid.uuid5(
        uuid.uuid4(), datetime.datetime.now().isoformat()).hex[offset:]


def get_first_last_name(name):
    name = name.split(' ')
    if len(name) == 1:
        return name[0], ''
    return name[0], ' '.join(name[1:])


def _response(d, status):
    return HttpResponse(
        json.dumps(d), status=status, content_type="application/json")


def succeeded(d, status=200):
    return _response(d, status)


def failed(d, status=404):
    return _response(d, status)


def sanitize_text(text):
    if text:
        text = text.lower()
        text = NON_ALPHA_RE.sub(" ", text)
        text = SPACES_RE.sub(" ", text)
        text = EDGE_SPACE.sub("", text)
    return text
