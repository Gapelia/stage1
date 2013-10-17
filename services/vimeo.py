#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2013 Gapelia
#
# Distributed under terms of the MIT license.

"""

"""

import requests
VIMEO_JSON_URL = "http://vimeo.com/api/v2/video/{0}.json"


class Vimeo():

    def __init__(self, video_id):
        self.video_id = video_id

    def thumbnail(self):
        resp = requests.get(VIMEO_JSON_URL.format(self.video_id))
        resp_json = resp.json()
        return resp_json[0]['thumbnail_large']
