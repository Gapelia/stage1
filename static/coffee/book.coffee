$(".md-overlay").click ->
  $("[id*='modal']").removeClass "md-show"

String::capitalize = ->
  @charAt(0).toUpperCase() + @slice 1

filepicker.setKey "AI64IEXbTBOTCMcUXllQHz"

window.openFilePicker=(params)->
  window.CURRENT_BOOK_SLUG = params.book_slug
  url = "/books/#{params.book_slug}/pages/"
  request_method = request_post
  if params.page_id?
    url += "#{params.page_id}/"
    request_method = request_put
  filepicker.pickMultiple
    mimetypes:[
      "image/*"
      # Disabling Video for now.
      # "video/*"
      ]
    container: params.container
  , (InkBlobs) ->
    for InkBlob in InkBlobs
      resp = request_method
        url: url,
        data:
          url: InkBlob.url
          filename: InkBlob.filename
          mimetype: InkBlob.mimetype
      if not resp.success
        alert "'#{InkBlob.filename}' couldn't be uploaded"
    if params.reload_on_finish
      location.reload()
  , (FPError) ->
    alert FPError.toString()

$("#create-book-modal").click (e) ->
  title = $.trim $("#book-title").val()
  description = $.trim $("#modal-description").val()
  dimension = $.trim $("#modal-dimension").val()
  passion = $.trim $("#modal-passion").val()
  feeling = $.trim $("#modal-feeling").val()
  geo_tag = $.trim $("#modal-geotag-01").val()
  if title is ""
    alert "Title is a required field."
    return false
  else if dimension is ""
    alert "Dimension is a required field."
    return false
  resp = request_post
    url: "/books/"
    data:
      title: title
      description: description
      dimension: dimension
      passion: passion
      feeling: feeling
      geo_tag: geo_tag
  if not resp.success
    return alert resp.data.message
  $("#go-to-editor").attr "href", "/books/#{resp.data.book_slug}"
  openFilePicker
    container: "filepicker-iframe"
    book_slug: resp.data.book_slug
  $("#modal-1").addClass "md-close"
  $("#modal-1").removeClass "md-show"
  $("#modal-2").addClass "md-show"

movePastCreateModal =->
  $("#modal-2").addClass "md-close"
  $("#modal-2").removeClass "md-show"
  $("#modal-3").addClass "md-show"


$("#create-page").click (e) ->
  video_url = $.trim $("#video-url").val()
  if video_url.length is 0
    return movePastCreateModal()
  if not videoIsValidURL video_url
    return alert "Dude, that link is not supported"
  resp = createPage
    url: video_url
    filename: "Video File"
    mimetype: "video/embed"
  if resp.success
    return movePastCreateModal()
  return alert "Link was not saved."

window.showNiftyModals = (that) ->
  target = $(that).attr "data-modal"
  $("#" + target).addClass "md-show"

window.confirmDeleteBook = (book_slug)->
  window.CURRENT_BOOK_SLUG = book_slug
  $('#delete-book-modal').addClass 'md-show'
