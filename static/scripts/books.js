
/////////////////////////////////////////////////////////////////////////////////////////// BOOKS.JS //

$(document).ready(function() {
	var $sidebar = $("#page-sidebar");
	var $storyFrontPage = $(".fv-frontcover #story-content");
	var $story = $("#story-content");
	var $wikiWindow = $("#wiki-window");
	var $layoutMenu = $(".cbp-spmenu-vertical");

	var $vb = $("#vertical-bg");
	var $wide = $(".wide");

	var $navPrev = $(".previous");
	var $navNext = $(".next");

	$(function () {
		// centering!
		$storyFrontPage.css("marginLeft", -+$storyFrontPage.width() / 2);
		$storyFrontPage.css("marginTop", -+$storyFrontPage.height() / 2);

		$storyFrontPage.css({
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
	});

	$("#book-wiki").click(function (e) {
		$("#wiki-window").toggle();
		e.preventDefault();
	});
});
