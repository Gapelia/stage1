(function() {

	var SLASH, URL_BASE, URL_BASE_PUT, URL_BOOKS, URL_FULL_VIEW, URL_PAGES, alertSomethingWentWrong, pagePath, updateModel, _delPage, _savePage;

	if (typeof CURRENT_BOOK_SLUG === "undefined" || CURRENT_BOOK_SLUG === null) {
		window.CURRENT_BOOK_SLUG = "test";
	}

	SLASH = "/";

	URL_BASE = SLASH;
	URL_BOOKS = URL_BASE + "books/";
	URL_PAGES = "/pages/";
	URL_FULL_VIEW = "/full-view/";
	URL_BASE_PUT = URL_BOOKS + CURRENT_BOOK_SLUG + URL_PAGES;

	alertSomethingWentWrong = function(msg) {

		if (msg == null) {
			msg = "Something went wrong while trying to perform this action. Please try again later";
		}

		return alert(msg);

	};

	pagePath = function(page_id) {

		if (page_id == null) {
			page_id = CURRENT_PAGE_ID;
		}

		return URL_BASE_PUT + page_id + SLASH;

	};

	window.fullPagePath = function() {
		return URL_BOOKS + CURRENT_BOOK_SLUG + URL_FULL_VIEW + CURRENT_PAGE_ID + SLASH;
	};

	updateModel = function(data, page) {

		var model, tag, tag_dict, _i, _len, _ref;

		if (page == null) {
			page = CURRENT_PAGE_ID;
		}

		model = pages_dict[page];
		tag_dict = {};
		_ref = model.tags;

		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			tag = _ref[_i];
			tag_dict[tag.tag_type] = tag.tag;
		}

		model.custom_link = data.wiki;
		model.description = data.description;
		model.layout = data.layout;
		model.location.full_address = data.location;

		model.tags = [
			{
				tag: data.feeling,
				tag_type: "feeling"
			}, {
				tag: data.passion,
				tag_type: "passion"
			}
		];

		return model;

	};

	_savePage = function(that, data, triggerModal, page) {

		var res;

		if (page == null) {
			page = CURRENT_PAGE_ID;
		}

		res = request_put({
			url: pagePath(page),
			data: data
		});

		$(that).html("Save");

		if (res.success) {
			updateModel(data, page);

			if (triggerModal) {
				return $("#save-book-modal").addClass("md-show");
			}
		} else {
			return alertSomethingWentWrong();
		}

	};

	window.savePageChanges = function(that, triggerModal, data) {

		var page, _i, _len, _results;

		if (triggerModal == null) {
			triggerModal = false;
		}

		if (data == null) {
			data = null;
		}

		if (!data) {
			data = {
				layout: CURRENT_PAGE_LAYOUT,
				description: $("#text-editor").redactor("get"),
				location: $("#bc-geotag").val(),
				passion: $("#passion").val(),
				feeling: $("#feeling").val(),
				wiki: $("#wiki-link").val(),
				license: CURRENT_PAGE_LICENSE,
				title: $("#title-editor").val()
			};
		}

		if (that) {
			$(that).html("Saving...");

			if (PAGES_CHECKED.length === 0) {
				return _savePage(that, data, triggerModal);
			} else {
				_results = [];

				for (_i = 0, _len = PAGES_CHECKED.length; _i < _len; _i++) {
					page = PAGES_CHECKED[_i];
					_results.push(_savePage(that, data, triggerModal, page));
				}

				return _results;
			}
		} else {
			return _savePage(that, data, triggerModal, data.id);
		}

	};

	window.publishBook = function(that) {

		var data, res;

		data = {
			publish: true
		};

		$(that).html("Publishing...");

		res = request_put({
			url: URL_BOOKS + CURRENT_BOOK_SLUG + SLASH,
			data: data
		});

		$("#publish-book-modal").addClass("md-show");
		$(that).html("Published");

		if (!res.success) {
			return alertSomethingWentWrong();
		}

	};

	_delPage = function(page) {

		var res;

		if (page == null) {
			page = CURRENT_PAGE_ID;
		}

		res = request_delete({
			url: pagePath(page)
		});

		$("#delete-modal").addClass("md-show");

		if (!res.success) {
			return alertSomethingWentWrong();
		}

	};

	window.deletePage = function() {

		var page, _i, _len;

		if (PAGES_CHECKED.length === 0) {
			_delPage();
		} else {
			for (_i = 0, _len = PAGES_CHECKED.length; _i < _len; _i++) {
				page = PAGES_CHECKED[_i];
				_delPage(page);
			}
		}

		return location.reload();

	};

	window.deleteBook = function() {

		var res;

		res = request_delete({
			url: URL_BOOKS + CURRENT_BOOK_SLUG
		});

		$("#delete-book-modal").addClass("md-show");

		if (res.success) {
			return location.reload();
		} else {
			return alertSomethingWentWrong();
		}

	};

	window.createPage = function(data) {

		var resp;

		return resp = request_post({
			url: URL_BASE_PUT,
			data: data
		});

	};

	window.createTextPage = function() {

		var res;

		res = createPage({
			mimetype: "text/plain"
		});

		if (res.success) {
			return location.reload();
		} else {
			return alertSomethingWentWrong();
		}

	};

}).call(this);
