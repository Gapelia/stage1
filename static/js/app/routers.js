(function() {

	App.Router.map(function() {

		this.resource("books");

		return this.resource("book", {
			path: "/books/:book_id"
		}, function() {
			this.route("edit");
			return this.route("pages");
		});

	});

	App.IndexRoute = Ember.Route.extend({
		redirect: function() {
			return this.transitionTo("books");
		}
	});

	App.BooksRoute = Em.Route.extend({
		model: function() {
			return App.Book.find();
		}
	});

	App.BookRoute = Em.Route.extend({
		model: function(object) {
			return App.Book.find(object.book_id);
		}
	});

	App.BookEditRoute = Em.Route.extend({
		activate: function() {

			var _base;
			$(document).attr("title", "Editing");
			return typeof (_base = this.model()).findPages === "function" ? _base.findPages() : void 0;

		},
		model: function(params, transition) {

			if (!this.params) {
				if (transition.params != null) {
					this.params = transition.params;
				} else {
					this.params = params;
				}
			}

			return App.Book.find(this.params.book_id);

		}
	});

}).call(this);
