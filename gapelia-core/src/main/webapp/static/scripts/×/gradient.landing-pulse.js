/*
 ______  __  __   __       ______   ______                           
/\  == \/\ \/\ \ /\ \     /\  ___\ /\  ___\                          
\ \  _-/\ \ \_\ \\ \ \____\ \___  \\ \  __\                          
 \ \_\   \ \_____\\ \_____\\/\_____\\ \_____\                        
  \/_/    \/_____/ \/_____/ \/_____/ \/_____/                        
       __       ______   __   __   _____    __   __   __   ______    
      /\ \     /\  __ \ /\ "-.\ \ /\  __-. /\ \ /\ "-.\ \ /\  ___\   
      \ \ \____\ \  __ \\ \ \-.  \\ \ \/\ \\ \ \\ \ \-.  \\ \ \__ \  
       \ \_____\\ \_\ \_\\ \_\\"\_\\ \____- \ \_\\ \_\\"\_\\ \_____\ 
        \/_____/ \/_/\/_/ \/_/ \/_/ \/____/  \/_/ \/_/ \/_/ \/_____/ 
*/

var pulseLanding01 = [236, 229, 223, 255];
var pulseLanding02 = [255, 59, 48, 255];
var pulseLanding03 = [231, 231, 231, 255];

var pulseLandingColors = [{ orig: pulseLanding01, val: pulseLanding01, next: 1 }, { orig: pulseLanding02, val: pulseLanding02, next: 2 }, { orig: pulseLanding03, val: pulseLanding03, next: 0 }];

function shiftPulseLandingChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftPulseLandingColor(ca, cb) {

	var red		= shiftPulseLandingChannel(ca[0], cb[0]);
	var green	= shiftPulseLandingChannel(ca[1], cb[1]);
	var blue	= shiftPulseLandingChannel(ca[2], cb[2]);
	var alpha	= shiftPulseLandingChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawPulseLanding() {

	var canvas = document.getElementById("pulse-landing-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	pulseLandingColors[0].val = shiftPulseLandingColor(pulseLandingColors[0].val, pulseLandingColors[pulseLandingColors[0].next].orig);
	pulseLandingColors[1].val = shiftPulseLandingColor(pulseLandingColors[1].val, pulseLandingColors[pulseLandingColors[1].next].orig);
	pulseLandingColors[2].val = shiftPulseLandingColor(pulseLandingColors[2].val, pulseLandingColors[pulseLandingColors[2].next].orig);

	if (pulseLandingColors[0].val.join() === pulseLandingColors[pulseLandingColors[0].next].orig.join() && pulseLandingColors[1].val.join() === pulseLandingColors[pulseLandingColors[1].next].orig.join() && pulseLandingColors[2].val.join() === pulseLandingColors[pulseLandingColors[2].next].orig.join()) {
		pulseLandingColors[0].next = (pulseLandingColors[0].next + 1) % pulseLandingColors.length;
		pulseLandingColors[1].next = (pulseLandingColors[1].next + 1) % pulseLandingColors.length;
		pulseLandingColors[2].next = (pulseLandingColors[2].next + 1) % pulseLandingColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + pulseLandingColors[0].val[0] + ", " + pulseLandingColors[0].val[1] + ", " + pulseLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + pulseLandingColors[0].val[0] + ", " + pulseLandingColors[0].val[1] + ", " + pulseLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + pulseLandingColors[1].val[0] + ", " + pulseLandingColors[1].val[1] + ", " + pulseLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + pulseLandingColors[1].val[0] + ", " + pulseLandingColors[1].val[1] + ", " + pulseLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + pulseLandingColors[2].val[0] + ", " + pulseLandingColors[2].val[1] + ", " + pulseLandingColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + pulseLandingColors[2].val[0] + ", " + pulseLandingColors[2].val[1] + ", " + pulseLandingColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 300, 700); // set width and height of canvas

}

window.setInterval(drawPulseLanding, 30);
