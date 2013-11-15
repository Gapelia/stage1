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
		<link href="/static/css/jquery.mCustomScrollbar.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>
		<link href="/static/css/pace-theme-minimal.css" rel="stylesheet"/>
		<!--* if lt IE 9 *><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><!* endif *-->
	</head>
	<body class="app profile">
		<div id="mp-pusher" class="super-wrapper">
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">
					<h2 class=""><a class="" href="{% url 'dimensions' %}">Gapelia</a></h2>
					<ul>
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
				<canvas id="dimensions-landing-bg"></canvas>
				<img src="/static/images/book-thumb-12.jpg" alt=""/>
			</div>
			<div id="dimension-scroller">
				<ul id="dimension-nav">
					<li id="nav-books" class="current"><a href="#">Bookshelf</a></li>
					<li id="nav-collections"><a href="#">Scrapbook</a></li>
					<li id="nav-libraries"><a href="#">Library</a></li>
					<li id="nav-bookmarks-toggle"><a href="#">&#128278;</a></li>
				</ul>
				<div class="dimension-list-wrapper">
					<ul id="dimension-list">
						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'pulse' %}">Pulse</a></div>
							</div>
							<canvas id="pulse-portal-bg"></canvas>
						</li>
						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'art' %}">Art</a></div>
							</div>
							<canvas id="art-portal-bg"></canvas>
						</li>
						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'wow' %}">Wow</a></div>
							</div>
							<canvas id="wow-portal-bg"></canvas>
						</li>
						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'life' %}">Life</a></div>
							</div>
							<canvas id="life-portal-bg"></canvas>
						</li>
						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'flow' %}">Flow</a></div>
							</div>
							<canvas id="flow-portal-bg"></canvas>
						</li>
						<li class="portal">
							<div class="portal-info">
								<div class="title"><a href="{% url 'wonder' %}">Wonder</a></div>
							</div>
							<canvas id="wonder-portal-bg"></canvas>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>
		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/jquery.mCustomScrollbar.js"></script>
		<script>
			new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));
			$(".mp-pushed").ready(function() {
				$("#book-scroller").css("z-index", "0");
			});
			$(document).ready(function() {
				$(".dimension-list-wrapper").show();
				$(".dimension-list-wrapper").mCustomScrollbar({
					autoHideScrollbar: false,
					horizontalScroll: true,
					theme: "dark-thin",
					advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
				});
				$("#nav-books").addClass("current");
			});
		</script>
	</body>
</html>