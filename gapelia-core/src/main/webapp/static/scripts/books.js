
	// Book Creation
	// @Gapelia
	// ====================================================================================
	// Left Menus | Layout and page interaction | Right Menus | Content Creation
	// Live Preview

	// Globals
	var $vW = $(window).width(), $vH = $(window).height();
	var author, pageNumber, text, imageURL, videoURL, templateId, title, index, pages, book, pages, one;

	/*
	var
	// geotag01 = document.getElementById("geotag-01"),
	geotag01 = document.getElementsByClassName("page-geotag-elem"),
	geotag02 = document.getElementById("geotag-02"),
	geotag03 = document.getElementById("geotag-03"),
	geotag04 = document.getElementById("geotag-04"),
	geotag05 = document.getElementById("geotag-05"),
	geotag06 = document.getElementById("geotag-06"),
	geotag07 = document.getElementById("geotag-07"),
	geotag08 = document.getElementById("geotag-08"),
	geotag09 = document.getElementById("geotag-09"),
	geotag10 = document.getElementById("geotag-10"),
	geotag11 = document.getElementById("geotag-11"),
	geotag12 = document.getElementById("geotag-12"),
	geotag13 = document.getElementById("geotag-13"),
	geotag14 = document.getElementById("geotag-14"),
	geotag15 = document.getElementById("geotag-15"),
	geotag16 = document.getElementById("geotag-16"),
	geotag17 = document.getElementById("geotag-17"),
	geotag18 = document.getElementById("geotag-18"),
	geotag19 = document.getElementById("geotag-19"),
	geotag20 = document.getElementById("geotag-20");

	autocomplete01 = new google.maps.places.Autocomplete(geotag01);
	autocomplete02 = new google.maps.places.Autocomplete(geotag02);
	autocomplete03 = new google.maps.places.Autocomplete(geotag03);
	autocomplete04 = new google.maps.places.Autocomplete(geotag04);
	autocomplete05 = new google.maps.places.Autocomplete(geotag05);
	autocomplete06 = new google.maps.places.Autocomplete(geotag06);
	autocomplete07 = new google.maps.places.Autocomplete(geotag07);
	autocomplete08 = new google.maps.places.Autocomplete(geotag08);
	autocomplete09 = new google.maps.places.Autocomplete(geotag09);
	autocomplete10 = new google.maps.places.Autocomplete(geotag10);
	autocomplete11 = new google.maps.places.Autocomplete(geotag11);
	autocomplete12 = new google.maps.places.Autocomplete(geotag12);
	autocomplete13 = new google.maps.places.Autocomplete(geotag13);
	autocomplete14 = new google.maps.places.Autocomplete(geotag14);
	autocomplete15 = new google.maps.places.Autocomplete(geotag15);
	autocomplete16 = new google.maps.places.Autocomplete(geotag16);
	autocomplete17 = new google.maps.places.Autocomplete(geotag17);
	autocomplete18 = new google.maps.places.Autocomplete(geotag18);
	autocomplete19 = new google.maps.places.Autocomplete(geotag19);
	autocomplete20 = new google.maps.places.Autocomplete(geotag20);
	*/

	// Set menu height, necessary for scrollbar plugin
	$("#pages-scroller").css("height", $vH - 52 + "px");
	$("#layout-scroller").css("height", $vH - 52 + "px");
	// $("#comments-scroller").css("height", $vH - 52 + "px");

	// will need to check/change these heights later
	$(".text-preview-wrapper .page-desc").css("height", $vH - 165 + "px");
	$(".phototext-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".vertical-preview-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".video-preview-wrapper .page-desc").css("height", $vH - 185 + "px");

	$(document).ready(function () {

		// geotag = document.getElementById("geotag");
		// geotag = document.getElementsByClassName("geotag");
		// autocomplete = new google.maps.places.Autocomplete(geotag);

 		book = {
			"author" : "AUTHOR",
			"title" : null,
			"library" : "NULL",
			"dimension" : "NULL"
		};

 		pages = {
			"page" : [{
				"pageNumber" : 0,
				// "geotag" : geotag,
				"geotag" : null,
				"templateId" : "0",
				"title" : null,
				"text" : null,
				"image" : "/static/images/blank-bg.jpg",
				// "video" : "NULL"
				"video" : ""
			}]
		};

		index = 0;
		author = book.author;
		pageNumber = pages.page[index].pageNumber;
		text = pages.page[index].text;
		imageURL = pages.page[index].image;
		videoURL = pages.page[index].video;
		templateId = pages.page[index].templateId;
		title = pages.page[index].title;
		pages = 1;
		one = 1;

	});

	// Left Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#pages-toggle").click(function (e) {
		$("#pages-scroller").css("left", "0");
		e.preventDefault();
	});

	$("#layout-toggle").click(function (e) {
		$("#layout-scroller").css("left", "0");
		e.preventDefault();
	});

	$("#comments-toggle").click(function (e) {
		$("#comments-scroller").css("left", "0");
		e.preventDefault();
	});

	$("#pages-scroller").mouseleave(function() {
		$("#pages-scroller").css("left", "-150px");
	});

	$("#layout-scroller").mouseleave(function() {
		$("#layout-scroller").css("left", "-150px");
	});

	$("#comments-scroller").mouseleave(function() {
		$("#comments-scroller").css("left", "-150px");
	});

	// Layout and page interaction
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#add-page").click(function (e) {

		$(this).before($("<li draggable='true'></li>").html("<a href='#' class='delete-page entypo'>&#9749;</a><a href=''><img src='static/images/new-page-thumb.png' id='page-##-thumb' alt=''/><span>## &middot; New Page</span></a>"));
		e.preventDefault();

	});

	$(".delete-page").click(function (e) {

		$(this).closest("li").remove();
		e.preventDefault();

	});

	// Clicking on a page in menu opens layout menu
	$("#pages-scroller ul li img").click(function (e) {

		$("#pages-scroller").css("left", "-150px");
		$("#layout-scroller").css("left", "0");
		e.preventDefault();

	});

	// Toggle layout switcher
	$("#select-frontcover-layout").click(function (e) {

		$(this).addClass("selected-layout");
		// $(selector).not(".white")
		// $(selector).is(":not(.white)")

		var
		insert = "",
		imageURL = $(".page-bg").attr("src"),
		title = $(".page-title-elem").text(),
		text = $(".page-desc").text();

		insert+="<section class=\"frontcover-preview-wrapper\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blank-bg.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" +imageURL+ "\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.page-bg').attr('src', url);\"></div>";

		if(title == null) {
			insert += '<div class=\"frontcover-preview\"><article><h1 class=\"page-title-elem\" placeholder=\"Write your title here\" contenteditable=\"true\"></h1>';
		} else {
			insert += '<div class=\"frontcover-preview\"><article><h1 id=\"theTitle\" class=\"page-title-elem\" contenteditable=\"true\">' +title+ "</h1>";
		}

		if(text == null) {
			insert += '<h5 contenteditable=\"false\"><span>*' +author+ '*</span></h5><div class=\"page-desc\" placeholder=\"Start writing your story here.\" contenteditable=\"true\"></div></article></div></section>';
		} else {
			insert += '<h5 contenteditable=\"false\"><span>*' +author+ '*</span></h5><div class=\"page-desc\" contenteditable=\"true\">' +text+ '</div></article></div></section>';
		}

		$("#create-content").html(insert);
		templateId = 0;

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		e.preventDefault();

		/*
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").toggle();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();
		*/

	});

	$("#select-photo-layout").click(function (e) {

		$(this).addClass("selected-layout");

		var
		insert = "",
		imageURL = $(".page-bg").attr("src"),
		title = $(".page-title-elem").text(),
		text = $(".page-desc").text();
		// geotag = $("page-geotag-elem");

		insert += "<section class=\"photo-preview-wrapper\">";

		if(imageURL == null) {
			insert += "<img class=\"page-bg\" src=\"static/images/blank-bg.jpg\"/>";
		} else {
			insert += "<img class=\"page-bg\" src=\"" +imageURL+ "\"/>";
		}

		insert += "<div class=\"button-wrapper\"><input class=\"photo-picker\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.page-bg').attr('src', url);\"></div>";

		if(title == null) {
			insert += '<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" placeholder=\"Write your title here\" contenteditable=\"true\"></h1>';
		} else {
			insert += '<div class=\"photo-preview\"><article><h1 class=\"page-title-elem\" contenteditable=\"true\">' +title+ "</h1>";
		}

		insert += '<input class=\"page-geotag-elem\" placeholder=\"Select your location\"/>';

		/*
		var incrementVar = 0;

		// var value = parseInt($(":text[name='qty']").val()) + 1;
		var value = 0 + 1;
		$(".page-geotag-elem").attr("id", "geotag" + value);
		incrementVar = incrementVar + value;
		*/

		if(text == null) {
			insert += '<div class=\"page-desc\" contenteditable=\"true\" placeholder=\"Start writing your story here.\"></div></article></div></section>';
		} else {
			insert += '<div class=\"page-desc\" contenteditable=\"true\">' +text+ '</div></article></div></section>';
		}

		$("#create-content").html(insert);
		templateId = 1;

		geotag = document.getElementsByClassName("page-geotag-elem");
		autocomplete = new google.maps.places.Autocomplete(geotag);

		var element = $(".photo-picker");
		element = element[0];
		element.type = "filepicker";
		filepicker.constructWidget(element);

		/*
		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").toggle();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();
		*/

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");
		e.preventDefault();

	});

	$("#select-text-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").toggle();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	$("#select-horizontal-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").toggle();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");
		// $(".pac-item").css("text-align", "center");
		e.preventDefault();

	});

	$("#select-overlay-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").toggle();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	$("#select-phototext-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").toggle();
		$("#test-vertical").hide();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	$("#select-vertical-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-video-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").toggle();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	$("#select-video-layout").click(function (e) {

		$(this).addClass("selected-layout");

		$("#select-frontcover-layout").removeClass("selected-layout");
		$("#select-photo-layout").removeClass("selected-layout");
		$("#select-text-layout").removeClass("selected-layout");
		$("#select-horizontal-layout").removeClass("selected-layout");
		$("#select-overlay-layout").removeClass("selected-layout");
		$("#select-phototext-layout").removeClass("selected-layout");
		$("#select-vertical-layout").removeClass("selected-layout");

		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").toggle();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "0").css("position", "relative");
		e.preventDefault();

	});

	// Right Menus
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$("#publish-toggle").click(function (e) {

		$("#publish-scroller").css("right", "0");
		e.preventDefault();

	});

	$("#publish-scroller, .selectize-control").mouseleave(function() {
		$("#publish-scroller").css("right", "-200px");
	});

	$("#publish-scroller .selectize-control .item").mouseover(function() {
		// $("#publish-scroller").css("right", "0");
	});

	// Content Creation
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Hide editor controls when typing, show when mouse moves
	/*
	var interval = window.setInterval(function () {
	}, 1000);

	document.onkeypress = function () {
		$("#back, #finish").fadeOut("fast");
	};

	document.onmousemove = function () {
		$("#back, #finish").fadeIn("fast");
		window.clearInterval(interval);
	};
	*/

	$("article").keyup(function () {
		setTimeout(function() {
			$("#back, #finish").fadeOut("slow");
		}, 1000);
	});

	$("body").on("mousemove", function () {
		$("#back, #finish").fadeIn("fast");
	});

	////
	// .css("color", "#999")
	// .css("color", "#191919")

	(function ($) {
		$(function () {

			$('[contenteditable="true"]').blur(function () {

				var text = $.trim($(this).text());

				var ph = $('<span/>', {
					'class': "placeholder"
				}).text($(this).data('placeholder') || '');

				if (text === '') {
					$(this).html(ph);
				}

			}).focus(function () {

				if ($(this).children('.placeholder').length > 0) {
					$(this).html('<span>&nbsp;</span>');
				}

			});

		});
	})(jQuery);

	/*
	$(".page-title-elem").each(function() {

		$(this).html($(this).data('placeholder'));

		$(this).keydown(function () {
			if ($(this).html() == $(this).data('placeholder')) {
				$(this).html('');
			}
		})

		$(this).keyup(function () {
			if ($(this).html() == '') {
				$(this).html($(this).data('placeholder'));
			}
		})

  });

	$(".page-desc").each(function() {

		$(this).html($(this).data('placeholder'));

		$(this).keydown(function () {
			if ($(this).html() == $(this).data('placeholder')) {
				$(this).html('');
			}
		})

		 $(this).keyup(function () {
			if ($(this).html() == '') {
				$(this).html($(this).data('placeholder'));
			}
		})

  });
	*/

	$(".video-preview input").keydown(function (e) {
		setTimeout(function() {
			$(".video-preview input").val($(".pac-container").find(".pac-item").eq(0).text());
		}, 1000);

		if (e.which == 13 && $(".pac-container:visible").length) return false;
	});

	// Live Preview
	// @Gapelia
	// ------------------------------------------------------------------------------------

	$(document).ready(function() {

		// h1 = page-title-elem // span = livepreview-thing in page thumb
		$(".page-title-elem").keypress(function() {
			$(".livepreview-thing").text($(this).text());
		});

	});

	// Book Enjoyment
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// $("#the-book").css("height", $vH + "px");

	$(".content").css({
		"width": $vW + "px",
		"height": $vH + "px"
	});

	$(".phototext-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".text-wrapper .page-desc").css("height", $vH - 165 + "px");
	$(".vertical-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".video-wrapper .page-desc").css("height", $vH - 185 + "px");

	$(".phototext-wrapper .page-desc, .text-wrapper .page-desc, .vertical-wrapper .page-desc, .video-wrapper .page-desc").ready(function() {
		$(".sp-scrollbar").css({
			"display": "block",
			"height": 100 + "%"
		});
	});

	$(".phototext-wrapper .page-desc, .text-wrapper .page-desc, .vertical-wrapper .page-desc, .video-wrapper .page-desc").ready(function() {
		$(".sp-thumb").css("height", 10 + "px");
	});

	// Calculate half of viewport height minus half the height of the prev/next buttons
	$("#bb-nav-prev, #bb-nav-next").css("top", $vH / 2 - 32 + "px");
	
	$("#header-toggle").click(function () {

		$(this).css({
			"opacity": "0",
			"top": "-50px"
		});

		$("#next-book-toggle").css({
			"opacity": "0",
			"top": "-50px"
		});

		$(".full-book header").css("top", "0");

		$("#g-menu-toggle").css({
			"width": "30px",
			"height": "30px",
			"background-size": "30px",
			"top": "0.6rem"
		});

	});

	$(".full-book header").mouseleave(function () {

		$(this).css("top", "-50px");

		$("#header-toggle").css({
			"opacity": "1",
			"top": "0"
		});

		$("#next-book-toggle").css({
			"opacity": "1",
			"top": "0"
		});

		$("#g-menu-toggle").css({
			"width": "61px",
			"height": "61px",
			"background-size": "61px",
			"top": "1rem"
		});

	});

	// MUST FIX!!!
	/*
	$(".back-cover").mousemove(function() {
	// $(".back-cover").ready(function() {

		if ($(".back-cover").css("display")) {
			$("#header-toggle").css({
				"opacity": "0",
				"top": "-50px"
			});

			$("#next-book-toggle").css({
				"opacity": "0",
				"top": "-50px"
			});

			$("#bb-nav-next").css({
				"opacity": "0",
				"right": "-50px"
			});
		}

		// if $('.back-cover').css('display');

	});
	*/

	// MUST FIX!!!
	// $(".back-cover").mousemove(function() {

	$(function() {
		setTimeout(function() {

			if ($("#page1[style*='display:block']")) {
				// if ($("#page1").attr("style") == "block") {
				$("#bb-nav-prev").hide();
			} else {
				$("#bb-nav-prev").show();
			}

			/*
			$(".front-cover").ready(function() {

				if ($(".back-cover").css("display")) {
					$("#bb-nav-prev").css({
						"opacity": "0",
						"right": "-50px"
					});
				}

			});

			$(".back-cover").ready(function() {

				if ($(".back-cover").css("display")) {
					$("#header-toggle").css({
						"opacity": "0",
						"top": "-50px"
					});

					$("#next-book-toggle").css({
						"opacity": "0",
						"top": "-50px"
					});

					$("#bb-nav-next").css({
						"opacity": "0",
						"right": "-50px"
					});
				}

			});
			*/

		}, 30);
	});

	/*
	$(".back-cover").ready(function() {

		if ($(".back-cover").css("display")) {
			$("#header-toggle").css({
				"opacity": "0",
				"top": "-50px"
			});

			$("#next-book-toggle").css({
				"opacity": "0",
				"top": "-50px"
			});

			$("#bb-nav-next").css({
				"opacity": "0",
				"right": "-50px"
			});
		}

		// if $('.back-cover').css('display');

	});
	*/

	$(".video-preview .play-video").click(function () {

		$(this).hide();
		$(".video-player-container img").hide();
		$(".video-player-container iframe").show();

	});
