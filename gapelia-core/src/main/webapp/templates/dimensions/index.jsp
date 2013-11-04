
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelian Dimensions</title>

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
		<meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/css/pace-theme-minimal.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<!--* if lt IE 9 *>
			<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<!* endif *-->

		<script src="/static/scripts/jquery-1.10.2.js"></script>
		<script src="/static/scripts/modernizr.custom.js"></script>

		<script>
			/*
			paceOptions = {
				restartOnPushState: false,
				restartOnRequestAfter: false
			};
			*/

			// $("#dimension-panel").hide();

			function load(time) {

				var x = new XMLHttpRequest();
				x.open('GET', "{% url 'dimensions' %}" + time, true);
				x.send();

				// $(".super-wrapper").show();

			};
		</script>

		<!--/ <script src="/static/scripts/nprogress.js"></script> /-->
		<script src="/static/scripts/pace.js"></script>
		<script src="/static/scripts/gradient.linear.js"></script>

		<script>
			/*
			$(window).ready(function () {
				$(".super-wrapper").hide();
				Pace.start();

				Pace.stop();
				$(".super-wrapper").show();
			});
			*/

			/*
			Pace.start = function(_options) {
			};
			*/

			/*
			$(document).ready(function() {

				var canvas = document.getElementById("myCanvas");
				var ctx = canvas.getContext("2d");

				// Vertical gradient | static
				var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
				gradient.addColorStop(0, "rgb(255, 255, 255)");
				gradient.addColorStop(1, "rgb(0, 0, 0)");

				ctx.save();
				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.restore();

				// Radial gradient | static
				var canvasCentreX = canvas.width/2;
				var canvasCentreY = canvas.height/2;

				var gradient = ctx.createRadialGradient(canvasCentreX, canvasCentreY, 250, canvasCentreX, canvasCentreY, 0);
				gradient.addColorStop(0, "rgb(0, 0, 0)");
				gradient.addColorStop(1, "rgb(125, 125, 125)");

				ctx.save();
				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.restore();

			});
			*/
		</script>

	</head>

	<body class="app profile">

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">
					<h2 class=""><a class="" href="{% url 'dimensions' %}">Gapelia</a></h2>

					<ul>
						<!--/ <li><a class="" href="{% url 'featured' %}">Featured</a></li> /-->
						<li><a class="" href="{% url 'me' %}">Me</a></li>
						<li><a class="" href="{% url 'create' %}">New Book</a></li>
						<li><a class="" href="{% url 'drafts' %}">Drafts</a></li>
					</ul>

					<div id="account-links">
						<a href="{% url 'profile-settings' %}">Account</a>
						<a href="{% url 'signout' %}">Sign Out</a>
					</div>

				</div>
			</nav>
			<!--//site-menu /-->

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

			<div id="dimension-panel">
				<button id="g-menu-toggle"><a href="#">Gapelia Logo</a></button>

				<div class="dimension-info">
					<h2>Gapelia</h2>
					<p>A better place for collaborative blogging.</p>
				</div>

        <canvas id="dimensions-landing-bg">
					<!--/ fallback is the Gapelia slate color /-->
        </canvas>

				<img src="/static/images/book-thumb-12.jpg" alt=""/>

				<!--/
				<div class="user-bg">
					<img src="/static/images/space-bb.jpg"/>
				</div>

				<div class="user-data">
					<h2>Paul Anthony Webb</h2>

					<ul>
						<li>Surfing</li>
						<li>Hawaii</li>
						<li>Fun</li>
					</ul>

					<span>Space Bandit / ♈ / Protogenoi / Eccentric Dreamer / Pluviophile / Futurist / Musician / Casual Enthusiast</span>

					<div class="wrapper">
						<button>Edit Profile</button>
					</div>
				</div>

				<div class="user-avatar">
					<img src="{{ user|get_user_avatar }}"/>
				</div>
				/-->
			</div>

			<div id="dimension-scroller">
				<ul id="dimension-nav">
					<li id="nav-books" class="current"><a href="#">Bookshelf</a></li>
					<li id="nav-collections"><a href="#">Scrapbook</a></li>
					<li id="nav-libraries"><a href="#">Library</a></li>
					<li id="nav-bookmarks-toggle"><a href="#">&#128278;</a></li>
				</ul>

				<!--/ Gapelian Dimensions /-->
				<div class="dimension-list-wrapper">
					<ul id="dimension-list">

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'pulse' %}">Pulse</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="pulse-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'art' %}">Art</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="art-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'wow' %}">Wow</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="wow-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'life' %}">Life</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="life-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'flow' %}">Flow</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="flow-portal-bg"></canvas>
						</li>

						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'wonder' %}">Wonder</a></div>
							</div>

							<!--/ <span class="image-overlay"></span> /-->
							<canvas id="wonder-portal-bg"></canvas>
						</li>

					</ul>
				</div>
				<!--//Gapelian Dimensions /-->

			</div>

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

				$("#dimension-list").show();

				$("#dimension-list").mCustomScrollbar({
					autoHideScrollbar: false,
					horizontalScroll: true,
					theme: "dark-thin",
					advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
				});

				$("#nav-books").addClass("current");

				// Click "Books"
				/*
				$("#nav-books").click(function (e) {

					$("#user-book-list").show();
					$("#user-collection-list").hide();
					$("#user-library-list").hide();

					$("#user-book-list").mCustomScrollbar({
						autoHideScrollbar: false,
						horizontalScroll: true,
						theme: "dark-thin",
						advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
					});

					$("#user-collection-list").mCustomScrollbar("destroy");
					$("#user-library-list").mCustomScrollbar("destroy");

					$("#nav-books").addClass("current");
					$("#nav-collections").removeClass("current");
					$("#nav-libraries").removeClass("current");
					e.preventDefault();

				});

				// Click "Collections"
				$("#nav-collections").click(function (e) {

					$("#user-book-list").hide();
					$("#user-collection-list").show();
					$("#user-library-list").hide();

					$("#user-collection-list").mCustomScrollbar({
						autoHideScrollbar: false,
						horizontalScroll: true,
						theme: "dark-thin",
						advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
					});

					$("#user-book-list").mCustomScrollbar("destroy");
					$("#user-library-list").mCustomScrollbar("destroy");

					$("#nav-books").removeClass("current");
					$("#nav-collections").addClass("current");
					$("#nav-libraries").removeClass("current");
					e.preventDefault();

				});

				// Click "Libraries"
				$("#nav-libraries").click(function (e) {

					$("#user-book-list").hide();
					$("#user-collection-list").hide();
					$("#user-library-list").show();

					$("#user-library-list").mCustomScrollbar({
						autoHideScrollbar: false,
						horizontalScroll: true,
						theme: "dark-thin",
						advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
					});

					$("#user-book-list").mCustomScrollbar("destroy");
					$("#user-collection-list").mCustomScrollbar("destroy");

					$("#nav-books").removeClass("current");
					$("#nav-collections").removeClass("current");
					$("#nav-libraries").addClass("current");
					e.preventDefault();

				});
				*/

			});

			/*
			$(document).ready(function() {

				// Load Gapelia
				NProgress.start();

				setTimeout(function() {

					$("#dimension-list").css("opacity", "0").show();

					$("#dimension-list").mCustomScrollbar({
						autoHideScrollbar: false,
						horizontalScroll: true,
						theme: "dark-thin",
						advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
					});

					NProgress.done();

					$("#dimension-list").css("opacity", "1");

				});

				$("#nav-books").addClass("current");

				// Click "Books"
				$("#nav-books").click(function (e) {

					NProgress.start();

					setTimeout(function() {

						$("#user-book-list").show();
						$("#user-collection-list").hide();
						$("#user-library-list").hide();

						$("#user-book-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-collection-list").mCustomScrollbar("destroy");
						$("#user-library-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").addClass("current");
					$("#nav-collections").removeClass("current");
					$("#nav-libraries").removeClass("current");
					e.preventDefault();

				});

				// Click "Collections"
				$("#nav-collections").click(function (e) {

					NProgress.start();

					$("#user-book-list").hide();
					$("#user-collection-list").show();
					$("#user-library-list").hide();

					setTimeout(function() {

						$("#user-collection-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-book-list").mCustomScrollbar("destroy");
						$("#user-library-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-collections").addClass("current");
					$("#nav-libraries").removeClass("current");
					e.preventDefault();

				});

				// Click "Libraries"
				$("#nav-libraries").click(function (e) {

					NProgress.start();

					$("#user-book-list").hide();
					$("#user-collection-list").hide();
					$("#user-library-list").show();

					setTimeout(function() {

						$("#user-library-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-book-list").mCustomScrollbar("destroy");
						$("#user-collection-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-collections").removeClass("current");
					$("#nav-libraries").addClass("current");
					e.preventDefault();

				});

			});
			*/
		</script>

	</body>

</html>