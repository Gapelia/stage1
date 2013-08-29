(function() {

	var full_page_loader, opts, spinner, target;

	opts = {
		lines: 13,
		length: 4,
		width: 2,
		radius: 8,
		corners: 1,
		rotate: 0,
		direction: 1,
		color: "#191919",
		speed: 1,
		trail: 50,
		shadow: false,
		hwaccel: true,
		className: "spinner",
		zIndex: 9999999,
		top: "-36px",
		left: "12px"
	};

	target = document.getElementById("loading-spinner");
	full_page_loader = document.getElementById("full-page-loader");
	spinner = new Spinner(opts);

	window.showLoadingDiv = function() {

		spinner.spin(target);
		return full_page_loader.hidden = false;

	};

	window.hideLoadingDiv = function() {

		spinner.stop();
		return full_page_loader.hidden = true;

	};

	showLoadingDiv();

}).call(this);
