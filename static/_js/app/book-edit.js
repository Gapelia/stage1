(function() {

	var all_layout_class, all_layouts, page_geotag_elems, page_title_elems, published_book;

	Array.prototype.addObject = function(obj) {
		return this.push(obj);
	};

	Array.prototype.removeObject = function(obj) {

		var idx;
		idx = this.indexOf(obj);

		if (idx !== -1) {
			return this.splice(idx, 1);
		}

	};

	window.PAGE_CHANGED = false;

	all_layouts = $('[id*="preview-wrapper-"]');
	all_layouts.hide();

	$("#preview-wrapper-" + LAYOUT_FRONT_COVER).show();
	all_layout_class = $("[class*=layout-]");
	all_layout_class.hide();

	window.changeLayout = function(layout, refresh_page) {

		if (refresh_page == null) {
			refresh_page = false;
		}

		layout = parseInt(layout);

		$("[for-id^=layout-" + layout + "]").prop("checked", true);

		if (layout === LAYOUT_FRONT_COVER || layout === LAYOUT_VIDEO || layout === LAYOUT_TEXT) {
			all_layout_class.hide();
		} else {
			all_layout_class.not(".layout-video, .layout-text").show();
		}

		window.CURRENT_PAGE_LAYOUT = layout;
		all_layouts.hide();

		$("#preview-wrapper-" + layout).show();

		if (refresh_page) {
			savePageChanges();
			return location.reload();
		}

	};

	$("[for-id^='layout-']").change(function(e) {

		var idx;
		idx = parseInt($(this).val());

		if (idx === 0) {
			if (confirm("Are you sure you want to set this page as cover?")) {
				changeLayout(idx);
				savePageChanges();
				location.reload();
			}

			return $("[for-id^=layout-" + CURRENT_PAGE_LAYOUT + "]").prop("checked", true);
		} else {
			return changeLayout(idx, IS_FULL_PAGE_VIEW);
		}

	});

	window.switchToPage = function(that, target_page_id) {

		var description, page_json, tag, tag_dict, vid, _i, _len, _ref;

		if (target_page_id == null) {
			target_page_id = $(that).attr("for-page");
		}

		if (CURRENT_PAGE_ID === parseInt(target_page_id)) {
			return;
		}

		$("#video-player").remove();

		if (window.PAGE_CHANGED) {
			savePageChanges($("#save-page-btn"));
			window.PAGE_CHANGED = false;
		}

		page_json = pages_dict[target_page_id];
		changeLayout(page_json.layout);

		window.CURRENT_PAGE_ID = page_json.id;
		window.CURRENT_PAGE_LICENSE = page_json.license;

		tag_dict = {};
		_ref = page_json.tags;

		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			tag = _ref[_i];
			$("#" + tag.tag_type).val(tag.tag);
		}

		$("#wiki-link").val(page_json.custom_link);
		$("#bc-geotag").val(page_json.location.full_address);

		description = page_json.description;

		if (description == null) {
			description = "";
		}

		$("#text-editor").redactor("set", description);
		$("#title-editor").val(page_json.title);

		if (LAYOUT_VIDEO === parseInt(page_json.layout)) {
			vid = document.createElement("video");
			vid.id = "video-player";
			vid.src = page_json.url;

			$("#video-player-container").append(vid);

			return $(vid).osmplayer({
				width: "100%",
				height: "600px"
			});
		} else {
			return $(".page-bg").attr("src", page_json.url);
		}

	};

	switchToPage(true, CURRENT_PAGE_ID);

	window.changeLicense = function(license_number) {
		return window.CURRENT_PAGE_LICENSE = license_number;
	};

	window.bookChecked = function(that) {

		var $that;
		$that = $(that);

		if ($that.attr("checked") === "checked") {
			return PAGES_CHECKED.addObject($that.val());
		} else {
			return PAGES_CHECKED.removeObject($that.val());
		}

	};

	window.uploadNewPage = function() {

		openFilePicker({
			container: "filepicker-iframe",
			book_slug: CURRENT_BOOK_SLUG,
			reload_on_finish: true
		});

		$("#modal-1").addClass("md-close");
		$("#modal-1").removeClass("md-show");

		return $("#modal-2").addClass("md-show");

	};

	window.changePageMedia = function() {

		return openFilePicker({
			container: "modal",
			book_slug: CURRENT_BOOK_SLUG,
			page_id: CURRENT_PAGE_ID,
			reload_on_finish: true
		});

	};

	published_book = $(".published-book");

	window.showAllBooks = function(flag) {

		if (flag) {
			return published_book.show();
		} else {
			return published_book.hide();
		}

	};

	window.pages_dict = {};

	window.openFullView = function() {

		if (PAGE_CHANGED) {
			savePageChanges();
		}

		return window.location = fullPagePath();

	};

	window.changePosition = function(elem) {

		var data, for_page, newPosition;
		newPosition = elem.item.parent().children('li').index(elem.item);

		if (newPosition === 0) {
			alert("Sorry. you cannot set cover page by dragging the position. You try setting cover-page in layout instead.");
			return location.reload();
		}

		for_page = parseInt(elem.item.find("img").attr("for-page"));

		if (for_page === FIRST_PAGE_ID) {
			alert("Sorry. you cannot change the position of the cover-page.");
			return location.reload();
		}

		data = pages_dict[for_page];
		data.position = newPosition;
		savePageChanges(null, false, data);

		return location.reload();

	};

	page_title_elems = $(".page-title-elem");
	page_geotag_elems = $(".page-geotag-elem");

	$(document).ready(function() {

		var page, _i, _len;

		for (_i = 0, _len = pages_json.length; _i < _len; _i++) {
			page = pages_json[_i];
			pages_dict[page.id] = page;
		}

		$("input").click(function() {
			return window.PAGE_CHANGED = true;
		});

		$("#title-editor").on("keyup", function() {
			return page_title_elems.text(this.value);
		});

		$("#bc-geotag").on("keyup", function() {
			return page_geotag_elems.text(this.value);
		});

		return changeLayout(CURRENT_PAGE_LAYOUT);

	});

}).call(this);
