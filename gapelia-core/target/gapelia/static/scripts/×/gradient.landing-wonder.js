/*
 __     __   ______   __   __   _____    ______   ______             
/\ \  _ \ \ /\  __ \ /\ "-.\ \ /\  __-. /\  ___\ /\  == \            
\ \ \/ ".\ \\ \ \/\ \\ \ \-.  \\ \ \/\ \\ \  __\ \ \  __<            
 \ \__/".~\_\\ \_____\\ \_\\"\_\\ \____- \ \_____\\ \_\ \_\          
  \/_/   \/_/ \/_____/ \/_/ \/_/ \/____/  \/_____/ \/_/ /_/          
       __       ______   __   __   _____    __   __   __   ______    
      /\ \     /\  __ \ /\ "-.\ \ /\  __-. /\ \ /\ "-.\ \ /\  ___\   
      \ \ \____\ \  __ \\ \ \-.  \\ \ \/\ \\ \ \\ \ \-.  \\ \ \__ \  
       \ \_____\\ \_\ \_\\ \_\\"\_\\ \____- \ \_\\ \_\\"\_\\ \_____\ 
        \/_____/ \/_/\/_/ \/_/ \/_/ \/____/  \/_/ \/_/ \/_/ \/_____/ 
*/

var wonderLanding01 = [230, 173, 252, 255];
var wonderLanding02 = [179, 86, 214, 255];
var wonderLanding03 = [231, 231, 231, 255];

var wonderLandingColors = [{ orig: wonderLanding01, val: wonderLanding01, next: 1 }, { orig: wonderLanding02, val: wonderLanding02, next: 2 }, { orig: wonderLanding03, val: wonderLanding03, next: 0 }];

function shiftWonderLandingChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftWonderLandingColor(ca, cb) {

	var red		= shiftWonderLandingChannel(ca[0], cb[0]);
	var green	= shiftWonderLandingChannel(ca[1], cb[1]);
	var blue	= shiftWonderLandingChannel(ca[2], cb[2]);
	var alpha	= shiftWonderLandingChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawWonderLanding() {

	var canvas = document.getElementById("wonder-landing-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	wonderLandingColors[0].val = shiftWonderLandingColor(wonderLandingColors[0].val, wonderLandingColors[wonderLandingColors[0].next].orig);
	wonderLandingColors[1].val = shiftWonderLandingColor(wonderLandingColors[1].val, wonderLandingColors[wonderLandingColors[1].next].orig);
	wonderLandingColors[2].val = shiftWonderLandingColor(wonderLandingColors[2].val, wonderLandingColors[wonderLandingColors[2].next].orig);

	if (wonderLandingColors[0].val.join() === wonderLandingColors[wonderLandingColors[0].next].orig.join() && wonderLandingColors[1].val.join() === wonderLandingColors[wonderLandingColors[1].next].orig.join() && wonderLandingColors[2].val.join() === wonderLandingColors[wonderLandingColors[2].next].orig.join()) {
		wonderLandingColors[0].next = (wonderLandingColors[0].next + 1) % wonderLandingColors.length;
		wonderLandingColors[1].next = (wonderLandingColors[1].next + 1) % wonderLandingColors.length;
		wonderLandingColors[2].next = (wonderLandingColors[2].next + 1) % wonderLandingColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + wonderLandingColors[0].val[0] + ", " + wonderLandingColors[0].val[1] + ", " + wonderLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + wonderLandingColors[0].val[0] + ", " + wonderLandingColors[0].val[1] + ", " + wonderLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + wonderLandingColors[1].val[0] + ", " + wonderLandingColors[1].val[1] + ", " + wonderLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + wonderLandingColors[1].val[0] + ", " + wonderLandingColors[1].val[1] + ", " + wonderLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + wonderLandingColors[2].val[0] + ", " + wonderLandingColors[2].val[1] + ", " + wonderLandingColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + wonderLandingColors[2].val[0] + ", " + wonderLandingColors[2].val[1] + ", " + wonderLandingColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 300, 700); // set width and height of canvas

}

window.setInterval(drawWonderLanding, 30);
