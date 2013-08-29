(function() {

	var BOOK_ID, lastModalName, showNextModal;
	BOOK_ID = 0;
	lastModalName = "";

	showNextModal = function(that) {

		$("#" + lastModalName).removeClass("md-show");
		lastModalName = $(that).attr("data-modal");

		return $("#" + lastModalName).addClass("md-show");

	};

	window.NextModal = function(that, action) {

		var description, dimension, feeling, geotag, passion, title;

		if (action == null) {
			action = "";
		}

		switch (action) {
			case "create":
			title = $("#book-title").val();
			dimension = $("#book-dimension").val();
			description = $("#book-description").val();
			geotag = $("#book-geotag").val();
			passion = $("#book-passion").val();
			feeling = $("#book-feeling").val();

			if (title.length === 0) {
				return alert("Title is required");
			}

			if (dimension.length === 0) {
				return alert("Dimension is required");
			}

			return $.ajax({
				type: "POST",
				url: "/books/",
				data: {
					title: title,
					dimension: dimension,
					description: description,
					geotag: geotag,
					passion: passion,
					feeling: feeling
				},
				success: function(respJSON) {
					BOOK_ID = respJSON.book.id;
					App.Book.find(BOOK_ID);
					filepicker.pickMultiple({
						mimetypes: ["image/*", "video/*"],
						container: "filepicker-iframe"
					}, function(InkBlobs) {

						var InkBlob, _i, _len, _results;
						_results = [];

						for (_i = 0, _len = InkBlobs.length; _i < _len; _i++) {
							InkBlob = InkBlobs[_i];

							_results.push($.ajax({
								type: "POST",
								url: "/books/" + BOOK_ID + "/pages/",
								data: {
									url: InkBlob.url,
									filename: InkBlob.filename,
									mimetype: InkBlob.mimetype
								},
								success: function() {
									debugger;
								},
								error: function() {
									debugger;
									return alert("Sorry something went wrong when uploading files. Please try again later");
								}
							}));
						}

						return _results;

					}, function(FPError) {
						return console.log(FPError.toString());
					});

					return showNextModal(that);
				},
				error: function(response) {

					var _ref;

					if ((_ref = response.responseJSON) != null ? _ref.msg : void 0) {
						return alert(response.responseJSON.msg);
					} else {
						return alert("Some unknown error occured!");
					}

				},
				dataType: "json"
			});

			case "upload": debugger;
			case "invite": debugger;
			case "": console.log("Opening Create new book."); return showNextModal(that);
			default: alert("Unknown option " + action + " in NextModal()");
		}

	};

	$(document).ready(function() {

		return $(".md-overlay").click(function() {
			return $("#" + lastModalName).removeClass("md-show");
		});

	});

	window.editNewBook = function() {

		window.location.assign("/#/books/" + BOOK_ID + "/edit");
		return window.location.reload();

	};

}).call(this);
