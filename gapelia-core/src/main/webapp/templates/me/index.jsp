<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%/*@include file="../../auth.jsp" */%>
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
		<script>
			<% String id = session.getId(); %>
			var sessionId = '<%= id %>'
		</script>

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
					<ul id="user-book-list">
					</ul>
				</div>
				<!--//your-books /-->

			</div>
			<!--//main-scroller /-->

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script>
			new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

			$(".mp-pushed").ready(function() {
				$("#book-scroller").css("z-index", "0");
			});

			$(function() {
				$(".user-bg, .book, .collection, .draft").imgLiquid({ fill: true });
			});
		</script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/mousewheel.js"></script>

		<script>
			$(".user-data h2").html(_fullName);
			$(".user-avatar img").attr("src", _image);

			/*
			if (navigator.appVersion.indexOf("Win")!=-1) {
				// Detect Windows
			} else if (navigator.appVersion.indexOf("Mac")!=-1) {
				// Detect Mac
			} else {
				// Detect Linux, lol
			}
			*/

			$(document).ready(function() {

				var
				$vW = $(window).width(),
				$vH = $(window).height();

				if ($vW < "1025") {

					$("#user-wrapper").hide();

					$("#book-scroller").prepend('<div id="user-wrapper"><div class="user-avatar"><div class="avatar-wrapper"><img src="/static/images/users/11.jpg"/></div></div><div class="user-data"><h2>Paul Webb</h2><span id="user-bio" contenteditable="false">Space Bandit / Aries / Protogenoi / Eccentric Dreamer / Pluviophile / Futurist / Musician / Casual Enthusiast</span></div><div class="button-wrapper"><button class="edit-profile slate">Edit Profile</button></div></div>');

					$(function() {
						$("#book-scroller").bind("touchmove scroll", function() {

							var value = $(this).stop().scrollTop();

							if (value > 1) {

								$("#g-menu-toggle").hide();

								$("#user-panel .user-avatar, #user-panel #user-data, #user-panel h2, #user-panel .button-wrapper").css("margin", "-100rem 0 0 0");
								$("#user-panel .button-wrapper").css("bottom", "inherit");

								$("#mobile-header").css({
									"top": "0",
									"left": $vW / 2 - 100 + "px"
								});

								$("#user-panel").css({
									"background-color": "#70a1b1",
									"height": "75px"
								});

							}

							if (value < 1) {

								$("#g-menu-toggle").show();

								$("#user-panel .user-avatar, #user-panel #user-data, #user-panel h2, #user-panel .button-wrapper").css("margin", "initial");
								$("#user-panel .button-wrapper").css("bottom", "5%");

								$("#mobile-header").css({
									"top": "-20rem",
									"transition": "all 0.2s ease"
								});

								$("#user-panel").css({
									"background-color": "#fcfcfc",
									"height": "75px"
								});

							}

						});
					});

				} else {
				}

				$(function () {

					NProgress.start();

					$("#featured-panel, #featured-scroller").css("opacity", "0").show();

					html = "<ul id=\"user-book-list\">";
					featuredBooks = "";
					parsedHtml = "";

					var
					allBooks = $("#user-book-list li"),			// gets all books in a section
					firstBook = $(allBooks).first();		// gets first book in list

					$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

					setTimeout(function () {
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
								} else {
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
								} else {
									// $("#book-list").css("height", h + 219 + "px");
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

						// "fix" featured menu pop-in
						setTimeout(function () {
							$("#featured-panel, #featured-scroller").css("opacity", "1");
						}, 400);

					}, 1000);
					NProgress.done();

				});
				function parseJsonToStringForBooks(books) {
					i = 0;
					$.each(books, function () {
						currentUrl=document.URL;
						currentUrl=currentUrl.slice(0,(currentUrl.length-2)); // removes the end
						if(books[i] == null) {
							return false;
						}
						html += "<li class='book' bookid=\"" + books[i].bookId + "\">";

						html += "<div class=\"bookmark-this\"><span class=\"top-bm\"></span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div><div class='book-title'><a href='"+currentUrl+"read/bookid="+books[i].bookId+"'>" + books[i].title + "</a></div><div class='book-info'>";

						html += "<div class='author-name'><a href='#'>" + books[i].userId + "</a></div><div class=\"library-location\"><a href=\"#\">" + books[i].library + "</a></div></div>";

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
