window.CURRENT_BOOK_SLUG = "test" if not CURRENT_BOOK_SLUG?

SLASH = "/"
URL_BASE = SLASH
URL_BOOKS = URL_BASE + "books/"
URL_PAGES = "/pages/"
URL_FULL_VIEW = "/full-view/"
URL_BASE_PUT = URL_BOOKS + CURRENT_BOOK_SLUG + URL_PAGES

alertSomethingWentWrong = (msg="Something went wrong while trying to perform this action. Please try again later")->
  alert msg

pagePath = (page_id=CURRENT_PAGE_ID)->
  URL_BASE_PUT + page_id + SLASH

window.fullPagePath = ->
  URL_BOOKS + CURRENT_BOOK_SLUG + URL_FULL_VIEW + CURRENT_PAGE_ID + SLASH

updateModel=(data, page=CURRENT_PAGE_ID)->
  model = pages_dict[page]
  tag_dict = {}
  for tag in model.tags
    tag_dict[tag.tag_type] = tag.tag
  model.custom_link = data.wiki
  model.description = data.description
  model.layout = data.layout
  model.location.full_address = data.location
  model.tags = [
    {
      tag: data.feeling,
      tag_type: "feeling"},
    {
      tag: data.passion,
      tag_type: "passion"}]
  model

_savePage = (that, data, triggerModal, page=CURRENT_PAGE_ID)->
  res = request_put
    url: pagePath(page)
    data: data
  $(that).html "Save"
  if res.success
    updateModel data, page
    $("#save-book-modal").addClass "md-show" if triggerModal
  else
    alertSomethingWentWrong()


window.savePageChanges = (that, triggerModal=false, data=null)->
  if not data
    data =
      layout: CURRENT_PAGE_LAYOUT
      description: $("#text-editor").redactor("get")
      location: $("#bc-geotag").val()
      passion: $("#passion").val()
      feeling: $("#feeling").val()
      wiki: $("#wiki-link").val()
      license: CURRENT_PAGE_LICENSE
      title: $("#title-editor").val()
  if that
    $(that).html "Saving..."
    if PAGES_CHECKED.length is 0
      _savePage(that, data, triggerModal)
    else
      _savePage(that, data, triggerModal, page) for page in PAGES_CHECKED
  else
    _savePage(that, data, triggerModal, data.id)

window.publishBook = (that)->
  data =
    publish: true
  $(that).html "Publishing..."
  res = request_put
    url: URL_BOOKS + CURRENT_BOOK_SLUG + SLASH
    data: data
  $("#publish-book-modal").addClass "md-show"
  $(that).html "Published"
  alertSomethingWentWrong() if not res.success


_delPage = (page=CURRENT_PAGE_ID)->
  res = request_delete
    url: pagePath(page)
  $("#delete-modal").addClass "md-show"
  if not res.success
    alertSomethingWentWrong()

window.deletePage = ->
  if PAGES_CHECKED.length is 0
    _delPage()
  else
    _delPage(page) for page in PAGES_CHECKED
  location.reload()

window.deleteBook = ->
  res = request_delete
    url: URL_BOOKS + CURRENT_BOOK_SLUG
  $("#delete-book-modal").addClass "md-show"
  if res.success
    location.reload()
  else
    alertSomethingWentWrong()

window.createPage = (data) ->
  resp = request_post
    url: URL_BASE_PUT
    data: data

window.createTextPage = ->
  res = createPage
    mimetype: "text/plain"
  if res.success
    location.reload()
  else
    alertSomethingWentWrong()
