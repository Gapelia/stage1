/*
 ______  __  __   __       ______   ______    
/\  == \/\ \/\ \ /\ \     /\  ___\ /\  ___\   
\ \  _-/\ \ \_\ \\ \ \____\ \___  \\ \  __\   
 \ \_\   \ \_____\\ \_____\\/\_____\\ \_____\ 
  \/_/    \/_____/ \/_____/ \/_____/ \/_____/ 
*/

// Desired pulseColors for the gradient.
var pulse01 = [236, 229, 223, 255];
var pulse02 = [255, 59, 48, 255];
var pulse03 = [231, 231, 231, 255];

// The ordering of pulseColors for the gradient. Each color maintains a record of
// its initial value, orig, the current value, val, and the index of the color
// that it is animating towards, next.
var pulseColors = [{ orig: pulse01, val: pulse01, next: 1 }, { orig: pulse02, val: pulse02, next: 2 }, { orig: pulse03, val: pulse03, next: 0 }];

// Shift a single color channel, ca, towards a secondary
// channel, cb. If the two channels are equal, ca is returned.
function shiftPulseChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

// Shift a color, ca, towards a secondary color, cb.
// Both pulseColors are in the range RGBA: [0, 255]
function shiftPulseColor(ca, cb) {

	var red		= shiftPulseChannel(ca[0], cb[0]);
	var green	= shiftPulseChannel(ca[1], cb[1]);
	var blue	= shiftPulseChannel(ca[2], cb[2]);
	var alpha	= shiftPulseChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

// Update the current color values and draw the gradient.
function drawPulse() {

	var canvas = document.getElementById("pulse-portal-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	// Shift each color towards the next one in the sequence.
	pulseColors[0].val = shiftPulseColor(pulseColors[0].val, pulseColors[pulseColors[0].next].orig);
	pulseColors[1].val = shiftPulseColor(pulseColors[1].val, pulseColors[pulseColors[1].next].orig);
	pulseColors[2].val = shiftPulseColor(pulseColors[2].val, pulseColors[pulseColors[2].next].orig);

	// If the pulseColors are all equal to their successors, shift the indices
	// so we animate each color towards a different value.
	if (pulseColors[0].val.join() === pulseColors[pulseColors[0].next].orig.join() && pulseColors[1].val.join() === pulseColors[pulseColors[1].next].orig.join() && pulseColors[2].val.join() === pulseColors[pulseColors[2].next].orig.join()) {
		// Update color indices for the next stepping.
		pulseColors[0].next = (pulseColors[0].next + 1) % pulseColors.length;
		pulseColors[1].next = (pulseColors[1].next + 1) % pulseColors.length;
		pulseColors[2].next = (pulseColors[2].next + 1) % pulseColors.length;
	}

	// Create the gradient based on the latest color values.
	gradient.addColorStop(0.0, "rgba(" + pulseColors[0].val[0] + ", " + pulseColors[0].val[1] + ", " + pulseColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + pulseColors[0].val[0] + ", " + pulseColors[0].val[1] + ", " + pulseColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + pulseColors[1].val[0] + ", " + pulseColors[1].val[1] + ", " + pulseColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + pulseColors[1].val[0] + ", " + pulseColors[1].val[1] + ", " + pulseColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + pulseColors[2].val[0] + ", " + pulseColors[2].val[1] + ", " + pulseColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + pulseColors[2].val[0] + ", " + pulseColors[2].val[1] + ", " + pulseColors[2].val[2] + ", 1.0)");

	// Draw the gradient.
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 400, 500); // set width and height of canvas

}

/*
 ______   ______  ______  
/\  __ \ /\  == \/\__  _\ 
\ \  __ \\ \  __<\/_/\ \/ 
 \ \_\ \_\\ \_\ \_\ \ \_\ 
  \/_/\/_/ \/_/ /_/  \/_/ 
*/

var art01 = [242, 222, 160, 255];
var art02 = [255, 149, 0, 255];
var art03 = [231, 231, 231, 255];

var artColors = [{ orig: art01, val: art01, next: 1 }, { orig: art02, val: art02, next: 2 }, { orig: art03, val: art03, next: 0 }];

function shiftArtChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftArtColor(ca, cb) {

	var red		= shiftArtChannel(ca[0], cb[0]);
	var green	= shiftArtChannel(ca[1], cb[1]);
	var blue	= shiftArtChannel(ca[2], cb[2]);
	var alpha	= shiftArtChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawArt() {

	var canvas = document.getElementById("art-portal-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	artColors[0].val = shiftArtColor(artColors[0].val, artColors[artColors[0].next].orig);
	artColors[1].val = shiftArtColor(artColors[1].val, artColors[artColors[1].next].orig);
	artColors[2].val = shiftArtColor(artColors[2].val, artColors[artColors[2].next].orig);

	if (artColors[0].val.join() === artColors[artColors[0].next].orig.join() && artColors[1].val.join() === artColors[artColors[1].next].orig.join() && artColors[2].val.join() === artColors[artColors[2].next].orig.join()) {
		artColors[0].next = (artColors[0].next + 1) % artColors.length;
		artColors[1].next = (artColors[1].next + 1) % artColors.length;
		artColors[2].next = (artColors[2].next + 1) % artColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + artColors[0].val[0] + ", " + artColors[0].val[1] + ", " + artColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + artColors[0].val[0] + ", " + artColors[0].val[1] + ", " + artColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + artColors[1].val[0] + ", " + artColors[1].val[1] + ", " + artColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + artColors[1].val[0] + ", " + artColors[1].val[1] + ", " + artColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + artColors[2].val[0] + ", " + artColors[2].val[1] + ", " + artColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + artColors[2].val[0] + ", " + artColors[2].val[1] + ", " + artColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 400, 500); // set width and height of canvas

}

/*
 __     __   ______   __     __    
/\ \  _ \ \ /\  __ \ /\ \  _ \ \   
\ \ \/ ".\ \\ \ \/\ \\ \ \/ ".\ \  
 \ \__/".~\_\\ \_____\\ \__/".~\_\ 
  \/_/   \/_/ \/_____/ \/_/   \/_/ 
*/

var wow01 = [251, 236, 175, 255];
var wow02 = [255, 204, 0, 255];
var wow03 = [231, 231, 231, 255];

var wowColors = [{ orig: wow01, val: wow01, next: 1 }, { orig: wow02, val: wow02, next: 2 }, { orig: wow03, val: wow03, next: 0 }];

function shiftWowChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftWowColor(ca, cb) {

	var red		= shiftWowChannel(ca[0], cb[0]);
	var green	= shiftWowChannel(ca[1], cb[1]);
	var blue	= shiftWowChannel(ca[2], cb[2]);
	var alpha	= shiftWowChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawWow() {

	var canvas = document.getElementById("wow-portal-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	wowColors[0].val = shiftWowColor(wowColors[0].val, wowColors[wowColors[0].next].orig);
	wowColors[1].val = shiftWowColor(wowColors[1].val, wowColors[wowColors[1].next].orig);
	wowColors[2].val = shiftWowColor(wowColors[2].val, wowColors[wowColors[2].next].orig);

	if (wowColors[0].val.join() === wowColors[wowColors[0].next].orig.join() && wowColors[1].val.join() === wowColors[wowColors[1].next].orig.join() && wowColors[2].val.join() === wowColors[wowColors[2].next].orig.join()) {
		wowColors[0].next = (wowColors[0].next + 1) % wowColors.length;
		wowColors[1].next = (wowColors[1].next + 1) % wowColors.length;
		wowColors[2].next = (wowColors[2].next + 1) % wowColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + wowColors[0].val[0] + ", " + wowColors[0].val[1] + ", " + wowColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + wowColors[0].val[0] + ", " + wowColors[0].val[1] + ", " + wowColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + wowColors[1].val[0] + ", " + wowColors[1].val[1] + ", " + wowColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + wowColors[1].val[0] + ", " + wowColors[1].val[1] + ", " + wowColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + wowColors[2].val[0] + ", " + wowColors[2].val[1] + ", " + wowColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + wowColors[2].val[0] + ", " + wowColors[2].val[1] + ", " + wowColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 400, 500); // set width and height of canvas

}

/*
 __       __   ______  ______    
/\ \     /\ \ /\  ___\/\  ___\   
\ \ \____\ \ \\ \  __\\ \  __\   
 \ \_____\\ \_\\ \_\   \ \_____\ 
  \/_____/ \/_/ \/_/    \/_____/ 
*/

var life01 = [180, 255, 193, 255];
var life02 = [76, 217, 100, 255];
var life03 = [231, 231, 231, 255];

var lifeColors = [{ orig: life01, val: life01, next: 1 }, { orig: life02, val: life02, next: 2 }, { orig: life03, val: life03, next: 0 }];

function shiftLifeChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftLifeColor(ca, cb) {

	var red		= shiftLifeChannel(ca[0], cb[0]);
	var green	= shiftLifeChannel(ca[1], cb[1]);
	var blue	= shiftLifeChannel(ca[2], cb[2]);
	var alpha	= shiftLifeChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawLife() {

	var canvas = document.getElementById("life-portal-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	lifeColors[0].val = shiftLifeColor(lifeColors[0].val, lifeColors[lifeColors[0].next].orig);
	lifeColors[1].val = shiftLifeColor(lifeColors[1].val, lifeColors[lifeColors[1].next].orig);
	lifeColors[2].val = shiftLifeColor(lifeColors[2].val, lifeColors[lifeColors[2].next].orig);

	if (lifeColors[0].val.join() === lifeColors[lifeColors[0].next].orig.join() && lifeColors[1].val.join() === lifeColors[lifeColors[1].next].orig.join() && lifeColors[2].val.join() === lifeColors[lifeColors[2].next].orig.join()) {
		lifeColors[0].next = (lifeColors[0].next + 1) % lifeColors.length;
		lifeColors[1].next = (lifeColors[1].next + 1) % lifeColors.length;
		lifeColors[2].next = (lifeColors[2].next + 1) % lifeColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + lifeColors[0].val[0] + ", " + lifeColors[0].val[1] + ", " + lifeColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + lifeColors[0].val[0] + ", " + lifeColors[0].val[1] + ", " + lifeColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + lifeColors[1].val[0] + ", " + lifeColors[1].val[1] + ", " + lifeColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + lifeColors[1].val[0] + ", " + lifeColors[1].val[1] + ", " + lifeColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + lifeColors[2].val[0] + ", " + lifeColors[2].val[1] + ", " + lifeColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + lifeColors[2].val[0] + ", " + lifeColors[2].val[1] + ", " + lifeColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 400, 500); // set width and height of canvas

}

/*
 ______  __       ______   __     __    
/\  ___\/\ \     /\  __ \ /\ \  _ \ \   
\ \  __\\ \ \____\ \ \/\ \\ \ \/ ".\ \  
 \ \_\   \ \_____\\ \_____\\ \__/".~\_\ 
  \/_/    \/_____/ \/_____/ \/_/   \/_/ 
*/

var flow01 = [166, 206, 250, 255];
var flow02 = [0, 122, 255, 255];
var flow03 = [231, 231, 231, 255];

var flowColors = [{ orig: flow01, val: flow01, next: 1 }, { orig: flow02, val: flow02, next: 2 }, { orig: flow03, val: flow03, next: 0 }];

function shiftFlowChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftFlowColor(ca, cb) {

	var red		= shiftFlowChannel(ca[0], cb[0]);
	var green	= shiftFlowChannel(ca[1], cb[1]);
	var blue	= shiftFlowChannel(ca[2], cb[2]);
	var alpha	= shiftFlowChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawFlow() {

	var canvas = document.getElementById("flow-portal-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	flowColors[0].val = shiftFlowColor(flowColors[0].val, flowColors[flowColors[0].next].orig);
	flowColors[1].val = shiftFlowColor(flowColors[1].val, flowColors[flowColors[1].next].orig);
	flowColors[2].val = shiftFlowColor(flowColors[2].val, flowColors[flowColors[2].next].orig);

	if (flowColors[0].val.join() === flowColors[flowColors[0].next].orig.join() && flowColors[1].val.join() === flowColors[flowColors[1].next].orig.join() && flowColors[2].val.join() === flowColors[flowColors[2].next].orig.join()) {
		flowColors[0].next = (flowColors[0].next + 1) % flowColors.length;
		flowColors[1].next = (flowColors[1].next + 1) % flowColors.length;
		flowColors[2].next = (flowColors[2].next + 1) % flowColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + flowColors[0].val[0] + ", " + flowColors[0].val[1] + ", " + flowColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + flowColors[0].val[0] + ", " + flowColors[0].val[1] + ", " + flowColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + flowColors[1].val[0] + ", " + flowColors[1].val[1] + ", " + flowColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + flowColors[1].val[0] + ", " + flowColors[1].val[1] + ", " + flowColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + flowColors[2].val[0] + ", " + flowColors[2].val[1] + ", " + flowColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + flowColors[2].val[0] + ", " + flowColors[2].val[1] + ", " + flowColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 400, 500); // set width and height of canvas

}

/*
 __     __   ______   __   __   _____    ______   ______    
/\ \  _ \ \ /\  __ \ /\ "-.\ \ /\  __-. /\  ___\ /\  == \   
\ \ \/ ".\ \\ \ \/\ \\ \ \-.  \\ \ \/\ \\ \  __\ \ \  __<   
 \ \__/".~\_\\ \_____\\ \_\\"\_\\ \____- \ \_____\\ \_\ \_\ 
  \/_/   \/_/ \/_____/ \/_/ \/_/ \/____/  \/_____/ \/_/ /_/ 
*/

var wonder01 = [230, 173, 252, 255];
var wonder02 = [179, 86, 214, 255];
var wonder03 = [231, 231, 231, 255];

var wonderColors = [{ orig: wonder01, val: wonder01, next: 1 }, { orig: wonder02, val: wonder02, next: 2 }, { orig: wonder03, val: wonder03, next: 0 }];

function shiftWonderChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftWonderColor(ca, cb) {

	var red		= shiftWonderChannel(ca[0], cb[0]);
	var green	= shiftWonderChannel(ca[1], cb[1]);
	var blue	= shiftWonderChannel(ca[2], cb[2]);
	var alpha	= shiftWonderChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawWonder() {

	var canvas = document.getElementById("wonder-portal-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	wonderColors[0].val = shiftWonderColor(wonderColors[0].val, wonderColors[wonderColors[0].next].orig);
	wonderColors[1].val = shiftWonderColor(wonderColors[1].val, wonderColors[wonderColors[1].next].orig);
	wonderColors[2].val = shiftWonderColor(wonderColors[2].val, wonderColors[wonderColors[2].next].orig);

	if (wonderColors[0].val.join() === wonderColors[wonderColors[0].next].orig.join() && wonderColors[1].val.join() === wonderColors[wonderColors[1].next].orig.join() && wonderColors[2].val.join() === wonderColors[wonderColors[2].next].orig.join()) {
		wonderColors[0].next = (wonderColors[0].next + 1) % wonderColors.length;
		wonderColors[1].next = (wonderColors[1].next + 1) % wonderColors.length;
		wonderColors[2].next = (wonderColors[2].next + 1) % wonderColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + wonderColors[0].val[0] + ", " + wonderColors[0].val[1] + ", " + wonderColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + wonderColors[0].val[0] + ", " + wonderColors[0].val[1] + ", " + wonderColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + wonderColors[1].val[0] + ", " + wonderColors[1].val[1] + ", " + wonderColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + wonderColors[1].val[0] + ", " + wonderColors[1].val[1] + ", " + wonderColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + wonderColors[2].val[0] + ", " + wonderColors[2].val[1] + ", " + wonderColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + wonderColors[2].val[0] + ", " + wonderColors[2].val[1] + ", " + wonderColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 400, 500); // set width and height of canvas

}

// Animate
window.setInterval(drawPulse, 100);
window.setInterval(drawArt, 100);
window.setInterval(drawWow, 100);
window.setInterval(drawLife, 100);
window.setInterval(drawFlow, 100);
window.setInterval(drawWonder, 100);
