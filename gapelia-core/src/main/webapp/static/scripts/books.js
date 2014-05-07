
	// Book Enjoyment
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Globals
	var $vW = $(window).width(), $vH = $(window).height();

	// Calculate half of viewport height minus half the height of the prev/next buttons
	$("#bb-nav-prev, #bb-nav-next").css("top", $vH / 2 - 32 + "px");

	if ($vW > "1024") {

		$(".content").css({
			"width": $vW + "px",
			"height": $vH + "px"
		});

		$(function() {

			$(".phototext-wrapper, .vertical-wrapper, .video-wrapper").closest(".content").css("height", $vH - 1 + "px");
			$(".overlay-wrapper").closest(".content").css("overflow", "hidden");

		});

		$(document).on("mouseleave", ".full-book header", function() {
			$(".full-book #g-menu-toggle").css("color", "#fcfcfc");
		});

		// Show header on scroll
		$(".phototext-preview, .horizontal-preview, .text-preview, .phototext-preview, .vertical-preview, .video-preview article").scroll(function() {

			var value = $(this).stop().scrollTop();

			$(function() {
				setTimeout(function() {

					if (value > 1) {

						$(".full-book #g-menu-toggle").css("color", "#70a1b1");

						$(".full-book header").css("top", "0");

					} else {

						$(".full-book #g-menu-toggle").css("color", "#fcfcfc");

						$(".full-book header").css("top", "-50rem");

					}

				}, 10);
			});

		});

		// Hide book controls, show when mouse moves
		var timedelay = 1;

		function delayCheck() {

			if (timedelay == 5) {
				$("#header-toggle, #bb-nav-prev, #bb-nav-next").fadeOut();
				timedelay = 1;
			}

			timedelay = timedelay + 1;

		}

		$(document).mousemove(function() {

			$("#header-toggle, #bb-nav-prev, #bb-nav-next").fadeIn();
			timedelay = 1;
			clearInterval(_delay);
			_delay = setInterval(delayCheck, 500);

		});

		// Page load starts delay timer
		_delay = setInterval(delayCheck, 500);

		$(".full-book header").on("mouseenter", function() {
			// placeholder, apparently needed
		}).on("mouseleave", function() {

			setTimeout(function() {
				$(".full-book header").css("top", "-50px");

				$("#header-toggle").css({
					"opacity": "1",
					"top": "0.5rem"
				});
			}, 2500);

		});

	} else if ($vW < "321") {

		$(".super-wrapper").css("height", $vH + "px");
		// $(".super-wrapper").css("height", "568px");

		// window.scrollTo(0, 0);

		/*
		// Show header on scroll
		$(window).scroll(function() {

			var value = $(this).stop().scrollTop();

			$(function() {

				setTimeout(function() {

					// window.scrollTo(0, 1);

					if (value > 1) {

						$(".full-book #next-book-toggle").css({
							"opacity": "1",
							"top": "0.5rem"
						});

						$(".full-book header").css("top", "0");

					} else {

						$(".full-book #next-book-toggle").css({
							"opacity": "1",
							"top": "0.5rem"
						});

						$(".full-book header").css("top", "-50rem");

					}

				}, 10);

			});

		});
		*/

	} else {

		/*
		// Show header on scroll
		$(window).scroll(function() {

			var value = $(this).stop().scrollTop();

			$(function() {

				setTimeout(function() {

					// window.scrollTo(0, 1);

					if (value > 1) {

						$(".full-book #next-book-toggle").css({
							"opacity": "0",
							"top": "-50px"
						});

						$(".full-book header").css("top", "0");

					} else {

						$(".full-book #next-book-toggle").css({
							"opacity": "1",
							"top": "0.5rem"
						});

						$(".full-book header").css("top", "-50rem");

					}

				}, 10);

			});

		});
		*/

	}

	$(function () {

	});

	// Text fade
	/*
	$(function () {

		$(".fluid-wrapper .page-desc").after("<div class='text-fade'></div>");

		$(".fluid-wrapper .page-desc").on("scroll", function() {
			$(".text-fade").style.bottom = -$(".fluid-wrapper .page-desc").scrollTop + "px";
		});

	});
	*/

	$(".video-preview .play-video").click(function() {

		$(this).hide();
		$(".video-player-container img").hide();
		$(".video-player-container iframe").show();

	});
