<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Your Library</title>

		<!--/ ME VIEW
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

	<body class="app profile">

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
							<ul id="draft-menu">
							</ul>
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
					</ul>

				</div>
			</nav>
			<!--//site-menu /-->

			<!--/ main-panel /-->
			<div id="user-panel">
				<button id="g-menu-toggle">
					<i class="ion-drag"></i>
				</button>

				<span id="user-header">USERNAME</span>

				<h1 id="mobile-header" style="display: none;"><a href="/featured">Gapelia</a></h1>

				<div id="user-wrapper">
					<div class="user-avatar">
						<div class="avatar-wrapper">
							<img src="/static/images/users/user-avatar.jpg"/>
						</div>
					</div>

					<div class="user-data">
						<h2 id="user-info"></h2>

						<span id="user-bio" contenteditable="false">Space Bandit / Aries / Protogenoi / Eccentric Dreamer / Pluviophile / Futurist / Musician / Casual Enthusiast</span>
					</div>

					<div class="button-wrapper">
						<button class="edit-profile slate">Edit Profile</button>
					</div>
				</div>
			</div>
			<!--//main-panel /-->

			<!--/ main-scroller /-->
			<div id="book-scroller">

				<!--/ your-books /-->
				<div class="user-book-list-wrapper">
					<ul id="user-book-list">
					</ul>
				</div>
				<!--//your-books /-->
			</div>
			<!--//main-scroller /-->

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/touchSwipe.min.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>
		<script src="/static/scripts/ajax.js"></script>

		<script>
			if ($vW > "1024") {
				new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

				$(".mp-pushed").ready(function () {
					$("#book-scroller").css("z-index", "0");
				});
			}

			$(function () {
				$(".user-bg, .book, .collection, .draft").imgLiquid({ fill: true });
			});
		</script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/mousewheel.js"></script>
		<script src="/static/scripts/scroll.js"></script>

		<script>
			$(function () {
			var second = getUserCreatedBooks();
			var third = getUserDrafts();
			var first = getUser();
			 });

			// Splash page
			function load() {

				// Splash page
				$(function () {

					stuff = "";
					stuff += "<section id=\"user-splash\">";
					stuff += "<div class=\"overlay-controls\">";
					// stuff += "<button id=\"change-cover-photo\" class=\"outline\">Add cover photo</button>";
					stuff += "<input type=\"filepicker\" id=\"change-cover-photo\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('.user-avatar').attr('src', url); $('#user-splash').css({ 'background-image': 'url(' + url + ')', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); $('.spinner').hide();\">";
					stuff += "</div>";
					stuff += "<div class=\"user-avatar\"><div class=\"avatar-wrapper\">";
					stuff += "<a href=\"#\" id=\"splash-edit-profile\">&#xf13d;</a>";
					stuff += "<div id=\"splash-edit-wrapper\">";

					if ($vW > "1024") {

						stuff += "<a class=\"edit-profile\" href=\"/accounts\">Account Settings</a>";
						stuff += "<a class=\"quick-edit-profile\" href=\"#\">Edit Profile</a>";

					} else {

						stuff += "<a class=\"quick-edit-profile\" href=\"#\">Edit Profile</a>";

					}

					stuff += "</div>";
					stuff += "</div></div>";
					stuff += "<div id=\"splash-user-info\">";
					stuff += "<h1 id=\"user-name\"></h1>";
					// stuff += "<h5>Contributes to <a href=\"\">S P A C E</a> and <a href=\"\">Technological Marvels</a></h5>";
					// stuff += "<h5>Contributes to <a href=\"\">S P A C E</a>, <a href=\"\">Technological Marvels</a>, and others.</h5>";
					stuff += "<div id=\"splash-user-bio\" placeholder=\"Add a bio here...\" contenteditable=\"false\">Edit your profile and add a bio here..</div>";
					// stuff += "<div id=\"splash-user-location\" contenteditable=\"false\">Boston, MA</div>";
					// stuff += "<div id=\"splash-user-website\" contenteditable=\"false\">dsgn.io</div>";
					// stuff += "<div id=\"splash-user-twitter\" contenteditable=\"false\">@NetOpWibby</div>";
					stuff += "</div>";
					stuff += "<div id=\"close-splash\"><i class=\"ion-ios7-arrow-right\"></i></div>";
					stuff += "<img class=\"page-bg\" src=\"/static/images/cover-bg.jpg\"/>";
					stuff += "</section>";

					$("#mp-pusher").prepend(stuff);

					$("#user-splash").imgLiquid({ fill: true });
					$("#user-splash .avatar-wrapper").append('<img src="/static/images/users/user-avatar.jpg"/>');
					$("#g-menu-toggle").css("color", "#fcfcfc");

					var element = $("#change-cover-photo");
					element = element[0];
					element.type = "filepicker";
					filepicker.constructWidget(element);

				});

				if ($vW > "1024") {

					$(document).on("click", "#close-splash", function () {

						$("#close-splash").css({
							"left": "-200%",
							"right": "initial"
						});

						$("#user-splash").css("left", "-200%");
						$("#user-panel").css("width", "100%");
						$("#user-splash .overlay-controls").css("left", "-200%");
						$("#g-menu-toggle").css("color", "#70a1b1");

						$("#user-header").css("opacity", "1");

					});

				} else {

					$(function () {

						$("#user-splash").swipe({
							swipeUp: function (event, direction, distance, duration, fingerCount) {

								$("#close-splash").css({
									"height": "0",
									"top": "-200%"
								});

								$("#user-splash").css("top", "-200%");
								$("#user-splash .overlay-controls").css("top", "-200%");
								$("#g-menu-toggle").css("color", "#70a1b1");

							}, threshold: 0
						});

						$(document).on("click", "#close-splash", function () {

							$("#close-splash").css({
								"height": "0",
								"top": "-200%"
							});

							$("#user-splash").css("top", "-200%");
							$("#user-splash .overlay-controls").css("top", "-200%");
							$("#g-menu-toggle").css("color", "#70a1b1");

						});

					});

				}

				$(function () {

					var $vW = $(window).width(), $vH = $(window).height();

					// Scrolling on desktop
					if ($vW > "1024") {

						$("#book-scroller").mousewheel(function (event, delta) {

							$("#book-scroller").stop().animate({
								scrollLeft: "-=" + (75 * delta) + "px"
							}, "150", "easeOutCubic");

							event.preventDefault();

						});

					}

					// Dropdown menu for mobile
					if ($vW < "1025") {

						$("#user-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-profile" class="current"><a href="/me">My Profile</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');

						$(function () {

							if ($vW < "321") {
								$("#user-panel #user-bio, #user-panel .button-wrapper").remove();
							}

							$("#g-menu-toggle").click(function () {
								$("#featured-nav").toggle();
							});

						});

						// Log Out
						$("#logout").click(function (e) {
							document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
							window.location = "";
						});

					}

					// User details
					$("#splash-user-info h1, #user-header").html(user.displayName);
					$(".avatar-wrapper img").attr("src", user.avatarImage);

					$("#user-splash").css("background-image", "url(" + user.coverImage + ")");

					if (user.coverImage == undefined) {
						$("#user-splash").css("background-image", "url(/static/images/cover-bg.jpg)");
					}

					$("#splash-user-bio").html(user.bio);

					// $(".profile .user-avatar img").css("width", 150); // unneccessary

					// Load Gapelia
					$(function () {

						NProgress.start();

						$("#user-panel, #book-scroller").css("opacity", "0").show();

						var
						allBooks = $("#user-book-list li"),	// gets all books in a section
						firstBook = $(allBooks).first();		// gets first book in list
						$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

						setTimeout(function () {

							// $("#user-book-list").hide();
							$("#user-book-list").css("opacity", "0").show();

							if ($vW > "1024") {
								$("#user-book-list .book").css("height", $vH - 97 + "px");
							}

							$(".book").imgLiquid({ fill: true });

							var w = 0, h = 0;

							$("#user-book-list li").each(function () {
								w += $(this).outerWidth();
							});

							w += 500;

							if ($vW > "1024") {
								$("#user-book-list").css("width", w + "px");
							}

							NProgress.done();

							$("#user-book-list").css("opacity", "1");

							// fades in the all the books after section width is added
							$("#user-book-list li").fadeIn("100");
							$("#user-book-list").fadeIn("100");

							// "fix" featured menu pop-in
							setTimeout(function () {
								$("#user-panel, #book-scroller").css("opacity", "1");
							}, 600);

						});

					});


				});

			}
		</script>

		<script src="/static/scripts/filepicker2.js"></script>

		<script>
			$(function () {
				$(".overlay-controls button").addClass("transparent-ii").text("Change cover photo");
			});
		</script>

	</body>

</html>