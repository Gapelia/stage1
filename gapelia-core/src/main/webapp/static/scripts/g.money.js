
	// Let's Get This Party Started!
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// General
	var $vW = $(window).width(), $vH = $(window).height();

	$(function () {

		// Reload Gapelia when device orientation changes
		window.onorientationchange = function () {
			window.location.reload();
		};

		/*
		// Reload Gapelia when browser window resizing occurs
		$(window).resize(function () {
			if($vW != $(window).width()) {
				location.reload();
				return;
			}
		});
		*/

		$(".super-wrapper").css("height", $vH + "px");
		$(".super-wrapper").show();

		if ($vW > "1024") {

			$(function () {

				// Set height of books in feed on "Me" page
				$("#user-book-list .book, #user-book-list .new").css("height", $vH - 97 + "px"); // 100
				$("#user-library-list .library, #user-library-list .new").css("height", $vH - 97 + "px");
				$("#user-draft-list .draft").css("height", $vH - 97 + "px");

				// Set height of books in feed on "Featured" page
				$("#book-list .book, #submission-list .book, #subscription-list .library").css("height", $vH - 97 + "px");
				$("#library-list .library").css("height", $vH - 97 + "px");
				$("#bookmark-list .collection, #bookmark-list .new").css("height", $vH - 97 + "px");

				$(".book-list-wrapper section").css("width", $vW + "px");

			});

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
		/*
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
		*/

		// "Me" splash functionality
		$(document).on("click", "#splash-edit-profile", function (e) {

			$("#splash-edit-wrapper").css({
				"opacity": "1",
				"right": "-135px"
			});

			$("#splash-edit-profile").css({
				"right": "-9.4rem",
				"transform": "rotate(180deg)",
				"-o-transform": "rotate(180deg)",
				"-moz-transform": "rotate(180deg)",
				"-webkit-transform": "rotate(180deg)"
			});

			if ($("#splash-edit-wrapper").css("opacity") == "1") {

				$("#splash-edit-wrapper").css({
					"opacity": "0",
					"right": "0"
				});

				$("#splash-edit-profile").css({
					"right": "-0.85rem",
					"transform": "rotate(0deg)",
					"-o-transform": "rotate(0deg)",
					"-moz-transform": "rotate(0deg)",
					"-webkit-transform": "rotate(0deg)"
				});

			}

			e.preventDefault();

		});

		$(".avatar-button button").addClass("white").html("+ Avatar");
		$(".cover-button button").addClass("white").html("+ Cover photo");
		// $(".avatar-button button").addClass("slate").html("Change avatar");
		// $(".cover-button button").addClass("slate").html("Change cover photo");

		var descElem = "splash-user-bio";
		descMax = 151;

		$("#" + descElem).keydown(function (e) { check_charcount(descElem, descMax, e); });

		function check_charcount(titleElem, titleMax, e) {
			if(e.which != 8 && $("#" + titleElem).text().length > titleMax) {
				e.preventDefault();
			}
		}

		$(document).on("click", "#splash-edit-wrapper .quick-edit-profile", function (e) {

			// if ($vW > "1280") {
			if ($vW > "1024") {

				$("#splash-edit-wrapper .quick-edit-profile").text("Save Profile").css({
					"background-color": "#4cd964",
					"border-bottom-right-radius": "5px"
				}).addClass("quick-save-profile");

			} else {

				$("#splash-edit-wrapper .quick-edit-profile").text("Save Profile").css({
					"background-color": "#4cd964",
					"border-top-right-radius": "5px",
					"border-bottom-right-radius": "5px"
				}).addClass("quick-save-profile");

			}

			$(".overlay-controls").css({
				"opacity": "1",
				"z-index": "1"
			});

			$("#splash-user-bio").attr("contenteditable", "true").css("background-color", "rgba(252, 252, 252, 0.3)").trigger("focus");

			$("#splash-user-location").attr("contenteditable", "true").css("background-color", "rgba(252, 252, 252, 0.3)");
			$("#splash-user-website").attr("contenteditable", "true").css("background-color", "rgba(252, 252, 252, 0.3)");
			$("#splash-user-twitter").attr("contenteditable", "true").css("background-color", "rgba(252, 252, 252, 0.3)");

			if ($("#splash-edit-wrapper .quick-edit-profile").css("background-color") == "#4cd964") {

				$("#splash-edit-wrapper .quick-edit-profile").text("Edit Profile").css("background-color", "transparent");

				$("#splash-user-bio").attr("contenteditable", "false").css("background-color", "transparent");
				$("#splash-user-location").attr("contenteditable", "false").css("background-color", "transparent");
				$("#splash-user-website").attr("contenteditable", "false").css("background-color", "transparent");
				$("#splash-user-twitter").attr("contenteditable", "false").css("background-color", "transparent");

			}

			e.preventDefault();

		});

		$(document).on("click", "#splash-edit-wrapper .quick-save-profile", function (e) {

			$("#splash-edit-wrapper .quick-edit-profile").text("Edit Profile").css("background-color", "transparent").removeClass("quick-save-profile");

			$(".overlay-controls").css({
				"opacity": "0.001",
				"z-index": "-1"
			});

			$("#splash-user-bio").attr("contenteditable", "false").css("background-color", "transparent");
			$("#splash-user-location").attr("contenteditable", "false").css("background-color", "transparent");
			$("#splash-user-website").attr("contenteditable", "false").css("background-color", "transparent");
			$("#splash-user-twitter").attr("contenteditable", "false").css("background-color", "transparent");

			e.preventDefault();

		});

		$(document).one("click", "#splash-user-bio", function () {
			$(this).text("");
		});

		// "Me" Dashboard
		// @Gapelia
		// ----------------------------------------------------------------------------------

		// Delete book
		$(document).on("click", ".book-buttons .delete-this-book", function (e) {

			$(this).closest("li").prepend("<div class=\"delete-book-confirm\"><h3>Hold on there, are you *sure* you want to delete your book?</h3><div class=\"wrapper\"><a href=\"#\" class=\"button a red yay-delete-book\">Yes, delete</a><a href=\"#\" class=\"button b green nay-delete-book\">Nope, cancel</a></div></div>");

			e.preventDefault();

		});

		// Confirm book deletion
		$(document).on("click", ".yay-delete-book", function (e) {

			if ($vW > "1024") {

				// Recalculate horizontal list width
				$("#user-book-list").css({
					"opacity": "0",
					"margin": "2px 0 0 0"
				});

				$(this).closest("li").remove();

				// gets all books in a section
				var allBooks = $("#user-book-list li");

				// holds function for one second and then adds width to body tag
				setTimeout(function () {

					var w = 0;

					$("#user-book-list li").each(function () { w += $(this).outerWidth(); });

					w += 500;

					$("#user-book-list").css("width", w - 320 + "px");

					$("#user-book-list").css({
						"opacity": "1",
						"margin": "2px 0 0 0"
					});

				}, 500);

			} else {

				// Carry on
				$(this).closest("li").remove();

			}

			e.preventDefault();

		});

		// Cancel book deletion
		$(document).on("click", ".nay-delete-book", function (e) {

			$(this).closest(".delete-book-confirm").remove();
			$(this).closest(".image-overlay").css("display", "block");

			e.preventDefault();

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
			$(this).text("Unsubscribe").removeClass("subscribe white").addClass("unsubscribe red");
			// $(this).text("Unsubscribe").removeClass("subscribe slate").addClass("unsubscribe red");
		});

		$(document).on("click", "button.unsubscribe", function () {
			$(this).text("Subscribe").removeClass("unsubscribe red").addClass("subscribe white");
			// $(this).text("Subscribe").removeClass("unsubscribe red").addClass("subscribe slate");
		});

		// Bookmarking
		$(document).on("click", ".bookmark-this", function () {

			$(this).closest("li").addClass("bookmarked");

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

				$(this).find(".right-bm").css("width", "47px");

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

		// Remove bookmark in Bookmarks section on /featured
		$(document).on("click", ".bookmarked .bookmark-this", function () {

			if ($vW > "1024") {

				// Recalculate horizontal list width
				$("#bookmark-list").css({
					"opacity": "0",
					"margin": "2px 0 0 0"
				});

				$(this).closest("li").remove();

				// gets all books in a section
				var allBooks = $("#user-book-list li");

				// holds function for one second and then adds width to body tag
				setTimeout(function () {

					var w = 0;

					$("#bookmark-list li").each(function () { w += $(this).outerWidth(); });

					w += 500;

					$("#bookmark-list").css("width", w - 320 + "px");

					$("#bookmark-list").css({
						"opacity": "1",
						"margin": "2px 0 0 0"
					});

				}, 500);

			} else {

				// Carry on
				$(this).closest("li").remove();

			}

		});

		// "Library Manager" Dashboard
		// @Gapelia
		// ----------------------------------------------------------------------------------

		// Delete book
		$(document).on("click", ".library-buttons .delete-this-library", function (e) {

			$(this).closest("li").prepend("<div class=\"delete-library-confirm\"><h3>Hold on there, are you *sure* you want to delete your library?</h3><div class=\"wrapper\"><a href=\"#\" class=\"button a red yay-delete-library\">Yes, delete</a><a href=\"#\" class=\"button b green nay-delete-library\">Nope, cancel</a></div></div>");

			e.preventDefault();

		});

		// Confirm book deletion
		$(document).on("click", ".yay-delete-library", function (e) {

			if ($vW > "1024") {

				// Recalculate horizontal list width
				$("#library-list").css({
					"opacity": "0",
					"margin": "2px 0 0 0"
				});

				$(this).closest("li").remove();

				// gets all books in a section
				var allBooks = $("#library-list li");

				// holds function for one second and then adds width to body tag
				setTimeout(function () {

					var w = 0;

					$("#library-list li").each(function () { w += $(this).outerWidth(); });

					w += 500;

					$("#library-list").css("width", w - 320 + "px");

					$("#library-list").css({
						"opacity": "1",
						"margin": "2px 0 0 0"
					});

				}, 500);

			} else {

				// Carry on
				$(this).closest("li").remove();

			}

			e.preventDefault();

		});

		// Cancel book deletion
		$(document).on("click", ".nay-delete-library", function (e) {

			$(this).closest(".delete-library-confirm").remove();
			$(this).closest(".image-overlay").css("display", "block");

			e.preventDefault();

		});

		/*
		$(function () {

			// Initialize "Overlay — create library"
			ocl = "";
			ocl += "<div id=\"create-library-overlay\" class=\"overlay\">";
			ocl += "<div class=\"overlay-controls\">";
			ocl += "<a href=\"#\" class=\"overlay-close oc-01\">Cancel</a>";
			ocl += "<button class=\"overlay-close oc-02\">Create</button>";
			ocl += "</div>";
			ocl += "<section>";
			ocl += "<h2>Library Creation</h2>";
			ocl += "<div id=\"create-library-name\" contenteditable=\"true\">Library name</div>";
			ocl += "<div id=\"create-library-desc\" contenteditable=\"true\">Description of library</div>";
			ocl += "</section>";
			ocl += "</div>";

			$("body").append(ocl);

		});

		// Overlay — create library
		$("#create-library").click(function (e) {

			$("#create-library-overlay").addClass("open");

			$("#mp-pusher").css({
				"transform": "translate3d(0, 0, 0)",
				"-o-transform": "translate3d(0, 0, 0)",
				"-ms-transform": "translate3d(0, 0, 0)",
				"-moz-transform": "translate3d(0, 0, 0)",
				"-webkit-transform": "translate3d(0, 0, 0)"
			});

			e.preventDefault();

		});
		*/

		// Close any opened overlay
		$(document).on("click", ".overlay-close", function (e) {

			$(".overlay").removeClass("open");
			e.preventDefault();

		});

		// Open drafts drawer
		$("#gpl-menu-drafts a").click(function (e) {

			$("#gpl-menu-drafts ul").toggle();
			e.preventDefault();

		});

		// Open notifications drawer
		$("#gpl-menu-notify a").click(function (e) {

			$("#gpl-menu-notify ul").toggle();
			e.preventDefault();

		});

	});

	$(window).ready(function () {

		if ($vW > "1024") {

			// gets all books in a section
			var allBooks = $("#user-book-list li, #library-list li, #bookmark-list li, #subscription-list li");

			// gets first book in list
			var firstBook = $(allBooks).first();

			// hides all books in a section, except the first one
			$(allBooks).not(firstBook).hide();

			// holds function for one second and then adds width to body tag
			setTimeout(function () {

				$("#user-book-list").hide().css("margin", "-2px 0 0 0");
				// $("#book-list, #library-list, #bookmark-list").hide();

				var w = 0;

				$("#user-book-list li, #book-list li, #library-list li, #bookmark-list li, #subscription-list li").each(function () {
					w += $(this).outerWidth();
				});

				w += 500;

				$("#user-book-list, #book-list, #library-list, #bookmark-list, #subscription-list").css("width", w - 320 + "px");

				// fades in the all the photos after body width is added
				$("#user-book-list li, #book-list li, #library-list li, #bookmark-list li, #subscription-list li").fadeIn("100");

				$("#user-book-list").css("margin", "2px 0 0 0").fadeIn("100");
				// $("#book-list, #library-list, #bookmark-list").fadeIn("100");

			}, 1000);

		}

	});
