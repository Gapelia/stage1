
	// Book Creation
	// @Gapelia
	// ========================================================
	// Left Menus | Layout and page interaction | Right Menus | Content Creation
	// Live Preview
	// Globals

	var $vW = $(window).width(), $vH = $(window).height();

	// Set menu height, necessary for scrollbar plugin
	$("#pages-scroller").css("height", $vH + "px");
	$("#layout-scroller").css("height", $vH + "px");

	// Left Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#pages-toggle").on("click", function (e) {

		$("#back").stop(true).css("margin", "0 0 0 200px");
		$("#pages-scroller").stop(true).css("left", "0");

		$("#main-content").stop(true).css({
			"left": "200px",
			"position": "fixed"
		});

		e.preventDefault();

	});

	$("#pages-scroller").on("mouseenter", function () {}).on("mouseleave", function () {

		$("#back").stop(true).css("margin", "0").stop(true).delay(5000);
		$("#pages-scroller").css("left", "-200px").stop(true).delay(5000);

		$("#main-content").css({
			"left": "0",
			"position": "fixed"
		}).stop(true).delay(5000);

	});

	$(document).on("click", "#pages-scroller ul li", function (ev) {

		$("#pages-scroller ul li").css("border", "3px solid transparent");

		var e = $(this).closest("li");
		e = e[0];

		if (e.id == "add-page") { return; }

		e.style.border = "3px solid #59b3a6";
		currentPage = $(this).closest("li").index();

		console.log("currentPage on click: " + currentPage);
		console.log("li index: " + $(this).closest("li").index());
		console.log(pages.page);
		templateId = pages.page[currentPage].templateId;

		if (templateId == undefined || templateId == null) {
			templateId = 0;
		}

		title = pages.page[currentPage].title;
		text = pages.page[currentPage].text;
		imageURL = pages.page[currentPage].image;
		videoURL = pages.page[currentPage].video;
		pageNumber = pages.page[currentPage].pageNumber;
		attribution = pages.page[currentPage].attribution;

		switch (templateId) {
			case 0:
				fluidLayout();
				break;

			case 1:
				photoLayout();
				break;

			case 2:
				overlayLayout();
				break;

			case 3:
				photoTextLayout();
				break;

			case 4:
				verticalLayout();
				break;

			case 5:
				videoLayout();
				break;

			case 6:
				baseLayout();
		}

		ev.preventDefault();

	});

	$(document).on("click", "#pages-scroller ul li .edit-page", function (e) {

		$("#layout-scroller").stop(true).css("left", "0");
		$("#back").stop(true).css("margin", "0 0 0 200px");

		setTimeout(function () {
			$("#pages-scroller").stop(true).css("left", "-200px");
		}, 200);

		$("#layout-scroller").on("mouseenter", function () {

			$("#back").stop(true).css("margin", "0 0 0 200px");
			$(this).stop(true).css("left", "0").clearQueue();
			$("#pages-scroller").css("left", "-200px");

			$("#main-content").stop(true).css({
				"left": "200px",
				"position": "fixed"
			});

		}).on("mouseleave", function () {

			setTimeout(function () {
				$("#back").css("margin", "0");
				$("#layout-scroller").css("left", "-200px");

				$("#main-content").css({
					"left": "0",
					"position": "fixed"
				});
			}, 100);

		});

		e.preventDefault();

	});

	$("#back-to-pages").on("click", function (e) {

		$("#pages-scroller").stop(true).css("left", "0");
		$("#back").stop(true).css("margin", "0 0 0 200px");
		$("#layout-scroller").stop(true).css("left", "-200px");

		$("#main-content").stop(true).css({
			"left": "200px",
			"position": "fixed"
		}).stop(true).delay(5000);

		$("#pages-scroller").on("mousemove", function () {

			$("#back").stop(true).css("margin", "0 0 0 200px");
			$(this).stop(true).css("left", "0").clearQueue();

			$("#main-content").stop(true).css({
				"left": "200px",
				"position": "fixed"
			});

		}).on("mouseleave", function () {

			$("#back").stop(true).css("margin", "0").stop(true).delay(5000);
			$("#pages-scroller").css("left", "-200px").stop(true).delay(5000);

			$("#main-content").css({
				"left": "0",
				"position": "fixed"
			}).stop(true).delay(5000);

		});

		e.preventDefault();

	});

	////

	$("#preview-book").click(function () {

	

		var temp = JSON.stringify(pages);
		localStorage.setItem("pages", temp);

		// Page Sorter
		$("#pages-scroller ul").sortable({
			items: ":not(.disable-sort)"
		}).bind("sortupdate", function () {
			var temp = JSON.stringify(pages);
			localStorage.setItem("pages", temp);
		});


	});

	// Layout and page interaction
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#add-page").click(function (e) {

		if (pagesCreated > 20) {
			alert("Your book is too big please remove a page!\n");
			return;
		}

		pagesCreated++;

		$(this).before($("<li id=\"" + pagesCreated + "\"draggable='true'></li>").html("<div class=\"delete-page\"><i class=\"ion-trash-a\"></i></div><a class=\"edit-page\"><i class=\"ion-gear-b\"></i></a><section><img src=\"/static/images/whiteBG.jpg\" id='page" + (pagesCreated) + "Image' alt=\"\"/><div id='page" + (pagesCreated) + "Title'><span class=\"page-thumb-number\">" + (pagesCreated) + "</span> &middot; <span class=\"page-thumb-title\">New Page</span></div></section>"));

		title = $(".page-title-elem").html();
		text = $(".page-desc").html();
		imageURL = $(".page-bg").attr("src");
		attribution = $(".image-attribution").html();

		console.log("creating page: currenp: " + currentPage + "     pagesCreated:" + pagesCreated); 

		// save to previous page
		if (pagesCreated == 0) {
			pages.page[0] = {
				"pageNumber": pagesCreated,
				"templateId": 0,
				"title": null,
				"text": null,
				"image": "/static/images/whiteBG.jpg",
				"video": "null",
				"attribution": null
			};

			templateId = 0;
			createPage();
			fluidLayout();
		} else {
			pages.page[currentPage].templateId = templateId;
			pages.page[currentPage].title = title;
			pages.page[currentPage].text = text;
			pages.page[currentPage].image = imageURL;
			pages.page[currentPage].video = videoURL;
			pages.page[currentPage].attribution = attribution;
			createPage();
			currentPage = pagesCreated;
			templateId = 6;
			title = null;
			text = null;
			imageURL = null;
			videoURL = null;
			attribution = null;
			baseLayout();
		}

		// Page Sorter
		$("#pages-scroller ul").sortable({
			items: ":not(.disable-sort)"
		}).bind("sortupdate", function () {});

		e.preventDefault();

	});

	// Delete page
	$(document).on("click", "#pages-scroller ul li .delete-page", function (e) {

		$(this).closest("li").prepend("<div class=\"delete-page-confirm\"><h5>Confirm Delete</h5><div class=\"wrapper\"><a href=\"#\" class=\"button a red yay-delete-page\">Yes</a><a href=\"#\" class=\"button b white nay-delete-page\">No</a></div></div>");

		e.preventDefault();

	});

	// Confirm page deletion
	$(document).on("click", ".yay-delete-page", function (e) {

		var deletingFirst = false;

		pageToDeleteId = $(this).closest("li").attr("id");
		pageToDelete = pages.page[pageToDeleteId].pageId;

		console.log("page to delete:" + pageToDelete);
		if(pageToDeleteId == 0){
			deletingFirst = true;
		}
		

		console.log("page to delete: " + pageToDelete);

		deletePage(pageToDelete);

		$(this).closest("li").remove();
		currentPage = pageToDeleteId;
		console.log("deleting currentPage: " + currentPage + "   "  + pages.page);

		pages.page.splice(currentPage, 1);

		console.log(pages.page);

		if(!deletingFirst) {
			console.log("DELETING COVER: current poage: " + currentPage);
			currentPage--;
		}
		//currentPage--;
		pagesCreated--;


		title = pages.page[currentPage].title;
		text = pages.page[currentPage].text;
		imageURL = pages.page[currentPage].image;
		videoURL = pages.page[currentPage].video;
		pageNumber = pages.page[currentPage].pageNumber;
		attribution = pages.page[currentPage].attribution;
		templateId = pages.page[currentPage].templateId;

		switch (templateId) {
			case 0:
				fluidLayout();
				break;

			case 1:
				photoLayout();
				break;

			case 2:
				overlayLayout();
				break;

			case 3:
				photoTextLayout();
				break;

			case 4:
				verticalLayout();
				break;

			case 5:
				videoLayout();
				break;

			case 6:
				baseLayout();
		}

		e.preventDefault();

	});

	// Cancel page deletion
	$(document).on("click", ".nay-delete-page", function (e) {

		$(this).closest(".delete-page-confirm").remove();
		e.preventDefault();

	});

	// Image insertion
	// var file = '<p><div class="inserted-img"><img src=' + file + '></div></p>';
	var file = '<p><a class="inserted-img" href=' + file + '><img src=' + file + '></a></p>';

	function handleFile(file) {

		// pasteHtmlAtCaret('<p><div class="inserted-img"><img src=' + file + '></div></p>');
		pasteHtmlAtCaret('<p><a class="inserted-img" href=' + file + '><img src=' + file + '></a></p>');
		console.log(file);

	}

	// Base Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function baseLayout() {

		var insert = "<section id=\"test-blank\" class=\"blank-preview-wrapper\"><div class=\"blank-preview\"><article><p contenteditable=\"false\">Choose a layout from the <i class=\"ion-gear-b\"></i> menu</p></article></div></section>";
		$("#create-content").html(insert);

	}

	// Fluid Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function fluidLayout() {

		var insert = "";
		
		console.log(imageURL);

		if (imageURL == null || imageURL == "static/images/grayBG.png") {

			insert += "<section class=\"fluid-preview-wrapper\"><section class=\"draggable-placeholder\">";

			insert += "<img class=\"page-bg\" src=\"static/images/grayBG.png\" alt=\"\" data-adaptive-background=\"0\" style=\"0\"/>";

			insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page" + $(this).closest("li").index() + "Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.fluid-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.fluid-preview').css('top', '75%'); $('.fluid-preview article').css('padding', '0 0 4rem 0'); $('.spinner').hide(); $('.image-attribution').css('display', 'block'); $('.button-wrapper').css({ 'bottom': '8%', 'top': 'initial', 'opacity': '0', 'position': 'absolute', 'text-align': 'center', 'width': '100%' }); $('.page-bg, .button-wrapper, button.photo-picker').css('opacity', '1'); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); }); \"></div>";

			insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\" style=\"display: none;\">" + attribution + "</span></section><div class=\"fluid-preview\" style=\"padding: 2rem 2rem 0 2rem; top: 0;\"><article style=\"padding: 7rem 0\">";

		} else {

			insert += "<section class=\"fluid-preview-wrapper imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + imageURL + ");";

			insert += "background-size: cover; background-position: center center; background-repeat: no-repeat; height: 75%;\"><section class=\"draggable-placeholder\">";

			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" alt=\"\" data-adaptive-background=\"1\" style=\"1\"/>";

			insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page" + $(this).closest("li").index() + "Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.fluid-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.fluid-preview').css('top', '75%'); $('.fluid-preview article').css('padding', '0 0 4rem 0'); $('.spinner').hide(); $('.image-attribution').css('display', 'block'); $('.button-wrapper').css({ 'bottom': '8%', 'top': 'initial', 'opacity': '0', 'position': 'absolute', 'text-align': 'center', 'width': '100%' }); $('.page-bg, .button-wrapper, button.photo-picker').css('opacity', '1'); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); }); \"></div>";

			insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\" style=\"display: block\">" + attribution + "</span></section><div class=\"fluid-preview\" style=\"padding: 1rem 2rem 0 2rem; top: 75%;\"><article style=\"padding: 0 0 4rem 0;\">";
		}

		if (title == null) {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";
		} else {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}

		insert += "<a href=\"#\" class=\"add-inline-content\">&#xf218;</a>";
		insert += "<div class=\"add-inline-content-wrapper\">";
		insert += "<button class=\"inline-embed-insert\">< ></button>";

		insert += "<input class=\"inline-image-insert\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; handleFile(url);\">";

		insert += "<div class=\"gapelia-editor-toolbar-form-anchor\" style=\"background-color: #59b3a6;\">";
		insert += "<input type=\"text\" style=\"background-color: #59b3a6;\" value=\"Paste the link you want to embed\" placeholder=\"Paste the link you want to be\">";
		insert += "<a href=\"#\">&#xf2bb;</a>";
		insert += "</div>";
		insert += "</div>";

		if (text == null) {

			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div>";
			insert += "</article></div></section>";

		} else {

			insert += "<div class=\"page-desc\" contenteditable=\"true\">" + text + "</div>";
			insert += "</article></div></section>";

		}

		// no video in this view, but having this allows it to keep between layout switching
		if (videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		$("#create-content").html(insert);
		templateId = 0;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		var element2 = $(".inline-image-insert");
		element2 = element2[0];
		element2.type = "filepicker";
		filepicker.constructWidget(element2);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		var pageBG = $(".page-bg");

		if ($(".page-bg").data("adaptive-background") == 1) {

			// Image attribution
			$(".image-attribution").css("display", "block");

			// Content positioning
			$(".fluid-preview").css({
				"padding": "1rem 2rem 0 2rem",
				"top": "75%"
			});
			
			$(".draggable-placeholder .button-wrapper").css({
				"bottom": "8%",
				"margin-top": "300px",
				"position": "absolute",
				"text-align": "center",
				"top": "inherit",
				"width": "100%"
			});	

			$(".fluid-preview article").css("padding", "0 0 4rem 0");

		} else if ($(".page-bg").data("adaptive-background") == 0) {

			// Image attribution
			$(".image-attribution").css("display", "none");

			// Content positioning
			$(".fluid-preview").css({
				"padding": "1rem 2rem 0 2rem",
				"top": "0"
			});
			
			$(".draggable-placeholder.button-wrapper").css("display", "none");

			$(".fluid-preview article").css("padding", "7rem 0");

		}

		$(window).ready(function () {
			$(".page-desc").focus();
		});

		// Empty attribution field when user clicks in it
		$(document).one("click", ".image-attribution", function () {
			$(this).text("");
		});

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		//var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] }); // uncommenting this fixes issue with extra br on title
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker").html("&#xf2e4;");
		$("button.inline-image-insert").html("&#xf147;");

		// Inline content embedder
		$(".add-inline-content").click(function (e) {

			// $(".add-inline-content-wrapper").toggle();

			$(".add-inline-content-wrapper").toggle(function () {
				$(this).css("bottom", "-13.7rem");
			}, function () {
				$(this).css("bottom", "3.7rem");
			});

			e.preventDefault();

		});

		$(".inline-embed-insert").click(function () {
			$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor").toggle();
		});

		// https://soundcloud.com/iknowbitfunk/just-kiddin-paloma-bit-funk-remix
		$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor input").on("keyup", function (ev) {

			if (ev.which === 13) {
				$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor").toggle();
				$(".fluid-preview-wrapper .page-desc").append('<a href="' + this.value + '" class="embedded-embedly" style="display: none;">test</a>');

				// Embedly
				var regex;

				regex = /((http:\/\/(www\.flickr\.com\/photos\/.*|flic\.kr\/.*|instagr\.am\/p\/.*|instagram\.com\/p\/.*|gist\.github\.com\/.*|www\.kickstarter\.com\/projects\/.*\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*|cl\.ly\/.*|cl\.ly\/.*\/content|.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|youtu\.be\/.*|.*\.youtube\.com\/user\/.*|.*\.youtube\.com\/.*#.*\/.*|m\.youtube\.com\/watch.*|m\.youtube\.com\/index.*|.*\.youtube\.com\/profile.*|.*\.youtube\.com\/view_play_list.*|.*\.youtube\.com\/playlist.*|.*twitch\.tv\/.*|.*justin\.tv\/.*\/b\/.*|.*justin\.tv\/.*\/w\/.*|.*twitch\.tv\/.*|.*twitch\.tv\/.*\/b\/.*|www\.ustream\.tv\/recorded\/.*|www\.ustream\.tv\/channel\/.*|www\.ustream\.tv\/.*|ustre\.am\/.*|.*revision3\.com\/.*|www\.vimeo\.com\/groups\/.*\/videos\/.*|www\.vimeo\.com\/.*|vimeo\.com\/groups\/.*\/videos\/.*|vimeo\.com\/.*|vimeo\.com\/m\/#\/.*|player\.vimeo\.com\/.*|www\.facebook\.com\/photo\.php.*|www\.facebook\.com\/video\/video\.php.*|www\.facebook\.com\/.*\/posts\/.*|fb\.me\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|snd\.sc\/.*|open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*|www\.last\.fm\/music\/.*|www\.last\.fm\/music\/+videos\/.*|www\.last\.fm\/music\/+images\/.*|www\.last\.fm\/music\/.*\/_\/.*|www\.last\.fm\/music\/.*\/.*|www\.mixcloud\.com\/.*\/.*\/|www\.rdio\.com\/#\/artist\/.*\/album\/.*|www\.rdio\.com\/artist\/.*\/album\/.*|.*\.bandcamp\.com\/|.*\.bandcamp\.com\/track\/.*|.*\.bandcamp\.com\/album\/.*|grooveshark\.com\/.*))|(https:\/\/(gist\.github\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|www\.vimeo\.com\/.*|vimeo\.com\/.*|player\.vimeo\.com\/.*|www\.facebook\.com\/photo\.php.*|www\.facebook\.com\/video\/video\.php.*|www\.facebook\.com\/.*\/posts\/.*|fb\.me\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|open\.spotify\.com\/.*|play\.spotify\.com\/.*)))/i;

				$(".embedded-embedly").embedly({
					urlRe: regex,
					method: "after"
				});

				// Avoid form submit
				return false;
			}

		});

		$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor").click(function () {
			$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor input").val("");
		});

		$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor a").click(function (e) {
			$(".add-inline-content-wrapper .gapelia-editor-toolbar-form-anchor").hide();
			e.preventDefault();
		});

		// Update title in page menu
		$(document).on("keyup", ".fluid-preview-wrapper .page-title-elem", function () {
			console.log("keyup: currentpage" + $(this).closest("li").index());
			var titleThing = $("#page" + $(this).closest("li").index() + "Title .page-thumb-title");
			$(titleThing).text($(this).text());

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".fluid-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

	}

	// Photo Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function photoLayout() {

		var insert = "";

		insert += "<section class=\"photo-preview-wrapper\">";
		insert += "<div class=\"page-bg-wrapper\">";
		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">" + attribution + "</span>";

		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/grayBG.png\" alt=\"\" style=\"display: none;\" data-adaptive-background=\"0\"/></div>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" alt=\"\" data-adaptive-background=\"1\" style=\"1\"/></div>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page" + $(this).closest("li").index() + "Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.page-bg-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); });\"></div>";

		if (title == null) {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}

		insert += "</article></div></section>";

		$("#create-content").html(insert);
		templateId = 1;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").attr("src") === "static/images/grayBG.png") {
			$(".image-attribution").css("display", "none");
		} else {
			$(".image-attribution").css("display", "block");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () { $(this).text(""); });

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] });

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".photo-preview-wrapper .page-title-elem", function () {

			var titleThing = $("#page" + $(this).closest("li").index() + "Title .page-thumb-title");
			$(titleThing).text($(this).text());

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".photo-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		$(".photo-preview-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// description input limiter
		var descElem = "page-desc";
		descMax = 299;

		$("." + descElem).keydown(function (e) {
			check_charcount(descElem, descMax, e);
		});

		function check_charcount(descElem, descMax, e) {
			if (e.which != 8 && $("." + descElem).text().length > descMax) {
				e.preventDefault();
			}
		}

	}

	// Overlay Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function overlayLayout() {

		var insert = "";

		insert += "<section class=\"overlay-preview-wrapper\">";

		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/grayBG.png\" alt=\"\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" alt=\"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page" + $(this).closest("li").index() + "Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.overlay-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); });\"></div>";

		if (title == null) {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write a quote here\"></div>";
		} else {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-title-elem\" contenteditable=\"true\">" + title + "</div>";
		}

		insert += "</article></div>";
		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">" + attribution + "</span>";
		insert += "</section>";

		// no paragraphs in this view, but having this allows it to keep between layout switching
		if (text == null) {
			insert += "<h1 class=\"page-desc\" data-placeholder=\"Write story here\" style=\"display: none;\"></h1>";
		} else {
			insert += "<h1 class=\"page-desc\" style=\"display: none;\">" + text + "</h1>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if (videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		$("#create-content").html(insert);
		templateId = 2;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").data("adaptive-background") == 1) {
			$(".image-attribution").css("display", "block");
		} else {
			$(".image-attribution").css("display", "none");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () {
			$(this).text("");
		});

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".overlay-preview-wrapper .page-desc", function () {

			var titleThing = $("#page" + $(this).closest("li").index() + "Title .page-thumb-title");
			$(titleThing).text($(this).text());

		});

		// description input limiter
		var descElem = "page-title-elem";
		descMax = 149;

		$("." + descElem).keydown(function (e) {
			check_charcount(descElem, descMax, e);
		});

		function check_charcount(descElem, descMax, e) {
			if (e.which != 8 && $("." + descElem).text().length > descMax) {
				e.preventDefault();
			}
		}

	}

	// Photo/Text Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function photoTextLayout() {

		var insert = "";

		// insert += "<section class=\"phototext-preview-wrapper\">";

		insert += "<section class=\"phototext-preview-wrapper imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + imageURL + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat;\">";

		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">" + attribution + "</span>";

		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/grayBG.png\" alt=\"\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" alt=\"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page" + $(this).closest("li").index() + "Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.phototext-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); });\"></div>";

		if (title == null) {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}

		if (text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">" + text + "</div></article></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if (videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		$("#create-content").html(insert);
		$(".phototext-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 3;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").data("adaptive-background") == 1) {
			$(".image-attribution").css("display", "block");
		} else {
			$(".image-attribution").css("display", "none");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () { $(this).text(""); });

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] });
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".phototext-preview-wrapper .page-title-elem", function () {

			var titleThing = $("#page" + $(this).closest("li").index() + "Title .page-thumb-title");
			$(titleThing).text($(this).text());

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".phototext-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

	}

	// Vertical Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function verticalLayout() {

		var insert = "";

		insert += "<section class=\"vertical-preview-wrapper\">";
		insert += "<div class=\"draggable-placeholder\">";

		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">" + attribution + "</span>";

		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/grayBG.png\" alt=\"\"/></div>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" alt=\"\"/></div>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,FACEBOOK,FLICKR, DROPBOX, GOOGLE_DRIVE, PICASA, IMAGE_SEARCH\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page" + $(this).closest("li").index() + "Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.vertical-preview-wrapper .draggable-placeholder').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); });\"></div>";

		if (title == null) {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}

		if (text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">" + text + "</div></article></div></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if (videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		$("#create-content").html(insert);
		$(".vertical-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 4;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").data("adaptive-background") == 1) {
			$(".image-attribution").css("display", "block");
		} else {
			$(".image-attribution").css("display", "none");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () { $(this).text(""); });

		// .serialize(): returns a JSON object with element's contents
		// var editor = new GapeliaEditor('[contenteditable="true"]').serialize();
		var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] });
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".vertical-preview-wrapper .page-title-elem", function () {

			var titleThing = $("#page" + $(this).closest("li").index() + "Title .page-thumb-title");
			$(titleThing).text($(this).text());

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".vertical-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

	}

	// Video Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function videoLayout() {

		var insert = "";

		insert += "<section class=\"video-preview-wrapper\">";
		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add video credit?\">" + attribution + "</span>";
		insert += "<div class=\"button-wrapper\"><button class=\"photo-picker video-btn\">&#xf256;</button>";

		insert += "<input class=\"video-picker\" type=\"text\" data-placeholder=\"Vimeo URL here\" placeholder=\"Vimeo URL here\" onchange=\"$('#page" + $(this).closest("li").index() + "Image').addClass('large'); $('#page" + $(this).closest("li").index() + "Image').VimeoThumb(); $('.image-attribution').show().text('Add video credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); \" style=\"display: none;\"/></div>";

		insert += "<div class=\"video-preview\"><span class=\"play-video\">Play</span>";

		if (videoURL == null) {
			insert += "<div class=\"video-player-container\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\"><iframe src=\"" + videoURL + "\"></iframe></div>";
		}

		if (title == null) {
			insert += "<article><h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";
		} else {
			insert += "<article><h1 class=\"page-title-elem\" contenteditable=\"true\">" + title + "</h1>";
		}

		if (text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">" + text + "</div></article></div></section>";
		}

		// no background in this view, but having this allows it to keep between layout switching
		if (imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/view-modes/video.png\" style=\"display: none;\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" + imageURL + "\" style=\"display: none;\"/>";
		}

		$("#create-content").html(insert);
		$(".video-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 5;

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		// Image attribution
		if ($(".page-bg").data("adaptive-background") == 1) {
			$(".image-attribution").css("display", "block");
		} else {
			$(".image-attribution").css("display", "none");
		}

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () { $(this).text(""); });

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] });
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker.video-btn").html("&#xf256;");

		// Update title in page menu
		$(document).on("keyup", ".video-preview-wrapper .page-title-elem", function () {

			var titleThing = $("#page" + $(this).closest("li").index() + "Title .page-thumb-title");
			$(titleThing).text($(this).text());

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".video-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) {
			check_charcount(titleElem, titleMax, e);
		});

		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		$(".video-preview-wrapper .photo-picker").on("click", function () {

			$(this).hide();
			$(".video-preview-wrapper .video-picker").show();

		});

		function getVimeoId(url) {

			var match = /vimeo.*\/(\d+)/i.exec(url);

			// if the match isn't null (i.e. it matched)
			if (match) {
				return match[1]; // the grouped/matched digits from the regex
			}

		}

		$(".video-picker").keypress(function (e) {

			var
			videoURL = "http://player.vimeo.com/video/" + getVimeoId($(this).val()) + "?title=0&amp;byline=0&amp;portrait=0&amp;color=70a1b1",
			videoThumb = "#page" + $(this).closest("li").index() + "Image",
			videoID = getVimeoId($(this).val());

			if (e.which == 13) {
				$(".video-player-container iframe").attr("src", videoURL);
				$(".video-preview-wrapper .video-picker").hide();
				$(".video-preview-wrapper .photo-picker").show();
				$(videoThumb).attr("data-vimeo-id", videoID);

				return false;
			}

		});

	}

	// Layout Constants
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Save data of what is being edited every second
	window.setInterval(function () {

		if (pages.page[0].templateId != null && pagesCreated != -1) {
			imageURL = $(".page-bg").attr("src");
			videoURL = $(".video-player-container iframe").attr("src");
			title = $(".page-title-elem").html();
			text = $(".page-desc").html();

			pages.page[currentPage].templateId = templateId;
			pages.page[currentPage].title = title;
			pages.page[currentPage].text = text;
			pages.page[currentPage].image = imageURL;
			pages.page[currentPage].video = videoURL;
			pages.page[currentPage].attribution = attribution;
		}

	}, 1000);

	// Save book information every 5 seconds
	window.setInterval(function () {

		updateBookAndPages(false);
		$("#notify-saving").finish().fadeIn("fast").delay(1000).fadeOut("slow");

	}, 5000);

	// Save page information every 5 seconds
	window.setInterval(function () {

		imageURL = $(".page-bg").attr("src");
		videoURL = $(".video-player-container iframe").attr("src");
		title = $(".page-title-elem").html();
		title= title.replace(/&lt;br&gt;/g," ");
		firstTitle=pages.page[0].title;
		$(".page-title-elem").html(title);
		text = $(".page-desc").html();
		templateId = pages.page[currentPage].templateId;
		attribution = $(".image-attribution").html();

	}, 5000);

	// Toggle layout switcher
	$("#select-fluid-layout").click(function ()			{ fluidLayout(); });
	$("#select-photo-layout").click(function ()			{ photoLayout(); });
	$("#select-overlay-layout").click(function ()		{ overlayLayout(); });
	$("#select-phototext-layout").click(function ()	{ photoTextLayout(); });
	$("#select-vertical-layout").click(function ()	{ verticalLayout(); });
	$("#select-video-layout").click(function ()			{ videoLayout(); });

	// Right Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#publish-toggle").on("click", function (e) {
        if(title=="") {
            alert("Please add a title to your story before publishing.") + ("#publish-modal").css("display", "none");
        }
	
        $("#publish-book-title").html(firstTitle);
        $(".page-title-elem").html(title);
		// Publish modal, to be deleted and replaced with better
		$("#publish-modal").css({
			"width": "100%",
			"height": "100%",
			"opacity": "1",
			"z-index": "10"
		}).show();

		e.preventDefault();

	});

	$("#publish-this").on("click", function (e) {
		updateBookAndPages(true);
	});

	$("#close-button").on("click", function (e) {
        updateBookAndPages(false);
		document.location.href = "/featured";
	});

	$(document).on("click", ".close-modal", function (e) {

		$(this).closest(".modal").css({
			"display": "none",
			"opacity": "0"
		}).hide();

		e.preventDefault();

	});

	// Content Creation
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Hide inline-wrapper when click outisde

	$(document).mouseup(function (e) {

		var container = $(".add-inline-content-wrapper");

		// if the target of the click isn't the container...
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.hide(); // ... nor a descendant of the container
		}

	});

	// Hide editor, show when mouse moves
	var timedelay = 1;

	function delayCheck() {

		if (timedelay == 2) {
			$(".book-creation header").fadeOut("slow");

			$(".add-inline-content, .fluid-preview-wrapper button.photo-picker, .photo-preview-wrapper button.photo-picker, .text-preview-wrapper button.photo-picker, .horizontal-preview-wrapper button.photo-picker, .overlay-preview-wrapper button.photo-picker, .phototext-preview-wrapper button.photo-picker, .vertical-preview-wrapper button.photo-picker").css("opacity", "0");

			// Video layout doesn't really need this, and the button doesn't appear when moving mouse over iframe
			// $(".video-preview-wrapper button.photo-picker").css("opacity", "0");

			timedelay = 1;
		}

		timedelay = timedelay + 1;

	}

	$(document).mousemove(function () {

		$(".book-creation header").fadeIn();

		$(".add-inline-content, .fluid-preview-wrapper button.photo-picker, .photo-preview-wrapper button.photo-picker, .text-preview-wrapper button.photo-picker, .horizontal-preview-wrapper button.photo-picker, .overlay-preview-wrapper button.photo-picker, .phototext-preview-wrapper button.photo-picker, .vertical-preview-wrapper button.photo-picker").css("opacity", "1");

		// $(".video-preview-wrapper button.photo-picker").css("opacity", "1");

		timedelay = 1;
		clearInterval(_delay);
		_delay = setInterval(delayCheck, 500);

	});

	// page load starts delay timer
	_delay = setInterval(delayCheck, 500);
