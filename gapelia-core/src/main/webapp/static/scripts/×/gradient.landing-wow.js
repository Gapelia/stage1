/*
 __     __   ______   __     __                                      
/\ \  _ \ \ /\  __ \ /\ \  _ \ \                                     
\ \ \/ ".\ \\ \ \/\ \\ \ \/ ".\ \                                    
 \ \__/".~\_\\ \_____\\ \__/".~\_\                                   
  \/_/   \/_/ \/_____/ \/_/   \/_/                                   
       __       ______   __   __   _____    __   __   __   ______    
      /\ \     /\  __ \ /\ "-.\ \ /\  __-. /\ \ /\ "-.\ \ /\  ___\   
      \ \ \____\ \  __ \\ \ \-.  \\ \ \/\ \\ \ \\ \ \-.  \\ \ \__ \  
       \ \_____\\ \_\ \_\\ \_\\"\_\\ \____- \ \_\\ \_\\"\_\\ \_____\ 
        \/_____/ \/_/\/_/ \/_/ \/_/ \/____/  \/_/ \/_/ \/_/ \/_____/ 
*/

var wowLanding01 = [251, 236, 175, 255];
var wowLanding02 = [255, 204, 0, 255];
var wowLanding03 = [231, 231, 231, 255];

var wowLandingColors = [{ orig: wowLanding01, val: wowLanding01, next: 1 }, { orig: wowLanding02, val: wowLanding02, next: 2 }, { orig: wowLanding03, val: wowLanding03, next: 0 }];

function shiftWowLandingChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftWowLandingColor(ca, cb) {

	var red		= shiftWowLandingChannel(ca[0], cb[0]);
	var green	= shiftWowLandingChannel(ca[1], cb[1]);
	var blue	= shiftWowLandingChannel(ca[2], cb[2]);
	var alpha	= shiftWowLandingChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawWowLanding() {

	var canvas = document.getElementById("wow-landing-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	wowLandingColors[0].val = shiftWowLandingColor(wowLandingColors[0].val, wowLandingColors[wowLandingColors[0].next].orig);
	wowLandingColors[1].val = shiftWowLandingColor(wowLandingColors[1].val, wowLandingColors[wowLandingColors[1].next].orig);
	wowLandingColors[2].val = shiftWowLandingColor(wowLandingColors[2].val, wowLandingColors[wowLandingColors[2].next].orig);

	if (wowLandingColors[0].val.join() === wowLandingColors[wowLandingColors[0].next].orig.join() && wowLandingColors[1].val.join() === wowLandingColors[wowLandingColors[1].next].orig.join() && wowLandingColors[2].val.join() === wowLandingColors[wowLandingColors[2].next].orig.join()) {
		wowLandingColors[0].next = (wowLandingColors[0].next + 1) % wowLandingColors.length;
		wowLandingColors[1].next = (wowLandingColors[1].next + 1) % wowLandingColors.length;
		wowLandingColors[2].next = (wowLandingColors[2].next + 1) % wowLandingColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + wowLandingColors[0].val[0] + ", " + wowLandingColors[0].val[1] + ", " + wowLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + wowLandingColors[0].val[0] + ", " + wowLandingColors[0].val[1] + ", " + wowLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + wowLandingColors[1].val[0] + ", " + wowLandingColors[1].val[1] + ", " + wowLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + wowLandingColors[1].val[0] + ", " + wowLandingColors[1].val[1] + ", " + wowLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + wowLandingColors[2].val[0] + ", " + wowLandingColors[2].val[1] + ", " + wowLandingColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + wowLandingColors[2].val[0] + ", " + wowLandingColors[2].val[1] + ", " + wowLandingColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 300, 700); // set width and height of canvas

}

window.setInterval(drawWowLanding, 30);
