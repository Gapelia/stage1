<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%/*@include file="../../auth.jsp" */ %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Now reading *BOOK TITLE*</title>

		<!--/
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
			  \/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

		<meta name="author" content="Gapelia"/>
		<meta name="description" content="This should be a synopsis about the book"/>
		<meta name="keywords" content="This should be the keywords the author chose, as well as the author's name/username/alias"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try { Typekit.load(); } catch(e) {}</script>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>

	</head>

	<body class="app full-book g-body">

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">

					<h2><a href="/featured">Gapelia</a></h2>

					<ul>
						<li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a></li>
						<li class="not-mobile"><a href="/createbook">Create book</a></li>
						<li class="not-mobile"><a href="/librarymanager">Library Manager</a></li>

						<li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a><a class="icon" href="#">&#xf104;</a>
							<ul id="draft-menu"></ul>
						</li>

						<li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#">6</a>
							<ul>
								<li><a href="#">Diego thanked you for your story: "The Matrix Has You"</a></li>
								<li><a href="#">Tommy commented on your story: "Well that was weird"</a></li>
								<li><a href="#">Daniel added your story to a library: "Gapelia Nation"</a></li>
								<li><a href="#">Frankie wants to collaborate on your story: "Hoverboards Are The Future"</a></li>
								<li><a href="#">2 edit requests are pending for your review</a></li>
							</ul>
						</li>

						<li class="logout"><a href="#">Log Out</a></li>
					</ul>

				</div>
			</nav>
			<!--//site-menu /-->

			<button id="g-menu-toggle"><i class="ion-drag"></i></button>
			<button id="next-book-toggle"><i class="ion-forward"></i></button>

			<header>
				<div id="header-info">
					<span id="header-title">Hayao Miyazaki</span>
					<span id="header-author">NetOperator Wibby</span>
				</div>

				<ul class="share-book">
					<li><a href="javascript:window.open('http://www.facebook.com/sharer/sharer.php?u=http://gapelia.com/book/001/hayao-miyazaki','','width=555,height=368');void(0)"><i class="ion-social-facebook"></i></a></li>

					<li><a href="javascript:window.open('http://twitter.com/share?url=http://gapelia.com/book/001/hayao-miyazaki&amp;text=Hayao Miyazaki by Paul Anthony Webb is an exceptionally gratifying read on Gapelia','','width=550,height=257');void(0)"><i class="ion-social-twitter"></i></a></li>

					<li><a href="mailto:?subject=Oh%20hai&amp;body=Good%20morning!"><i class="ion-email"></i></a></li>
				</ul>
			</header>

			<div id="bb-nav-prev">&#xf153;</div>
			<div id="bb-nav-next">&#xf154;</div>

			<!--/ div id="the-book" /-->
			<div id="the-book" class="bb-custom-wrapper">
				<div id="bb-bookblock" class="bb-bookblock">

				</div>
			</div>

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/nprogress.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/books.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/vimeothumb.js"></script>

		<!--/ scripts/page-flip /-->
		<script src="/static/scripts/jquerypp.custom.js"></script>
		<script src="/static/scripts/bookblock.js"></script>

		<script>
			$(function () {
                var third = getUserDrafts();
				$("img").VimeoThumb();

				setTimeout(function () {
					$(".video-player-container").imgLiquid({ fill: true });
				}, 1000); // prevent placeholder from appearing

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
					menu += "<ul id=\"book-menu\" style=\"display: none;\">";
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

					share = "";
					share += "<ul id=\"share-menu\" style=\"display: none;\">";
					share += "<li><a href=\"javascript:window.open('http://www.facebook.com/sharer/sharer.php?u=http://gapelia.com/book/001/hayao-miyazaki','','width=555,height=368');void(0)\">Share via Facebook</a></li>";
					share += "<li><a href=\"javascript:window.open('http://twitter.com/share?url=http://gapelia.com/book/001/hayao-miyazaki&amp;text=Hayao Miyazaki by Paul Anthony Webb is an exceptionally gratifying read on Gapelia','','width=550,height=257');void(0)\">Share via Twitter</a></li>";
					share += "<li><a href=\"mailto:?subject=Oh%20hai&amp;body=Good%20morning!\">Share via Email</a></li>";
					share += "</ul>";

					$("#g-menu-toggle").after(menu);
					$("#next-book-toggle").after(share);

					$(document).on("click", "#g-menu-toggle", function () {

						$("#book-menu").toggle();

						if ($("#book-menu").css("display") == "block") {
							$("#g-menu-toggle, #next-book-toggle").css("color", "#70a1b1");
						} else {
							$("#g-menu-toggle, #next-book-toggle").css("color", "#fcfcfc");
						}

						if ($("#share-menu").css("display") == "block") {
							$("#share-menu").hide();
						}

					});

					$(document).on("click", "#next-book-toggle", function () {

						$("#share-menu").toggle();

						if ($("#share-menu").css("display") == "block") {
							$("#g-menu-toggle, #next-book-toggle").css("color", "#70a1b1");
						} else {
							$("#g-menu-toggle, #next-book-toggle").css("color", "#fcfcfc");
						}

						if ($("#book-menu").css("display") == "block") {
							$("#book-menu").hide();
						}

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


			});
		</script>

	</body>

</html>
