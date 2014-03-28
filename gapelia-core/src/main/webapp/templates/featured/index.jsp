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
							<ul>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
								<li><a href="#">007: The Diego Regules Story</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
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
					<ul id="book-list">

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Official Mega Man Battle Network Encyclopedia</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Editor's Picks: Snowstorm Pictures</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">The Legend of Mick Dodge</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-03.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Secret Ski Towns</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-04.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Exploring the Ancient World in 2013</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-05.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Best New Space Pictures</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-06.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Connecting Tribes From the Yukon to the Amazon</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-07.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Best Travel Photos of December</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-08.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Going for Gold</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-09.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Exploring Animals in 2013</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-10.jpg" alt=""/>
						</li>

					</ul>
				</div>
				<!--//Featured Books /-->

				<!--/ Featured Libraries /-->
				<div class="library-list-wrapper">
				</div>
				<!--//Featured Libraries /-->

				<!--/ User's Bookmarks /-->
				<div class="bookmark-list-wrapper">
					<ul id="bookmark-list">

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">7 Routes to Extended-Layover Bliss</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-11.jpg" alt=""/>
						</li>

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">5 Layover-Worthy Airports</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-12.jpg" alt=""/>
						</li>

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Going Dutch in the Off Season</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Best Travel Photos of December</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb.JPG" alt=""/>
						</li>

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">I Heart My City (And So Should You)</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">The Best of Intelligent Travel</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">January Event-o-Rama</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-03.jpg" alt=""/>
						</li>

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">4 Realistic Travel Resolutions</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-04.jpg" alt=""/>
						</li>

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Top 10 Compact Cameras for Travelers</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-05.jpg" alt=""/>
						</li>

						<li class="collection bookmarked">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Canada's 50 Places of a Lifetime</a></div>

							<div class="collection-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-06.jpg" alt=""/>
						</li>

					</ul>
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

		<script>
			if ($vW > "1024") {
				new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

				$(".mp-pushed").ready(function () {
					$("#book-scroller").css("z-index", "0");
				});
			}

			$(document).on("ready", function () {
				$(".book, .library, .collection").imgLiquid({ fill: true });
			});
		</script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/mousewheel.js"></script>
		<script src="/static/scripts/scroll.js"></script>

		<script>
			 $(document).ready(function() {
            		         getLibraries();
             });
             function load () {
                var $vW = $(window).width(), $vH = $(window).height();

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

					$("#featured-panel").append('<ul id="featured-nav" style="display: none;"><li id="nav-books" class="current"><a href="#">Bookshelf</a></li><li id="nav-libraries"><a href="#">Libraries</a></li><li id="nav-bookmarks"><a href="#">Bookmarks</a></li><li id="nav-profile"><a href="/me">My Profile</a></li></ul>');

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

				}

				if ($vW < "321") {

					$(".book, .collection").append('<div class="book-snippet"><p>A snippet of this book should be here, and the length shall not exceed one hundred and forty characters. This is an example of that length!!</p></div>');

				}

				// Load Gapelia
				NProgress.start();

				$("#featured-panel, #featured-scroller").css("opacity", "0").show();

				var
				allBooks = $("#book-list li"),			// gets all books in a section
				firstBook = $(allBooks).first();		// gets first book in list

				$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

				setTimeout(function () {

					$("#book-list").hide();
					$("#library-list").hide();
					$("#bookmark-list").hide();

					$("#book-list").css("opacity", "0").show();

					if ($vW > "1024") {
						$("#book-list .book").css("height", $vH - 97 + "px");
					}

					$(".book").imgLiquid({ fill: true });

					var w = 0, h = 0;

					$("#book-list li").each(function () {
						w += $(this).outerWidth();
						h += $(this).outerHeight();
					});

					w += 500;

					if ($vW > "1024") {
						$("#book-list").css("width", w - 320 + "px");
					}

					NProgress.done();

					$("#book-list").css("opacity", "1");

					// fades in the all the books after section width is added
					$("#book-list li").fadeIn("100");
					$("#book-list").fadeIn("100");


					// "fix" featured menu pop-in
					setTimeout(function () {
						$("#featured-panel, #featured-scroller").css("opacity", "1");
					}, 600);

					// Place avatars *after* imgLiquid is done processing. Please keep this in mind.
					if ($vW > "300") {
						$(".book-info, .collection-info").prepend('<img class="author-avatar" src="/static/images/users/01.jpg"/>');
					}

				}, 1000);

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

						var w = 0, h = 0;

						$("#book-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#book-list").css("width", w - 320 + "px");
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

					var
					allBooks = $("#library-list li"),		// gets all books in a section
					firstBook = $(allBooks).first();		// gets first book in list

					$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

					setTimeout(function () {

						$("#book-list").hide();
						$("#bookmark-list").hide();

						var w = 0, h = 0;

						$("#library-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#library-list").css("width", w - 155 + "px");
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


						if ($vW > "1024") {
							$("#bookmark-list").css("width", w - 320 + "px");
						} else {
							// $("#bookmark-list").css("height", h + 400 + "px");
						}

						// fades in the all the books after section width is added
						$("#bookmark-list li").fadeIn("100");
						$("#bookmark-list").fadeIn("100");

					}, 1000);

					e.preventDefault();

					$("#nav-books").removeClass("current");
					$("#nav-libraries").removeClass("current");
					$("#nav-bookmarks").addClass("current");

					NProgress.done();

				});

				function parseJsonToStringForLibraries(libraries) {

					html += "<ul id=\"library-list\">";

					$.each(libraries, function () {

						html += "<li class=\"library\"><div class=\"library-info\"><div class=\"title\"><a href=\"" + this["libraryHref"] + "\">" + this['title'] + "</a></div><div class=\"lib-blurb\">" + this['blurb'] + "</div></div>";

						html += "<div class=\"wrapper\"><button class=\"subscribe transparent-ii\">Subscribe</button></div><span class=\"image-overlay\"></span><img src=\"" + this['image'] + "\" alt=\"\"/></li>";

					});

				}

				function parseJsonToStringForBooks(books) {

					i = 0;

					$.each(books, function () {

						currentUrl=document.URL;
						currentUrl=currentUrl.slice(0,(currentUrl.length-8)); // removes the end

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

			}
		</script>
		<!--//scripts /-->

	</body>

</html>