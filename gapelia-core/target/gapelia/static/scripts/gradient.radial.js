// Desired colors for the gradient.
var c0 = [240, 210, 200, 255];
var c1 = [220, 200, 170, 255];
var c2 = [220, 235, 220, 255];

// The ordering of colors for the gradient. Each color maintains a record of
// its initial value, orig, the current value, val, and the index of the color
// that it is animating towards, next.
var colors = [{ orig: c0, val: c0, next: 1 }, { orig: c1, val: c1, next: 2 }, { orig: c2, val: c2, next: 0 }];

// Shift a single color channel, ca, towards a secondary
// channel, cb. If the two channels are equal, ca is returned.
function shiftChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

// Shift a color, ca, towards a secondary color, cb.
// Both colors are in the range RGBA: [0, 255]
function shiftColor(ca, cb) {

	var red = shiftChannel(ca[0], cb[0]);
	var green = shiftChannel(ca[1], cb[1]);
	var blue = shiftChannel(ca[2], cb[2]);
	var alpha = shiftChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

// Update the current color values and draw the gradient.
function drawGradient() {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	// Create a linear gradient from the top left to the bottom right corner.
	var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

	// Shift each color towards the next one in the sequence.
	colors[0].val = shiftColor(colors[0].val, colors[colors[0].next].orig);
	colors[1].val = shiftColor(colors[1].val, colors[colors[1].next].orig);
	colors[2].val = shiftColor(colors[2].val, colors[colors[2].next].orig);

	// If the colors are all equal to their successors, shift the indices
	// so we animate each color towards a different value.
	if (colors[0].val.join() === colors[colors[0].next].orig.join() && colors[1].val.join() === colors[colors[1].next].orig.join() && colors[2].val.join() === colors[colors[2].next].orig.join()) {
		// Update color indices for the next stepping.
		colors[0].next = (colors[0].next + 1) % colors.length;
		colors[1].next = (colors[1].next + 1) % colors.length;
		colors[2].next = (colors[2].next + 1) % colors.length;
	}

	// Create the gradient based on the latest color values.
	gradient.addColorStop(0.0, "rgba(" + colors[0].val[0] + ", " + colors[0].val[1] + ", " + colors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + colors[0].val[0] + ", " + colors[0].val[1] + ", " + colors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + colors[1].val[0] + ", " + colors[1].val[1] + ", " + colors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + colors[1].val[0] + ", " + colors[1].val[1] + ", " + colors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + colors[2].val[0] + ", " + colors[2].val[1] + ", " + colors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + colors[2].val[0] + ", " + colors[2].val[1] + ", " + colors[2].val[2] + ", 1.0)");

	// Draw the gradient.
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Create a radial gradient.
	var center = {
		x: Math.round(canvas.width / 2.0),
		y: Math.round(canvas.height / 2.0)
	};

	var radial = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, Math.min(center.x, center.y));

	// Set the radial gradient's color to the current color in slot #0 and blend it into slot #1
	radial.addColorStop(0.0, "rgba(" + colors[0].val[0] + ", " + colors[0].val[1] + ", " + colors[0].val[2] + ", 1.0)");
	radial.addColorStop(1.0, "rgba(" + colors[1].val[0] + ", " + colors[1].val[1] + ", " + colors[1].val[2] + ", 0.0)");

	// Draw the radial gradient in the middle to add more variety.
	ctx.fillStyle = radial;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

}

// Set the canvas dimensions equal to those of the document.
function setCanvasDimensions() {

	var canvas = document.getElementById("canvas");
	canvas.width = $(window).width();
	canvas.height = $(window).height();

}

// Initial setup.
$(document).ready(function () {

	setCanvasDimensions(); // Initialize canvas dimensions

	// Animate
	window.setInterval(drawGradient, 100);

	// Bind resize handler
	$(window).resize(function () {
		setCanvasDimensions();
	});

});
