<%@ page import="com.gapelia.core.auth.AuthHelper" %>
<%
	if (AuthHelper.isSessionAvailable(request) ) {
		response.sendRedirect("/me");
	}
%>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Better stories, together</title>

		<!--/ FEATURED VIEW
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
		<script src="/static/scripts/jquery-2.0.3.min.js"></script>

		<script src="/static/scripts/nprogress.js"></script>

	</head>

	<body class="app profile">

		<div id="mp-pusher" class="super-wrapper">

			<section id="featured-splash">
				<h1 id="gapelia"><a href="/">Gapelia</a></h1>

				<div id="login-greet"><a href="#" class="login-link">Sign in as a storyteller</a><br/><a href="#">Learn more</a></div>

				<div id="featured-info">
					<h2 id="pick-story"><a href="#">How will books lookcfmtkrjted like in 2050?</a></h2>

					<p id="snippet-book">A snippet of this book should be here, and the length shall not exceed one hundred and forty characters. This is an example of that length!!</p>

					<h5 id="meta-book"><span class="author-name"><a href="#">Diego Regules</a></span><span class="library-name"><a href="#">Psychochromatic</a></span></h5>

					<h2 id="pick-library"><a href="#">The Matrix Has You</a></h2>

					<p id="snippet-library">A snippet of this book should be here, and the length shall not exceed one hundred and forty characters. This is an example of that length!!</p>
				</div>

				<div id="close-splash"><a href="/featured"><i class="ion-ios7-arrow-right"></i></a></div>
				<img class="page-bg" src="/static/images/libraries/design-tech-beyond.jpg"/>
			</section>

		</div>

		<div class="modal-login">
			<h1>Welcome to Gapelia!</h1>

			<ul id="login-platforms">
				<li class="facebook" id="login-fb"><a href="/login?type=facebook">Facebook</a></li>
				<!--/<li class="googleplus" id="login-gp"><a href="/login?type=google">Google+</a></li>
				<li class="twitter" id="login-tw"><a href="/login?type=twitter">Twitter</a></li>
				 <li class="email" id="login-at"><a href="#">Email</a></li> /-->
			</ul>

			<p><a href="#" class="login-link">Nevermind</a></p>
		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/touchSwipe.min.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/mousewheel.js"></script>

		<script>
			// Load Gapelia
			$(function () {

				NProgress.start();

				$(document).on("ready", function () {
					$("#featured-splash").imgLiquid({ fill: true });
				});

				$(document).on("click", ".login-link", function (e) {

					$(".modal-login").toggleClass("active");
					e.preventDefault();

				});

				if ($vW > "1024") {

					$(document).on("click", "#close-splash", function () {

						window.location.href = "/featured";

						/*
						$("#close-splash").css({
							"left": "-200%",
							"right": "initial"
						});

						$("#featured-splash").css("left", "-200%");
						$("#g-menu-toggle").css("color", "#70a1b1");
						*/

					});

				} else {

					$(function() {

						$("#featured-splash").swipe({
							swipeUp: function(event, direction, distance, duration, fingerCount) {

								window.location.href = "/featured";

								/*
								$("#close-splash").css({
									"height": "0",
									"top": "-200%"
								});

								$("#featured-splash").css("top", "-200%");
								$("#g-menu-toggle").css("color", "#70a1b1");
								*/

							}, threshold: 0
						});

						$(document).on("click", "#close-splash", function () {

							window.location.href = "/featured";

							/*
							$("#close-splash").css({
								"height": "0",
								"top": "-200%"
							});

							$("#featured-splash").css("top", "-200%");
							$("#g-menu-toggle").css("color", "#70a1b1");
							*/

						});

					});

				}

				NProgress.done();

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
