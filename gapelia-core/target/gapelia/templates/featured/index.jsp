
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Featured on Gapelia</title>

		<!--/ FEATURED VIEW
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
		<meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<!--* if lt IE 9 *>
			<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<!* endif *-->

		<script src="/static/scripts/jquery-1.10.2.js"></script>
		<script src="/static/scripts/modernizr.custom.js"></script>

		<!--/
		<script>
			function load(time) {

				var x = new XMLHttpRequest();
				x.open('GET', "/featured" + time, true);
				x.send();

			};
		</script>

		<script src="/static/scripts/pace.js"></script>
		/-->

		<script src="/static/scripts/nprogress.js"></script>
		<script src="/static/scripts/gradient.linear.js"></script>

	</head>

	<body class="app profile">

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
								<li>Heart + Seoul</li>
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
					<h2>Gapelia</h2>
					<p>A better place for collaborative blogging. Explore our users' featured books and libraries.</p>
				</div>

        <canvas id="dimensions-landing-bg">
					<!--/ fallback is the Gapelia slate color /-->
        </canvas>

				<img src="/static/images/book-thumb-12.jpg" alt=""/>
			</div>
			<!--//main-panel /-->

			<!--/ main-content /-->
			<div id="featured-scroller">
				<ul id="featured-nav">
					<li id="nav-books" class="current"><a href="#">Bookshelf</a></li>
					<li id="nav-dimensions"><a href="#">Dimensions</a></li>
					<li id="nav-libraries"><a href="#">Libraries</a></li>
					<li id="nav-bookmarks-toggle"><a href="#">&#128278;</a></li>
				</ul>

				<!--/ Featured Books /-->
				<div class="book-list-wrapper">
					<ul id="book-list">

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-03.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-04.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-05.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-06.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-07.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-08.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-09.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="author-name">Published by <a href="#">Spaceman Fresh</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-10.jpg" alt=""/>
						</li>

					</ul>
				</div>
				<!--//Featured Books /-->

				<!--/ Gapelian Dimensions /-->
				<div class="dimension-list-wrapper">
					<ul id="dimension-list">

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="/dimension/pulse">Pulse</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="pulse-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="/dimension/art">Art</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="art-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="/dimension/wow">Wow</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="wow-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="/dimension/life">Life</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="life-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="/dimension/flow">Flow</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="flow-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="/dimension/wonder">Wonder</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="wonder-portal-bg"></canvas>
						</li>

					</ul>
				</div>
				<!--//Gapelian Dimensions /-->

				<!--/ Featured Libraries /-->
				<div class="library-list-wrapper">
					<ul id="library-list">

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Architecture</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/architecture-sonn-visionsofart.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Biography</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/biography-dieterrams.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Cinema</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/cinema-matrix.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Cuisine</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/cuisine-traceysculinaryadventures.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Era</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/era-akasped.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">The Far East</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-11.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Fashionista</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-12.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Future</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Gapelians</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Historian</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Into the Wild</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Land of Kawaii</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Manifesto</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Modernism</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Museum</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">On the Road</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Products of Tomorrow</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="#">Subculture</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

					</ul>
				</div>
				<!--//Featured Libraries /-->
			</div>
			<!--//main-content /-->

		</div>

		<!--/ scripts /-->
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
			$(document).ready(function() {

				// Load Gapelia
				NProgress.start();

				setTimeout(function() {

					$("#book-list").css("opacity", "0").show();

					$("#book-list").mCustomScrollbar({
						autoHideScrollbar: false,
						horizontalScroll: true,
						theme: "dark-thin",
						advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
					});

					NProgress.done();

					$("#book-list").css("opacity", "1");

				});

				$("#nav-books").addClass("current");

				// Click "Books"
				$("#nav-books").click(function (e) {

					NProgress.start();

					setTimeout(function() {

						$("#book-list").show();
						$("#dimension-list").hide();
						$("#library-list").hide();

						$("#book-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#dimension-list").mCustomScrollbar("destroy");
						$("#library-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").addClass("current");
					$("#nav-dimensions").removeClass("current");
					$("#nav-libraries").removeClass("current");
					e.preventDefault();

				});

				// Click "Dimensions"
				$("#nav-dimensions").click(function (e) {

					NProgress.start();

					$("#book-list").hide();
					$("#dimension-list").show();
					$("#library-list").hide();

					setTimeout(function() {

						$("#dimension-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#book-list").mCustomScrollbar("destroy");
						$("#library-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-dimensions").addClass("current");
					$("#nav-libraries").removeClass("current");
					e.preventDefault();

				});

				// Click "Libraries"
				$("#nav-libraries").click(function (e) {

					NProgress.start();

					$("#book-list").hide();
					$("#dimension-list").hide();
					$("#library-list").show();

					setTimeout(function() {

						$("#library-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#book-list").mCustomScrollbar("destroy");
						$("#dimension-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-dimensions").removeClass("current");
					$("#nav-libraries").addClass("current");
					e.preventDefault();

				});

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
