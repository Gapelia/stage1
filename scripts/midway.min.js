/**
 * Midway.js
 * Version: 1.0
 * Author: Shipp Co. (Brandon Jacoby, Jordan Singer, Jeremy Goldberg)
 * Copyright (c) 2013 - Midway.  All rights reserved.
** http://www.shipp.co/midway

<script src="midway.min.js"></script>

Depending on if you want your element to be centered horizontally, vertically, or both, add the following classes.

<div class="centerHorizontal centerVertical"></div>

Remember to set parent container position to relative. That's it! See, super easy to use!

**/

/*
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(m).l(5(){4 c=$(\'.0\').1(\'6\',- +$(\'.0\').7()/2);4 d=$(\'.3\').1(\'8\',- +$(\'.3\').9()/2);c;d;$(".0").1({\'h\':\'f\',\'g\':\'e%\',\'i\':\'e%\'});$(j).k(5(){4 a=$(\'.0\').1(\'6\',- +$(\'.0\').7()/2);4 b=$(\'.3\').1(\'8\',- +$(\'.3\').9()/2);a;b})});',23,23,'centerHorizontal|css||centerVertical|var|function|marginLeft|width|marginTop|height|||||50|absolute|top|position|left|window|resize|ready|document'.split('|'),0,{}))
*/

$(document).ready(function() {
	var c = $(".centerHorizontal").css("marginLeft", -+$(".centerHorizontal").width() / 2);
	var d = $(".centerVertical").css("marginTop", -+$(".centerVertical").height() / 2);
	c; d;

	$(".centerHorizontal").css({
		"position": "absolute",
		"top": "50%",
		"left": "50%"
	});

	$(window).resize(function() {
		var a = $(".centerHorizontal").css("marginLeft", -+$(".centerHorizontal").width() / 2);
		var b = $(".centerVertical").css("marginTop", -+$(".centerVertical").height() / 2);
		a; b;
	});
});