
//////////////////////////////////////////////////////////////////////////////////////////// GENERAL //
// USER MENU, CLICK TO SHOW ///////////////////////////////////////////////////////////////////////////

$(function () {

	/* Clicks within the dropdown won't make it past the dropdown itself */

	$("#action-user").click(function(um) {
		$("#action-user ul").css("display", "block");
		um.preventDefault();
		um.stopPropagation();
	});

	$(document).click(function() {
		$("#action-user ul").hide();
	});

	/*
	if ($("#action-user ul").is(":visible")) {
		$("#action-user").click(function(um) {
			$("#action-user ul").css("display", "none");
			um.preventDefault();
			um.stopPropagation();
		});
	} else {
		$("#action-user").click(function(um) {
			$("#action-user ul").css("display", "block");
			um.preventDefault();
			um.stopPropagation();
		});
	}
	*/

	/*
	$(document).click(function() {
		$("#action-user ul").hide();
	});
	*/

	/*
	$("#action-user a").click(function(um) {
		$("#action-user ul").css("display", "block");
		um.preventDefault();
		um.stopPropagation();
	}).click(function(un) {
		$("#action-user ul").css("display", "none");
		un.preventDefault();
		un.stopPropagation();
	});
	*/

	/*
	$(document).click(function() {
		$("#action-user ul:visible").hide();
	});
	*/

	/*
	$("#action-user a").click(function (e) {
		$("#action-user ul").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	});
	*/

	/*
	$("#action-user a").on("click", function(e) {
		$("#action-user ul").css("display", "block");
		e.preventDefault();
		e.stopPropagation();
	}).on("click", function(e) {
		$("#action-user ul").css("display", "none");
		e.preventDefault();
		e.stopPropagation();
	});
	*/

	/*
	$(".flyout-btn").click(function (e) {
		$(".flyout-btn").toggleClass("btn-rotate");
		$(".flyout").toggleClass("flyout-init").toggleClass("expand");
		e.preventDefault();
	});
	*/

});

////////////////////////////////////////////////////////////////////////////////////// BOOK CREATION //

$(document).ready(function() {
	var viewportWidth = $(window).width();
	var smallBookScroller = viewportWidth - 203;

	var bcViewportHeight = $(window).height();
	var bcH = bcViewportHeight - 180;

	$(".small-book-scroller nav").width(smallBookScroller);
	$("#create-book").height(bcH);

	$(".blank-preview-wrapper, .frontcover-preview-wrapper, .photo-preview-wrapper, .text-preview-wrapper, .integrated-preview-wrapper, .phototext-preview-wrapper, .phototext-ii-preview-wrapper, .integrated-ii-preview-wrapper, .video-preview-wrapper").height(bcH);
});

// RESPONSIVE VERTICAL HEIGHT. HOLLAAAAA! /////////////////////////////////////////////////////////////

$(document).ready(function() {
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();

	var w = viewportWidth;
	var h = viewportHeight - 208;

	// $("#main-content, #user-content").width(w).height(h);

	// BOOK CREATION ////////////////////////////////////////////////////////////////////////////////////

	// $("#frontcover-preview-wrapper, #photo-preview-wrapper, #text-preview-wrapper, #integrated-preview-wrapper, #phototext-preview-wrapper, #phototext-ii-preview-wrapper, #integrated-ii-preview-wrapper, #video-preview-wrapper").height(h);

	// $(".blank-preview-wrapper, .frontcover-preview-wrapper, .photo-preview-wrapper, .text-preview-wrapper, .integrated-preview-wrapper, .phototext-preview-wrapper, .phototext-ii-preview-wrapper, .integrated-ii-preview-wrapper, .video-preview-wrapper").height(h);

	// $(".page-bg").height(h);

	// $("#tab-layout, #tab-content, #tab-tags, #tab-settings").height(h);
	// $("#big-scroller-wrapper, .caroufredsel_wrapper, #big-scroller, .dimension-book").height(h);
});

// MAIN SCROLLER //////////////////////////////////////////////////////////////////////////////////////

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
			// width: 200,
			width: 278,
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
			// width: 360,
			width: 300,
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

	// page scroller
	$("#page-scroller").carouFredSel({
		auto: false,
		responsive: true,
		width: "100%",
		scroll: 1,
		prev: "#prev-small",
		next: "#next-small",
		items: {
			width: 160, // wide, for magazine look
			visible: { min: 7, max: 15 }
		},
		mousewheel: true
	});

});

// MISCELLANEOUS //////////////////////////////////////////////////////////////////////////////////////

$(".dimension-book .book-title").squishy({ maxSize: 23 }); // maxSize is really for short titles
// $(".dimension-book .lifestyle li").squishy();
$("#small-scroller .book-title").squishy({ maxSize: 14 });

// EXPAND USERS IN SMALL SCROLLER /////////////////////////////////////////////////////////////////////
// NEED TO FIND BETTER IMPLEMENTATION /////////////////////////////////////////////////////////////////

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

// ADD BOOK TO COLLECTION /////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////// VERTICAL RESPONSIVENESS //
// CHANGE WIDTH OF BOOKS IN SCROLLER, BASED ON WINDOW HEIGHT //////////////////////////////////////////

$(window).load(function () {

	if ($(window).height() <= 677) {
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
					width: 289,
					visible: { min: 2, max: 5 }
				},
				mousewheel: true
			});
		});
	}

	else {
	};

	if ($(window).height() > 677) {
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
					width: 351,
					visible: { min: 2, max: 6 }
				},
				mousewheel: true
			});
		});
	}

	if ($(window).height() > 700) {
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
					width: 400,
					visible: { min: 2, max: 6 }
				},
				mousewheel: true
			});
		});
	}

});
