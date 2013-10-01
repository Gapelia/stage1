
/////////////////////////////////////////////////////////////////////////////////////////// BOOKS.JS //

$(document).ready(function() {

	var $sidebar = $("#page-sidebar");
	var $storyFrontPage = $(".fv-frontcover #story-content");
	var $story = $("#story-content");
	var $wikiWindow = $("#wiki-window");

	var $vb = $("#vertical-bg");
	var $wide = $(".wide");

	var $coverInfo = $(".cover-info");

	var $navPrev = $(".previous");
	var $navNext = $(".next");

	var $layoutMenu = $(".cbp-spmenu-vertical");
	// var $layoutTrigger = $("#layout-toggle");

	$(function () {

		// centering!
		$coverInfo.css("marginLeft", -+$coverInfo.width() / 2);
		$coverInfo.css("marginTop", -+$coverInfo.height() / 2);

		$coverInfo.css({
			"top": "50%",
			"left": "50%",
			"position": "absolute"
		});

		$sidebar.css("top", $(window).height() / 2.5 + "px");
		$wikiWindow.css("height", $(window).height() - 70 + "px");

		$vb.css("margin-left", $vb.width() + $story.width() - $(window).width() / 2 + 65 + "px");
		$wide.css("margin-top", $wide.height() - $(window).height() / 2.5 + "px");

		$navPrev.css("margin-top", $(window).height() / 2 - 50 + "px");
		$navNext.css("margin-top", $(window).height() / 2 - 50 + "px");

		$layoutMenu.css("height", $(window).height() - 69 + "px").css("margin-top", 50 + "px");
		// $layoutTrigger.css("top", $(window).height() / 2 - 25 + "px");

	});

	$("#book-wiki").click(function (e) {
		$("#wiki-window").toggle();
		e.preventDefault();
	});

	/////

	$("#pages-toggle").click(function (e) {
		$("#pages-scroller").toggle();
		e.preventDefault();
	});

	$("#layout-toggle").click(function (e) {
		$("#layout-scroller").toggle();
		e.preventDefault();
	});

	$("#comments-toggle").click(function (e) {
		$("#comments-scroller").toggle();
		e.preventDefault();
	});

	// clicking on a page opens layout menu
	$("#pages-scroller ul li").click(function (e) {
		$("#pages-scroller").toggle();
		$("#layout-scroller").toggle();
		e.preventDefault();
	});

	/*
	// show pohelp
	$("#pohelplink, #pohelp").mouseenter(function () {
		$("#pohelplink").css({ "z-index": "1110" });
		$("#pohelp").fadeIn();
	});

	// hide pohelp on mouse out from pohelp
	$("#pohelp").mouseleave(function() {
		$("#pohelp").fadeOut();
		$("#pohelplink").css({ "z-index": "1095" });
	});
	*/

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
	$("#pages-scroller").css("height", $(window).height() - 45 + "px");
	$("#layout-scroller").css("height", $(window).height() - 45 + "px");
	$("#comments-scroller").css("height", $(window).height() - 45 + "px");

	// toggle layout switcher
	$("#select-frontcover-layout").click(function (e) {
		$("#test-frontcover").toggle();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-integrated").hide();
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
		$("#test-integrated").hide();
		$("#test-video").hide();
		e.preventDefault();
	});

	$("#select-text-layout").click(function (e) {
		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").toggle();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-integrated").hide();
		$("#test-video").hide();
		e.preventDefault();
	});

	$("#select-horizontal-layout").click(function (e) {
		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").toggle();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-integrated").hide();
		$("#test-video").hide();
		e.preventDefault();
	});

	$("#select-overlay-layout").click(function (e) {
		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").toggle();
		$("#test-phototext").hide();
		$("#test-integrated").hide();
		$("#test-video").hide();
		e.preventDefault();
	});

	$("#select-phototext-layout").click(function (e) {
		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").toggle();
		$("#test-integrated").hide();
		$("#test-video").hide();
		e.preventDefault();
	});

	$("#select-integrated-layout").click(function (e) {
		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-integrated").toggle();
		$("#test-video").hide();
		e.preventDefault();
	});

	$("#select-video-layout").click(function (e) {
		$("#test-frontcover").hide();
		$("#test-photo").hide();
		$("#test-text").hide();
		$("#test-horizontal").hide();
		$("#test-overlay").hide();
		$("#test-phototext").hide();
		$("#test-integrated").hide();
		$("#test-video").toggle();
		e.preventDefault();
	});

	// Hide Editor Controls When Typing, Show When Mouse Moves
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

});
