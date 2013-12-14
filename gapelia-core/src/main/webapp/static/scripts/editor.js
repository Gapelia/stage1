
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
			geotag = "BUGGGGGG";
			book = {
				"author" : "AUTHOR",
				"title" : null,
				"library" : "NULL",
				"dimension" : "NULL"
			};

			pages = {
				"page":[{}]
			};
			index = 0;
			author = book.author;
			pageNumber = 0;
			text = null;
			imageURL = null;
			videoURL = null;
			templateId = null;
			title = null;
			pagesCreated = 0;//subscript of 0
			currentPage = 0;
			one = 1;
			baseLayout();
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

	$("#pages-scroller").on("mouseenter", function () {} ).on("mouseleave", function () {

		$("#back").stop(true).css("margin", "0").stop(true).delay(5000);
		$("#pages-scroller").css("left", "-200px").stop(true).delay(5000);

		$("#main-content").css({
			"left": "0",
			"position": "fixed"
		}).stop(true).delay(5000);

	});
	$(document).on("click","#pages-scroller ul li", function (){
		currentPage = $(this).closest("li").attr("id");
		templateId=pages.page[currentPage].templateId;
		title=pages.page[currentPage].title;
		text=pages.page[currentPage].text;
		geotag=pages.page[currentPage].geotag;
		imageURL=pages.page[currentPage].image;
		videoURL=pages.page[currentPage].video;
		pageNumber=pages.page[currentPage].pageNumber;
		switch(templateId){
			case 0:
				frontCoverLayout();
				break;
			case 1:
				photoLayout();
				break;
			case 2:
				textLayout();
				break;
			case 3:
				horizontalLayout();
				break;
			case 4:
				overlayLayout();
				break;
			case 5:
				photoTextLayout();
				break;
			case 6:
				verticalLayout();
				break;
			case 7:
				videoLayout();
				break;
			default:
				baseLayout();
		}
	});
	$(document).on("click", "#pages-scroller ul li .edit-page", function (e) {

		$("#layout-scroller").stop(true).css("left", "0");
		$("#back").stop(true).css("margin", "0 0 0 200px");

		setTimeout(function() {
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

			setTimeout(function() {
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
pagesCreated++;
		$(this).before($("<li id=\""+pagesCreated+"\"draggable='true'></li>").html("<div class=\"delete-page\">Delete</div><a class=\"edit-page\">Edit</a><section><img <img src=\"/static/images/blankBG.jpg\" id='page"+(pagesCreated)+"Image' alt=''/><span id='page"+(pagesCreated)+"Title'>"+(pagesCreated)+ "&middot; New Page</span></section>"));

		title = $(".page-title-elem").text();
		geotag = $("geotag").text();
		text = $(".page-desc").text();
		imageURL = $(".page-bg").attr("src");
		if(geotag == undefined) {
				geotag="BUUUGGG";
		} 
		if(pagesCreated==0) {
			pages.page[0] = {
				"pageNumber" : pagesCreated,
				"geotag" : geotag,
				"templateId" : 0,
				"title" : null,
				"text" : null,
				"image" : "/static/images/blankBG.jpg",
				"video" : "NULL"
			};
			templateId=0;
			frontCoverLayout();
		} else if(pagesCreated > 20) {
			alert("Your book is too big please remove a page!\n");
		} else {
			pages.page[pagesCreated-1].geotag = geotag;
			pages.page[pagesCreated-1].templateId = templateId;
			pages.page[pagesCreated-1].title = title;
			pages.page[pagesCreated-1].text = text;
			pages.page[pagesCreated-1].image = imageURL;
			pages.page[pagesCreated-1].video = videoURL;

			pages.page[pagesCreated] = {
				"pageNumber" : pagesCreated,
				"geotag" : null,
				"templateId" : "0",
				"title" : null,
				"text" : null,
				"image" : "/static/images/blankBG.jpg",
				"video" : "NULL"
			};

			templateId = null;
			title = null;
			text = null;
			imageURL = null;
			videoURL = null;
		}
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

	// Have front cover and one page ready at load time
	$(document).ready(function () {

		$("#add-page").before($("<li id=\""+pagesCreated+"\"draggable='true'></li>").html("<div class=\"delete-page\">Delete</div><a class=\"edit-page\">Edit</a><section><img src=\"/static/images/blankBG.jpg\" id='page"+(pagesCreated)+"Image' alt=''/><span id='page"+(pagesCreated)+"Title'>"+(pagesCreated)+ "&middot; New Page</span></section>"));
		frontCoverLayout();

	});

	// Disable pasting on all layouts until we can auto-limit text overflow
	$(document).on("paste", "[contenteditable]", function(e) {
		e.preventDefault();
		// http://stackoverflow.com/a/19269040/1167646 may help
	});


	// Base Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function baseLayout() {

		var insert="<section id=\"test-blank\" class=\"blank-preview-wrapper\"><div class=\"blank-preview\"><article><p contenteditable=\"false\">Your page has been created.<br/><br/>Choose a layout from the Pages menu to get started!</p></article></div></section>";
		$("#create-content").html(insert);

	}

	// Front Cover Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function frontCoverLayout() {

		insert = "";
		insert += "<section class=\"frontcover-preview-wrapper\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" +imageURL+ "\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('#page"+currentPage+"Image').attr('src', url); $('.page-bg').attr('src', url); $('.frontcover-preview-wrapper').imgLiquid({ fill: true });\"></div>";

		if(title == null) {
			insert += "<div class=\"frontcover-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"frontcover-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+title+"</h1>";
		}

		if(text == null) {
			insert += "<h5 contenteditable=\"false\"><span>* "+author+" *</span></h5><div class=\"page-desc\" data-placeholder=\"Start writing your story here.\" contenteditable=\"true\"></div></article></div></section>";
		} else {
			insert += "<h5 contenteditable=\"false\"><span>* "+author+" *</span></h5><div class=\"page-desc\" contenteditable=\"true\">"+text+"</div></article></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+videoURL+"\"></iframe></div>";
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

		$(".frontcover-preview-wrapper").imgLiquid({ fill: true });

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function(e) { check_charcount(titleElem, titleMax, e); });

		// description input limiter
		var descElem = "page-desc";
		descMax = 299;

		$("." + descElem).keydown(function(e) { check_charcount(descElem, descMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");

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
			insert += "<img class=\"page-bg\" src=\""+imageURL+"\"/>";
		}

		// insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('#page"+currentPage+"Image').attr('src', url); $('.page-bg').attr('src', url).checkVerHor('.photo-preview-wrapper .page-bg');\"></div>";

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('#page"+currentPage+"Image').attr('src', url); $('.page-bg').attr('src', url);\"></div>";

		if(title == null) {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+title+"</h1>";
		}

		insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/></article></div></section>";

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+videoURL+"\"></iframe></div>";
		}

		// no description in this view, but having this allows it to keep between layout switching
		if(text == null) {
			insert += "<div class=\"page-desc\" style=\"display: none;\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" style=\"display: none;\" contenteditable=\"true\">"+text+"</div></article></div></section>";
		}

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

		/*
		// Check to see if image is vertical or horizontal
		var checkVerHor;

		function checkVerHor(el) {
			$(".photo-preview-wrapper .page-bg").prop("height", function() {
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

		$("." + titleElem).keydown(function(e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// description input limiter
		var descElem = "page-desc";
		descMax = 299;

		$("." + descElem).keydown(function(e) { check_charcount(descElem, descMax, e); });

		function check_charcount(descElem, descMax, e) {
			if(e.which != 8 && $("." + descElem).text().length > descMax) {
				e.preventDefault();
			}
		}

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");

	}

	// Text Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function textLayout() {

		var insert = "";
		insert += "<section class=\"text-preview-wrapper\">";

		if(title == null) {
			insert += "<div class=\"text-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"text-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+title+"</h1>";
		}

		insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+text+"</div></article></div></section>";
		}

		// no background in this view, but having this allows it to keep between layout switching
		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\" style=\"display: none;\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+imageURL+"\" style=\"display: none;\"/>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+videoURL+"\"></iframe></div>";
		}

		$("#create-content").html(insert);
		$(".text-preview-wrapper .page-desc").css("height", $vH - 165 + "px");
		templateId = 2;

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].geotag = geotag;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function(e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");

	}

	// Horizontal Layout
	// @Gapelia
	// ------------------------------------------------------------------------------------

	function horizontalLayout() {

		var insert = "";
		insert += "<section class=\"horizontal-preview-wrapper\"><section class=\"draggable-placeholder\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+imageURL+"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('#page"+currentPage+"Image').attr('src', url); $('.page-bg').attr('src', url); $('.horizontal-preview-wrapper').imgLiquid({ fill: true });\"></div>";

		insert += "</section><div class=\"horizontal-preview\"><article>";

		if(title == null) {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";
		} else {
			insert += "<h1 class=\"page-title-elem\" contenteditable=\"true\">"+title+"</h1>";
		}

		insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+text+"</div></article></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+videoURL+"\"></iframe></div>";
		}

		$("#create-content").html(insert);
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

		$(".horizontal-preview-wrapper").imgLiquid({ fill: true });

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function(e) { check_charcount(titleElem, titleMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("." + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// description input limiter
		var descElem = "page-desc";
		descMax = 299;

		$("." + descElem).keydown(function(e) { check_charcount(descElem, descMax, e); });

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
			insert += "<img class=\"page-bg\" src=\""+imageURL+"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('#page"+currentPage+"Image').attr('src', url); $('.page-bg').attr('src', url); $('.overlay-preview-wrapper').imgLiquid({ fill: true });\"></div>";

		if(text == null) {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div>";
		} else {
			insert += "<div class=\"overlay-preview\"><article>";
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+text+"</div>";
		}

		insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/></article></div></section>";

		// no title in this view, but having this allows it to keep between layout switching
		if(title == null) {
			insert += "<h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" style=\"display: none;\"></h1>";
		} else {
			insert += "<h1 class=\"page-title-elem\" style=\"display: none;\">"+title+"</h1>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+videoURL+"\"></iframe></div>";
		}

		$("#create-content").html(insert);
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

		$(".overlay-preview-wrapper").imgLiquid({ fill: true });

		// description input limiter
		var descElem = "page-desc";
		descMax = 149;

		$("." + descElem).keydown(function(e) { check_charcount(descElem, descMax, e); });

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
			insert += "<img class=\"page-bg\" src=\""+imageURL+"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('#page"+currentPage+"Image').attr('src', url); $('.page-bg').attr('src', url); $('.phototext-preview-wrapper').imgLiquid({ fill: true });\"></div>";

		if(title == null) {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+title+"</h1>";
		}

		insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+text+"</div></article></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+videoURL+"\"></iframe></div>";
		}

		$("#create-content").html(insert);
		$(".phototext-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 5;

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

		$(".phototext-preview-wrapper").imgLiquid({ fill: true });

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function(e) { check_charcount(titleElem, titleMax, e); });

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
		insert += "<section class=\"vertical-preview-wrapper\"><section class=\"draggable-placeholder\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+imageURL+"\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('#page"+currentPage+"Image').attr('src', url); $('.page-bg').attr('src', url); $('.vertical-preview-wrapper .draggable-placeholder').imgLiquid({ fill: true });\"></div>";

		if(title == null) {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" data-placeholder=\"Write your title here\" contenteditable=\"true\"></h1>";
		} else {
			insert += "<div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+title+"</h1>";
		}

		insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+text+"</div></article></div></section>";
		}

		// no video in this view, but having this allows it to keep between layout switching
		if(videoURL == null) {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\" style=\"display: none;\"><iframe src=\""+videoURL+"\"></iframe></div>";
		}

		$("#create-content").html(insert);
		$(".vertical-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 6;

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

		$(".vertical-preview-wrapper .draggable-placeholder").imgLiquid({ fill: true });

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function(e) { check_charcount(titleElem, titleMax, e); });

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

		insert += "<input class=\"video-picker\" type=\"text\" data-placeholder=\"Input video URL here\" style=\"display: none;\"/></div>";

		insert += "<div class=\"video-preview\"><span class=\"play-video\">Play</span>";

		if(videoURL == null) {
			insert += "<div class=\"video-player-container\"><iframe src=\"\"></iframe></div>";
		} else {
			insert += "<div class=\"video-player-container\"><iframe src=\""+videoURL+"\"></iframe></div>";
		}

		if(title == null) {
			insert += "<article><h1 class=\"page-title-elem\" contenteditable=\"true\" data-placeholder=\"Write your title here\"></h1>";
		} else {
			insert += "<article><h1 class=\"page-title-elem\" contenteditable=\"true\">"+title+"</h1>";
		}

		insert += "<input id=\"geotag\" class=\"page-geotag-elem\" placeholder=\"Select your location\"/>";

		if(text == null) {
			insert += "<div class=\"page-desc\" contenteditable=\"true\" data-placeholder=\"Start writing your story here.\"></div></article></div></section>";
		} else {
			insert += "<div class=\"page-desc\" contenteditable=\"true\">"+text+"</div></article></div></section>";
		}

		// no background in this view, but having this allows it to keep between layout switching
		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blankBG.jpg\" style=\"display: none;\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\""+imageURL+"\" style=\"display: none;\"/>";
		}

		$("#create-content").html(insert);
		$(".video-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
		templateId = 7;

		pages.page[currentPage].templateId = templateId;
		pages.page[currentPage].title = title;
		pages.page[currentPage].geotag = geotag;
		pages.page[currentPage].text = text;
		pages.page[currentPage].image = imageURL;
		pages.page[currentPage].video = videoURL;

		// title input limiter
		var titleElem = "page-title-elem";
		titleMax = 69;

		$("." + titleElem).keydown(function(e) { check_charcount(titleElem, titleMax, e); });

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

			var videoURL = "http://player.vimeo.com/video/" + getVimeoId($(this).val()) + "?title=0&amp;byline=0&amp;portrait=0&amp;color=70a1b1";

			if (e.which == 13) {
				$(".video-player-container iframe").attr("src", videoURL);
				$(".video-preview-wrapper .video-picker").hide();
				$(".video-preview-wrapper .photo-picker").show();

				return false;
			}

		});

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");

	}

	// Layout Constants
	// @Gapelia
	// ------------------------------------------------------------------------------------
	window.setInterval(function() {
		if(pages.page[0].templateId!=null&&pagesCreated!=-1){
			console.log("starting to save on page" +currentPage);
			imageURL = $(".page-bg").attr("src");
			title = $(".page-title-elem").html();
			var string = "#page" +currentPage+ "Title";
			text = $(".page-desc").text();
			pages.page[currentPage].templateId = templateId;
			pages.page[currentPage].title = title;
			pages.page[currentPage].geotag = geotag;
			pages.page[currentPage].text = text;
			pages.page[currentPage].image = imageURL;
			pages.page[currentPage].video = videoURL;
		}
	}, 100);

	// Toggle layout switcher
	$("#select-frontcover-layout").click(function ()	{ frontCoverLayout(); });
	$("#select-photo-layout").click(function ()				{ photoLayout(); });
	$("#select-text-layout").click(function ()				{ textLayout(); });
	$("#select-horizontal-layout").click(function ()	{ horizontalLayout(); });
	$("#select-overlay-layout").click(function ()			{ overlayLayout(); });
	$("#select-phototext-layout").click(function ()		{ photoTextLayout(); });
	$("#select-vertical-layout").click(function ()		{ verticalLayout(); });
	$("#select-video-layout").click(function ()				{ videoLayout(); });

	// Right Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#publish-toggle").on("click", function (e) {

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

		if (timedelay == 5) {
			$(".book-creation header, button.photo-picker").fadeOut();
			timedelay = 1;
		}

		timedelay = timedelay + 1;

	}

	$(document).mousemove(function () {

		$(".book-creation header, button.photo-picker").fadeIn();
		timedelay = 1;
		clearInterval(_delay);
		_delay = setInterval(delayCheck, 500);

	});

	// page load starts delay timer
	_delay = setInterval(delayCheck, 500);

	// Placeholders
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

	// .bind("DOMAttrModified change keypress paste focus", ".frontcover-preview-wrapper .page-desc", function() {
	// .on("paste", ".frontcover-preview-wrapper .page-desc", function() {
	/*
	$(document).on("input change keypress paste", ".frontcover-preview-wrapper .page-desc", function() {
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

		setTimeout(function() {
			$(".video-preview input").val($(".pac-container").find(".pac-item").eq(0).text());
		}, 1000);

		if (e.which == 13 && $(".pac-container:visible").length) return false;

	});
	*/

	// Live Preview
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$(document).ready(function() {

		// h1 = page-title-elem // span = livepreview-thing in page thumb
		$(".page-title-elem").keypress(function() {
			$(".livepreview-thing").text($(this).text());
		});

	});
