
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

	if ($vW > "801") {

		// Set height of books in feed on "Me" page
		$("#user-book-list .book, #user-book-list .new").css("height", $vH - 97 + "px"); // 100
		$("#user-library-list .library, #user-library-list .new").css("height", $vH - 97 + "px");
		$("#user-draft-list .draft").css("height", $vH - 97 + "px");

		// Set height of books in feed on "Featured" page
		$("#book-list .book").css("height", $vH - 97 + "px");
		$("#dimension-list .portal").css("height", $vH - 97 + "px");
		$("#library-list .library").css("height", $vH - 97 + "px");
		$("#bookmark-list .collection, #bookmark-list .new").css("height", $vH - 97 + "px");

	} else {

		/*
		// Set width of books in feed on "Me" page
		$("#user-book-list .book, #user-book-list .new").css();
		$("#user-library-list .library, #user-library-list .new").css();
		$("#user-draft-list .draft").css();

		// Set width of books in feed on "Featured" page
		$("#book-list .book").css();
		$("#dimension-list .portal").css();
		$("#library-list .library").css();
		$("#bookmark-list .collection, #bookmark-list .new").css();
		*/

	}

	$(".super-wrapper").css("height", $vH + "px");

	// Edit Profile on "Me" page
	$(document).on("click", "button.edit-profile", function () {

		$("button.edit-profile").text("Save Profile").removeClass("edit-profile slate").addClass("save-profile green");
		$("#user-bio").attr("contenteditable", "true").css("background-color", "rgba(25, 25, 25, 0.3)").trigger("focus");

	});

	$(document).on("click", "button.save-profile", function () {

		$("button.save-profile").text("Edit Profile").removeClass("save-profile green").addClass("edit-profile slate");
		$("#user-bio").attr("contenteditable", "false").css("background-color", "transparent");

	});

	// Edit Email in "Accounts"
	$(document).on("click", "#email-edit a", function (e) {

		$("#email-edit a").text("Save").addClass("save-email");
		$("#user-email").attr("contenteditable", "true").css("background-color", "rgba(25, 25, 25, 0.3)").trigger("focus");
		e.preventDefault();

	});

	$(document).on("click", "#email-edit .save-email", function (e) {

		$("#email-edit a").text("Edit").removeClass("save-email");
		$("#user-email").attr("contenteditable", "false").css("background-color", "transparent");
		e.preventDefault();

	});

	// Library Subscriptions
	$(document).on("click", "button.subscribe", function () {
		$(this).text("Unsubscribe").removeClass("subscribe slate").addClass("unsubscribe red");
	});

	$(document).on("click", "button.unsubscribe", function () {
		$(this).text("Subscribe").removeClass("unsubscribe red").addClass("subscribe slate");
	});

	// Bookmarking
	$(document).on("click", ".bookmark-this", function () {

		$(this).addClass("bookmarked");
		// $(this).closest("li").remove(); for Me page

		$(this).find(".right-bm").css({
			"background-color": "#ff3b30",
			"border-right": "0"
		});

		if ($vW > "800") {

			$(this).find(".top-bm").css({
				"border-top": "20px solid #ff3b30",
				"right": "30px"
			});

			$(this).find(".bottom-bm").css({
				"border-bottom": "20px solid #ff3b30",
				"right": "30px"
			});

			$(this).find(".right-bm").css("width", "46px");

		} else {

			$(this).find(".top-bm").css({
				"border-top": "40px solid #ff3b30",
				"right": "60px"
			});

			$(this).find(".bottom-bm").css({
				"border-bottom": "40px solid #ff3b30",
				"right": "60px"
			});

			$(this).find(".right-bm").css("width", "92px");

		}

	});

	$(document).on("click", ".bookmarked", function () {

		$(this).removeClass("bookmarked");

		$(this).find(".right-bm").css({
			"background-color": "#fcfcfc",
			"border-right": "0"
		});

		if ($vW > "800") {

			$(this).find(".top-bm").css({
				"border-top": "20px solid #fcfcfc",
				"right": "10px"
			});

			$(this).find(".bottom-bm").css({
				"border-bottom": "20px solid #fcfcfc",
				"right": "10px"
			});

			$(this).find(".right-bm").css("width", "26px");

		} else {

			$(this).find(".top-bm").css({
				"border-top": "40px solid #fcfcfc",
				"right": "20px"
			});

			$(this).find(".bottom-bm").css({
				"border-bottom": "40px solid #fcfcfc",
				"right": "20px"
			});

			$(this).find(".right-bm").css("width", "52px");

		}

	});

});
