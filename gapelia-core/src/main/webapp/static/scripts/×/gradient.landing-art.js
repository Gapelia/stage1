/*
 ______   ______  ______                                             
/\  __ \ /\  == \/\__  _\                                            
\ \  __ \\ \  __<\/_/\ \/                                            
 \ \_\ \_\\ \_\ \_\ \ \_\                                            
  \/_/\/_/ \/_/ /_/  \/_/                                            
       __       ______   __   __   _____    __   __   __   ______    
      /\ \     /\  __ \ /\ "-.\ \ /\  __-. /\ \ /\ "-.\ \ /\  ___\   
      \ \ \____\ \  __ \\ \ \-.  \\ \ \/\ \\ \ \\ \ \-.  \\ \ \__ \  
       \ \_____\\ \_\ \_\\ \_\\"\_\\ \____- \ \_\\ \_\\"\_\\ \_____\ 
        \/_____/ \/_/\/_/ \/_/ \/_/ \/____/  \/_/ \/_/ \/_/ \/_____/ 
*/

var artLanding01 = [242, 222, 160, 255];
var artLanding02 = [255, 149, 0, 255];
var artLanding03 = [231, 231, 231, 255];

var artLandingColors = [{ orig: artLanding01, val: artLanding01, next: 1 }, { orig: artLanding02, val: artLanding02, next: 2 }, { orig: artLanding03, val: artLanding03, next: 0 }];

function shiftArtLandingChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftArtLandingColor(ca, cb) {

	var red		= shiftArtLandingChannel(ca[0], cb[0]);
	var green	= shiftArtLandingChannel(ca[1], cb[1]);
	var blue	= shiftArtLandingChannel(ca[2], cb[2]);
	var alpha	= shiftArtLandingChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawArtLanding() {

	var canvas = document.getElementById("art-landing-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	artLandingColors[0].val = shiftArtLandingColor(artLandingColors[0].val, artLandingColors[artLandingColors[0].next].orig);
	artLandingColors[1].val = shiftArtLandingColor(artLandingColors[1].val, artLandingColors[artLandingColors[1].next].orig);
	artLandingColors[2].val = shiftArtLandingColor(artLandingColors[2].val, artLandingColors[artLandingColors[2].next].orig);

	if (artLandingColors[0].val.join() === artLandingColors[artLandingColors[0].next].orig.join() && artLandingColors[1].val.join() === artLandingColors[artLandingColors[1].next].orig.join() && artLandingColors[2].val.join() === artLandingColors[artLandingColors[2].next].orig.join()) {
		artLandingColors[0].next = (artLandingColors[0].next + 1) % artLandingColors.length;
		artLandingColors[1].next = (artLandingColors[1].next + 1) % artLandingColors.length;
		artLandingColors[2].next = (artLandingColors[2].next + 1) % artLandingColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + artLandingColors[0].val[0] + ", " + artLandingColors[0].val[1] + ", " + artLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + artLandingColors[0].val[0] + ", " + artLandingColors[0].val[1] + ", " + artLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + artLandingColors[1].val[0] + ", " + artLandingColors[1].val[1] + ", " + artLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + artLandingColors[1].val[0] + ", " + artLandingColors[1].val[1] + ", " + artLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + artLandingColors[2].val[0] + ", " + artLandingColors[2].val[1] + ", " + artLandingColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + artLandingColors[2].val[0] + ", " + artLandingColors[2].val[1] + ", " + artLandingColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 300, 700); // set width and height of canvas

}

window.setInterval(drawArtLanding, 30);
