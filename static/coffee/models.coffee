App.UserProfile = DS.Model.extend
  email: DS.attr 'string'
  firstName: DS.attr 'string'
  name: DS.attr 'id'
  books: DS.hasMany 'App.Book'

App.MediaFile = DS.Model.extend
  mimetype: DS.attr 'string'
  url: DS.attr 'string'
  filename: DS.attr 'string'
  page: DS.belongsTo 'App.Page'

App.Page = DS.Model.extend
  description: DS.attr 'string'
  position: DS.attr 'number'
  book: DS.belongsTo 'App.Book'
  mediaFile: DS.belongsTo 'App.MediaFile', embedded: "always"

App.Tag = DS.Model.extend
  name: DS.attr 'string'
  slug: DS.attr 'string'

App.BookTag = App.Tag.extend
  book: DS.belongsTo 'App.Book'

App.Book = DS.Model.extend
  title: DS.attr 'string'
  createdBy: DS.belongsTo 'App.UserProfile'
  mediaUrl: DS.attr 'string'
  pages: DS.hasMany 'App.Page'
  tags: DS.hasMany 'App.BookTag', embedded : "always"
  findPages:->
    [success, data] = request_get
      url: "/books/#{@id}/pages/"
    if success
      for p in data.pages
        page = App.Page.createRecord p
        @get('pages').pushObject page
    else
      console.log data
