App.Router.map ->
  @resource "books"
  @resource "book", path: "/books/:book_id", ->
    @route "edit"
    @route "pages"

App.IndexRoute = Ember.Route.extend
  redirect: ->
    @transitionTo 'books'

App.BooksRoute = Em.Route.extend
  model: ->
    App.Book.find()

App.BookRoute = Em.Route.extend
  model: (object)->
    App.Book.find object.book_id

App.BookEditRoute = Em.Route.extend
  activate: ->
    $(document).attr "title", "Editing"
    @model().findPages?()

  model: (params, transition)->
    if not @params
      if transition.params?
        @params = transition.params
      else
        @params = params
    App.Book.find @params.book_id

