
	// Book Enjoyment
	// @Gapelia
	// ------------------------------------------------------------------------------------

	// Globals
	var $vW = $(window).width(), $vH = $(window).height();
	// $("#the-book").css("height", $vH + "px");

	$(".content").css({
		"width": $vW + "px",
		"height": $vH + "px"
	});

	$(".phototext-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".text-wrapper .page-desc").css("height", $vH - 165 + "px");
	$(".vertical-wrapper .page-desc").css("height", $vH - 185 + "px");
	$(".video-wrapper .page-desc").css("height", $vH - 185 + "px");

	/*
	$(".phototext-wrapper .page-desc, .text-wrapper .page-desc, .vertical-wrapper .page-desc, .video-wrapper .page-desc").ready(function() {
		$(".sp-scrollbar").css({
			"display": "block",
			"height": 100 + "%"
		});
	});
	*/

	/*
	$(".phototext-wrapper .page-desc, .text-wrapper .page-desc, .vertical-wrapper .page-desc, .video-wrapper .page-desc").ready(function() {
		$(".sp-thumb").css("height", 10 + "px");
	});
	*/

	$(".backcover-wrapper .page-bg").css("width", $vW);

	// Calculate half of viewport height minus half the height of the prev/next buttons
	$("#bb-nav-prev, #bb-nav-next").css("top", $vH / 2 - 32 + "px");

	$("#header-toggle").mouseover(function () {

		$(this).css({
			"opacity": "0",
			"top": "-50px"
		});

		$("#next-book-toggle").css({
			"opacity": "0",
			"top": "-50px"
		});

		$(".full-book header").css("top", "0");

		$("#g-menu-toggle").css({
			"width": "32px",
			"height": "32px",
			"background-size": "200px 500px",
			"top": "0.6rem"
		});

	});

	if ($vW > "1025") {

		// Show header on scroll
		$(".phototext-preview, .horizontal-preview, .text-preview, .phototext-preview, .vertical-preview, .video-preview article").scroll(function () {

			var value = $(this).stop().scrollTop();

			$(function() {
				setTimeout(function() {

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

		// Hide book controls, show when mouse moves
		var timedelay = 1;

		function delayCheck() {

			if (timedelay == 5) {
				$("#header-toggle, #next-book-toggle, #bb-nav-prev, #bb-nav-next").fadeOut();
				timedelay = 1;
			}

			timedelay = timedelay + 1;

		}

		$(document).mousemove(function () {

			$("#header-toggle, #next-book-toggle, #bb-nav-prev, #bb-nav-next").fadeIn();
			timedelay = 1;
			clearInterval(_delay);
			_delay = setInterval(delayCheck, 500);

		});

		// Page load starts delay timer
		_delay = setInterval(delayCheck, 500);

		$(".full-book header").on("mouseenter", function () {
			// placeholder, apparently needed
		}).on("mouseleave", function () {

			setTimeout(function() {
				$(".full-book header").css("top", "-50px");

				$("#header-toggle").css({
					"opacity": "1",
					"top": "0.5rem"
				});

				$("#next-book-toggle").css({
					"opacity": "1",
					"top": "0.5rem"
				});
			}, 2500);

		});

	} else {

		// Show header on scroll
		$(window).scroll(function () {

			var value = $(this).stop().scrollTop();

			$(function() {

				setTimeout(function() {

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

				setTimeout(function() {
					window.scrollTo(0, 1);
				}, 0);

			});

		});

		/*
		if (navigator.platform == "iPad" || navigator.platform == "iPhone" || navigator.platform == "iPod" || navigator.platform == "Linux armv6l") {
			window.ontouchstart = function () {
				$("#fixedDiv").css("display", "none");
			};

			window.onscroll = function () {

				var iPadPosition = window.innerHeight + window.pageYOffset - 45; // 45 is the height of the Footer

				$("#fixedDiv").css("position", "absolute");
				$("#fixedDiv").css("top", iPadPosition);
				$("#fixedDiv").css("display", "block");

			};
		}
		*/

	}

	$(".video-preview .play-video").click(function () {

		$(this).hide();
		$(".video-player-container img").hide();
		$(".video-player-container iframe").show();

	});

	// Save for mp-push
	/* big logo is distracting
	$("#g-menu-toggle").css({
		"width": "64px",
		"height": "64px",
		"background-size": "400px 1000px",
		"top": "1rem"
	});
	*/
