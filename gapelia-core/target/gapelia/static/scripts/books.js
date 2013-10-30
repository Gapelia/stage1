
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

	// Hide Placeholders When Typing
	$(".page-title-elem").keydown(function (e) {
		$(".page-title-elem .placeholder").hide();
	});

	$(".page-desc").keydown(function (e) {
		$(".page-desc .placeholder").hide();
	});

	$(".video-preview input").keydown(function (e) {
		setTimeout(function() {
			$(".video-preview input").val($(".pac-container").find(".pac-item").eq(0).text());
		}, 1000);

		if (e.which == 13 && $(".pac-container:visible").length) return false;
	});
