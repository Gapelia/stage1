
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelian Dimension | Wow</title>

		<!--/ DIMENSIONS VIEW
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
				\/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

		<meta name="author" content="Gapelia"/>
		<meta name="copyright" content="Gapelia"/>
		<meta name="description" content="Better stories, together."/>
		<meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, wow, wow, wow, life, wow, wonder, dimension"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<!--* if lt IE 9 *>
			<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<!* endif *-->

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.0.3.min.js"></script>

	</head>

	<body class="app">

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">
					<h2 class=""><a class="" href="/featured">Gapelia</a></h2>

					<ul>
						<li><a class="" href="/me">Me</a></li>
						<li><a class="" href="/create">New Book</a></li>
						<!--/ <li><a class="" href="/drafts">Drafts</a></li> /-->
					</ul>

					<div id="account-links">
						<a href="/accounts">Account</a>
						<a href="#">Sign Out</a>
					</div>
				</div>
			</nav>
			<!--//site-menu /-->

			<!--/ bookmarks-menu /-->
			<div id="bookmarks-scroller">
				<div id="bookmarks-header">
					<h3>Paul Anthony Webb</h3>
				</div>

				<div id="bm-wrapper">
					<dl id="bm-notifications">
						<dt><span></span><a class="bm-section-title" href="#">Notifications</a></dt>

						<dd>
							<ul>
								<li>Alice liked Nature is Gaea</l1>
								<li>Theo added Tokyo Drift to a collection</l1>
								<li>+3 people want to collaborate</l1>
							</ul>
						</dd>
					</dl>

					<dl id="bm-books">
						<dt><span></span><a class="bm-section-title" href="#">Bookshelf</a></dt>

						<dd>
							<ul>
								<li>Fantasia</l1>
								<li>Nature is Gaea</l1>
								<li>Is This A Wonderland?</l1>
								<li>Majesty</l1>
								<li>AmsterDAYUM</l1>
								<li>Japanimation</li>
								<li>J'taime du jour</li>
								<li>Hewow + Seoul</li>
							</ul>
						</dd>
					</dl>

					<dl id="bm-collections">
						<dt><span></span><a class="bm-section-title" href="#">Scrapbook</a></dt>

						<dd>
							<ul>
								<li>Nature</l1>
							</ul>
						</dd>
					</dl>

					<dl id="bm-libraries">
						<dt><span></span><a class="bm-section-title" href="#">Library</a></dt>

						<dd>
							<ul>
								<li>Swiss Interiors</l1>
								<li>World of Blue</l1>
								<li>Hullabaloo</l1>
								<li>I'm On A Boat</l1>
								<li>Bahama Mama</l1>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</dd>
					</dl>

					<dl id="bm-drafts">
						<dt><span></span><a class="bm-section-title" href="#">Drafts</a></dt>

						<dd>
							<ul>
								<li>Travel Book #01</l1>
								<li>Adventure Book</l1>
								<li>Mountains and Stuff</l1>
							</ul>
						</dd>
					</dl>
				</div>
			</div>
			<!--//bookmarks-menu /-->

			<!--/ main-panel /-->
			<div id="featured-panel">
				<button id="g-menu-toggle"><a href="#">Gapelia Logo</a></button>

				<div class="featured-info">
					<h2>Wow</h2>
					<p></p>
				</div>

				<canvas id="wow-landing-bg">
					<!--/ fallback is the Gapelia slate color /-->
				</canvas>

				<img src="/static/images/book-thumb-12.jpg" alt=""/>
			</div>
			<!--//main-panel /-->

			<!--/ main-content /-->
			<div id="featured-scroller">
				<ul id="featured-nav">
					<li id="nav-books" class="current"><a href="#">Stories from the heart, to enrich the soul</a></li>

					<li id="nav-bookmarks-toggle">
						<span class="top-bm"></span>
						<span class="bottom-bm"></span>
						<span class="right-bm"></span>
					</li>
				</ul>

				<!--/ Wow Books /-->
				<div class="book-list-wrapper">
					<ul id="book-list">
					</ul>
				</div>
				<!--//Wow Books /-->
			</div>
			<!--//main-content /-->
		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/nprogress.js"></script>
		<script src="/static/scripts/gradient.landing-wow.js"></script>

		<script src="/static/scripts/g.money.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script>
			new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

			$(".mp-pushed").ready(function() {
				$("#book-scroller").css("z-index", "0");
			});
		</script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/jquery.mCustomScrollbar.js"></script>

		<script>
			$(document).ready(function () {

				var
				sId = "1234567",
				html = "<ul id=\"book-list\">",
				$vH = $(window).height();

				// Load Gapelia
				NProgress.start();

				function parseJsonToStringForBooks(books) {

					$.each(books, function () {

						html += "<li class='book' bookid=\"" + this['bookId'] + "\">";
						html += "<div class=\"add-this\"><a href=\"#\"><span>&#9733;</span><span>Add to your library</span></a></div><div class='book-info'>";
						html += "<div class='title'><a href='#'>" + this['title'] + "</a></div>";
						html += "<div class='author-name'>Published by <a href='#'>" + this['createdByUserIds'] + "</a></div><div class=\"library-location\">Found in <a href=\"#\">" + this['libraryId'] + "</a></div></div>";
						html += "<span class=\"image-overlay\"></span>";
						html += "<img src=\"" + this.pages[0].photo.photoUrl + "\" alt=''/>";
						html += "</li>";

					});

					html += "</ul>";
					return html;

				}

				$.ajax({
					url: "http://localhost:8080/api/dimension/getAllBooks",
					contentType: "application/x-www-form-urlencoded;charset=utf-8",
					type: "POST",
					data: {
						sessionId: sId,
						dimension: "Flow"
					},
					success: function (data) {
						var parsedHtml = parseJsonToStringForBooks(data);
						$(".book-list-wrapper").html(parsedHtml);
						resize();
					},
					error: function (q, status, err) {
						if (status == "timeout") {
							alert("Request timed out");
						} else {
							alert("Some issue happened with your request: " + err);
						}
					}
				});

				function resize() {

					$("#book-list").css("opacity", "0").show();

					$("#book-list").mCustomScrollbar({
						autoHideScrollbar: false,
						horizontalScroll: true,
						theme: "dark-thin",
						advanced: {
							autoExpandHorizontalScroll: true,
							updateOnContentResize: false
						}
					});

					NProgress.done();

					$("#book-list .book").css("height", $vH - 97 + "px");
					$("#book-list").css("opacity", "1");

				}

				$("#nav-books").addClass("current");

			});
		</script>

	</body>

</html>
