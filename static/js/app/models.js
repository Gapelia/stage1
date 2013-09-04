(function() {

	App.UserProfile = DS.Model.extend({
		email: DS.attr("string"),
		firstName: DS.attr("string"),
		name: DS.attr("id"),
		books: DS.hasMany("App.Book")
	});

	App.MediaFile = DS.Model.extend({
		mimetype: DS.attr("string"),
		url: DS.attr("string"),
		filename: DS.attr("string"),
		page: DS.belongsTo("App.Page")
	});

	App.Page = DS.Model.extend({
		description: DS.attr("string"),
		position: DS.attr("number"),
		book: DS.belongsTo("App.Book"),
		mediaFile: DS.belongsTo("App.MediaFile", {
			embedded: "always"
		})
	});

	App.Tag = DS.Model.extend({
		name: DS.attr("string"),
		slug: DS.attr("string")
	});

	App.BookTag = App.Tag.extend({
		book: DS.belongsTo("App.Book")
	});

	App.Book = DS.Model.extend({
		title: DS.attr("string"),
		createdBy: DS.belongsTo("App.UserProfile"),
		mediaUrl: DS.attr("string"),
		pages: DS.hasMany("App.Page"),
		tags: DS.hasMany("App.BookTag", {
			embedded: "always"
		}),
		findPages: function() {

			var data, p, page, success, _i, _len, _ref, _ref1, _results;

			_ref = request_get({
				url: "/books/" + this.id + "/pages/"
			}), success = _ref[0], data = _ref[1];

			if (success) {
				_ref1 = data.pages;
				_results = [];

				for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
					p = _ref1[_i];
					page = App.Page.createRecord(p);
					_results.push(this.get('pages').pushObject(page));
				}

				return _results;
			} else {
				return console.log(data);
			}

		}
	});

}).call(this);