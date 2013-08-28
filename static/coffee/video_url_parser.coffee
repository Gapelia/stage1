String::format = ->
  args = arguments
  @replace /{(\d+)}/g, (match, number) ->
    (if typeof args[number] isnt "undefined" then args[number] else match)


YOUTUBE_THUMBNAIL_URL = "//img.youtube.com/vi/{0}/1.jpg"
VIMEO_JSON_URL = "http://vimeo.com/api/v2/video/{0}.json"

# Reference URLS
# Sample YouTube https://www.youtube.com/watch?v=nlO3ZamneyM
# Sample VimeoVideo http://vimeo.com/72167302

#Video link type enum
window.VIDEO_LINK_TYPE =
  UNKNOWN: -1
  YOUTUBE: 0
  VIMEO: 1

# Regular Expressions

RE_LINK_PREFIX = /^((https{0,1}):\/\/){0,1}(www\.){0,1}/gi
RE_VALID_LINK = /^((https{0,1}):\/\/){0,1}(www\.){0,1}(youtube|vimeo)\.com\/.*/gi

# Domains

DOMAIN_YOUTUBE = "youtube.com"
DOMAIN_VIMEO = "vimeo.com"


window.videoIsValidURL = (url) ->
  # We this will not match all URLs.
  # We are only worred about validating supported URLs now.
  url.match RE_VALID_LINK

window.videoIdentifyLink = (url)->
  if videoIsValidURL url
    return VIDEO_LINK_TYPE.YOUTUBE if url.match DOMAIN_YOUTUBE
    return VIDEO_LINK_TYPE.VIMEO if url.match DOMAIN_YOUTUBE
    return VIDEO_LINK_TYPE.UNKNOWN

fetchYouTubeURL = (url)->
  intrest_text = url.split("v=")[1]
  intrest_text = intrest_text.split(/.{0,1}=/)[0]
  YOUTUBE_THUMBNAIL_URL.format intrest_text

fetchVimeoURL = (url)->
  intrest_text = url.split(DOMAIN_VIMEO + "/")[1]
  intrest_text = intrest_text.split("/")[0]
  thumbnail = null
  resp = request_get
    url: "/services/vimeo/#{intrest_text}/"
  thumbnail = resp.data.thumbnail
  return thumbnail

window.videoFetchThumbnailURL = (url) ->
  switch videoIdentifyLink url
    when VIDEO_LINK_TYPE.YOUTUBE then return fetchYouTubeURL url
    when VIDEO_LINK_TYPE.VIMEO then return fetchVimeoURL url
    else return "/static/images/grey-pixel.png"
