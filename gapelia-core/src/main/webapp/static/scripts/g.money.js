
	// Let's Get This Party Started!
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// General
	var $vW = $(window).width(), $vH = $(window).height();

	// Reload Gapelia when device orientation changes
	$(function () {

		window.onorientationchange = function () {
			window.location.reload();
		};

		// Reload Gapelia when browser window resizing occurs
		/*
		$(window).resize(function () {
			if($vW != $(window).width()) {
				location.reload();
				return;
			}
		});
		*/

	});

	/*
	$(document).on("hover", "#site-menu", function () {

		// $("#site-menu").mouseenter(function () {
		$("#site-menu li ul").css({
			"display": "block",
			"height": "100%"
		});

	});
	*/

	$(function () {

		$(".super-wrapper").css("height", $vH + "px");
		$(".super-wrapper").show();

		// if ($vW > "801") {
		if ($vW > "1024") {

			$(function () {
				// Set height of books in feed on "Me" page
				$("#user-book-list .book, #user-book-list .new").css("height", $vH - 97 + "px"); // 100
				$("#user-library-list .library, #user-library-list .new").css("height", $vH - 97 + "px");
				$("#user-draft-list .draft").css("height", $vH - 97 + "px");

				// Set height of books in feed on "Featured" page
				$("#book-list .book").css("height", $vH - 97 + "px");
				$("#dimension-list .portal").css("height", $vH - 97 + "px");
				$("#library-list .library").css("height", $vH - 97 + "px");
				$("#bookmark-list .collection, #bookmark-list .new").css("height", $vH - 97 + "px");
			});

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

		// Me page
		// Bio input limiter
		var descElem = "user-bio";
		descMax = 151;

		$("#" + descElem).keydown(function (e) { check_charcount(descElem, descMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("#" + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		// Edit Profile on "Me" page
		$(document).on("click", "button.edit-profile", function () {

			$("button.edit-profile").text("Save Profile").removeClass("edit-profile slate").addClass("save-profile green");
			$("#user-bio").attr("contenteditable", "true").css("background-color", "rgba(25, 25, 25, 0.3)").trigger("focus");
			$("#splash-user-bio").attr("contenteditable", "true").css("background-color", "rgba(25, 25, 25, 0.3)").trigger("focus");

		});

		$(document).on("click", "button.save-profile", function () {

			$("button.save-profile").text("Edit Profile").removeClass("save-profile green").addClass("edit-profile slate");
			$("#user-bio").attr("contenteditable", "false").css("background-color", "transparent");
			$("#splash-user-bio").attr("contenteditable", "false").css("background-color", "transparent");

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

			if ($vW > "1024") {

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

			if ($vW > "1024") {

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

	$(window).ready(function () {

		if ($vW > "1024") {

			// gets all photos in a post
			var allpics = $("#user-book-list li, #library-list li, #bookmark-list li");

			// gets first photo in list
			var firstpic = $(allpics).first();

			// hides all photos in a post except the first photo
			$(allpics).not(firstpic).hide();

			// holds function for one second and then adds width to body tag
			setTimeout(function () {

				$("#user-book-list").hide().css("margin", "-2px 0 0 0");
				// $("#book-list, #library-list, #bookmark-list").hide();

				var w = 0;

				$("#user-book-list li, #book-list li, #library-list li, #bookmark-list li").each(function () {
					w += $(this).outerWidth();
				});

				w += 500;

				$("#user-book-list, #book-list, #library-list, #bookmark-list").css("width", w - 320 + "px");

				// fades in the all the photos after body width is added
				$("#user-book-list li, #book-list li, #library-list li, #bookmark-list li").fadeIn("100");

				$("#user-book-list").css("margin", "2px 0 0 0").fadeIn("100");
				// $("#book-list, #library-list, #bookmark-list").fadeIn("100");

			}, 1000);

		} else {
		}

	});
