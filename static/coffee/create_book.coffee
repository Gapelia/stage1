# The ID of the book that is newly generated.

BOOK_ID = 0

lastModalName = ""

showNextModal = (that)->
  $("##{lastModalName}").removeClass "md-show"
  lastModalName = $(that).attr "data-modal"
  $("##{lastModalName}").addClass "md-show"

window.NextModal = (that, action="")->
  switch action
    when "create"
      title = $("#book-title").val()
      dimension = $("#book-dimension").val()
      description = $("#book-description").val()
      geotag = $("#book-geotag").val()
      passion = $("#book-passion").val()
      feeling = $("#book-feeling").val()
      if title.length == 0
        return alert "Title is required"

      if dimension.length == 0
        return alert "Dimension is required"
      $.ajax
        type: "POST"
        url: "/books/"
        data:
          title: title
          dimension: dimension
          description: description
          geotag: geotag
          passion: passion
          feeling: feeling

        success: (respJSON)->
          BOOK_ID = respJSON.book.id
          App.Book.find BOOK_ID
          filepicker.pickMultiple
            mimetypes: ["image/*", "video/*"]
            container: "filepicker-iframe"
          , (InkBlobs) ->
            for InkBlob in InkBlobs
              $.ajax
                type: "POST"
                url:"/books/#{BOOK_ID}/pages/"
                data:
                  url: InkBlob.url
                  filename: InkBlob.filename
                  mimetype: InkBlob.mimetype
                success: ->
                  debugger
                error: ->
                  debugger
                  alert "Sorry something went wrong when uploading files. Please try again later"
          , (FPError) ->
            console.log FPError.toString()
          showNextModal(that)
        error: (response)->
          if response.responseJSON?.msg
            alert response.responseJSON.msg
          else
            alert "Some unknown error occured!"
        dataType: "json"

    when "upload"
      debugger

    when "invite"
      debugger

    when ""
      console.log "Opening Create new book."
      showNextModal(that)

    else
      alert "Unknown option #{action} in NextModal()"
      return

# Miscs

$(document).ready ->
  $(".md-overlay").click ->
    $("##{lastModalName}").removeClass "md-show"

window.editNewBook =->
  window.location.assign "/#/books/#{BOOK_ID}/edit"
  window.location.reload()
