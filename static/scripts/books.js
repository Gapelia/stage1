
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

	/*
	$("body").stop(function() {
		$(".book-creation header").fadeOut(850);
	});
	*/

	/*
	var hideThis = setTimeout(function() {
		hideNav();
	}, 2000);
	*/

	/*
	function hideNav() {
		$("body").stop().fadeOut(1000);
		var headerControls = $(".book-creation header");

		if (headerControls.length) {
			headerControls.fadeOut(1000);
		}
	}

	function showNav() {
		$("body").stop().fadeIn(1000);
		var headerControls = $(".book-creation header");

		if (headerControls.length) {
			headerControls.fadeIn(1000);
		}
	}

	$("body").mousemove(function() {
		clearTimeout(hideThis);

		var hideThis = setTimeout(function() {
			hideNav();
		}, 2000);

		showNav();
	});
	*/

	// $("#menu").hide();
	/*
	var i = null;

	$("body").mousemove(function() {
		clearTimeout(i);
		$(".book-creation header").show();
		i = setTimeout('$(".book-creation header").hide();', 10000);
	}).mouseleave(function() {
		clearTimeout(i);
		$(".book-creation header").hide();
	});
	*/

	/*
	var hideTimer = null;

	$(".book-creation header").bind("mouseleave", function() {
		hideTimer = setTimeout(function() {
			// Code to hide menu goes here
			$(".book-creation header").hide();
		}, 1000);
	});

	$(".book-creation header").bind("mouseenter", function() {
		if (hideTimer !== null) {
			clearTimeout(hideTimer);
		}
	});
	*/

	/*
	$("body").mousemove(function() {
		$("#back, #finish").show();
	}).mousestop(function() {
		$("#back, #finish").fadeOut(850);
	});
	*/

	$("body").mousemove(function(e) {
		// $("#back, #finish").fadeIn(0);
		$("#back, #finish").show(0);
	});

	$("body").mousestop(function(e) {
		// $("#back, #finish").fadeOut(0);
		$("#back, #finish").hide(0);
	});

	/*
	$(".book-creation header").mouseleave(function() {
		$("#back, #finish").fadeOut(850);
	});

	$(".book-creation header").mouseenter(function() {
		$("#back, #finish").fadeIn(250);
		// $("#pages-scroller, #layout-scroller, #comments-scroller").fadeIn(0);
	});

	/*
	$("#back").mouseenter(function() {
		$("#pages-scroller, #layout-scroller, #comments-scroller").fadeIn(0);
	});
	*/

});
