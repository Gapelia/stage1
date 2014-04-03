
// this is not being used
function readCookie(name) {

	var nameEQ = name + "=";
	var ca = document.cookie.split(";");

	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);

		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}

	return null;

}

function configureBook() {

	var $vW = $(window).width(), $vH = $(window).height();

	$(".content").css({
		"width": $vW + "px",
		"height": $vH + "px"
	});

	$(".fluid-wrapper").imgLiquid({ fill: true });
	$(".overlay-wrapper").imgLiquid({ fill: true });
	$(".phototext-wrapper").imgLiquid({ fill: true });
	$(".vertical-wrapper .draggable-placeholder").imgLiquid({ fill: true });

	$(".photo-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");
	$(".inserted-img").fluidbox();

}

function loadBook() {

	NProgress.start();

	// sessionId = readCookie("JSESSIONID");

	bookId = document.URL.split("/")[document.URL.split("/").length - 1];

	$.ajax({
		url: "/api/users/getPages",
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		type: "POST",
		data: {
			bookId: bookId
		},
		success: function (data) {

			pages = data;

			pages.sort(function (a, b) {
				return a.pageNumber - b.pageNumber;
			});

			htmlToInsert = "";

			for (i = 0; i < pages.length; i++) {
				current = pages[i];

				// TODO get author photo and name and insert in places
				if (i == 0) {
					htmlToInsert += "<div class=\"bb-item front-cover\" style=\"display: block\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
					insertPage(1);
				} else {
					htmlToInsert += "<div style=\"display: none\" class=\"bb-item\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
					insertPage(0);
				}
			}

			$("#bb-bookblock").html(htmlToInsert);

			Page.init();
			configureBook();

			NProgress.done();

		},

		error: function (q, status, err) {

			if (status == "timeout") {
				alert("Request timed out");
			} else {
				alert("Some issue happened with your request: " + err.message);
			}

		}
	});

}

function insertPage(isFirst) {

	switch (current.templateId) {
		case 0:
			fluidLayout(isFirst);
			break;

		case 1:
			photoLayout(isFirst);
			break;

		case 2:
			overlayLayout(isFirst);
			break;

		case 3:
			phototextLayout(isFirst);
			break;

		case 4:
			verticalLayout(isFirst);
			break;

		case 5:
			videoLayout(isFirst);
			break;

		default:
			fluidLayout(isFirst);
			break;
	}

}

function fluidLayout(isFirst) {

	htmlToInsert += "<section class=\"fluid-wrapper\">";
	htmlToInsert += "<section class=\"draggable-placeholder\">";
	htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";

	if (current.creativeCommons != "Add photo credit?") {
		htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
	}

	htmlToInsert += "</section>";
	htmlToInsert += "<div class=\"fluid-preview\">";

	if (isFirst == 1) {
		htmlToInsert += "<div class=\"author-info\">";
		htmlToInsert += "<div class=\"author-name\">Paul Anthony Webb</div>";
		htmlToInsert += "<img class=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
		htmlToInsert += "</div>";
	}

	htmlToInsert += "<article>";
	htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

	htmlToInsert += "<div class=\"page-desc\">" + current.content + "";

	if (current.file != undefined) { htmlToInsert += "" + current.file + ""; }

	htmlToInsert += "</div>";

	htmlToInsert += "</article></div>";
	htmlToInsert += "</section>";
	htmlToInsert += "</div></div>";

}

function photoLayout(isFirst) {
	htmlToInsert += "<section class=\"photo-wrapper\">";

	if (current.attribution != "Add photo credit?") {
		htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
	}

	htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
	htmlToInsert += "<div class=\"phototext-preview\">";
	htmlToInsert += "<article>";
	htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

	if (isFirst == 1) {
		htmlToInsert += "<div class=\"author-info\">";
		htmlToInsert += "<img class=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
		htmlToInsert += "<div class=\"author-name\">Paul Anthony Webb</div>";
		htmlToInsert += "</div>";
	}

	htmlToInsert += "<div class=\"page-desc\">" + current.text + "</div>";
	htmlToInsert += "</article>";
	htmlToInsert += "</div></section>";
	htmlToInsert += "</div></div>";

}

