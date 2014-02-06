/*
 ______  __       ______   __     __                                 
/\  ___\/\ \     /\  __ \ /\ \  _ \ \                                
\ \  __\\ \ \____\ \ \/\ \\ \ \/ ".\ \                               
 \ \_\   \ \_____\\ \_____\\ \__/".~\_\                              
  \/_/    \/_____/ \/_____/ \/_/   \/_/                              
       __       ______   __   __   _____    __   __   __   ______    
      /\ \     /\  __ \ /\ "-.\ \ /\  __-. /\ \ /\ "-.\ \ /\  ___\   
      \ \ \____\ \  __ \\ \ \-.  \\ \ \/\ \\ \ \\ \ \-.  \\ \ \__ \  
       \ \_____\\ \_\ \_\\ \_\\"\_\\ \____- \ \_\\ \_\\"\_\\ \_____\ 
        \/_____/ \/_/\/_/ \/_/ \/_/ \/____/  \/_/ \/_/ \/_/ \/_____/ 
*/

var flowLanding01 = [166, 206, 250, 255];
var flowLanding02 = [0, 122, 255, 255];
var flowLanding03 = [231, 231, 231, 255];

var flowLandingColors = [{ orig: flowLanding01, val: flowLanding01, next: 1 }, { orig: flowLanding02, val: flowLanding02, next: 2 }, { orig: flowLanding03, val: flowLanding03, next: 0 }];

function shiftFlowLandingChannel(ca, cb) {

	if (ca > cb) { return ca - 1; } else if (ca < cb) { return ca + 1; }
	return ca;

}

function shiftFlowLandingColor(ca, cb) {

	var red		= shiftFlowLandingChannel(ca[0], cb[0]);
	var green	= shiftFlowLandingChannel(ca[1], cb[1]);
	var blue	= shiftFlowLandingChannel(ca[2], cb[2]);
	var alpha	= shiftFlowLandingChannel(ca[3], cb[3]);

	return [red, green, blue, alpha];

}

function drawFlowLanding() {

	var canvas = document.getElementById("flow-landing-bg");
	var ctx = canvas.getContext("2d");

	var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 1, 500);

	flowLandingColors[0].val = shiftFlowLandingColor(flowLandingColors[0].val, flowLandingColors[flowLandingColors[0].next].orig);
	flowLandingColors[1].val = shiftFlowLandingColor(flowLandingColors[1].val, flowLandingColors[flowLandingColors[1].next].orig);
	flowLandingColors[2].val = shiftFlowLandingColor(flowLandingColors[2].val, flowLandingColors[flowLandingColors[2].next].orig);

	if (flowLandingColors[0].val.join() === flowLandingColors[flowLandingColors[0].next].orig.join() && flowLandingColors[1].val.join() === flowLandingColors[flowLandingColors[1].next].orig.join() && flowLandingColors[2].val.join() === flowLandingColors[flowLandingColors[2].next].orig.join()) {
		flowLandingColors[0].next = (flowLandingColors[0].next + 1) % flowLandingColors.length;
		flowLandingColors[1].next = (flowLandingColors[1].next + 1) % flowLandingColors.length;
		flowLandingColors[2].next = (flowLandingColors[2].next + 1) % flowLandingColors.length;
	}

	gradient.addColorStop(0.0, "rgba(" + flowLandingColors[0].val[0] + ", " + flowLandingColors[0].val[1] + ", " + flowLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.2, "rgba(" + flowLandingColors[0].val[0] + ", " + flowLandingColors[0].val[1] + ", " + flowLandingColors[0].val[2] + ", 1.0)");
	gradient.addColorStop(0.4, "rgba(" + flowLandingColors[1].val[0] + ", " + flowLandingColors[1].val[1] + ", " + flowLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.6, "rgba(" + flowLandingColors[1].val[0] + ", " + flowLandingColors[1].val[1] + ", " + flowLandingColors[1].val[2] + ", 1.0)");
	gradient.addColorStop(0.8, "rgba(" + flowLandingColors[2].val[0] + ", " + flowLandingColors[2].val[1] + ", " + flowLandingColors[2].val[2] + ", 1.0)");
	gradient.addColorStop(1.0, "rgba(" + flowLandingColors[2].val[0] + ", " + flowLandingColors[2].val[1] + ", " + flowLandingColors[2].val[2] + ", 1.0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 300, 700); // set width and height of canvas

}

window.setInterval(drawFlowLanding, 30);
