<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Welcome to Gapelia!</title>

		<!--/ ONBOARD VIEW
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
			  \/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

		<meta name="author" content="Gapelia"/>
		<meta name="description" content="Better stories, together."/>
		<meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try { Typekit.load(); } catch(e) {}</script>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>

		<script src="/static/scripts/nprogress.js"></script>
		<script src="/static/scripts/ajax.js"></script>

	</head>

	<body class="app profile onboard">

		<!--/ main-content /-->
		<div id="featured-scroller">
			<div id="header-message">
				Subscribe to at least 3 libraries. Personalize your experience.
				<button id="onboard-next" class="branded">Next step</button>
			</div>

			<!--/ Featured Libraries /-->
			<div class="library-list-wrapper"></div>
		</div>
		<!--//main-content /-->

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/spin.js"></script>
		<script src="/static/scripts/charLimiter.js"></script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/mousewheel.js"></script>
		<script src="/static/scripts/scroll.js"></script>
		<script src="/static/scripts/filepicker2.js"></script>

		<script>
			$(function () { getListSubscribed();getLibraries(); });

			function load() {

				if (user.isOnboarded == true) { document.location.href = "/me"; }

				var $vW = $(window).width(), $vH = $(window).height();

				/*
				var w = 0, h = 0;

				$("#library-list li").each(function () {

					w += $(this).outerWidth();
					h += $(this).outerHeight();

				});

				w += 500;

				if ($vW > "1024") {
					$("#library-list").css("width", w + "px");
				}
				*/

				Spinner({ radius: 40, length: 10 }).spin(document.getElementById("account-splash-wrapper"));

				// Scrolling on desktop
				if ($vW > "1024") {

					$("#featured-scroller").mousewheel(function (event, delta) {

						$("#featured-scroller").stop().animate({
							scrollLeft: "-=" + (75 * delta) + "px"
						}, "150", "easeOutCubic");

						event.preventDefault();

					});

				}

				// Load Gapelia
				NProgress.start();

				var
				allBooks = $("#library-list li"),		// gets all books in a section
				firstBook = $(allBooks).first();		// gets first book in list

				$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

				setTimeout(function () {

					var w = 0, h = 0;

					$("#library-list li").each(function () {
						w += $(this).outerWidth();
						h += $(this).outerHeight();
					});

					w += 500;

					if ($vW > "1024") {

						// $("#library-list").css("width", w - 155 + "px");

						$("#library-list").css("width", w + "px");
						$("#library-list .library").css("height", $vH - 97 + "px");

					} else {
						// $("#library-list").css("height", h + 379 + "px");
					}

					// fades in the all the books after section width is added
					$("#library-list li").fadeIn("100");
					$("#library-list").fadeIn("100");

				}, 1000);

				$(".library").imgLiquid({ fill: true });

				NProgress.done();

				// Initialize "Overlay — onboard photos"
				oop = "";
				oop += "<div id=\"onboard-photos-overlay\" class=\"overlay\" style=\"background-image: url(/static/images/cover-bg.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

				// oop += "<div id=\"onboard-photos-overlay\" class=\"overlay\" style=\"background-image: url(/static/images/blankBG.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

				oop += "<div class=\"overlay-controls\">";
				oop += "<button class=\"transparent-ii\" id=\"finalize-setup\">Profile is all set!</button>";
				oop += "</div>";

				oop += "<div class=\"account-user-avatar\">";
				oop += "<div class=\"account-avatar-wrapper\" style=\"background-image: url(/static/images/users/user-avatar.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
				// oop += "<div class=\"account-avatar-wrapper\" style=\"background-image: url(/static/images/users/avatar.jpg); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
				oop += "<div class=\"button-wrapper avatar-button\">";
				oop += "<input class=\"photo-picker white\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('.account-avatar-wrapper').css({ 'background-image': 'url(' + url + ')', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); $('.user-avatar').hide(); $('.spinner').hide();\">";
				oop += "</div>";
				oop += "</div>";
				oop += "</div>";

				oop += "<div id=\"user-info\">";
				oop += "<h2 id=\"user-name\">Paul Anthony Webb</h2>";
				oop += "<div id=\"user-bio\" contenteditable=\"true\">Add your bio...</div>";
				oop += "</div>";

				oop += "<div class=\"button-wrapper cover-button\">";
				oop += "<input class=\"photo-picker white\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#onboard-photos-overlay').css({ 'background-color': '#fcfcfc', 'background-image': 'url(' + url + ')', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); $('.spinner').hide();\">";
				oop += "</div>";

				oop += "</div>";

				$("body").append(oop);

				$("#user-info h2").html(user.name);
				$(".account-avatar-wrapper").css("background-image", "url(" + user.avatarImage + ")");

				// Empty bio field when user clicks in it
				$(document).one("click", "#user-bio", function () { $(this).text(""); });
				$("#user-bio").limit({ maxlength: 150 });

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

			}

			$(function () {

				$(".avatar-button button").addClass("white").html("Add Avatar");
				$(".cover-button button").addClass("white").html("+ Cover Photo");
				// $(".avatar-button button").addClass("slate").html("Change avatar");
				// $(".cover-button button").addClass("slate").html("Change cover photo");

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
