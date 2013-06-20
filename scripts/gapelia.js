$(function() {

	// default top scroller
	$("#big-scroller, #dimension-scroller").carouFredSel({
		auto: false,
		responsive: true,
		width: "100%",
		scroll: 1,
		prev: "#prev-big",
		next: "#next-big",
		items: {
			width: 200,
			// height: "30%", // optionally resize item-height
			visible: { min: 2, max: 6 }
		},
		mousewheel: true
	});

	// default small scroller
	$("#small-scroller").carouFredSel({
		auto: false,
		responsive: true,
		width: "100%",
		scroll: 1,
		prev: "#prev-small",
		next: "#next-small",
		items: {
			width: 360,
			// height: "30%", // optionally resize item-height
			visible: { min: 2, max: 6 }
		},
		mousewheel: true
	});

	// users scroller
	$("#gapelian-scroller").carouFredSel({
		auto: false,
		responsive: true,
		width: "100%",
		scroll: 1,
		prev: "#prev-small",
		next: "#next-small",
		items: {
			width: 160,
			// height: "30%", // optionally resize item-height
			visible: { min: 7, max: 10 }
		},
		mousewheel: true
	});

});

$(".dimension-book .book-title").squishy({ maxSize: 23 }); // maxSize is really for short titles

// Expand users in Gapelian scroller

$(function() {

	$(document).ready(function() {

		var isOpen = false;

		$(".user .cover").click(function() {
			isOpen = !isOpen;

			if(isOpen) {
				$("#gapelian-scroller").carouFredSel({
					auto: false,
					responsive: true,
					width: "100%",
					scroll: 1,
					prev: "#prev-small",
					next: "#next-small",
					items: {
						width: 360,
						// height: "30%", // optionally resize item-height
						visible: { min: 2, max: 10 }
					},
					mousewheel: true
				});

				/*
				$(".user").animate({
					width: 340
					// opacity: 0.25,
					// left: "+=50",
					// height: "toggle"
				}, 500, function() {
					// Animation complete.
				});
				*/
			}

			else { // .animate({ width: "160px" }, 500)
				$("#gapelian-scroller").carouFredSel({
					auto: false,
					responsive: true,
					width: "100%",
					scroll: 1,
					prev: "#prev-small",
					next: "#next-small",
					items: {
						width: 160,
						// height: "30%", // optionally resize item-height
						visible: { min: 7, max: 10 }
					},
					mousewheel: true
				});

				/*
				$(".user").animate({
					width: 143
					// opacity: 0.25,
					// left: "+=50",
					// height: "toggle"
				}, 500, function() {
					// Animation complete.
				});
				*/
			}

			event.preventDefault();
		});

	});

});

/*
$(function() {
	$("#big-scroller").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 30);
		event.preventDefault();
	});
});
*/

/*
$("div#home-slideshow ul").carouFredSel({
	width: 680, height: 635,
	items: {
		visible: "variable",
		width: 680, height: 635
	},
	scroll: {
		items: 1,
		fx: "uncover",
		pauseOnHover: "immediate"
	},

	auto: true,
	prev: {
		button: "div#home-slideshow button.prev",
		key: "left"
	},
	next: {
		button: "div#home-slideshow button.next",
		key: "right"
	},
	pagination: {
		container: "div#home-slideshow div.pagination",
		keys: true
	},
	swipe: true,
	mousewheel: true
});
*/

/*
$(function () {
	$("#big-scroller").jScrollPane();
});
*/

/*
$(function() {
	$("html, body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 30);
		event.preventDefault();
	});
});
*/

// change width of dimension books, based on viewable window height

$(window).load(function () {

	if ($(window).height() > 677) {
		$(function() {
			$("#big-scroller").carouFredSel({
				auto: false,
				responsive: true,
				width: "100%",
				scroll: 1,
				prev: "#prev-big",
				next: "#next-big",
				items: {
					width: 250,
					visible: { min: 2, max: 5 }
				}
			});
		});
	}

	else {
	};

});