function overlayLayout(isFirst) {

	htmlToInsert += "<section class=\"overlay-wrapper\">";
	htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
	htmlToInsert += "<div class=\"overlay-preview\">";
	htmlToInsert += "<article>";
	htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";

	if (isFirst == 1) {
		htmlToInsert += "<div class=\"author-info\">";
		htmlToInsert += "<div class=\"author-name\">Paul Anthony Webb</div>";
		htmlToInsert += "<img class=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
		htmlToInsert += "</div>";
	}

	htmlToInsert += "</article></div>";

	if (current.creativeCommons != "Add photo credit?") {
		htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
	}

	htmlToInsert += "</section>";
	htmlToInsert += "</div></div>";

}

function phototextLayout(isFirst) {

	htmlToInsert += "<section class=\"phototext-wrapper\">";

	if (current.creativeCommons != "Add photo credit?") {
		htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
	}

	htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
	htmlToInsert += "<div class=\"phototext-preview\">";
	htmlToInsert += "<article>";
	htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

	if (isFirst == 1) {
		htmlToInsert += "<div class=\"author-info\">";
		htmlToInsert += "<img class=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
		htmlToInsert += "<div class=\"author-name\">Paul Anthony Webb</div>";
		htmlToInsert += "</div>";
	}

	htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";
	htmlToInsert += "</article>";
	htmlToInsert += "</div></section>";
	htmlToInsert += "</div></div>";

}

function verticalLayout(isFirst) {

	htmlToInsert += "<section class=\"vertical-wrapper\">";

	if (current.creativeCommons != "Add photo credit?") {
		htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
	}

	htmlToInsert += "<div class=\"draggable-placeholder\">";
	htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
	htmlToInsert += "<div class=\"vertical-preview\">";
	htmlToInsert += "<article>";
	htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

	if (isFirst == 1) {
		htmlToInsert += "<div class=\"author-info\">";
		htmlToInsert += "<img class=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
		htmlToInsert += "<div class=\"author-name\">Paul Anthony Webb</div>";
		htmlToInsert += "</div>";
	}

	htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";
	htmlToInsert += "</article></div>";
	htmlToInsert += "</div></section>";
	htmlToInsert += "</div></div>";

}

function videoLayout(isFirst) {

	htmlToInsert += "<section class=\"video-wrapper\">";

	if (current.creativeCommons != "Add photo credit?") {
		htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
	}

	htmlToInsert += "<div class=\"video-preview\">";

	htmlToInsert += "<div class=\"button-wrapper\"><button class=\"play-video\">Play</button></div>";
	htmlToInsert += "<div class=\"video-player-container\">";
	htmlToInsert += "<iframe src=\"" + current.videoUrl + "\"></iframe>";
	htmlToInsert += "</div>";
	htmlToInsert += "<article>";
	htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

	if (isFirst == 1) {
		htmlToInsert += "<div class=\"author-info\">";
		htmlToInsert += "<img class=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
		htmlToInsert += "<div class=\"author-name\">Paul Anthony Webb</div>";
		// htmlToInsert += "<div class=\"author-name\">Paul Anthony Webb</div>";
		// htmlToInsert += "<img class=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
		htmlToInsert += "</div>";
	}

	htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";
	htmlToInsert += "</article>";
	htmlToInsert += "</div></section>";
	htmlToInsert += "</div></div>";

}

var Page = (function () {

	var config = {
		$bookBlock: $("#bb-bookblock"),
		$navNext: $("#bb-nav-next"),
		$navPrev: $("#bb-nav-prev"),
		$navFirst: $("#bb-nav-first")
	},

	init = function () {

		config.$bookBlock.bookblock({
			speed: 1000,
			shadowSides: 0.8,
			shadowFlip: 0.4
		});

		initEvents();

	},

	initEvents = function () {

		var $slides = config.$bookBlock.children();

		// add navigation events
		config.$navNext.on("click touchstart", function () {
			config.$bookBlock.bookblock("next");
			return false;
		});

		config.$navPrev.on("click touchstart", function () {
			config.$bookBlock.bookblock("prev");
			return false;
		});

		config.$navFirst.on("click touchstart", function () {
			config.$bookBlock.bookblock("first");
			return false;
		});

		// add swipe events
		$slides.on({
			"swipeleft": function (event) {
				config.$bookBlock.bookblock("next");
				return false;
			},

			"swiperight": function (event) {
				config.$bookBlock.bookblock("prev");
				return false;
			}
		});

		// add keyboard events
		$(document).keydown(function (e) {

			var keyCode = e.keyCode || e.which, arrow = {
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};

			switch (keyCode) {
				case arrow.left:
					config.$bookBlock.bookblock("prev");
					break;

				case arrow.right:
					config.$bookBlock.bookblock("next");
					break;
			}

		});

	};

	return { init: init };

})();
