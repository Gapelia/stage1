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
// $(".dimension-book .lifestyle li").squishy();

//////////////////////////////////////////////////////////////////
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
			}

			event.preventDefault();
		});

	});

});

//////////////////////////////////////////////////////////////////
// Change width of dimension books, based on window height

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
				},
				mousewheel: true
			});
		});
	}

	else {
	};

});

//////////////////////////////////////////////////////////////////
// User Menu / click to show

$(function () {

	$(document).click(function() {
		$("#action-user ul").hide();
	});

	/* Clicks within the dropdown won't make it past the dropdown itself */

	$("#action-user a").click(function(e) {
		$("#action-user ul").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

});

//////////////////////////////////////////////////////////////////
// Add a book to your collection

$(function() {

	// Japanimation book
	$("#book-001 .collect").click(function(e) {
		$("#book-001 .collection-new").css("display", "block");
		$("#book-001 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-001 .collect-close").click(function(e) {
		$("#book-001 .collection-new").css("display", "none");
		$("#book-001 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// Heart + Seoul book
	$("#book-002 .collect").click(function(e) {
		$("#book-002 .collection-new").css("display", "block");
		$("#book-002 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-002 .collect-close").click(function(e) {
		$("#book-002 .collection-new").css("display", "none");
		$("#book-002 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// J'taime du Jour book
	$("#book-003 .collect").click(function(e) {
		$("#book-003 .collection-new").css("display", "block");
		$("#book-003 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-003 .collect-close").click(function(e) {
		$("#book-003 .collection-new").css("display", "none");
		$("#book-003 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// Strawberry Fields book
	$("#book-004 .collect").click(function(e) {
		$("#book-004 .collection-new").css("display", "block");
		$("#book-004 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-004 .collect-close").click(function(e) {
		$("#book-004 .collection-new").css("display", "none");
		$("#book-004 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// Bahama Mama book
	$("#book-005 .collect").click(function(e) {
		$("#book-005 .collection-new").css("display", "block");
		$("#book-005 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-005 .collect-close").click(function(e) {
		$("#book-005 .collection-new").css("display", "none");
		$("#book-005 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// AmsterDAYUM book
	$("#book-006 .collect").click(function(e) {
		$("#book-006 .collection-new").css("display", "block");
		$("#book-006 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-006 .collect-close").click(function(e) {
		$("#book-006 .collection-new").css("display", "none");
		$("#book-006 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// I'm On A Boat book
	$("#book-007 .collect").click(function(e) {
		$("#book-007 .collection-new").css("display", "block");
		$("#book-007 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-007 .collect-close").click(function(e) {
		$("#book-007 .collection-new").css("display", "none");
		$("#book-007 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// Hullabaloo book
	$("#book-008 .collect").click(function(e) {
		$("#book-008 .collection-new").css("display", "block");
		$("#book-008 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-008 .collect-close").click(function(e) {
		$("#book-008 .collection-new").css("display", "none");
		$("#book-008 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// Majesty book
	$("#book-009 .collect").click(function(e) {
		$("#book-009 .collection-new").css("display", "block");
		$("#book-009 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-009 .collect-close").click(function(e) {
		$("#book-009 .collection-new").css("display", "none");
		$("#book-009 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// World of Blue book
	$("#book-010 .collect").click(function(e) {
		$("#book-010 .collection-new").css("display", "block");
		$("#book-010 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-010 .collect-close").click(function(e) {
		$("#book-010 .collection-new").css("display", "none");
		$("#book-010 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

	// Swiss Interiors book
	$("#book-011 .collect").click(function(e) {
		$("#book-011 .collection-new").css("display", "block");
		$("#book-011 .book-info").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});

	$("#book-011 .collect-close").click(function(e) {
		$("#book-011 .collection-new").css("display", "none");
		$("#book-011 .book-info").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});

});

$(document).ready(function($) {
	$("#sidebar-wrapper").tabulous({ effect: "slideLeft" });
	// $("#tabs").tabulous({ effect: "scale" });
	// $("#tabs2").tabulous({ effect: "slideLeft" });
	// $("#tabs3").tabulous({ effect: "scaleUp" });
	// $("#tabs4").tabulous({ effect: "flip" });
});
