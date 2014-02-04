<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<% /* @include file="../../auth.jsp"									*/ %>
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

		<%@include file="../../userDetails.jsp" %><!--/ Dont use this. It is for testing only /-->
		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.0.3.min.js"></script>
		<script src="/static/scripts/nprogress.js"></script>

		<% /* ******************************* */ %>
		<% /* Copy this on all jsp get sessionId %>
		<!--/ To get session id /-->
		<script>
			<% String id = session.getId(); %>
			var sessionId = '<%= id %>'
		</script>
		<% /* ******************************* */ %>

	</head>

	<body class="app profile">
	
		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">
					<h2 class=""><a class="" href="/featured">Gapelia</a></h2>

					<ul>
						<li><a id="gpl-menu-me" href="/me">Me</a>
							<ul>
								<li><a href="/accounts">Account Settings</a></li>
								<li><a href="#">Sign Out</a></li>
							</ul>
						</li>

						<li><a id="gpl-menu-create" href="/create">Create</a></li>

						<li><a id="gpl-menu-drafts">Drafts</a>
							<ul>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
							</ul>
						</li>
					</ul>

					<!--/
					<div id="account-links">
						<a href="/accounts">Account</a>
						<a href="#">Sign Out</a>
					</div>
					/-->

				</div>
			</nav>
			<!--//site-menu /-->

			<!--/ main-panel /-->
			<div id="user-panel">
				<button id="g-menu-toggle">
					<i class="ion-drag"></i>
				</button>

				<h1 id="mobile-header" style="display: none;"><a href="/featured">Gapelia</a></h1>

				<div id="user-wrapper">
					<div class="user-avatar">
						<div class="avatar-wrapper">
							<img src="/static/images/users/11.jpg"/>
						</div>
					</div>

					<div class="user-data">
						<h2>Paul Anthony Webb</h2>

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
					<!--/ <div><br/>&nbsp;<br/></div> /-->

					<ul id="user-book-list">

						<li class="book">
							<div class="book-title"><a href="#">Teletubbies Are the Future</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Insane Asylum</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-title"><a href="#">How to be Super Saiyan</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">The Teachings of Goku</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-title"><a href="#">I am Sailor Moon and you can too!</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Space Cadets</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-03.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-title"><a href="#">Dreaming of Stars</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Dimmi Bolling Press Kit</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-04.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-title"><a href="#">Fresh Renders of Sound from my Head × Beats Take Significance</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">The Kitchen Collective</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-05.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-title"><a href="#">Save the trees, too!</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">PETA</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-06.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-title"><a href="#">BOkeH!</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Hmm, weird</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-07.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-title"><a href="#">The Wild Thornberrys!</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Nene-ne-ne-nene-ne-nick-Nickelodeooooon!</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-08.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-title"><a href="#">Crying Rivers: The Justin Timberlake Story</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Biography</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-09.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-title"><a href="#">Trees Yo</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Nature Bros</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-10.jpg" alt=""/>
						</li>

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

		<script>
			// Splash page
			$(document).ready(function () {

				stuff = "";
				stuff += "<section id=\"user-splash\">";
				stuff += "<div class=\"user-avatar\"><div class=\"avatar-wrapper\"></div></div>";
				stuff += "<div id=\"splash-user-info\">";
				stuff += "<h2>Paul Anthony Webb</h2>";
				stuff += "<span id=\"splash-user-bio\" contenteditable=\"false\">Space Bandit / Aries / Protogenoi / Eccentric Dreamer / Pluviophile / Futurist / Musician / Casual Enthusiast</span>";
				stuff += "<div class=\"button-wrapper\"><button class=\"edit-profile slate\">Edit Profile</button></div>";
				stuff += "</div>";
				stuff += "<div id=\"close-splash\"><i class=\"ion-ios7-arrow-right\"></i></div>";
				stuff += "<img class=\"page-bg\" src=\"/static/images/bg-05.jpg\"/>";
				stuff += "</section>";

				$("#mp-pusher").prepend(stuff);

				$("#user-splash").imgLiquid({ fill: true });
				$("#user-splash .avatar-wrapper").append('<img src="/static/images/users/11.jpg"/>');

			});

			if ($vW > "1024") {

				$(document).on("click", "#close-splash", function () {

					$("#close-splash").css({
						"left": "-200%",
						"right": "initial"
					});

					$("#user-splash").css("left", "-200%");
					$("#g-menu-toggle").css("color", "#70a1b1");

				});

			} else {

				$(function() {

					$("#user-splash").swipe({
						swipeUp: function(event, direction, distance, duration, fingerCount) {

							$("#close-splash").css({
								"height": "0",
								"top": "-200%"
							});

							$("#user-splash").css("top", "-200%");
							$("#g-menu-toggle").css("color", "#70a1b1");

						}, threshold: 0
					});

					$(document).on("click", "#close-splash", function () {

						$("#close-splash").css({
							"height": "0",
							"top": "-200%"
						});

						$("#user-splash").css("top", "-200%");
						$("#g-menu-toggle").css("color", "#70a1b1");

					});

				});

			}

			$(document).ready(function () {

				var
				$vW = $(window).width(),
				$vH = $(window).height();

				// Scrolling on desktop
				$(function () {
					$("#book-scroller").mousewheel(function (event, delta) {

						this.scrollLeft -= (delta * 40);
						event.preventDefault();

					});
				});

				// Dropdown menu for mobile
				if ($vW < "1025") {

					$("#user-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-profile" class="current"><a href="/me">My Profile</a></li></ul>');

					$(function () {

						if ($vW < "321") {
							$("#user-panel #user-bio, #user-panel .button-wrapper").remove();
						}

						$("#g-menu-toggle").click(function () {

							/*
							if ($vW > "320") {
								$("#user-panel .user-avatar, #user-panel #user-bio, #user-panel .button-wrapper").css("margin", "-100rem 0 0 0").fadeOut();
							}

							$("#user-panel h2").css({
								"top": "1.2rem",
								"left": "0",
								"padding": "0 6rem",
								"position": "fixed",
								"width": "100%"
							});
							*/

							// $("#user-panel .button-wrapper").css("bottom", "inherit");
							// $("#user-panel").css("height", "75px");

							// $("#user-panel").css("height", "188px");
							$("#featured-nav").toggle();

						});

					});

				}

				<% String id = session.getId(); %>
				var sessionId = '<%= id %>'

				html = "<ul id=\"user-book-list\">";
 				featuredBooks = "";
 				parsedHtml = "";

				// $(".user-data h2").html(_fullName);
				// $(".user-avatar img").attr("src", _image);

				$.ajax({
					url: "http://gapelia-dev.herokuapp.com/api/me/getUserBooks",
					contentType: "application/x-www-form-urlencoded;charset=utf-8",
					type: "POST",
					data: {
						sessionId: sessionId
					},

					success: function (data) {

						featuredBooks = data;
						parsedHtml = parseJsonToStringForBooks(featuredBooks);

						$(".user-book-list-wrapper").html(parsedHtml);
						$("#user-book-list").css("opacity", "0").show();

						if ($vW > "1024") {
							$("#user-book-list .book").css("height", $vH - 97 + "px");
						}

						$(".book").imgLiquid({ fill: true });

						var w = 0, h = 0;

						$("#user-book-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#user-book-list").css("width", w - 320 + "px");
						}

						NProgress.done();

						$("#user-book-list").css("opacity", "1");

						// fades in the all the books after section width is added
						$("#user-book-list li").fadeIn("100");
						$("#user-book-list").fadeIn("100");

					},

					error: function (q, status, err) {

						if (status == "timeout") {
							// alert("Request timed out");
						} else {
							// alert("Some issue happened with your request: " + err);
						}

					}
				});

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
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#user-book-list").css("width", w - 320 + "px");
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

				function parseJsonToStringForBooks(books) {

					i = 0;

					$.each(books, function () {

						currentUrl = document.URL;
						currentUrl = currentUrl.slice(0,(currentUrl.length-2)); // removes the end

						if(books[i] == null) {
							return false;
						}

						html += "<li class='book' bookid=\"" + books[i].bookId + "\">";

						html += "<div class='book-title'><a href='"+currentUrl+"read/bookid="+books[i].bookId+"'>" + books[i].title + "</a></div><div class='book-info'><div class=\"library-location\"><a href=\"#\">"+books[i].library+"</a></div></div>";

						html += "<span class=\"image-overlay\"></span>";

						html += "<img src=\"" + books[i].coverPhoto + "\" alt=''/>";

						html += "</li>";

						i++;

					});

					html += "</ul>";

					return html;

				}

			});
		</script>

	</body>

</html>
