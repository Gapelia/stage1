
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

	$(function () {

		pages = {
			"page": [{}]
		};

		pageId = 0;
		bookId = 0;
		pagesCreated = 0;
		author = "William Gibson";
		templateId = 0;
		currentPage = 0;
		imageURL = 0;
		attribution = null;
		title = null;
		text = null;
		videoURL = null;

		/*
		$.ajax({
			url: "http://gapelia-dev.herokuapp.com/api/book/createBook",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
				sessionId: sessionId
			},
			success: function (data) {
				bookId = data;
				console.log("Success creating your book");
			},
			error: function (q, status, err) {
				if (status == "timeout") {
					alert("Request timed out");
				} else {
					alert("Some issue happened with your request: " + err);
				}
			}
		});

		$.ajax({
			url: "http://gapelia-dev.herokuapp.com/api/book/createPage",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
				sessionId: sessionId
			},
			success: function (data) {

				pageId = data;
				console.log(data);
				geotag = "BUGGGGGG";
				book = {
					"author" : "AUTHOR",
					"title" : null,
					"library" : "NULL",
					"dimension" : "NULL"
				};

				pages = {
					"page" : [{}]
				};

				index = 0;
				author = "author";
				pageNumber = 0;
				text = null;
				imageURL = null;
				videoURL = null;
				templateId = 0;
				title = null;
				pagesCreated = 0; // subscript of 0
				currentPage = 0;
				frontCoverLayout;

				pages.page[0] = {
					"pageNumber": pagesCreated,
					"geotag": null,
					"templateId": "0",
					"title": null,
					"text": null,
					"image": "/static/images/blankBG.jpg",
					"video": "null",
					"pageId": pageId
				};
				frontCoverLayout();

			},
			error: function (q, status, err) {

				if (status == "timeout") {
					alert("Request timed out");
				} else {
					alert("Some issue happened with your request: " + err);
				}

			}
		});
		*/

		fluidLayout();

		pages.page[0] = {
			"pageNumber": 0,
			// "geotag": null,
			"templateId": "0",
			"title": null,
			"text": null,
			"image": "0",
			"video": "null"
		};

	});

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

		// $("#pages-scroller ul li").css("border", "3px solid transparent; border-bottom: 1px solid rgba(12, 12, 12, 0.3)");
		$("#pages-scroller ul li").css("border", "3px solid transparent");

		var e = $(this).closest("li");
		e = e[0];

		if(e.id != "add-page") {
			e.style.border = "3px solid #70a1b1";
		}

		currentPage = $(this).closest("li").attr("id");
		templateId = pages.page[currentPage].templateId;

		if(templateId == undefined || templateId == null) {
			templateId = 0;
		}

		title = pages.page[currentPage].title;
		text = pages.page[currentPage].text;
		// geotag = pages.page[currentPage].geotag;
		imageURL = pages.page[currentPage].image;
		videoURL = pages.page[currentPage].video;
		pageNumber = pages.page[currentPage].pageNumber;
		attribution = pages.page[currentPage].attribution;

		switch(templateId) {
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

			default:
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
		}).bind("sortupdate", function() {
			var temp = JSON.stringify(pages);
			localStorage.setItem("pages", temp);
		});

	});

	// Layout and page interaction
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#add-page").click(function (e) {

		if(pagesCreated > 20) {
			alert("Your book is too big please remove a page!\n");
			return;
		}

		pagesCreated++;

		// $(this).before($("<li id=\""+ pagesCreated +"\"draggable='true'></li>").html("<div class=\"delete-page\"><i class=\"ion-trash-a\"></i></div><a class=\"edit-page\"><i class=\"ion-gear-b\"></i></a><section><img src=\"/static/images/whiteBG.jpg\" id='page"+(pagesCreated)+"Image' alt=\"\"/><span id='page"+(pagesCreated)+"Title'>"+(pagesCreated)+"&middot; <span class=\"page-thumb-title\">New Page</span></span></section>"));

		$(this).before($("<li id=\""+ pagesCreated +"\"draggable='true'></li>").html("<div class=\"delete-page\"><i class=\"ion-trash-a\"></i></div><a class=\"edit-page\"><i class=\"ion-gear-b\"></i></a><section><img src=\"/static/images/blankBG.jpg\" id='page"+(pagesCreated)+"Image' alt=\"\"/><span id='page"+(pagesCreated)+"Title'>"+(pagesCreated)+"&middot; <span class=\"page-thumb-title\">New Page</span></span></section>"));

		title = $(".page-title-elem").html();
		// geotag = $(".geotag").html();
		text = $(".page-desc").html();
		imageURL = $(".page-bg").attr("src");
		attribution = $(".image-attribution").html();

		// if(geotag == undefined) { geotag = "BUUUGGG"; }

		if(pagesCreated == 0) {
			pages.page[0] = {
				"pageNumber": pagesCreated,
				// "geotag": geotag,
				"templateId": 0,
				"title": null,
				"text": null,
				// "image": "/static/images/whiteBG.jpg",
				"image": "/static/images/blankBG.jpg",
				"video": null,
				"attribution": null
			};

			templateId = 0;
			fluidLayout();
		} else {
			// pages.page[pagesCreated-1].geotag = geotag;
			pages.page[pagesCreated-1].templateId = templateId;
			pages.page[pagesCreated-1].title = title;
			pages.page[pagesCreated-1].text = text;
			pages.page[pagesCreated-1].image = imageURL;
			pages.page[pagesCreated-1].video = videoURL;
			pages.page[pagesCreated-1].attribution = attribution;

			pages.page[pagesCreated] = {
				"pageNumber": pagesCreated,
				// "geotag": null,
				"templateId": "0",
				"title": null,
				"text": null,
				"image": "null",
				"video": "null",
				"attribution": null
			};

			templateId = 0;
			title = null;
			text = null;
			imageURL = null;
			videoURL = null;
			attribution = null;
		}

		/*
		$.ajax({
			url: "http://gapelia-dev.herokuapp.com/api/book/createPage",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
				sessionId: sessionId
			},
			success: function (data) {

				pageId = data;
				console.log(data);

				if(pagesCreated == 0) {
					pages.page[0] = {
						"pageNumber": pagesCreated,
						"geotag": geotag,
						"templateId": 0,
						"title": null,
						"text": null,
						"image": "/static/images/blankBG.jpg",
						"video": "null",
						"pageId": pageId
					};

					templateId = 0;
					frontCoverLayout();
				} else {
					// pages.page[pagesCreated-1].geotag = geotag;
					pages.page[pagesCreated-1].templateId = templateId;
					pages.page[pagesCreated-1].title = title;
					pages.page[pagesCreated-1].text = text;
					pages.page[pagesCreated-1].image = imageURL;
					pages.page[pagesCreated-1].video = videoURL;

					pages.page[pagesCreated] = {
						"pageNumber": pagesCreated,
						"geotag": null,
						"templateId": "0",
						"title": null,
						"text": null,
						"image": "/static/images/blankBG.jpg",
						"video": "null",
						"pageId": pageId
					};

					templateId = 0;
					title = null;
					text = null;
					imageURL = null;
					videoURL = null;
				}

			},
			error: function (q, status, err) {

				if (status == "timeout") {
					alert("Request timed out");
				} else {
					alert("Some issue happened with your request: " + err);
				}

			}
		});
		*/

		// Page Sorter
		$("#pages-scroller ul").sortable({
			items: ":not(.disable-sort)"
		}).bind("sortupdate", function() {
		});

		e.preventDefault();

	});

	// Delete page
	$(document).on("click", "#pages-scroller ul li .delete-page", function (e) {

		currentPage = $(this).closest("img").attr("id");
		pages.page.splice(currentPage, 1);
		currentPage--;
		pagesCreated--;

		$(this).closest("li").prepend("<div class=\"delete-page-confirm\"><h5>Confirm Delete</h5><div class=\"wrapper\"><a href=\"#\" class=\"button a red yay-delete-page\">Yay</a><a href=\"#\" class=\"button b green nay-delete-page\">Nay</a></div></div>");

		e.preventDefault();

	});

	// Confirm page deletion
	$(document).on("click", ".yay-delete-page", function (e) {

		$(this).closest("li").remove();
		e.preventDefault();

	});

	// Cancel page deletion
	$(document).on("click", ".nay-delete-page", function (e) {

		$(this).closest(".delete-page-confirm").remove();
		e.preventDefault();

	});

	// Base Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	/*
	function welcomeLayout() {

		var insert = "";

		insert += "<section class=\"blank-preview-wrapper\">";
		// insert += "<img class=\"page-bg\" src=\"/static/images/blankBG.jpg\" alt=\"\" data-adaptive-background=\"1\"/>";
		insert += "<div class=\"blank-preview\">";
		insert += "<article>";
		insert += "<p contenteditable=\"false\">Welcome!<br/><br/>Choose a layout from the Pages menu<br/>to get started on your book.<br/><br/><small style=\"font-size: 50%\">We can't wait to see it. (:</small></p>";
		insert += "</article></div></section>";

		$("#create-content").html(insert);

	}
	*/

	function baseLayout() {

		// var insert = "<section id=\"test-blank\" class=\"blank-preview-wrapper\"><div class=\"blank-preview\"><article><p contenteditable=\"false\">Choose a layout from the <i class=\"ion-gear-b\"> menu</p></article></div></section>";
		// $("#create-content").html(insert);

		var insert = "<section id=\"test-blank\" class=\"blank-preview-wrapper\"><div class=\"blank-preview\"><article><p contenteditable=\"false\">ヾ(＠⌒ー⌒＠)ノ</p></article></div></section>";
		$("#create-content").html(insert);

	}

	// Fluid Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function fluidLayout() {

		var insert = "";

		/*
		if(imageURL == null) {

			insert += "<section class=\"fluid-preview-wrapper\"><section class=\"draggable-placeholder\">";
			// insert += "<section class=\"fluid-preview-wrapper no-img\"><section class=\"draggable-placeholder\">";
			insert += "<img class=\"page-bg\" src=\"static/images/whiteBG.jpg\" alt=\"\" data-adaptive-background=\"0\" style=\"0\"/>";

		} else {

			insert += "<section class=\"fluid-preview-wrapper imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url("+ imageURL +");";
			insert += "background-size: cover; background-position: center center; background-repeat: no-repeat;\"><section class=\"draggable-placeholder\">";
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\" alt=\"\" data-adaptive-background=\"1\" style=\"1\"/>";

		}
		*/

		if(imageURL == "null") {

			insert += "<section class=\"fluid-preview-wrapper\"><section class=\"draggable-placeholder\">";
			// insert += "<section class=\"fluid-preview-wrapper no-img\"><section class=\"draggable-placeholder\">";
			insert += "<img class=\"page-bg\" src=\"static/images/whiteBG.jpg\" alt=\"\" data-adaptive-background=\"0\" style=\"0\"/>";

		} else {

			insert += "<section class=\"fluid-preview-wrapper imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url("+ imageURL +");";

			insert += "background-size: cover; background-position: center center; background-repeat: no-repeat;\"><section class=\"draggable-placeholder\" style=\"height: 75%;\">";

			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\" alt=\"\" data-adaptive-background=\"1\" style=\"1\"/>";

		}

		// insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.fluid-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('section').css('height', '75%'); $('.fluid-preview').css('top', '75%'); $('.fluid-preview article').css('padding', '0 0 4rem 0'); $('.spinner').hide(); $('.image-attribution').css('display', 'block'); $('.button-wrapper').css({ 'bottom': '8%', 'top': 'initial', 'opacity': '0', 'position': 'absolute', 'text-align': 'center', 'width': '100%' }); $('.page-bg, .button-wrapper, button.photo-picker').css('opacity', '1'); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); }); \"></div>";

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.fluid-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.fluid-preview').css('top', '75%'); $('.fluid-preview article').css('padding', '0 0 4rem 0'); $('.spinner').hide(); $('.image-attribution').css('display', 'block'); $('.button-wrapper').css({ 'bottom': '8%', 'top': 'initial', 'opacity': '0', 'position': 'absolute', 'text-align': 'center', 'width': '100%' }); $('.page-bg, .button-wrapper, button.photo-picker').css('opacity', '1'); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); }); \"></div>";

		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">"+ attribution +"</span></section>";

		if(imageURL == "0") {
			insert += "<div class=\"fluid-preview\"><article>";
		} else {
			insert += "<div class=\"fluid-preview\" style=\"padding: 1rem 2rem 0 2rem; top: 75%;\"><article style=\"padding: 0 0 4rem 0;\">";
		}

		if(title == null) {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";
		} else {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";
		}

		// insert += "<input class=\"inline-image-insert\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); pasteHtmlAtCaret('<div class=inserted-img><img></div>'); $('.inserted-img img').attr('src', url); $('.inserted-img').wrapInner('</p><p>');\">";

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div>";
			insert += "</article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+ text +"</div>";
			insert += "</article></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+ videoURL +"\"></iframe></div>";
		}

		$("#create-content").html(insert);
		templateId = 0;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		/*
		var element2 = $(".inline-image-insert");
		element2 = element2[0];
		element2.type = "filepicker";
		filepicker.constructWidget(element2);
		*/

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		// pages.page[currentPage].geotag = geotag;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;
		pages.page[currentPage].attribution = attribution;

		/*
		var BG = $("#page"+(pagesCreated)+"Image");

		if (BG.src == "static/images/blankBG.jpg") {

			// Image attribution
			$(".image-attribution").css("display", "block");

			// Content positioning
			$(".fluid-preview").css({
				"padding": "1rem 2rem 0 2rem",
				"top": "75%"
			});

			$(".fluid-preview article").css("padding", "0 0 4rem 0");

		} else {

			// Image attribution
			$(".image-attribution").css("display", "none");

			// Content positioning
			$(".fluid-preview").css({
				"padding": "2rem 2rem 0 2rem",
				"top": "0"
			});

			$(".fluid-preview article").css("padding", "4rem 0");

		}
		*/

		/*
		var pageBG = $(".page-bg");

		if ($(".page-bg").data("adaptive-background") == 1) {

			// Image attribution
			$(".image-attribution").css("display", "block");

			// Content positioning
			$(".fluid-preview").css({
				"padding": "1rem 2rem 0 2rem",
				"top": "75%"
			});

			$(".fluid-preview article").css("padding", "0 0 4rem 0");

		} else if ($(".page-bg").data("adaptive-background") == 0) {

			// Image attribution
			$(".image-attribution").css("display", "none");

			// Content positioning
			$(".fluid-preview").css({
				"padding": "2rem 2rem 0 2rem",
				"top": "0"
			});

			$(".fluid-preview article").css("padding", "4rem 0");

		}
		*/

		// Empty attribution field when user clicks in it
		$(document).one("keydown", ".image-attribution", function () { $(this).text(""); });

		// var editor = new GapeliaEditor('[contenteditable="true"]');
		var editor = new GapeliaEditor(".page-title-elem", { buttons: ["bold", "italic", "underline"] });
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker").html("&#xf2e4;");
		// $("button.inline-image-insert").html("Add inline photo");

		$(document).on("keydown", ".fluid-preview-wrapper", function () {
			$(this).css("overflow-y", "auto");
		});

		// Update title in page menu
		$(document).on("keyup", ".fluid-preview-wrapper .page-title-elem", function () {

			var titleThing = $("#page"+ currentPage +"Title .page-thumb-title");
			$(titleThing).text($(this).text());

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".fluid-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		/*
		//
		$(".page-desc").click(function () {

			// var string = "";
			// string += "</p><div class='inserted-img'><img src=" + url + "></div><p>";

			var htmlISH = "<input class=\"inline-image-insert\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); pasteHtmlAtCaret('<div class=inserted-img><img></div>'); $('.inserted-img img').attr('src', url); $('.inserted-img').wrapInner('</p><p>');\">";

			$(".page-desc p").each(function () {
				// $(this).before(htmlISH);
				$(".page-desc").before(htmlISH);
			});

			var element2 = $(".inline-image-insert");

			element2 = element2[0];
			element2.type = "filepicker";
			filepicker.constructWidget(element2);

			$("button.inline-image-insert").html("Add inline photo");

		});
		//
		*/

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) { e.preventDefault(); }
		}

	}

	// Photo Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function photoLayout() {

		var insert = "";

		insert += "<section class=\"photo-preview-wrapper\">";
		insert += "<div class=\"page-bg-wrapper\">";
		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">"+ attribution +"</span>";

		if(imageURL == null) {
			// insert += "<img class=\"page-bg\" src=\"static/images/whiteBG.jpg\" alt=\"\" data-adaptive-background=\"0\"/></div>";
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\" alt=\"\" data-adaptive-background=\"0\"/></div>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\" alt=\"\" data-adaptive-background=\"1\" style=\"1\"/></div>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); });\"></div>";

		if(title == null) {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";
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
		// pages.page[currentPage].geotag = geotag;
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

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".photo-preview-wrapper .page-title-elem", function () {

			var titleThing = $("#page"+ currentPage +"Title .page-thumb-title");
			$(titleThing).text($(this).text());

			// Remove <p> from h1s...unfortunately, users can't Ctrl+A to select content now
			$(".photo-preview-wrapper .page-title-elem p").each(function () {

				var content = $(this).html();

				$(this).parent().prepend(content);
				$(this).remove();

			});

		});

		/*
		// Check to see if image is vertical or horizontal
		var checkVerHor;

		function checkVerHor(el) {
			$(".photo-preview-wrapper .page-bg").prop("height", function () {
				if($(this).height() > $(this).width()) {
					// vertical
					$(this).css({
						"width": "auto",
						"height": "66%"
					});
				} else {
					// horizontal/default
					$(this).css({
						"width": "50%",
						"height": "auto"
					});
				}
			});
		}
		*/

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// description input limiter
		var descElem = "page-desc";
		descMax = 299;

		$("." + descElem).keydown(function (e) { check_charcount(descElem, descMax, e); });

		function check_charcount(descElem, descMax, e) {
			if(e.which != 8 && $("." + descElem).text().length > descMax) {
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

		if(imageURL == null) {
			// insert += "<img class=\"page-bg\" src=\"static/images/whiteBG.jpg\" alt=\"\"/>";
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\" alt=\"\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\" alt=\"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.overlay-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); });\"></div>";

		if(text == null) {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div>";
		} else {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+ text +"</div>";
		}

		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">"+ attribution +"</span>";
		insert += "</article></div></section>";

		// no title in this view, but having this allows it to keep between layout switching
		if(title == null) {
			insert += "<h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" style=\"display: none;\"></h1>";
		} else {
			insert += "<h1 class=\"page-title-elem\" style=\"display: none;\">"+ title +"</h1>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+ videoURL +"\"></iframe></div>";
		}

		$("#create-content").html(insert);
		templateId = 2;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		// pages.page[currentPage].geotag = geotag;
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
		var editor = new GapeliaEditor(".page-desc");

		$("button.photo-picker").html("&#xf2e4;");

		// Update title in page menu
		$(document).on("keyup", ".overlay-preview-wrapper .page-desc", function () {

			var titleThing = $("#page"+ currentPage +"Title .page-thumb-title");
			$(titleThing).text($(this).text());

		});

		// description input limiter
		var descElem = "page-desc";
		descMax = 149;

		$("." + descElem).keydown(function (e) { check_charcount(descElem, descMax, e); });

		function check_charcount(descElem, descMax, e) {
			if(e.which != 8 && $("." + descElem).text().length > descMax) {
				e.preventDefault();
			}
		}

	}

	// Photo/Text Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function photoTextLayout() {

		var insert = "";

		insert += "<section class=\"phototext-preview-wrapper\">";
		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">"+ attribution +"</span>";

		if(imageURL == null) {
			// insert += "<img class=\"page-bg\" src=\"static/images/whiteBG.jpg\" alt=\"\"/>";
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\" alt=\"\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\" alt=\"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.phototext-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); });\"></div>";

		if(title == null) {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";
		}

		// insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+ text +"</div></article></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+ videoURL +"\"></iframe></div>";
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
		// pages.page[currentPage].geotag = geotag;
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

			var titleThing = $("#page"+ currentPage +"Title .page-thumb-title");
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

		$("." + titleElem).keydown(function (e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
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

		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add photo credit?\">"+ attribution +"</span>";

		if(imageURL == null) {
			// insert += "<img class=\"page-bg\" src=\"static/images/whiteBG.jpg\" alt=\"\"/></div>";
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\" alt=\"\"/></div>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\" alt=\"\"/></div>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('.vertical-preview-wrapper .draggable-placeholder').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); });\"></div>";

		if(title == null) {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";
		}

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+ text +"</div></article></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+ videoURL +"\"></iframe></div>";
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
		// pages.page[currentPage].geotag = geotag;
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

			var titleThing = $("#page"+ currentPage +"Title .page-thumb-title");
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

		$("." + titleElem).keydown(function (e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
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
		insert += "<span class=\"image-attribution\" contenteditable=\"true\" data-placeholder=\"Add video credit?\">"+ attribution +"</span>";
		insert += "<div class=\"button-wrapper\"><button class=\"photo-picker video-btn\">&#xf256;</button>";

		insert += "<input class=\"video-picker\" type=\"text\" data-placeholder=\"Vimeo URL here\" placeholder=\"Vimeo URL here\" onchange=\"$('#page"+ currentPage +"Image').addClass('large'); $('#page"+ currentPage +"Image').VimeoThumb(); $('.image-attribution').show().text('Add photo credit?'); $.adaptiveBackground.run({ normalizeTextColor: true }); $('button.photo-picker').css('opacity', '1'); \" style=\"display: none;\"/></div>";

		insert += "<div class=\"video-preview\"><span class=\"play-video\">Play</span>";

		if(videoURL == null) {
			insert += "<div class=\"video-player-container\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\"><iframe src=\""+ videoURL +"\"></iframe></div>";
		}

		if(title == null) {
			insert += "<article><h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";
		} else {
			insert += "<article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";
		}

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+ text +"</div></article></div></section>";
		}

		// no background in this view, but having this allows it to keep between layout switching
		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/view-modes/video.png\" style=\"display: none;\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\" style=\"display: none;\"/>";
		}

		$("#create-content").html(insert);
		$(".video-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 5;

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		// pages.page[currentPage].geotag = geotag;
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

			var titleThing = $("#page"+ currentPage +"Title .page-thumb-title");
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

		$("." + titleElem).keydown(function (e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
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
			videoThumb = "#page"+ currentPage +"Image",
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

		if(pages.page[0].templateId != null && pagesCreated != -1) {
			imageURL = $(".page-bg").attr("src");
			videoURL = $(".video-player-container iframe").attr("src");
			title = $(".page-title-elem").html();
			text = $(".page-desc").html();

			pages.page[currentPage].templateId = templateId;
			pages.page[currentPage].title = title;
			// pages.page[currentPage].geotag = geotag;
			pages.page[currentPage].text = text;
			pages.page[currentPage].image = imageURL;
			pages.page[currentPage].video = videoURL;
			pages.page[currentPage].attribution = attribution;
		}

	}, 1000);

	// Save book information every minute
	window.setInterval(function () {
		$("#notify-saving").finish().fadeIn("fast").delay(1000).fadeOut("slow");
	}, 60000);

	// Save page information every 5 seconds
	window.setInterval(function () {

		imageURL = $(".page-bg").attr("src");
		videoURL = $(".video-player-container iframe").attr("src");
		title = $(".page-title-elem").html();
		text = $(".page-desc").html();
		templateId = pages.page[currentPage].templateId;
		// geotag = pages.page[currentPage].geotag;
		attribution = $(".image-attribution").html();

	}, 5000);

	// Toggle layout switcher
	$("#select-fluid-layout").click(function ()				{ fluidLayout(); });
	$("#select-photo-layout").click(function ()				{ photoLayout(); });
	$("#select-overlay-layout").click(function ()			{ overlayLayout(); });
	$("#select-phototext-layout").click(function ()		{ photoTextLayout(); });
	$("#select-vertical-layout").click(function ()		{ verticalLayout(); });
	$("#select-video-layout").click(function ()				{ videoLayout(); });

	// Right Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#publish-toggle").on("click", function (e) {

		// TO DO: Get tags from format and library
		library = "Into the Wild";
		tags = "fun";

		// Save book
		$.ajax({
			url: "http://gapelia-dev.herokuapp.com/api/book/createBook",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
				sessionId: sessionId,
				bookId:bookId,
				title: pages.page[0].title,
				language: "English",
				library: library,
				tags: tags,
				dimension: "pulse",
				createdBy: "god",
				isPublished: 1,
				coverPhoto: pages.page[0].image
			},
			success: function (data) {
				console.log("Succes Publishing your book");
			},
			error: function (q, status, err) {
				if (status == "timeout") {
					alert("Request timed out");
				} else {
					alert("Some issue happened with your request: " + err);
				}
			}
		});

		i = 0;

		while(i <= pagesCreated) {
			console.log("attempting to save page number" + i);

			$.ajax({
				url: "http://gapelia-dev.herokuapp.com/api/book/createPage",
				contentType: "application/x-www-form-urlencoded;charset=utf-8",
				async: false,
				type: "POST",
				data: {
					sessionId: sessionId,
					pageId: pages.page[i].pageId,
					title: pages.page[i].title,
					description: pages.page[i].text,
					attribution: pages.page[i].attribution,
					location: "TODO",
					templateId: pages.page[i].templateId,
					marginX: "TODO",
					marginY: "TODO",
					videoUrl: pages.page[i].video,
					pageNumber: i,
					bookId: bookId,
					createdbyUserId: "GOD",
					photoUrl: pages.page[i].image,
					photoId: "TODO"
				},
				success: function (data) {
					console.log("Success publishing your page" + i);
					i++;
				},
				error: function (q, status, err) {
					if (status == "timeout") {
						alert("Request timed out trying again");
					} else {
						alert("Some issue happened with your request: " + err);
					}
				}
			});
		}

		// Publish modal, to be deleted and replaced with better
		$("#publish-modal").css({
			"width": "100%",
			"height": "100%",
			"opacity": "1"
		}).show();

		e.preventDefault();

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

	// Hide editor, show when mouse moves
	var timedelay = 1;

	function delayCheck() {

		if (timedelay == 2) {
			$(".book-creation header").fadeOut("slow");

			$(".fluid-preview-wrapper button.photo-picker, button.inline-image-insert, .photo-preview-wrapper button.photo-picker, .text-preview-wrapper button.photo-picker, .horizontal-preview-wrapper button.photo-picker, .overlay-preview-wrapper button.photo-picker, .phototext-preview-wrapper button.photo-picker, .vertical-preview-wrapper button.photo-picker").css("opacity", "0");

			// Video layout doesn't really need this, and the button doesn't appear when moving mouse over iframe
			// $(".video-preview-wrapper button.photo-picker").css("opacity", "0");

			timedelay = 1;
		}

		timedelay = timedelay + 1;

	}

	$(document).mousemove(function () {

		$(".book-creation header").fadeIn();

		$(".fluid-preview-wrapper button.photo-picker, button.inline-image-insert, .photo-preview-wrapper button.photo-picker, .text-preview-wrapper button.photo-picker, .horizontal-preview-wrapper button.photo-picker, .overlay-preview-wrapper button.photo-picker, .phototext-preview-wrapper button.photo-picker, .vertical-preview-wrapper button.photo-picker").css("opacity", "1");

		// $(".video-preview-wrapper button.photo-picker").css("opacity", "1");

		timedelay = 1;
		clearInterval(_delay);
		_delay = setInterval(delayCheck, 500);

	});

	// page load starts delay timer
	_delay = setInterval(delayCheck, 500);

	// Character Limiter
	////////////////

	/*
	var maxNum = function ($elie, num) {

		var $this;

		$elie.each(function () {
			$this = $(this);
			$this.text($this.text().slice(0, num));
		});

	};

	$(function () {
		maxNum($(".frontcover-preview-wrapper .page-desc"), 300);
	});
	*/

	// .bind("DOMAttrModified change keypress paste focus", ".frontcover-preview-wrapper .page-desc", function () {
	// .on("paste", ".frontcover-preview-wrapper .page-desc", function () {
	/*
	$(document).on("input change keypress paste", ".frontcover-preview-wrapper .page-desc", function () {
		var $this = $(this);
		$this.text($this.text().slice(0, 300));
	});
	*/

	/*
	placeCaretAtEnd(this);

	function placeCaretAtEnd(el) {

		el.focus();

		if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
			var range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(false);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		} else if (typeof document.body.createTextRange != "undefined") {
			var textRange = document.body.createTextRange();
			textRange.moveToElementText(el);
			textRange.collapse(false);
			textRange.select();
		}

	}
	*/
