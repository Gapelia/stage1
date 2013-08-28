
/////////////////////////////////////////////////////////////////////////////////////////// BOOKS.JS //

$(document).ready(function() {
	var $sidebar = $("#page-sidebar");
	var $storyFrontPage = $(".fv-frontcover #story-content");
	var $story = $("#story-content");
	var $wikiWindow = $("#wiki-window");

	var $vb = $("#vertical-bg");
	var $wide = $(".wide");

	var $navPrev = $(".previous");
	var $navNext = $(".next");

	$(function () {
		$sidebar.css("top", $(window).height() / 2.5 + "px");
		$storyFrontPage.css("margin-top", $(window).height() / 1.55 - $storyFrontPage.height() + "px");
		$storyFrontPage.css("margin-left", $(window).width() / 1.275 - $storyFrontPage.width() + "px");
		$wikiWindow.css("height", $(window).height() - 70 + "px");

		$vb.css("margin-left", $vb.width() + $story.width() - $(window).width() / 2 + 65 + "px");
		$wide.css("margin-top", $wide.height() - $(window).height() / 2.5 + "px");

		$navPrev.css("margin-top", $(window).height() / 2 - 50 + "px");
		$navNext.css("margin-top", $(window).height() / 2 - 50 + "px");
	});

	$("#book-wiki").click(function (e) {
		$("#wiki-window").toggle();
		e.preventDefault();
	});
});
