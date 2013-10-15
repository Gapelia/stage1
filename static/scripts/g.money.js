
//////////////////////////////////////////////////////////////////////////////////////////// GENERAL //

$(document).ready(function() {

	var $vW = $(window).width(), $vH = $(window).height();

	// Reload Gapelia when browser window resizing occurs
	$(window).resize(function() {
		if($vW != $(window).width()) {
			location.reload();
			return;
		}
	});

	// Set height of books in feed
	$("#user-book-list .book").css("height", $vH - 97 + "px"); // 100
	$("#user-collection-list .book").css("height", $vH - 97 + "px");
	$("#user-library-list .book").css("height", $vH - 97 + "px");

	$(".super-wrapper").css("height", $vH + "px");

	// Resize Image to Parent Container by Christian Varga
	jQuery.fn.resizeToParent = function(options) {

		var defaults = { parent: ".book" };
		var options = jQuery.extend(defaults, options);

		return this.each(function() {

			var o = options;
			var obj = jQuery(this);

			// bind to load of image
			obj.load(function() {

				// dimensions of the parent
				var parentWidth = obj.parents(o.parent).width();
				var parentHeight = obj.parents(o.parent).height();

				// dimensions of the image
				var imageWidth = obj.width();
				var imageHeight = obj.height();

				// step 1 - calculate the percentage difference between image width and container width
				var diff = imageWidth / parentWidth;

				// step 2 - if height divided by difference is smaller than container height, resize by height. otherwise resize by width
				if ((imageHeight / diff) < parentHeight) {
					obj.css({"width": "auto", "height": parentHeight});

					// set image variables to new dimensions
					imageWidth = imageWidth / (imageHeight / parentHeight);
					imageHeight = parentHeight;
				} else {
					obj.css({"height": "auto", "width": parentWidth});

					// set image variables to new dimensions
					imageWidth = parentWidth;
					imageHeight = imageHeight / diff;
				}

				// step 3 - center image in container
				var leftOffset = (imageWidth - parentWidth) / -2;
				var topOffset = (imageHeight - parentHeight) / -2;

				obj.css({ "left": leftOffset, "top": topOffset });

			});

		});

	};

	// Bookmark Logic
	$("#nav-bookmarks-toggle").click(function (e) {
		// $("#bookmarks-scroller").toggle();
		$("#nav-bookmarks-toggle").css("right", "250px");
		$("#bookmarks-scroller").css("right", "0");
		e.preventDefault();
	});

	$("#bookmarks-scroller").mouseleave(function() {
		// $("#bookmarks-scroller").fadeOut(850);
		$("#nav-bookmarks-toggle").css("right", "-32px");
		$("#bookmarks-scroller").css("right", "-300px");
	});

	$("#bookmarks-scroller").css("height", $vH + "px");

	//

	/*
	$("<span/>", {
		id: someID,
		className: "foobar",
		html: 32
	});
	*/

	$("#bm-notifications span").html("14");
	$("#bm-books span").html("8");
	$("#bm-collections span").html("32");
	$("#bm-libraries span").html("10");
	$("#bm-drafts span").html("3");

});
