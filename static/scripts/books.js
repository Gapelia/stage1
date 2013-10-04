
/////////////////////////////////////////////////////////////////////////////////////////// BOOKS.JS //

$(document).ready(function() {

	var $sidebar = $("#page-sidebar");
	var $storyFrontPage = $(".fv-frontcover #story-content");
	var $story = $("#story-content");
	var $wikiWindow = $("#wiki-window");

	var $vb = $("#vertical-bg");
	var $wide = $(".wide");

	// var $coverInfo = $(".cover-info");

	var $navPrev = $(".previous");
	var $navNext = $(".next");

	var $layoutMenu = $(".cbp-spmenu-vertical");
	// var $layoutTrigger = $("#layout-toggle");

	$(function () {

		// centering!
		// $coverInfo.css("marginLeft", -+$coverInfo.width() / 2);
		// $coverInfo.css("marginTop", -+$coverInfo.height() / 2);

		/*
		$coverInfo.css({
			"top": "50%",
			"left": "50%",
			"position": "absolute"
		});
		*/

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

	$("#publish-toggle").click(function (e) {
		$("#publish-scroller").toggle();
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

	// $("button.photo-picker").html().text("Change Photo");

	(function () {
		// document.getElementByClassName("photo-picker").innerHTML+=("Change Video");

		var d = function (d) { document.getElementByClassName("photo-picker").innerHTML = d.getAttribute("data-fp-button-text") || d.getAttribute("data-fp-text") || "Change Video"; };
		var e = function (d) { document.getElementByClassName("photo-picker").innerHTML = d.getAttribute("data-fp-button-text") || d.getAttribute("data-fp-text") || "Change Video"; };
	})();

	$(function () {
		// $(".frontcover-preview-wrapper button").innerHTML+=("Change Video");

		/*
		function reactieID(a,b,c,d) {
			document.getElementById('myModal').innerHTML+=('<div class="subtitel">Reactie</div>');
			document.getElementById('myModal').innerHTML+=('<input hidden="hidden" name="a" type="text" value="'+a+'" />');
			document.getElementById('myModal').innerHTML+=('<input hidden="hidden" name="b" type="text" value="'+b+'" />');
			document.getElementById('myModal').innerHTML+=('<input hidden="hidden" name="c" type="text" value="'+c+'" />');
			document.getElementById('myModal').innerHTML+=('<input hidden="hidden" name="d" type="text" value="'+d+'" />');
			document.getElementById('myModal').innerHTML+=('<input size="80" name="reactie" type="text" class="textfield" />');
			document.getElementById('myModal').innerHTML+=('<input type="submit" value="Toevoegen" />');
			document.getElementById('myModal').innerHTML+=('<a class="close-reveal-modal">&#215;</a>');
		}
		*/

		/*
		filepicker.extend("widgets", function () {

			var d = function (d) {
				e.innerHTML = d.getAttribute("data-fp-button-text") || d.getAttribute("data-fp-text") || "Change Video";
			}

			var e = function (d) {
				i.innerHTML = d.getAttribute("data-fp-button-text") || "Change Video";
			}

		});
		*/
	});

	/*
	$(".video-preview input").keydown(function () {
		var $listItem = $(".pac-item");
		this.style.width = (($listItem.value.length + 8) * 8) + "px";

		// this.style.width = ((this.value.length + 8) * 8) + "px";
		// this.style.width = .pac-item, .pac-item-refresh

		// this.style.width = $().width();
		// this.css("min-width", $(".pac-item").width() + "px");
		// this.css("min-width", $(".pac-item").value.length() + "px");

		// $navNext.css("margin-top", $(window).height() / 2 - 50 + "px");
	});
	*/

	// $(".video-preview input").val($(".pac-container").find(".pac-item").eq(0).text());

	$(".video-preview input").keydown(function (e) {
		setTimeout(function() {
			$(".video-preview input").val($(".pac-container").find(".pac-item").eq(0).text());
		}, 1000);

		if (e.which == 13 && $(".pac-container:visible").length) return false;
	});

});
