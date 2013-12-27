
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Your Book Preview</title>

		<!--/
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
			  \/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

		<meta name="author" content="Gapelia"/>
		<meta name="description" content="This should be a synopsis about the book"/>
		<meta name="keywords" content="This should be the keywords the author chose, as well as the author's name/username/alias"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try{Typekit.load();}catch(e){}</script>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.0.3.min.js"></script>

		<!--/ <script src="static/scripts/preview.js"></script> /-->

		<script>

		</script>

	</head>

	<body class="app full-book">

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">
					<h2 class=""><a class="" href="/featured">Gapelia</a></h2>

					<ul>
						<li><a id="gpl-menu-me" href="/me">Me</a>
							<ul>
								<li><a href="/accounts">Edit Profile</a></li>
								<li><a href="#">Sign Out</a></li>
							</ul>
						</li>

						<li><a id="gpl-menu-create">Create</a>
							<ul>
								<li><a href="/create">New Book</a></li>
								<li><a href="/create">New Essay</a></li>
							</ul>
						</li>

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
				</div>
			</nav>
			<!--//site-menu /-->

			<button id="g-menu-toggle"><a href="#">Gapelia Logo</a></button>

			<!--/
			<div id="header-toggle">&#9206;</div>
			<div id="next-book-toggle">&#9197;</div>

			<header>
				<div id="header-info">
					<span id="header-title">*Book Title*</span>
					<span id="header-author">*Author*</span>
				</div>

				<ul class="share-book">
					<li class="facebook"><a href="#">Facebook</a></li>
					<li class="twitter"><a href="#">Twitter</a></li>
					<li class="email"><a href="#">eMail</a></li>
				</ul>
			</header>
			/-->

			<div id="bb-nav-prev">Previous Page</div>
			<div id="bb-nav-next">Next Page</div>

			<!--/ div id="the-book" /-->
			<div id="the-book" class="bb-custom-wrapper">
				<div id="bb-bookblock" class="bb-bookblock">

				</div>
			</div>

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/nprogress.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/books.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script>
			new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));
		</script>

		<script src="/static/scripts/jquery.mousewheel.js"></script>

		<script src="/static/scripts/vimeothumb.js"></script>
		<script>$("img").VimeoThumb();</script>

		<!--/ scripts/page-flip /-->
		<script src="/static/scripts/jquerypp.custom.js"></script>
		<script src="/static/scripts/jquery.bookblock.js"></script>

		<script>
			$(document).ready(function() {

				// Load Gapelia
				NProgress.start();

				setTimeout(function() {

					var htmlToInsert = "";
					var current;
					var $vW = $(window).width(), $vH = $(window).height();

					$(document).ready(function () {

						pages = JSON.parse(localStorage.getItem("pages"));
						console.log(pages);
						size = pages.page.length;

						for (i = 0; i < size; i++) {
							console.log("Read Item");
							current = pages.page[i];

							if (i == 0) {
								htmlToInsert += "<div class=\"bb-item front-cover\" style=\"display:block\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
							} else {
								htmlToInsert += "<div style=\"display:none\" class=\"bb-item\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
							}

							insertPage();
						}

						$("#bb-bookblock").html(htmlToInsert);

						$(".content").css({
							"width": $vW + "px",
							"height": $vH + "px"
						});

						$(".frontcover-wrapper").imgLiquid({ fill: true });
						// $(".photo-wrapper").imgLiquid({ fill: false });
						$(".horizontal-wrapper").imgLiquid({ fill: true });
						$(".overlay-wrapper").imgLiquid({ fill: true });
						$(".phototext-wrapper").imgLiquid({ fill: true });
						$(".vertical-wrapper .draggable-placeholder").imgLiquid({ fill: true });

					});

					function insertPage() {

						switch (current.templateId) {
							case 0:
								frontCoverLayout();
								break;

							case 1:
								photoLayout();
								break;

							case 2:
								textLayout();
								break;

							case 3:
								horizontalLayout();
								break;

							case 4:
								overlayLayout();
								break;

							case 5:
								photoTextLayout();
								break;

							case 6:
								verticalLayout();
								break;

							case 7:
								videoLayout();
								break;

							default:
								frontCoverLayout();
								break;
						}

					}

					function frontCoverLayout() {

						htmlToInsert += "<section class=\"frontcover-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"frontcover-preview\"><article class=\"cover-info\"><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.text + "</div><h5>*AUTHOR*</h5></article></div></section></div></div>";

					}

					function photoLayout() {

						// htmlToInsert += "<section class=\"photo-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"photo-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"photo-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"photo-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1></article></div></section></div></div>";

					}

					function textLayout() {

						// htmlToInsert += "<section class=\"text-wrapper\"><div class=\"text-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"text-wrapper\"><div class=\"text-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

					}

					function horizontalLayout() {

						// htmlToInsert += "<section class=\"horizontal-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"horizontal-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"horizontal-wrapper\"><div class=\"scroller-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"horizontal-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.text + "</div></article></div></div></section></div></div>";

					}

					function overlayLayout() {

						// htmlToInsert += "<section class=\"overlay-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"overlay-preview\"><article><div class=\"page-desc\">" + current.text + "</div><div class=\"page-geotag-elem\">" + current.geotag + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"overlay-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"overlay-preview\"><article><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

					}

					function photoTextLayout() {

						// htmlToInsert += "<section class=\"phototext-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"phototext-wrapper\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"phototext-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

					}

					function verticalLayout() {

						// htmlToInsert += "<section class=\"vertical-wrapper\"><div class=\"draggable-placeholder\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></div></section></div></div>";

						htmlToInsert += "<section class=\"vertical-wrapper\"><div class=\"draggable-placeholder\"><img class=\"page-bg\" src=\"" + current.image + "\"/><div class=\"vertical-preview\"><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.text + "</div></article></div></div></section></div></div>";

					}

					function videoLayout() {

						// htmlToInsert += "<section class=\"video-wrapper\"><div class=\"video-preview\"><span class=\"play-video\">Play</span><div class=\"video-player-container\"><iframe src=\"" + current.video + "\"></iframe></div><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-geotag-elem\">" + current.geotag + "</div><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

						htmlToInsert += "<section class=\"video-wrapper\"><div class=\"video-preview\"><span class=\"play-video\">Play</span><div class=\"video-player-container\"><iframe src=\"" + current.video + "\"></iframe></div><article><h1 class=\"page-title-elem\">" + current.title + "</h1><div class=\"page-desc\">" + current.text + "</div></article></div></section></div></div>";

					}

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
