<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Welcome to Folio!</title>

		<!--/ ONBOARD VIEW
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
			  \/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

		<meta name="author" content="Folio" />
		<meta name="description" content="Reimagining scholarly publishing" />
		<meta name="keywords" content="academia, publishing, blogging, scholar, ideas, storytelling, long-form, platform, collaboration" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		
		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/css/slytest.css" rel="stylesheet" />
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>
		<script src="/static/scripts/sly.js"></script>

		<script src="/static/scripts/nprogress.js"></script>
		<script src="/static/scripts/ajax.js"></script>

	</head>

	<body class="app profile onboard">

		<!--/ main-content /-->
		<div id="featured-scroller">
			<div id="header-message" style="opacity: 0";>
				Subscribe to at least 3 libraries. Personalize your experience.
				<button id="onboard-next" class="branded">Next step</button>
			</div>
			
			<div id="intro">
				<p id="intro-hello"><b>Folio</b> is a network where ideas and stories are organized in topic-based libraries. Each library is curated by an editor, who can accept and reject submissions.</br></br>Because you are new to Folio, we invite you to subscribe to a few of the libraries that currently exist.</p>
				</br><button id="next-intro" class="branded">Ok, I get it</button>
			</div>

			<!--/ Featured Libraries /-->
			<div class="library-list-wrapper" style="z-index: -1">
				<ul id="explore-list"></ul>
			</div>	
		</div>
		<!--//main-content /-->

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/spin.js"></script>
		<script src="/static/scripts/charLimiter.js"></script>
		<script src="/static/scripts/filepicker2.js"></script>

		<script>
			$(function () { getListSubscribed();getLibraries(); });

			function load() {

				if (user.isOnboarded == true) { document.location.href = "/me"; }

				var $vW = $(window).width(), $vH = $(window).height();

				Spinner({ radius: 40, length: 10 }).spin(document.getElementById("account-splash-wrapper"));


				// Load Gapelia
				NProgress.start();

				
			var
				allBooks = $("#explore-list li"),		// gets all books in a section
				firstBook = $(allBooks).first();		// gets first book in list

				$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

				setTimeout(function () {

					var w = 0, h = 0;

					$("#explore-list li").each(function () {
						w += $(this).outerWidth();
						h += $(this).outerHeight();
					});

					w += 500;

					if ($vW > "1024") {
						$("#explore-list").css("width", w + "px");
						$("#explore-list .library").css("height", $vH - 97 + "px");
					}
					// fades in the all the books after section width is added
					$("#explore-list li").fadeIn("1");
					$("#explore-list").fadeIn("1");
					
				if ($vW > "1024") {
				    $(".library-list-wrapper").sly({
						horizontal: 1,
						itemNav: 'forceCentered',
						smart: 1,
						activateMiddle: 1,
						//activateOn: 'mouseenter',
						mouseDragging: 1,
						touchDragging: 1,
						swingSpeed: 1,
						releaseSwing: 0,
						startAt: 0,
						scrollBar: $(".scrollbar"),
						scrollBy: 1,
						speed: 0.0001,
						elasticBounds: 1,
						easing: 'swing',
						dragHandle: 1,
						dynamicHandle: 1,
						clickBar: 1,
						keyboardNavBy: 'items',
				    });
				}
				
				if ($vW < "1025") {
					$("#explore-list").css("cssText", "padding: 6rem 1.25rem 1.25rem 1.25rem !important");
				}
				
				if ($vW < "800") {
					$("#explore-list").css("cssText", "padding: 5rem 1.25rem 1.25rem 1.25rem !important");
				}
				
				if ($vW < "321") {
					$("#explore-list").css("cssText", "padding: 2rem 1.25rem 1.25rem !important");
				}
				
				}, 1000);

				$(".library").imgLiquid({ fill: true });

				NProgress.done();

				// Initialize "Overlay — onboard photos"
				oop = "";
				oop += "<div id=\"onboard-photos-overlay\" class=\"overlay\" style=\"background-image: url(/static/images/cover-bg.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

				oop += "<div class=\"overlay-controls\">";
				oop += "<button class=\"branded\" id=\"finalize-setup\">Profile is all set!</button>";
				oop += "</div>";

				oop += "<div class=\"account-user-avatar\">";
				oop += "<div class=\"account-avatar-wrapper\" style=\"background-image: url(/static/images/users/user-avatar.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

				oop += "<div class=\"button-wrapper avatar-button\">";
				oop += "<input class=\"photo-picker white\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('.account-avatar-wrapper').css({ 'background-image': 'url(' + url + ')', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); $('.user-avatar').hide(); $('.spinner').hide();\">";
				oop += "</div>";
				oop += "</div>";
				oop += "</div>";

				oop += "<div id=\"user-info\">";
				oop += "<h2 id=\"user-name\">Paul Anthony Webb</h2>";
				oop += "<div id=\"user-bio\" contenteditable=\"true\">Add your bio...</div>";
				oop += "</div>";

				oop += "<div class=\"button-wrapper cover-button\">";
				oop += "<input class=\"photo-picker white\" type=\"filepicker\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#onboard-photos-overlay').css({ 'background-color': '#fcfcfc', 'background-image': 'url(' + url + ')', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); $('.spinner').hide();\">";
				oop += "</div>";

				oop += "</div>";

				$("body").append(oop);

				$("#user-info h2").html(user.name);
				$(".account-avatar-wrapper").css("background-image", "url(" + user.avatarImage + ")");

				// Empty bio field when user clicks in it
				$(document).one("click", "#user-bio", function () { $(this).text(""); });
				$("#user-bio").limit({ maxlength: 150 });

				
				//intro message goes away on click//
				$("#next-intro").click(function (e) {
					$("#intro").css("opacity", "0");
					$("#header-message").css("opacity", "1");
				});
				
				// Overlay — onboard photos
				$("#onboard-next").click(function (e) {

					var element = $(".photo-picker");

					element1 = element[0];
					element2 = element[1];
					element1.type = "filepicker";
					filepicker.constructWidget(element1);
					element2.type = "filepicker";
					filepicker.constructWidget(element2);
					$("#onboard-photos-overlay").addClass("open");

					$("#mp-pusher").css({
						"transform": "translate3d(0, 0, 0)",
						"-o-transform": "translate3d(0, 0, 0)",
						"-ms-transform": "translate3d(0, 0, 0)",
						"-moz-transform": "translate3d(0, 0, 0)",
						"-webkit-transform": "translate3d(0, 0, 0)"
					});

					e.preventDefault();

				});

				// Finish onboarding process
				$("#finalize-setup").click(function () {

					updateUserOnboard();
					document.location.href = "/featured";

				});
				
				//cleans up text when copty/paste
				$('[contenteditable]').on('paste',function(e) {
					e.preventDefault();
					var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
					document.execCommand('insertText', false, text);
				});

			}

			$(function () {

				$(".avatar-button button").addClass("white").html("Add Avatar");
				$(".cover-button button").addClass("white").html("+ Cover Photo");

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
