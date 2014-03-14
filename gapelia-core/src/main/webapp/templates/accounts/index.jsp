
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
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>

		<script src="/static/scripts/nprogress.js"></script>

	</head>

	<body class="app profile accounts">

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">

					<h2><a href="/featured">Gapelia</a></h2>

					<ul>
						<li><a href="/me">Me</a><a class="icon" href="/accounts">&#xf13d;</a></li>
						<li><a href="/createlibrary">Create book</a></li>
						<li><a href="#" id="create-library">Start library</a></li>

						<li id="gpl-menu-drafts" class="not-mobile">
							<a>Drafts</a><a class="icon" href="#">&#xf104;</a>

							<ul>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">007: The Diego Regules Story</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
							</ul>
						</li>

						<li id="gpl-menu-notify">
							<a>Notifications</a><a class="icon" href="#">&#xf104;</a>

							<ul>
								<li><a href="#">Diego thanked you for your story: "The Matrix Has You"</a></li>
								<li><a href="#">Tommy commented on your story: "Well that was weird"</a></li>
								<li><a href="#">Daniel added your story to a library: "Gapelia Nation"</a></li>
								<li><a href="#">Frankie wants to collaborate on your story: "Hoverboards Are The Future"</a></li>
								<li><a href="#">2 edit requests are pending for your review</a></li>
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

				<div id="nav-wrapper">
					<ul id="featured-nav">
						<li id="nav-personal" class="current"><a href="#">Personal</a></li>
						<!--/ <li id="nav-password"><a href="#">Password</a></li> /-->
						<!--/ <li id="nav-notify"><a href="#">Notifications</a></li> /-->
						<!--/ <li id="nav-pro"><a href="#">Pro</a></li> /-->
						<!--/ <li id="nav-billing"><a href="#">Billing</a></li> /-->
						<li id="nav-delete"><a href="#">Delete Account</a></li>
					</ul>
				</div>

				<!--/ Personal Settings /-->
				<div class="account-info-wrapper">

					<div class="col-2">

						<div id="account-splash-wrapper">
							<section id="account-user-splash">
								<div class="account-user-avatar">
									<div class="account-avatar-wrapper">
										<a href="#" id="account-splash-edit-profile">&#xf13d;</a>
										<img src="/static/images/users/11.jpg"/>

										<!--/
										<div id="splash-edit-wrapper">
											<a class="edit-profile" href="/accounts">Edit Profile</a>
											<a class="quick-edit-profile" href="#">Quick Edit Profile</a>
										</div>
										/-->
									</div>
								</div>

								<div id="account-splash-user-info">
									<h1>Paul Anthony Webb</h1>
									<h5>Contributes to <a href="">S P A C E</a>, <a href="">Technological Marvels</a>, and others.</h5>

									<div id="account-splash-user-bio" contenteditable="false">Space Bandit / Aries / Protogenoi / Eccentric Dreamer / Pluviophile / Futurist / Musician / Casual Enthusiast</div>

									<div id="account-splash-user-location" contenteditable="false">Boston, MA</div>
									<div id="account-splash-user-website" contenteditable="false">dsgn.io</div>
									<div id="account-splash-user-twitter" contenteditable="false">@NetOpWibby</div>
								</div>

								<img class="page-bg" src="/static/images/bg-05.jpg"/>
							</section>
						</div>

					</div>

					<div class="col-1">
						<form class="bl_form">
							<input type="text" class="labelBetter" data-new-placeholder="We're very friendly here." placeholder="Name"/>
							<input type="text" class="labelBetter" data-new-placeholder="Your Gapelia URL, e.g. http://gapelia.com/nokadota" placeholder="Username"/>
							<input type="email" class="labelBetter" data-new-placeholder="Email Address" placeholder="Email Address"/>

							<input class="" name="commit" type="submit" value="Update Settings"/>
						</form>
					</div>

					<div class="col-1">
						<form class="bl_form">
							<input type="text" class="labelBetter" data-new-placeholder="Location" placeholder="Location"/>
							<input type="text" class="labelBetter" data-new-placeholder="Your personal site or blog, e.g. http://dsgn.io" placeholder="Website"/>
							<input type="text" class="labelBetter" data-new-placeholder="The username people can find you tweeting at" placeholder="Twitter"/>

							<input class="" name="commit" type="submit" value="Update Settings"/>
						</form>
					</div>

				</div>

				<!--/ Password Settings /-->
				<div class="account-password-wrapper" style="display: none;">

					<form class="bl_form">
						<input type="password" class="labelBetter" data-new-placeholder="Old and busted" placeholder="Old password"/>
						<input type="password" class="labelBetter" data-new-placeholder="New hotness" placeholder="New Password"/>

						<input class="" name="commit" type="submit" value="Update Password"/>
					</form>

				</div>

				<!--/ Notification Settings /-->
				<div class="account-notifications-wrapper" style="display: none;">

					<section id="email-notify">
						<h3>Email notifications</h3>
						<p>When someone recommends your book, or wants to collaborate with you, we'll send you an email.</p>

						<p>
							<input type="radio" name="email-opt" id="yay-email" checked>
							<label for="yay-email" id="email-yay">Sweet, I love email</label><br/>

							<input type="radio" name="email-opt" id="nay-email">
							<label for="nay-email" id="email-nay">Nah, I get enough fan-mail already</label>
						</p>
					</section>

				</div>

				<!--/ Professional Account Settings /-->
				<div class="account-pro-wrapper" style="display: none;">

					<section id="import-content">
						<h3>Import content</h3>
						<p>Do you already have content elsewhere? Wordpress or Blogger perhaps? Start transferring your content to Gapelia <a href="#">here</a>.</p>
					</section>

				</div>

				<!--/ Account Billing Settings /-->
				<div class="account-billing-wrapper" style="display: none;">
					<p>Billing stuff</p>
				</div>

				<!--/ Account Deletion Settings /-->
				<div class="account-delete-wrapper" style="display: none;">

					<section id="oh-noes" class="not-mobile">
						<h3>Delete account</h3>
						<p>Are you sure? <a href="#" id="delete-account">I sure am!</a></p>
					</section>

				</div>

			</div>

			<!--/ Overlay — delete account /-->
			<div id="delete-account-overlay" class="overlay">
				<section>
					<h1>Warning</h1>

					<p>Account deletion is <strong>final</strong>. All of your books will be deleted and there will be no way to recover them. Are you <strong>sure</strong> you want to delete your account?</p>

					<p>
						<a href="#" class="overlay-close oc-01">Nope, changed my mind</a>
						<button class="red overlay-close oc-02" id="confirm-account-deletion">Yes, I am sure</button>
					</p>
				</section>
			</div>

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/labelBetter.js"></script>
		<!--/ <script src="/static/scripts/imgLiquid.js"></script> /-->

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script>
		$(function () {

			// Load Gapelia
			NProgress.start();

			$(".labelBetter").labelBetter({ easing: "bounce" });

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

			// Make things fit nicely on iPhones
			if ($vW < "322") {

				$("#email-yay").text("Heck yeah!");
				$("#email-nay").text("Erm, no thanks");

			}

			NProgress.done();

			// Click "Personal"
			$("#nav-personal").click(function (e) {

				NProgress.start();

				setTimeout(function () {

					$(".account-password-wrapper").hide();
					$(".account-notifications-wrapper").hide();
					$(".account-pro-wrapper").hide();
					$(".account-billing-wrapper").hide();
					$(".account-delete-wrapper").hide();

					$(".account-info-wrapper").fadeIn("100");

				}, 500);

				e.preventDefault();

				$("#nav-personal").addClass("current");

				$("#nav-password").removeClass("current");
				$("#nav-notify").removeClass("current");
				$("#nav-pro").removeClass("current");
				$("#nav-billing").removeClass("current");
				$("#nav-delete").removeClass("current");

				NProgress.done();

			});

			// Click "Password"
			$("#nav-password").click(function (e) {

				NProgress.start();

				setTimeout(function () {

					$(".account-info-wrapper").hide();
					$(".account-notifications-wrapper").hide();
					$(".account-pro-wrapper").hide();
					$(".account-billing-wrapper").hide();
					$(".account-delete-wrapper").hide();

					$(".account-password-wrapper").fadeIn("100");

				}, 500);

				e.preventDefault();

				$("#nav-password").addClass("current");

				$("#nav-personal").removeClass("current");
				$("#nav-notify").removeClass("current");
				$("#nav-pro").removeClass("current");
				$("#nav-billing").removeClass("current");
				$("#nav-delete").removeClass("current");

				NProgress.done();

			});

			// Click "Notifications"
			$("#nav-notify").click(function (e) {

				NProgress.start();

				setTimeout(function () {

					$(".account-info-wrapper").hide();
					$(".account-password-wrapper").hide();
					$(".account-pro-wrapper").hide();
					$(".account-billing-wrapper").hide();
					$(".account-delete-wrapper").hide();

					$(".account-notifications-wrapper").fadeIn("100");

				}, 500);

				e.preventDefault();

				$("#nav-notify").addClass("current");

				$("#nav-personal").removeClass("current");
				$("#nav-password").removeClass("current");
				$("#nav-pro").removeClass("current");
				$("#nav-billing").removeClass("current");
				$("#nav-delete").removeClass("current");

				NProgress.done();

			});

			// Click "Pro"
			$("#nav-pro").click(function (e) {

				NProgress.start();

				setTimeout(function () {

					$(".account-info-wrapper").hide();
					$(".account-password-wrapper").hide();
					$(".account-notifications-wrapper").hide();
					$(".account-billing-wrapper").hide();
					$(".account-delete-wrapper").hide();

					$(".account-pro-wrapper").fadeIn("100");

				}, 500);

				e.preventDefault();

				$("#nav-pro").addClass("current");

				$("#nav-personal").removeClass("current");
				$("#nav-password").removeClass("current");
				$("#nav-notify").removeClass("current");
				$("#nav-billing").removeClass("current");
				$("#nav-delete").removeClass("current");

				NProgress.done();

			});

			// Click "Billing"
			$("#nav-billing").click(function (e) {

				NProgress.start();

				setTimeout(function () {

					$(".account-info-wrapper").hide();
					$(".account-password-wrapper").hide();
					$(".account-notifications-wrapper").hide();
					$(".account-pro-wrapper").hide();
					$(".account-delete-wrapper").hide();

					$(".account-billing-wrapper").fadeIn("100");

				}, 500);

				e.preventDefault();

				$("#nav-billing").addClass("current");

				$("#nav-personal").removeClass("current");
				$("#nav-password").removeClass("current");
				$("#nav-notify").removeClass("current");
				$("#nav-pro").removeClass("current");
				$("#nav-delete").removeClass("current");

				NProgress.done();

			});

			// Click "Delete Account"
			$("#nav-delete").click(function (e) {

				NProgress.start();

				setTimeout(function () {

					$(".account-info-wrapper").hide();
					$(".account-password-wrapper").hide();
					$(".account-notifications-wrapper").hide();
					$(".account-pro-wrapper").hide();
					$(".account-billing-wrapper").hide();

					$(".account-delete-wrapper").fadeIn("100");

				}, 500);

				e.preventDefault();

				$("#nav-delete").addClass("current");

				$("#nav-personal").removeClass("current");
				$("#nav-password").removeClass("current");
				$("#nav-notify").removeClass("current");
				$("#nav-pro").removeClass("current");
				$("#nav-billing").removeClass("current");

				NProgress.done();

			});

			// Modal — delete account
			$("#delete-account").click(function (e) {

				$("#delete-account-overlay").addClass("open");
				e.preventDefault();

			});

		});
		</script>

	</body>

</html>
