
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

		$(this).addClass("selected-layout");

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
		e.preventDefault();

	});

	$("#select-photo-layout").click(function (e) {

		$(this).addClass("selected-layout");

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
	/*
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
	*/

  // $('form').find("input[type=textarea], input[type=password], textarea").each(function(ev) {

	$("#test-frontcover .page-title-elem").each(function() {

		$(this).keydown(function() {
			// $(this).html("");
			$(".page-title-elem .placeholder").remove();
		});

		if($(this).val() === '') {
			$(this).html('<span class="placeholder">Write your title here</span>');
		}

		/*
		if ($(this).val() === "")
			$(this).val(placeholder);
		*/

		/*
		// $(this).keyup(function() {
		setTimeout(function() {
			// if($.trim($(this).val()) == '') $(this).html('<span class="placeholder">Write your title here</span>');

			if($(this).html()) {
				$.trim($(this).html()) === "";
				$(this).html('<span class="placeholder">Write your title here</span>');
			}
		}, 3000);
		*/

		// if($.trim($(this).val()) == '') $(this).html('<span class="placeholder">Write your title here</span>');

		/*
		if ($(this).html() == '') {
			$(this).html('<span class="placeholder">Write your title here</span>');
		}
		*/

		/*
		if($(this).html()) {
			$.trim($(this).html()) === "";
			$(this).html('<span class="placeholder">Write your title here</span>');
		}
		*/

  });

	// $(".page-title-elem").data('fileid');

	// Hide Placeholders When Typing
	$(".page-title-elem").keydown(function (e) {
		// $(".page-title-elem .placeholder").remove();
		// $(".page-title-elem").html("");
		// $(".page-title-elem").text(val);
	});

	$(".page-desc").keydown(function (e) {
		$(".page-desc .placeholder").hide();
	});

	/*
	var h1placeholder = $(".page-title-elem").data("default-value");
	$(".page-title-elem").text(h1placeholder);

	$(".page-title-elem").each(function () {

		var search_type = $(this).attr("data-default-value");

		$(this).keyup(function (e) {

			var params = {
				'search_type': search_type, 'q': $(this).val()
			};

			$('.page-title-elem').text(params.q);

		});

	});
	*/

	$(".video-preview input").keydown(function (e) {
		setTimeout(function() {
			$(".video-preview input").val($(".pac-container").find(".pac-item").eq(0).text());
		}, 1000);

		if (e.which == 13 && $(".pac-container:visible").length) return false;
	});
