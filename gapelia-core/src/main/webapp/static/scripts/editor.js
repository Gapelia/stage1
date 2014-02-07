
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

	$(document).ready(function () {

		pages = {
			"page": [{}]
		};

		pageId = 0;
		bookId = 0;
		pagesCreated = 0;
		author = "William Gibson";
		templateId = 0;

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

		// frontCoverLayout();
		fluidLayout();

		pages.page[0] = {
			"pageNumber": 0,
			"geotag": null,
			"templateId": "0",
			"title": null,
			"text": null,
			"image": "/static/images/blankBG.jpg",
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

		$("#pages-scroller ul li").css("border", "3px solid transparent");

		var e = $(this).closest("li");
		e = e[0];

		if(e.id != "add-page") {
			e.style.border = "3px solid #70a1b1";
		}

		currentPage = $(this).closest("li").attr("id");
		templateId = pages.page[currentPage].templateId;

		if(templateId == undefined || templateId == null) {
			templateId=0;
		}

		title = pages.page[currentPage].title;
		text = pages.page[currentPage].text;
		geotag = pages.page[currentPage].geotag;
		imageURL = pages.page[currentPage].image;
		videoURL = pages.page[currentPage].video;
		pageNumber = pages.page[currentPage].pageNumber;

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

		$(this).before($("<li id=\""+ pagesCreated +"\"draggable='true'></li>").html("<div class=\"delete-page\"><i class=\"ion-trash-a\"></i></div><a class=\"edit-page\"><i class=\"ion-gear-b\"></i></a><section><img src=\"/static/images/blankBG.jpg\" id='page"+(pagesCreated)+"Image' alt=''/><span id='page"+(pagesCreated)+"Title'>"+(pagesCreated)+"&middot; New Page</span></section>"));

		title = $(".page-title-elem").html();
		geotag = $("geotag").html();
		text = $(".page-desc").html();
		imageURL = $(".page-bg").attr("src");

		if(geotag == undefined) {
			geotag = "BUUUGGG";
		}

		if(pagesCreated == 0) {
			pages.page[0] = {
				"pageNumber": pagesCreated,
				"geotag": geotag,
				"templateId": 0,
				"title": null,
				"text": null,
				"image": "/static/images/blankBG.jpg",
				"video": "null"
			};

			templateId = 0;
			frontCoverLayout();
		} else {
			pages.page[pagesCreated-1].geotag = geotag;
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
				"video": "null"
			};

			templateId = 0;
			title = null;
			text = null;
			imageURL = null;
			videoURL = null;
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
					pages.page[pagesCreated-1].geotag = geotag;
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

		e.preventDefault();

	});

	$(document).on("click", "#pages-scroller ul li .delete-page", function (e) {

		currentPage = $(this).closest("img").attr("id");
		pages.page.splice(currentPage, 1);
		currentPage--;
		pagesCreated--;

		$(this).closest("li").prepend("<div class=\"delete-page-confirm\"><h5>Confirm Delete</h5><div class=\"wrapper\"><a href=\"#\" class=\"button a red yay-delete-page\">Yay</a><a href=\"#\" class=\"button b green nay-delete-page\">Nay</a></div></div>");

		e.preventDefault();

	});

	$(document).on("click", ".yay-delete-page", function (e) {

		$(this).closest("li").remove();
		e.preventDefault();

	});

	$(document).on("click", ".nay-delete-page", function (e) {

		$(this).closest(".delete-page-confirm").remove();
		e.preventDefault();

	});

	// Base Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function baseLayout() {

		var insert="<section id=\"test-blank\" class=\"blank-preview-wrapper\"><div class=\"blank-preview\"><article><p contenteditable=\"false\">ヾ(＠⌒ー⌒＠)ノ</p></article></div></section>";
		$("#create-content").html(insert);

	}

	// Fluid Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function fluidLayout() {

		var insert = "";

		/*
		insert += "<section class=\"horizontal-preview-wrapper\"><div class=\"image-attribution\" contenteditable=\"true\">Add photography credit</div><section class=\"draggable-placeholder\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url); $('.horizontal-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show(); });\"></div>";

		insert += "</section><div class=\"horizontal-preview\"><article>";

		if(title == null) {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";
		} else {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";
		}

		// insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";

		if(text == null) {
			if(currentPage==0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5>";
			}

			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			if(currentPage==0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5>";
			}

			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+ text +"</div></article></div></section>";
		}
		*/

		// Essay code
		insert += "<section class=\"fluid-preview-wrapper\"><section class=\"draggable-placeholder\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/whiteBG.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url); $('.fluid-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.button-wrapper').css('bottom', '40%'); $('section').css('height', '65%'); $('.fluid-preview').css('top', '65%'); $('.spinner').hide(); $('.image-attribution').css('display', 'block'); $('button.photo-picker').html('Change photo'); });\"></div>";

		insert += "</section><div class=\"fluid-preview\"><article>";

		if(title == null) {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";

			if(currentPage == 0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5><span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			} else {
				insert += "<span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			}
		} else {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";
		}

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+ text +"</div></article></div></section>";
		}
		// End essay code

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

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].geotag = geotag;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;

		var editor = new GapeliaEditor('[contenteditable="true"]');

		$("button.photo-picker").html("Add photo");

		$(document).on("keydown", ".fluid-preview-wrapper", function () {
			$(this).css("overflow-y", "auto");
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

		// Google Maps Autocomplete list positioning
		// $(".pac-container").css("margin-top", "-210px").css("position", "absolute");

	}

	// Photo Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function photoLayout() {

		var insert = "";

		insert += "<section class=\"photo-preview-wrapper\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show(); $('button.photo-picker').html('Change photo'); });\"></div>";

		if(title == null) {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";

			if(currentPage == 0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5><span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			} else {
				insert += "<span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			}
		} else {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";
		}

		// insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/></article></div></section>";

		insert += "</article></div></section>";

		$("#create-content").html(insert);
		templateId = 1;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].geotag = geotag;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;

		var editor = new GapeliaEditor('[contenteditable="true"]');

		$("button.photo-picker").html("Add photo");

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

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");

	}

	// Overlay Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function overlayLayout() {

		var insert = "";

		insert += "<section class=\"overlay-preview-wrapper\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url); $('.overlay-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show(); $('button.photo-picker').html('Change photo'); });\"></div>";

		if(text == null) {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div>";

			if(currentPage == 0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5><span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			} else {
				insert += "<span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			}
		} else {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+ text +"</div>";
		}

		// insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/></article></div></section>";
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
		pages.page[currentPage].geotag = geotag;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;

		var editor = new GapeliaEditor('[contenteditable="true"]');

		$("button.photo-picker").html("Add photo");

		// description input limiter
		var descElem = "page-desc";
		descMax = 149;

		$("." + descElem).keydown(function (e) { check_charcount(descElem, descMax, e); });

		function check_charcount(descElem, descMax, e) {
			if(e.which != 8 && $("." + descElem).text().length > descMax) {
				e.preventDefault();
			}
		}

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");

	}

	// Photo/Text Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function photoTextLayout() {

		var insert = "";

		insert += "<section class=\"phototext-preview-wrapper\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url); $('.phototext-preview-wrapper').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show(); $('button.photo-picker').html('Change photo'); });\"></div>";

		if(title == null) {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";

			if(currentPage == 0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5><span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			} else {
				insert += "<span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			}
		} else {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";

			if(currentPage == 0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5><span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			} else {
				insert += "<span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			}
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
		pages.page[currentPage].geotag = geotag;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;

		var editor = new GapeliaEditor('[contenteditable="true"]');

		$("button.photo-picker").html("Add photo");

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");

	}

	// Vertical Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function verticalLayout() {

		var insert = "";

		insert += "<section class=\"vertical-preview-wrapper\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\"/></div>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+ imageURL +"\"/></div>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#page"+ currentPage +"Image').attr('src', url); $('.page-bg').attr('src', url); $('.vertical-preview-wrapper .draggable-placeholder').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); $('.image-attribution').show(); $('button.photo-picker').html('Change photo'); });\"></div>";

		if(title == null) {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";

			if(currentPage == 0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5>";
			} else {
				insert += "<span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			}
		} else {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+ title +"</h1>";

			if(currentPage == 0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5>";
			} else {
				insert += "<span class=\"image-attribution\" contenteditable=\"true\">Add photo credit?</span>";
			}
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
		$(".vertical-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 4;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].geotag = geotag;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;

		var editor = new GapeliaEditor('[contenteditable="true"]').serialize();

		$("button.photo-picker").html("Add photo");

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function (e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");

	}

	// Video Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function videoLayout() {

		var insert = "";

		insert += "<section class=\"video-preview-wrapper\"><div class=\"button-wrapper\"><button class=\"photo-picker\">Change Video</button>";

		insert += "<input class=\"video-picker\" type=\"text\" data-placeholder=\"Vimeo URL here\" placeholder=\"Vimeo URL here\" onchange=\"$('#page"+ currentPage +"Image').addClass('large'); $('#page"+ currentPage +"Image').VimeoThumb(); $('button.photo-picker').html('Change video');\" style=\"display: none;\"/></div>";

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

		// insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";

		if(text == null) {
			if(currentPage == 0) {
				insert += "<h5 contenteditable=\"false\"><span>"+ author +"</span></h5><span class=\"image-attribution\" contenteditable=\"true\">Add video credit?</span>";
			} else {
				insert += "<span class=\"image-attribution\" contenteditable=\"true\">Add video credit?</span>";
			}

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
		pages.page[currentPage].geotag = geotag;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;

		var editor = new GapeliaEditor('[contenteditable="true"]');
		
		$("button.photo-picker").html("Add video");

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

		// Google Maps Autocomplete list positioning
		// $(".pac-container").css("margin-top", "-210px").css("position", "absolute");

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
			pages.page[currentPage].geotag = geotag;
			pages.page[currentPage].text = text;
			pages.page[currentPage].image = imageURL;
			pages.page[currentPage].video = videoURL;
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
		geotag = pages.page[currentPage].geotag;

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
			$(".book-creation header").fadeOut();

			$(".frontcover-preview-wrapper button.photo-picker, .photo-preview-wrapper button.photo-picker, .text-preview-wrapper button.photo-picker, .horizontal-preview-wrapper button.photo-picker, .overlay-preview-wrapper button.photo-picker, .phototext-preview-wrapper button.photo-picker, .vertical-preview-wrapper button.photo-picker").css("opacity", "0");

			// Video layout doesn't really need this, and the button doesn't appear when moving mouse over iframe
			// $(".video-preview-wrapper button.photo-picker").css("opacity", "0");

			timedelay = 1;
		}

		timedelay = timedelay + 1;

	}

	$(document).mousemove(function () {

		$(".book-creation header").fadeIn();

		$(".frontcover-preview-wrapper button.photo-picker, .photo-preview-wrapper button.photo-picker, .text-preview-wrapper button.photo-picker, .horizontal-preview-wrapper button.photo-picker, .overlay-preview-wrapper button.photo-picker, .phototext-preview-wrapper button.photo-picker, .vertical-preview-wrapper button.photo-picker").css("opacity", "1");

		// $(".video-preview-wrapper button.photo-picker").css("opacity", "1");

		timedelay = 1;
		clearInterval(_delay);
		_delay = setInterval(delayCheck, 500);

	});

	// page load starts delay timer
	_delay = setInterval(delayCheck, 500);

	// Placeholders
	/*
	(function ($) {
		$(function () {

			$('[contenteditable="true"]').blur(function () {

				var text = $.trim($(this).text());

				var ph = $("<span/>", {
					"class": "placeholder"
				}).text($(this).data("placeholder") || "");

				if (text == "") {
					$(this).html(ph);
				}

			}).focus(function () {

				if ($(this).children(".placeholder").length > 0) {
					$(this).html("<span>&nbsp;</span>");
				}

			});

		});
	})(jQuery);
	*/

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

	// Video Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Google Maps stuff, might not need
	/*
	$(".video-preview input").keydown(function (e) {

		setTimeout(function () {
			$(".video-preview input").val($(".pac-container").find(".pac-item").eq(0).text());
		}, 1000);

		if (e.which == 13 && $(".pac-container:visible").length) return false;

	});
	*/

	// Live Preview
	// @Gapelia
	// ------------------------------------------------------------------------------------

	/*
	$(document).ready(function () {

		// h1 = page-title-elem // span = livepreview-thing in page thumb
		$(".page-title-elem").keypress(function () {
			$(".livepreview-thing").text($(this).text());
		});

	});
	*/
