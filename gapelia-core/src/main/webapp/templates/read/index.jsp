
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
						<li><a href="/me">Me</a><a class="icon" href="/accounts">&#xf13d;</a></li>
						<li><a href="/createbook">Create book</a></li>
						<li><a href="/librarymanager" id="create-library">Start library</a></li>

						<li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a><a class="icon" href="#">&#xf104;</a>
							<ul>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">007: The Diego Regules Story</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
							</ul>
						</li>

						<li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#">&#xf104;</a>
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

				setTimeout(function () {

					function insertPage() {

						switch (current.templateId) {
							case 0:
								frontCoverLayout();
								break;

							case 1:
								photoLayout();
								break;

							case 2:
								textLayout();
								break;

							case 3:
								horizontalLayout();
								break;

							case 4:
								overlayLayout();
								break;

							case 5:
								photoTextLayout();
								break;

							case 6:
								verticalLayout();
								break;

							case 7:
								videoLayout();
								break;

							default:
								frontCoverLayout();
								break;
						}

						return 1;

					}

					function frontCoverLayout() {

						htmlToInsert += "<section class=\"frontcover-wrapper\"><img class=\"page-bg\" src=\"" + current.photo + "\"/><div class=\"frontcover-preview\"><article class=\"cover-info\"><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.description + "</div><h5>*AUTHOR*</h5></article></div></section></div></div>";

					}

					function photoLayout() {

						// htmlToInsert += "<section class=\"photo-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"photo-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"photo-wrapper\"><<img class=\"page-bg\" src=\"" + current.photo + "\"/><div class=\"photo-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1></article></div></section></div></div>";

					}

					function textLayout() {

						// htmlToInsert += "<section class=\"text-wrapper\"><div class=\"text-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"text-wrapper\"><div class=\"text-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.description + "</div></article></div></section></div></div>";

					}

					function horizontalLayout() {

						// htmlToInsert += "<section class=\"horizontal-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"horizontal-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"horizontal-wrapper\"><div class=\"scroller-wrapper\"><img class=\"page-bg\" src=\"" + current.photo + "\"/><div class=\"horizontal-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.description + "</div></article></div></div></section></div></div>";

					}

					function overlayLayout() {

						// htmlToInsert += "<section class=\"overlay-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"overlay-preview\"><article><div class=\"page-desc\">" + current.text + "</div><div class=\"page-geotag-elem\">" + current.geotag + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"overlay-wrapper\"><img class=\"page-bg\" src=\"" + current.photo + "\"/><div class=\"overlay-preview\"><article><div class=\"page-desc\">" + current.description + "</div></article></div></section></div></div>";

					}

					function photoTextLayout() {

						// htmlToInsert += "<section class=\"phototext-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"phototext-wrapper\"><img class=\"page-bg\" src=\"" + current.photo + "\"/><div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.description + "</div></article></div></section></div></div>";

					}

					function verticalLayout() {

						// htmlToInsert += "<section class=\"vertical-wrapper\"><div class=\"draggable-placeholder\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></div></section></div></div>";

						htmlToInsert += "<section class=\"vertical-wrapper\"><div class=\"draggable-placeholder\"><img class=\"page-bg\" src=\"" + current.photo + "\"/><div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.description + "</div></article></div></div></section></div></div>";

					}

					function videoLayout() {

						// htmlToInsert += "<section class=\"video-wrapper\"><div class=\"video-preview\"><span class=\"play-video\">Play</span><div class=\"video-player-container\"><iframe src=\"" + current.video + "\"></iframe></div><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"video-wrapper\"><div class=\"video-preview\"><div class=\"button-wrapper\"><button class=\"play-video\">Play</button></div><div class=\"video-player-container\"><iframe src=\"" + current.videoUrl + "\"></iframe></div><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.description + "</div></article></div></section></div></div>";

					}

					var Page = (function () {

						var config = {
							$bookBlock: $("#bb-bookblock"),
							$navNext: $("#bb-nav-next"),
							$navPrev: $("#bb-nav-prev"),
							$navFirst: $("#bb-nav-first")
							// $navLast: $("#next-book-toggle")
							// $navLast: $('#bb-nav-last')
						},

						init = function () {

							config.$bookBlock.bookblock({
								speed: 1000,
								shadowSides: 0.8,
								shadowFlip: 0.4
							});

							initEvents();

						},

						initEvents = function () {

							var $slides = config.$bookBlock.children();

							// add navigation events
							config.$navNext.on("click touchstart", function () {
								config.$bookBlock.bookblock("next");
								return false;
							});

							config.$navPrev.on("click touchstart", function () {
								config.$bookBlock.bookblock("prev");
								return false;
							});

							config.$navFirst.on("click touchstart", function () {
								config.$bookBlock.bookblock("first");
								return false;
							});

							/*
							config.$navLast.on("click touchstart", function () {
								config.$bookBlock.bookblock("last");
								return false;
							});
							*/

							// add swipe events
							$slides.on({
								"swipeleft": function (event) {
									config.$bookBlock.bookblock("next");
									return false;
								},

								"swiperight": function (event) {
									config.$bookBlock.bookblock("prev");
									return false;
								}
							});

							// add keyboard events
							$(document).keydown(function (e) {

								var keyCode = e.keyCode || e.which,
								arrow = {
									left: 37,
									up: 38,
									right: 39,
									down: 40
								};

								switch (keyCode) {
									case arrow.left:
										config.$bookBlock.bookblock("prev");
										break;

									case arrow.right:
										config.$bookBlock.bookblock("next");
										break;
								}

							});

						};

						return { init: init };

					})();

					currentUrl = document.URL;
					bookid = currentUrl.slice(45); // leave just bookid
					console.log(bookid);
					sId = "12345";
					info = "";
					htmlToInsert = "";

					$.ajax({
						url: "http://gapelia-dev.herokuapp.com/api/book/getBook",
						contentType: "application/x-www-form-urlencoded;charset=utf-8",
						type: "POST",
						data: {
							sessionId: sId,
							bookId: bookid
						},
						success: function (data) {
							info = data;
							NProgress.start();
							console.log("start to insert pages");
							insertPages(data);
							console.log("done inserting pages");
							Page.init(waitAndSee());
							NProgress.done();
						},
						error: function (q, status, err) {
							if (status == "timeout") {
								alert("Request timed out");
							} else {
								alert("Some issue happened with your request: " + err);
							}
						}
					});

					function waitAndSee() {

						$("#bb-bookblock").html(htmlToInsert);

						$(".content").css({
							"width": $vW + "px",
							"height": $vH + "px"
						});

						$(".frontcover-wrapper").imgLiquid({ fill: true });
						// $(".photo-wrapper").imgLiquid({ fill: false });
						$(".horizontal-wrapper").imgLiquid({ fill: true });
						$(".overlay-wrapper").imgLiquid({ fill: true });
						$(".phototext-wrapper").imgLiquid({ fill: true });
						$(".vertical-wrapper .draggable-placeholder").imgLiquid({ fill: true });

					}

					function insertPages(Pages) {

						size = Pages.length;
						document.title = "You are reading \"" + Pages[0].title + "\" on Gapelia";
						htmlToInsert = "";

						for (i = 0; i < size; i++) {
							current = Pages[i];

							if (current === null) { break; }

							if (i === 0) {
								htmlToInsert += "<div class=\"bb-item front-cover\" style=\"display: block\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
							} else {
								htmlToInsert += "<div style=\"display: none\" class=\"bb-item\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
							}

							insertPage();
						}

					}

				});

			});
		</script>

	</body>

</html>
