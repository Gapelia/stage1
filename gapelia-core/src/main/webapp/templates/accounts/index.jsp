
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Your Account Settings</title>

		<!--/ ACCOUNTS VIEW
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

	<body class="app profile accounts">
	
		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">

					<h2><a href="/featured">Gapelia</a></h2>

					<ul>
						<li><a id="gpl-menu-me">Me</a>
							<ul>
								<li><a href="/me">Visit Profile</a></li>
								<li class="not-mobile"><a href="/accounts">Account Settings</a></li>
								<li><a href="#">Sign Out</a></li>
							</ul>
						</li>

						<li><a id="gpl-menu-notify">Notifications</a>
							<ul>
								<li><a href="#">Diego thanked you for your story: "The Matrix Has You"</a></li>
								<li><a href="#">Tommy commented on your story: "Well that was weird"</a></li>
								<li><a href="#">Daniel added your story to a library: "Gapelia Nation"</a></li>
								<li><a href="#">Frankie wants to collaborate on your story: "Hoverboards Are The Future"</a></li>
								<li><a href="#">2 edit requests are pending for your review</a></li>
							</ul>
						</li>

						<li class="not-mobile"><a id="gpl-menu-create">Build</a>
							<ul>
								<li><a href="/create">Create your next opus</a></li>
								<li><a href="#">Start a library</a></li>
							</ul>
						</li>

						<li class="not-mobile"><a id="gpl-menu-drafts">Drafts</a>
							<ul>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">007: The Diego Regules Story</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
							</ul>
						</li>
					</ul>

				</div>
			</nav>
			<!--//site-menu /-->

			<!--/ main-panel /-->
			<div id="user-panel">
				<button id="g-menu-toggle">
					<i class="ion-drag"></i>
				</button>
			</div>

			<div id="account-information">
				<div class="account-info-wrapper">

					<section id="email-edit">
						<h3>Your email</h3>
						<p id="user-email" contenteditable="false">paul@dsgn.io</p>
						<p><a href="#">Edit</a></p>
					</section>

					<section id="email-notify">
						<h3>Email notifications</h3>
						<p>When someone recommends your book, or wants to collaborate with you, we'll send you an email.</p>

						<p>
							<input type="radio" name="email-opt" id="yay-email" checked>
							<label for="yay-email" id="email-yay">Sweet, I love email</label><br/>

							<input type="radio" name="email-opt" id="nay-email">
							<label for="nav-email" id="email-nay">Nah, I get enough fan-mail already</label>
						</p>
					</section>

					<section id="import-content">
						<h3>Import content</h3>
						<p>Do you already have content elsewhere? Wordpress or Blogger perhaps? Start transferring your content <a href="#">here</a>.</p>
					</section>

					<section id="oh-noes" class="not-mobile">
						<h3>Delete account</h3>
						<p>Are you sure? <a href="#">I sure am!</a></p>
					</section>

				</div>
			</div>

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script>
			$(function () {

				// Load Gapelia
				NProgress.start();

				// Slide menu for desktop
				if ($vW > "1024") {
					new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

					$(".mp-pushed").ready(function () {
						$("#book-scroller").css("z-index", "0");
					});
				}

				// Dropdown menu for mobile
				if ($vW < "1025") {

					menu = "";
					menu += "<ul id=\"menu\" style=\"display: none;\">";
					menu += "<li id=\"nav-featured\"><a href=\"/featured\">Featured</a></li>";
					menu += "<li id=\"nav-profile\"><a href=\"/me\">My Profile</a></li>";
					menu += "<li id=\"nav-notify\"><a href=\"#\">Notifications</a>";
					menu += "<ul>";
					menu += "<li><a href=\"#\">Diego thanked you for your story: \"The Matrix Has You\"</a></li>";
					menu += "<li><a href=\"#\">Tommy commented on your story: \"Well that was weird\"</a></li>";
					menu += "<li><a href=\"#\">Daniel added your story to a library: \"Gapelia Nation\"</a></li>";
					menu += "<li><a href=\"#\">Frankie wants to collaborate on your story: \"Hoverboards Are The Future\"</a></li>";
					menu += "<li><a href=\"#\">2 edit requests are pending for your review</a></li>";
					menu += "</ul>";
					menu += "</li>";
					menu += "</ul>";

					$("#g-menu-toggle").after(menu);

					$(document).on("click", "#g-menu-toggle", function () {
						$("#menu").toggle();
					});

					$(document).on("click", "#nav-notify", function (e) {

						$("#nav-notify ul").toggle();

						if ($("#nav-notify ul").css("display") == "block") {
							$("#nav-notify").css("padding", "1rem 0 0 0");
						} else {
							$("#nav-notify").css("padding", "1rem");
						}

						e.preventDefault();

					});

				}

				if ($vW < "322") {

					$("#email-yay").text("Heck yeah!");
					$("#email-nay").text("Erm, no thanks");

				}

				/*
				setTimeout(function () {

					// "fix" featured menu pop-in
					setTimeout(function () {
						$("#user-panel, #account-information").css("opacity", "1");
					}, 450).show();

				});
				*/

				NProgress.done();

			});
		</script>

	</body>

</html>
