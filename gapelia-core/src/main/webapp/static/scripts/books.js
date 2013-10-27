/////////////////////////////////////////////////////////////////////////////////////////// BOOKS.JS //

$(document).ready(function() {

	$("#pages-toggle").click(function (e) {
		$("#pages-scroller").toggle();
		$("#layout-scroller").hide();
		$("#comments-scroller").hide();
		e.preventDefault();
	});

	$("#layout-toggle").click(function (e) {
		$("#layout-scroller").toggle();
		$("#pages-scroller").hide();
		$("#comments-scroller").hide();
		e.preventDefault();
	});

	$("#comments-toggle").click(function (e) {
		$("#comments-scroller").toggle();
		e.preventDefault();
	});

	$("#publish-toggle").click(function (e) {
		$("#publish-scroller").toggle();
		$("#pages-scroller").hide();
		$("#layout-scroller").hide();
		e.preventDefault();
	});

	// clicking on a page opens layout menu
	$("#pages-scroller ul li").click(function (e) {
		$("#pages-scroller").toggle();
		$("#layout-scroller").toggle();
		e.preventDefault();
	});

	$("#pages-scroller").mouseleave(function() {
		$("#pages-scroller").fadeOut(850);
	});

	$("#layout-scroller").mouseleave(function() {
		$("#layout-scroller").fadeOut(850);
	});

	$("#comments-scroller").mouseleave(function() {
		$("#comments-scroller").fadeOut(850);
	});

	// set menu height
	$("#pages-scroller").css("height", $(window).height() - 52 + "px");
	$("#layout-scroller").css("height", $(window).height() - 52 + "px");
	$("#comments-scroller").css("height", $(window).height() - 52 + "px");

	// toggle layout switcher
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

});
