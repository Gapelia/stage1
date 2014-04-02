<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Featured Books</title>

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
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>

		<script src="/static/scripts/nprogress.js"></script>

	</head>

	<!--/ <body class="app profile"> /-->
	<body class="app">

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

			<!--/ main-panel /-->
			<div id="featured-panel">
				<button id="g-menu-toggle" class="notification-time">
					<span id="notification-count">6</span>
					<i class="ion-drag"></i>
				</button>

				<div class="featured-info">
					<h2>Gapelia</h2>
				</div>
			</div>
			<!--//main-panel /-->

			<!--/ main-content /-->
			<div id="featured-scroller">
				<div id="nav-wrapper">
					<ul id="featured-nav">
						<li id="nav-books" class="current"><a href="#">Bookshelf</a></li>
						<li id="nav-libraries"><a href="#">Libraries</a></li>
						<li id="nav-bookmarks"><a href="#">Bookmarks</a></li>
					</ul>
				</div>

				<!--/ Featured Books /-->
				<div class="book-list-wrapper">
					<ul id="book-list"></ul>
				</div>
				<!--//Featured Books /-->

				<!--/ Featured Libraries /-->
				<div class="library-list-wrapper">
				</div>
				<!--//Featured Libraries /-->

				<!--/ User's Bookmarks /-->
				<div class="bookmark-list-wrapper">
					<!--/ <ul id="bookmark-list"></ul> /-->
				</div>
				<!--//User's Bookmarks /-->
			</div>
			<!--//main-content /-->

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/touchSwipe.min.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/ajax.js"></script>
		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/mousewheel.js"></script>
		<script src="/static/scripts/scroll.js"></script>

		<script>
			if ($vW > "1024") {
				new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

				$(".mp-pushed").ready(function () {
					$("#book-scroller").css("z-index", "0");
				});
			}

			$(function() {

				var third = getUserDrafts();
				var second = getBookmarkedBooks();
				var fourth = getListBookmarked();
				var fifth = getListSubscribed();
				var sixth = getFeaturedBooks();


			});

			function load () {

				var $vW = $(window).width(), $vH = $(window).height();
                h = $(this).outerHeight() - 92;
                $(".book").css("height", h);
                $("#book-list li").fadeIn("100");
                $("#book-list").fadeIn("100");
				if ($vW > "1024") {
					// Scrolling on desktop
					$("#featured-scroller").mousewheel(function (event, delta) {

						$("#featured-scroller").stop().animate({
							scrollLeft: "-=" + (75 * delta) + "px"
						}, "150", "easeOutCubic");

					});

				}

				// Dropdown menu for mobile
				if ($vW < "1025") {

					$("#featured-panel .featured-info").remove();
					$("#featured-panel").append('<span id="category-title">Bookshelf</span>');

					$("#featured-panel").append('<ul id="featured-nav" style="display: none;"><li id="nav-books" class="current"><a href="#">Bookshelf</a></li><li id="nav-libraries"><a href="#">Libraries</a></li><li id="nav-bookmarks"><a href="#">Bookmarks</a></li><li id="nav-profile"><a href="/me">My Profile</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');

					$("#book-list").append('<li class="book" id="book-cta"><p><a href="#">Explore</a> some of our featured topic-based libraries.</p><img src="/static/images/covers/bg.jpg" alt=""/></li>');

					$(document).on("click", "#g-menu-toggle, #nav-books, #nav-libraries, #nav-bookmarks", function () {
						$("#featured-nav").toggle();
					});

					$(document).on("click", "#nav-books", function () {
						$("#category-title").html("Bookshelf");
					});

					$(document).on("click", "#nav-libraries", function () {
						$("#category-title").html("Libraries");
					});

					$(document).on("click", "#nav-bookmarks", function () {
						$("#category-title").html("Bookmarks");
					});

					// Log Out
					$("#logout").click(function (e) {
						document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
						window.location = "";	
					});

				}

				if ($vW < "321") {

					$(".book, .collection").append('<div class="book-snippet"><p>A snippet of this book should be here, and the length shall not exceed one hundred and forty characters. This is an example of that length!!</p></div>');

				}

				$("#nav-books").addClass("current");

				NProgress.done();

				// Click "Books"
				$("#nav-books").click(function (e) {

					NProgress.start();

					var
					allBooks = $("#book-list li"),			// gets all books in a section
					firstBook = $(allBooks).first();		// gets first book in list

					$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

					setTimeout(function () {

						$("#library-list").hide();
						$("#bookmark-list").hide();
						$(".bookmark-list-wrapper section").remove();

						var w = 0, h = 0;

						$("#book-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#book-list").css("width", w + "px");
						} else {
							// $("#book-list").css("height", h + 219 + "px");
						}

						// fades in the all the books after section width is added
						$("#book-list li").fadeIn("100");
						$("#book-list").fadeIn("100");

					}, 1000);

					e.preventDefault();

					$("#nav-books").addClass("current");
					$("#nav-libraries").removeClass("current");
					$("#nav-bookmarks").removeClass("current");

					NProgress.done();

				});

				// Click "Libraries"
				$("#nav-libraries").click(function (e) {

					NProgress.start();

					/*
					var
					allBooks = $("#library-list li"),		// gets all books in a section
					firstBook = $(allBooks).first();		// gets first book in list

					$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book
					*/

					setTimeout(function () {

						$("#book-list").hide();
						$("#bookmark-list").hide();
						$(".bookmark-list-wrapper section").remove();

						var w = 0, h = 0;

						$("#library-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;
                        $("#library-list").css("width", w + "px");
						if ($vW > "1024") {

							$("#library-list").css("width", w + "px");
							$("#library-list .library").css("height", $vH - 97 + "px");

						} else {
							// $("#library-list").css("height", h + 379 + "px");
						}

						// fades in the all the books after section width is added
						$("#library-list li").fadeIn("100");
						$("#library-list").fadeIn("100");

					}, 1000);

					e.preventDefault();

					$("#nav-books").removeClass("current");
					$("#nav-libraries").addClass("current");
					$("#nav-bookmarks").removeClass("current");

					NProgress.done();

				});

				// Click "Bookmarks"
				$("#nav-bookmarks").click(function (e) {

					NProgress.start();

					var
					allBooks = $("#bookmark-list li"),	// gets all books in a section
					firstBook = $(allBooks).first();		// gets first book in list

					$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

					setTimeout(function () {

						$("#book-list").hide();
						$("#library-list").hide();

						var w = 0, h = 0;

						$("#bookmark-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						// fades in the all the books after section width is added
						$("#bookmark-list li").fadeIn("100");
						$("#bookmark-list").fadeIn("100");
						$(".bookmark-list-wrapper section").css("width", $vW + "px");

					}, 1000);

					e.preventDefault();

					$("#nav-books").removeClass("current");
					$("#nav-libraries").removeClass("current");
					$("#nav-bookmarks").addClass("current");

					NProgress.done();

				});
			}
		</script>
		<!--//scripts /-->

	</body>

</html>