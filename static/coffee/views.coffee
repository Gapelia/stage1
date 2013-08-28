App.BookEditView = Em.View.extend
  tagName: 'ember'
  didInsertElement: ->
    $("#tabs-container").cbpContentSlider()
    $("#text-preview-wrapper, #phototext-preview-wrapper, #integrated-preview-wrapper").hide()
    $("#photo-preview-wrapper").show()
    editModeElems = $("#text-preview-wrapper, #phototext-preview-wrapper, #integrated-preview-wrapper, #photo-preview-wrapper")
    editModeElems.change(->
      editModeElems.toggle()
      console.log 1
    )

