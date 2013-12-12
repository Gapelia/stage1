
//////////////////////////////////////////////////////////////////////////////////////////// GENERAL //

$(document).ready(function() {

	$(".super-wrapper").show();

	var $vW = $(window).width(), $vH = $(window).height();
	// var $dW = $("#dimension-panel").width();
	// var $pW = $("#dimension-list .portal").width();

	// Reload Gapelia when browser window resizing occurs
	$(window).resize(function() {
		if($vW != $(window).width()) {
			location.reload();
			return;
		}
	});

	// Set height of books in feed on "Me" page
	$("#user-book-list .book, #user-book-list .new").css("height", $vH - 97 + "px"); // 100
	$("#user-bookmark-list .collection, #user-bookmark-list .new").css("height", $vH - 97 + "px");
	$("#user-library-list .library, #user-library-list .new").css("height", $vH - 97 + "px");
	$("#user-draft-list .draft").css("height", $vH - 97 + "px");

	// Set height of books in feed on "Featured" page
	$("#book-list .book").css("height", $vH - 97 + "px");
	$("#dimension-list .portal").css("height", $vH - 97 + "px");
	$("#library-list .library").css("height", $vH - 97 + "px");

	/*
	// Set height of dimension portals in feed
	$("#dimensions-landing-bg, #pulse-landing-bg, #art-landing-bg, #wow-landing-bg, #life-landing-bg, #flow-landing-bg, #wonder-landing-bg").css({
		width: $dW + "px",
		height: $vH + "px"
	});
	*/

	// $("#dimension-list .portal, #dimension-list canvas").css("height", $vH - 97 + "px");

	// $("#dimensions-landing-bg").css("height", $vH + "px");
	// $("#dimension-list canvas").css({ width: $pW + "px", height: $vH - 97 + "px" });

	$(".super-wrapper").css("height", $vH + "px");

	// Edit Profile on "Me" page
	$(document).on("click", "button.edit-profile", function () {

		$("button.edit-profile").text("Save Profile").removeClass("edit-profile").addClass("save-profile").css("background-color", "#4cd964");
		$("#user-bio").attr("contenteditable", "true").css("background-color", "rgba(254, 254, 254, 0.3)").trigger("focus");
		// $(this).html($(this).text());

	});

	$(document).on("click", "button.save-profile", function () {

		$("button.save-profile").text("Edit Profile").removeClass("save-profile").addClass("edit-profile").css("background-color", "#70a1b1");
		$("#user-bio").attr("contenteditable", "false").css("background-color", "transparent");

	});

	// Bookmarking
	$(document).on("click", ".bookmark-this", function () {

		$(this).find(".top-bm").css({
			"border-top": "20px solid #ff3b30",
			"right": "30px"
		});

		$(this).find(".bottom-bm").css({
			"border-bottom": "20px solid #ff3b30",
			"right": "30px"
		});

		$(this).find(".right-bm").css({
			"background-color": "#ff3b30",
			"border-right": "0",
			"width": "46px"
		});

		$(this).addClass("bookmarked");

	});

	$(document).on("click", ".bookmarked", function () {

		$(this).find(".top-bm").css({
			"border-top": "20px solid #fcfcfc",
			"right": "10px"
		});

		$(this).find(".bottom-bm").css({
			"border-bottom": "20px solid #fcfcfc",
			"right": "10px"
		});

		$(this).find(".right-bm").css({
			"background-color": "#fcfcfc",
			"border-right": "0",
			"width": "26px"
		});

		$(this).removeClass("bookmarked");

	});

});

// Profile Bookmarks
$("body.app.profile").on("load", function () {

	$(".bookmark").each(function () {

		$(this).find(".top-bm").css({
			"border-top": "20px solid #ff3b30",
			"right": "30px"
		});

		$(this).find(".bottom-bm").css({
			"border-bottom": "20px solid #ff3b30",
			"right": "30px"
		});

		$(this).find(".right-bm").css({
			"background-color": "#ff3b30",
			"border-right": "0",
			"width": "46px"
		});

	}).addClass("bookmarked");

});
