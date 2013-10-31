
	// Book Creation
	// @Gapelia
	// ====================================================================================
	// Left Menus | Layout and page interaction | Right Menus | Content Creation

	// Globals
	var $vW = $(window).width(), $vH = $(window).height();

	// Set menu height, necessary for scrollbar plugin
	$("#pages-scroller").css("height", $vH - 52 + "px");
	$("#layout-scroller").css("height", $vH - 52 + "px");
	$("#comments-scroller").css("height", $vH - 52 + "px");

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

	// Clicking on a page in menu opens layout menu
	$("#pages-scroller ul li").click(function (e) {

		$("#pages-scroller").css("left", "-150px");
		$("#layout-scroller").css("left", "0");
		e.preventDefault();

	});

	// Toggle layout switcher
	$("#select-frontcover-layout").click(function (e) {

		$("#test-frontcover").toggle();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();
		e.preventDefault();

	});

	$("#select-photo-layout").click(function (e) {

		$("#test-frontcover").hide();
		$("#test-photo").toggle();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-vertical").hide();
		$("#test-video").hide();

		// Google Maps Autocomplete list positioning
		$(".pac-container").css("margin-top", "-210px").css("position", "absolute");
		e.preventDefault();

	});

	$("#select-text-layout").click(function (e) {

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
		$("#publish-header").css("width", 200 + "px");
		// #publish-header select
		e.preventDefault();
	});

	$("#publish-scroller").mouseleave(function() {
		$("#publish-scroller").css("right", "-200px");
	});

	// Content Creation
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Hide editor controls when typing, show when mouse moves
	var interval = window.setInterval(function () {
	}, 1000);

	document.onkeypress = function () {
		$("#back, #finish").fadeOut("fast");
		window.clearInterval(interval);
	};

	document.onmousemove = function () {
		$("#back, #finish").fadeIn("fast");
	};

	//
	(function ($) {
		var map = new Array();

		$.Watermark = {
			ShowAll: function () {

				for (var i = 0; i < map.length; i++) {
					if (map[i].obj.val() === "") {
						map[i].obj.val(map[i].text);
						map[i].obj.css("color", map[i].WatermarkColor);
					} else {
						map[i].obj.css("color", map[i].DefaultColor);
					}
				}

			},
			HideAll: function () {

				for (var i = 0; i < map.length; i++) {
					if (map[i].obj.val() == map[i].text)
						map[i].obj.val("");
				}

			}
		};

		$.fn.Watermark = function (text, color) {

			if (!color)
				color = "#191919";
			return this.each(
				function () {

					var input = $(this);
					var defaultColor = input.css("color");

					map[map.length] = {
						text: text,
						obj: input,
						DefaultColor: defaultColor,
						WatermarkColor: color
					};

					function clearMessage() {

						if (input.val() == text)
							input.val("");
						input.css("color", defaultColor);

					}

					function insertMessage() {

						if (input.val().length === 0 || input.val() == text) {
							input.val(text);
							input.css("color", color);
						} else
							input.css("color", defaultColor);

					}

					input.focus(clearMessage);
					input.blur(insertMessage);
					input.change(insertMessage);

					insertMessage();

				}
			);

		};
	})(jQuery);

	jQuery(function($) {

		jQuery.Watermark.ShowAll()
		$(".page-title-elem").Watermark("Type your title here");
		$(".page-desc").Watermark("Type your description here.");

	});

  // $('form').find("input[type=textarea], input[type=password], textarea").each(function(ev) {
	/*
	$("h1").each(function(ev) {

		if(!$(this).val()) {
			$(this).html("Type your title here");
		}

		$(this).keydown(function() {
			$(this).html("");
		});

  });
	*/

	// Hide Placeholders When Typing
	/*
	$(".frontcover-preview .page-title-elem").keydown(function (e) {
		$(".frontcover-preview .page-title-elem .placeholder").remove();
	});
	*/

	/*
	$(".frontcover-preview .page-desc").keydown(function (e) {
		$(".frontcover-preview .page-desc .placeholder").hide();
	});

	$(".video-preview input").keydown(function (e) {
		setTimeout(function() {
			$(".video-preview input").val($(".pac-container").find(".pac-item").eq(0).text());
		}, 1000);

		if (e.which == 13 && $(".pac-container:visible").length) return false;
	});
	*/
