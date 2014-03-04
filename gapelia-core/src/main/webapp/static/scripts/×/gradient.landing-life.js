/*
 __       __   ______  ______                                        
/\ \     /\ \ /\  ___\/\  ___\                                       
\ \ \____\ \ \\ \  __\\ \  __\                                       
 \ \_____\\ \_\\ \_\   \ \_____\                                     
  \/_____/ \/_/ \/_/    \/_____/                                     
       __       ______   __   __   _____    __   __   __   ______    
      /\ \     /\  __ \ /\ "-.\ \ /\  __-. /\ \ /\ "-.\ \ /\  ___\   
      \ \ \____\ \  __ \\ \ \-.  \\ \ \/\ \\ \ \\ \ \-.  \\ \ \__ \  
       \ \_____\\ \_\ \_\\ \_\\"\_\\ \____- \ \_\\ \_\\"\_\\ \_____\ 
        \/_____/ \/_/\/_/ \/_/ \/_/ \/____/  \/_/ \/_/ \/_/ \/_____/ 
*/

var lifeLanding01 = [180, 255, 193, 255];
var lifeLanding02 = [76, 217, 100, 255];
var lifeLanding03 = [231, 231, 231, 255];

var lifeLandingColors = [{ orig: lifeLanding01, val: lifeLanding01, next: 1 }, { orig: lifeLanding02, val: lifeLanding02, next: 2 }, { orig: lifeLanding03, val: lifeLanding03, next: 0 }];

function shiftLifeLandingChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftLifeLandingColor(ca, cb) {

	var red		= shiftLifeLandingChannel(ca[0], cb[0]);
	var green	= shiftLifeLandingChannel(ca[1], cb[1]);
	var blue	= shiftLifeLandingChannel(ca[2], cb[2]);
	var alpha	= shiftLifeLandingChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawLifeLanding() {

	var canvas = document.getElementById("life-landing-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	lifeLandingColors[0].val = shiftLifeLandingColor(lifeLandingColors[0].val, lifeLandingColors[lifeLandingColors[0].next].orig);
	lifeLandingColors[1].val = shiftLifeLandingColor(lifeLandingColors[1].val, lifeLandingColors[lifeLandingColors[1].next].orig);
	lifeLandingColors[2].val = shiftLifeLandingColor(lifeLandingColors[2].val, lifeLandingColors[lifeLandingColors[2].next].orig);

	if (lifeLandingColors[0].val.join() === lifeLandingColors[lifeLandingColors[0].next].orig.join() && lifeLandingColors[1].val.join() === lifeLandingColors[lifeLandingColors[1].next].orig.join() && lifeLandingColors[2].val.join() === lifeLandingColors[lifeLandingColors[2].next].orig.join()) {
		lifeLandingColors[0].next = (lifeLandingColors[0].next + 1) % lifeLandingColors.length;
		lifeLandingColors[1].next = (lifeLandingColors[1].next + 1) % lifeLandingColors.length;
		lifeLandingColors[2].next = (lifeLandingColors[2].next + 1) % lifeLandingColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + lifeLandingColors[0].val[0] + ", " + lifeLandingColors[0].val[1] + ", " + lifeLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + lifeLandingColors[0].val[0] + ", " + lifeLandingColors[0].val[1] + ", " + lifeLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + lifeLandingColors[1].val[0] + ", " + lifeLandingColors[1].val[1] + ", " + lifeLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + lifeLandingColors[1].val[0] + ", " + lifeLandingColors[1].val[1] + ", " + lifeLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + lifeLandingColors[2].val[0] + ", " + lifeLandingColors[2].val[1] + ", " + lifeLandingColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + lifeLandingColors[2].val[0] + ", " + lifeLandingColors[2].val[1] + ", " + lifeLandingColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 300, 700); // set width and height of canvas

}

window.setInterval(drawLifeLanding, 30);
