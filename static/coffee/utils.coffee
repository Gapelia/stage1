getCookie = (name) ->
  if document.cookie and document.cookie isnt ""
    cookies = document.cookie.split ";"
    i = 0
    while i < cookies.length
      cookie = jQuery.trim cookies[i]
      if cookie.substring(0, name.length + 1) is (name + "=")
        cookieValue = decodeURIComponent cookie.substring name.length + 1
        break
      i++
  cookieValue

$.ajaxSetup
  cache: false
  headers:
    "X-CSRFToken": getCookie "csrftoken"

PARAMS_DEFAULTS =
  method: 'GET'
  async: false
  data: {}
  dataType:'json'
  cache: 'false'

request = (params={})->
  for key in Object.keys PARAMS_DEFAULTS
    # If the expected key is not in params, then set it to the PARAMS_DEFAULTS
    params[key] = PARAMS_DEFAULTS[key] if not params[key]?

  jsonData = null
  success = false
  $.ajax
    type: params['method']
    dataType: params['dataType']
    url: params['url']
    data: params['data']
    async: params['async']
    success: (data, status, xhr)->
      success = true
      jsonData = data
    fail: (data)->
      success = false
      jsonData = data
    complete: (data, status)->
      jsonData = data if success is false and jsonData is null

  success:success, data:jsonData

window.request_get = (params={}) ->
  params['method'] = 'GET'
  request params

window.request_post = (params={}) ->
  params['method'] = 'POST'
  request params

window.request_put = (params={}) ->
  params['method'] = 'PUT'
  params['headers'] =
    'Content-Type': 'x-www-form-urlencoded'
  request params

window.request_delete = (params={}) ->
  params['method'] = 'DELETE'
  request params
