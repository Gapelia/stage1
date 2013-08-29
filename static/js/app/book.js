(function() {

	var movePastCreateModal;

	$(".md-overlay").click(function() {
		return $("[id*='modal']").removeClass("md-show");
	});

	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	filepicker.setKey("AI64IEXbTBOTCMcUXllQHz");

	window.openFilePicker = function(params) {

		var request_method, url;
		window.CURRENT_BOOK_SLUG = params.book_slug;
		url = "/books/" + params.book_slug + "/pages/";
		request_method = request_post;

		if (params.page_id != null) {
			url += "" + params.page_id + "/";
			request_method = request_put;
		}

		return filepicker.pickMultiple({
			mimetypes: ["image/*"],
			container: params.container
		}, function(InkBlobs) {

			var InkBlob, resp, _i, _len;

			for (_i = 0, _len = InkBlobs.length; _i < _len; _i++) {
				InkBlob = InkBlobs[_i];

				resp = request_method({
					url: url,
					data: {
						url: InkBlob.url,
						filename: InkBlob.filename,
						mimetype: InkBlob.mimetype
					}
				});

				if (!resp.success) {
					alert("'" + InkBlob.filename + "' couldn't be uploaded");
				}
			}

			if (params.reload_on_finish) {
				return location.reload();
			}

		}, function(FPError) {
			return alert(FPError.toString());
		});

	};

	$("#create-book-modal").click(function(e) {

		var description, dimension, feeling, geo_tag, passion, resp, title;
		title = $.trim($("#book-title").val());
		description = $.trim($("#modal-description").val());
		dimension = $.trim($("#modal-dimension").val());
		passion = $.trim($("#modal-passion").val());
		feeling = $.trim($("#modal-feeling").val());
		geo_tag = $.trim($("#modal-geotag-01").val());

		if (title === "") {
			alert("Title is a required field.");
			return false;
		} else if (dimension === "") {
			alert("Dimension is a required field.");
			return false;
		}

		resp = request_post({
			url: "/books/",
			data: {
				title: title,
				description: description,
				dimension: dimension,
				passion: passion,
				feeling: feeling,
				geo_tag: geo_tag
			}
		});

		if (!resp.success) {
			return alert(resp.data.message);
		}

		$("#go-to-editor").attr("href", "/books/" + resp.data.book_slug);

		openFilePicker({
			container: "filepicker-iframe",
			book_slug: resp.data.book_slug
		});

		$("#modal-1").addClass("md-close");
		$("#modal-1").removeClass("md-show");

		return $("#modal-2").addClass("md-show");

	});

	movePastCreateModal = function() {

		$("#modal-2").addClass("md-close");
		$("#modal-2").removeClass("md-show");

		return $("#modal-3").addClass("md-show");

	};

	$("#create-page").click(function(e) {

		var resp, video_url;
		video_url = $.trim($("#video-url").val());

		if (video_url.length === 0) {
			return movePastCreateModal();
		}

		if (!videoIsValidURL(video_url)) {
			return alert("Dude, that link is not supported");
		}

		resp = createPage({
			url: video_url,
			filename: "Video File",
			mimetype: "video/embed"
		});

		if (resp.success) {
			return movePastCreateModal();
		}

		return alert("Link was not saved.");

	});

	window.showNiftyModals = function(that) {

		var target;
		target = $(that).attr("data-modal");

		return $("#" + target).addClass("md-show");

	};

	window.confirmDeleteBook = function(book_slug) {

		window.CURRENT_BOOK_SLUG = book_slug;
		return $("#delete-book-modal").addClass("md-show");

	};

}).call(this);
