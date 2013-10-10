
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

	$("#user-book-list .book").css("height", $vH - 100 + "px");

});
