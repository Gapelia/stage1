<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<title>Book Preview</title>
		<!--/
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
				\/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta name="author" content="Gapelia"/>
		<meta name="copyright" content="Gapelia"/>
		<meta name="description" content="This should be a synopsis about the book"/>
		<meta name="keywords" content="This should be the keywords the author chose, as well as the author's name/username/alias"/>
		<link href="static/css/style.css" rel="stylesheet"/>
		<link href="static/images/favicon.png" rel="shortcut icon"/>
		<!--* if lt IE 9 *>
			<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<!* endif *-->
		<script src="static/scripts/modernizr.custom.js"></script>
		<script src="static/scripts/jquery-2.0.3.min.js"></script>
		<script src="//use.typekit.net/web3vzl.js"></script>
		<script src="static/scripts/preview.js"></script>
		<script type="text/javascript">
			var htmlToInsert="";
			var current;
			$(document).ready(function () {
				pages=JSON.parse(localStorage.getItem('pages'));
				console.log(pages);
				size=pages.page.length;
				for( i=0;i<size;i++)
				{
					console.log("Read Item");
					current=pages.page[i];
					if(i==0)
					{
						htmlToInsert+="<div class=\"bb-item front-cover\" style=\"display:block\" id=\"page"+(i+1)+"\"><div class=\"content\">";
					}
					else{htmlToInsert+="<div style=\"display:none\" class=\"bb-item\" id=\"page"+(i+1)+"\"><div class=\"content\">";
					}
					insertPage();
				}
				$("#bb-bookblock").html(htmlToInsert);
			});
		</script>
		<script>try{Typekit.load();}catch(e){}</script>
	</head>
	<body class="app full-book">
		<div id="mp-pusher" class="super-wrapper">
			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">
					<h2 class=""><a class="" href="/featured">Gapelia</a></h2>
					<ul>
						<li><a class="" href="/me">Me</a></li>
						<li><a class="demo-link">New Book</a></li>
					</ul>
					<div id="account-links">
						<a href="/accounts">Account</a>
						<a href="#">Sign Out</a>
					</div>
				</div>
			</nav>
			<!--//site-menu /-->
			<button id="g-menu-toggle"><a href="#">Gapelia Logo</a></button>
			<div id="header-toggle">&#9206;</div>
			<div id="next-book-toggle">&#9197;</div>
			<header>
				<div id="header-info">
					<span id="header-title">Your Preview Book</span>
					<span id="header-author">Author</span>
				</div>
				<ul class="share-book">
					<li class="facebook"><a href="#">Facebook</a></li>
					<li class="twitter"><a href="#">Twitter</a></li>
					<li class="email"><a href="#">eMail</a></li>
				</ul>
			</header>
			<div id="bb-nav-prev">&#59229;</div>
			<div id="bb-nav-next">&#59230;</div>
			<!--/ div id="the-book" /-->
			<div id="the-book" class="bb-custom-wrapper">
				<div id="bb-bookblock" class="bb-bookblock">
					<!--/ page-01 /-->
				</div>
			</div>

		</div>
		<!--/ dialog-windows /-->
		<div class="modal-book-creation" style="display: none">
			<div>
				<h1>They say two minds are better than one</h1>
				<div class="reveal">
					<p>Invite others to collaborate on your story:</p>
					<select id="user-search" class="movies" placeholder="Search for a user"></select>
					<p>Or, invite via <a href="">email</a></p>
					<p><a href="/create">SKIP</a></p>
				</div>
			</div>
		</div>
		<div class="stack"></div>
		<div style="-webkit-transform: translateZ(0)"></div>
		<!--//dialog-windows /-->
		<!--/ scripts /-->
		<script src="static/scripts/nprogress.js"></script>
		<script src="static/scripts/g.money.js"></script>
		<script src="static/scripts/classie.js"></script>
		<script src="static/scripts/mlpushmenu.js"></script>
		<script>
			new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));
		</script>
		<!--/ scripts/layout-scroller /-->
		<script src="static/scripts/jquery.mousewheel.js"></script>
		<script src="static/scripts/scrollpanel.js"></script>
		<script>
			$(".text-wrapper .page-desc").scrollpanel();
			$(".phototext-wrapper .page-desc").scrollpanel();
			$(".vertical-wrapper .page-desc").scrollpanel();
			$(".video-wrapper .page-desc").scrollpanel();
		</script>
		<script src="static/scripts/vimeothumb.js"></script>
		<script>$("img").VimeoThumb();</script>
		<!--/ scripts/page-flip /-->
		<script src="static/scripts/jquerypp.custom.js"></script>
		<script src="static/scripts/jquery.bookblock.js"></script>
		<script>
			$(document).ready(function() {

				// Load Gapelia
				NProgress.start();

				setTimeout(function() {
					var Page = (function () {

						var config = {
							$bookBlock: $('#bb-bookblock'),
							$navNext: $('#bb-nav-next'),
							$navPrev: $('#bb-nav-prev'),
							$navFirst: $('#bb-nav-first'),
							$navLast: $('#next-book-toggle')
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
							config.$navNext.on('click touchstart', function () {
								config.$bookBlock.bookblock('next');
								return false;
							});

							config.$navPrev.on('click touchstart', function () {
								config.$bookBlock.bookblock('prev');
								return false;
							});

							config.$navFirst.on('click touchstart', function () {
								config.$bookBlock.bookblock('first');
								return false;
							});

							config.$navLast.on('click touchstart', function () {
								config.$bookBlock.bookblock('last');
								return false;
							});

							// add swipe events
							$slides.on({
								'swipeleft': function (event) {
									config.$bookBlock.bookblock('next');
									return false;
								},

								'swiperight': function (event) {
									config.$bookBlock.bookblock('prev');
									return false;
								}
							});

							// add keyboard events
							$(document).keydown(function (e) {

								var
								keyCode = e.keyCode || e.which,
								arrow = {
									left: 37,
									up: 38,
									right: 39,
									down: 40
								};

								switch (keyCode) {
									case arrow.left:
										config.$bookBlock.bookblock('prev');
										break;

									case arrow.right:
										config.$bookBlock.bookblock('next');
										break;
								}

							});

						};

						return {
							init: init
						};

					})();

					Page.init();

					NProgress.done();

				});
			});
		</script>
	</body>
</html>
