Array::addObject = (obj)->
  @push obj

Array::removeObject = (obj)->
  idx = @indexOf obj
  if idx isnt -1
    @splice idx, 1

window.PAGE_CHANGED = false

all_layouts = $ '[id*="preview-wrapper-"]'
all_layouts.hide()
$("#preview-wrapper-#{ LAYOUT_FRONT_COVER }").show()
all_layout_class = $ "[class*=layout-]"
all_layout_class.hide()

window.changeLayout = (layout, refresh_page=false)->
  layout = parseInt layout
  $("[for-id^=layout-#{layout}]").prop "checked", true
  if layout in [LAYOUT_FRONT_COVER, LAYOUT_VIDEO, LAYOUT_TEXT]
    all_layout_class.hide()
  else
    all_layout_class.not(".layout-video, .layout-text").show()
  window.CURRENT_PAGE_LAYOUT = layout
  all_layouts.hide()
  $("#preview-wrapper-#{ layout }").show()
  if refresh_page
    savePageChanges()
    location.reload()

$("[for-id^='layout-']").change (e)->
  idx = parseInt $(@).val()
  if idx is 0
    if confirm "Are you sure you want to set this page as cover?"
      changeLayout idx
      savePageChanges()
      location.reload()
    $("[for-id^=layout-#{CURRENT_PAGE_LAYOUT}]").prop "checked", true
  else
    changeLayout idx, IS_FULL_PAGE_VIEW

window.switchToPage = (that, target_page_id = $(that).attr "for-page")->
  return if CURRENT_PAGE_ID is parseInt target_page_id
  $("#video-player").remove()
  if window.PAGE_CHANGED
    savePageChanges $ "#save-page-btn"
    window.PAGE_CHANGED = false
  page_json = pages_dict[target_page_id]
  # Current status
  changeLayout page_json.layout
  window.CURRENT_PAGE_ID = page_json.id
  window.CURRENT_PAGE_LICENSE = page_json.license
  tag_dict = {}
  for tag in page_json.tags
    $("##{tag.tag_type}").val tag.tag
  $("#wiki-link").val page_json.custom_link
  $("#bc-geotag").val page_json.location.full_address
  description = page_json.description
  if not description?
    description = ""
  $("#text-editor").redactor "set", description
  $("#title-editor").val page_json.title
  if LAYOUT_VIDEO is parseInt page_json.layout
    vid = document.createElement("video")
    vid.id = "video-player"
    vid.src = page_json.url
    $("#video-player-container").append vid
    $(vid).osmplayer
      width: "100%",
      height: "600px"
  else
    $(".page-bg").attr "src", page_json.url


switchToPage(true, CURRENT_PAGE_ID)


window.changeLicense = (license_number) ->
  window.CURRENT_PAGE_LICENSE = license_number

window.bookChecked = (that)->
  $that = $(that)
  if $that.attr("checked") is "checked"
    PAGES_CHECKED.addObject $that.val()
  else
    PAGES_CHECKED.removeObject $that.val()

window.uploadNewPage = ->
  openFilePicker
    container: "filepicker-iframe"
    book_slug: CURRENT_BOOK_SLUG
    reload_on_finish: true
  $("#modal-1").addClass "md-close"
  $("#modal-1").removeClass "md-show"
  $("#modal-2").addClass "md-show"

window.changePageMedia = ->
  openFilePicker
    container: "modal"
    book_slug: CURRENT_BOOK_SLUG
    page_id: CURRENT_PAGE_ID
    reload_on_finish: true

published_book =  $ ".published-book"

window.showAllBooks = (flag) ->
  if flag
    published_book.show()
  else
    published_book.hide()

window.pages_dict = {}

window.openFullView = ->
  savePageChanges() if PAGE_CHANGED
  window.location = fullPagePath()

window.changePosition = (elem)->
  newPosition = elem.item.parent().children('li').index elem.item
  if newPosition is 0
    alert "Sorry. you cannot set cover page by dragging the position. You try setting cover-page in layout instead."
    return location.reload()
  for_page = parseInt elem.item.find("img").attr "for-page"
  if for_page is FIRST_PAGE_ID
    alert "Sorry. you cannot change the position of the cover-page."
    return location.reload()
  data = pages_dict[for_page]
  data.position = newPosition
  savePageChanges(null, false, data)
  location.reload()

page_title_elems = $ ".page-title-elem"
page_geotag_elems = $ ".page-geotag-elem"
$(document).ready ->
  for page in pages_json
    pages_dict[page.id] = page
  $("input").click ->
    window.PAGE_CHANGED = true
  $("#title-editor").on "keyup", ->
    page_title_elems.text(@value)
  $("#bc-geotag").on "keyup", ->
    page_geotag_elems.text(@value)
  changeLayout CURRENT_PAGE_LAYOUT
