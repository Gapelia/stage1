
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
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try { Typekit.load(); } catch(e) {}</script>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.0.3.min.js"></script>

	</head>

	<body class="app full-book g-body">

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
				</div>
			</nav>
			<!--//site-menu /-->

			<button id="g-menu-toggle">
				<i class="ion-drag"></i>
			</button>

			<div id="bb-nav-prev"><i class="ion-ios7-arrow-left"></i></div>
			<div id="bb-nav-next"><i class="ion-ios7-arrow-right"></i></div>

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
		<script src="/static/scripts/bookblock.js"></script>

		<script>
			$(document).ready(function() {

				// Load Gapelia
				NProgress.start();

				setTimeout(function() {

					var htmlToInsert = "";
					var current;
					var $vW = $(window).width(), $vH = $(window).height();

					$(document).ready(function() {

						pages = JSON.parse(localStorage.getItem("pages"));
						console.log(pages);
						size = pages.page.length;

						for (i = 0; i < size; i++) {
							console.log("Read Item");
							current = pages.page[i];

							if (i == 0) {
								htmlToInsert += "<div class=\"bb-item front-cover\" style=\"display: block\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
							} else {
								htmlToInsert += "<div style=\"display: none\" class=\"bb-item\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
							}

							insertPage();
						}

						$("#bb-bookblock").html(htmlToInsert);

						$(".content").css({
							"width": $vW + "px",
							"height": $vH + "px"
						});

						$(".fluid-wrapper").imgLiquid({ fill: true });
						$(".overlay-wrapper").imgLiquid({ fill: true });
						$(".phototext-wrapper").imgLiquid({ fill: true });
						$(".vertical-wrapper .draggable-placeholder").imgLiquid({ fill: true });

					});

					function insertPage() {

						switch (current.templateId) {
							case 0:
								fluidLayout();
								break;

							case 1:
								photoLayout();
								break;

							case 2:
								overlayLayout();
								break;

							case 3:
								photoTextLayout();
								break;

							case 4:
								verticalLayout();
								break;

							case 5:
								videoLayout();
								break;

							default:
								fluidLayout();
								break;
						}

					}

					function fluidLayout() {

						htmlToInsert += "<section class=\"fluid-wrapper\">";
						htmlToInsert += "<section class=\"draggable-placeholder\">";
						htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/>";
						htmlToInsert += "<span class=\"image-attribution\">*Photo Credit*</span>";
						htmlToInsert += "</section>";
						htmlToInsert += "<div class=\"fluid-preview\">";
						htmlToInsert += "<div id=\"author-info\">";
						htmlToInsert += "<div id=\"author-name\">Paul Anthony Webb</div>";
						htmlToInsert += "<img id=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
						htmlToInsert += "</div>";
						htmlToInsert += "<article>";
						htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";
						htmlToInsert += "<div class=\"page-desc\">" + current.text + "</div>";
						htmlToInsert += "</article></div>";
						htmlToInsert += "</section>";
						htmlToInsert += "</div></div>";

					}

					function photoLayout() {

						htmlToInsert += "<section class=\"photo-wrapper\">";
						htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/>";
						htmlToInsert += "<div class=\"photo-preview\">";
						htmlToInsert += "<article>";
						htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";
						htmlToInsert += "<span class=\"image-attribution\">*Photo Credit*</span>";
						htmlToInsert += "</article>";
						htmlToInsert += "</div>";
						htmlToInsert += "</section>";
						htmlToInsert += "</div></div>";

					}

					function overlayLayout() {

						htmlToInsert += "<section class=\"overlay-wrapper\">";
						htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/>";
						htmlToInsert += "<div class=\"overlay-preview\">";
						htmlToInsert += "<article>";
						htmlToInsert += "<div class=\"page-desc\">" + current.text + "</div>";
						htmlToInsert += "<div id=\"author-info\">";
						htmlToInsert += "<div id=\"author-name\">Paul Anthony Webb</div>";
						htmlToInsert += "<img id=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
						htmlToInsert += "</div>";
						htmlToInsert += "</article></div>";
						htmlToInsert += "<span class=\"image-attribution\">*Photo Credit*</span>";
						htmlToInsert += "</section>";
						htmlToInsert += "</div></div>";

					}

					function photoTextLayout() {

						htmlToInsert += "<section class=\"phototext-wrapper\">";
						htmlToInsert += "<span class=\"image-attribution\">*Photo Credit*</span>";
						htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/>";
						htmlToInsert += "<div class=\"phototext-preview\">";
						htmlToInsert += "<article>";
						htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";
						htmlToInsert += "<div id=\"author-info\">";
						htmlToInsert += "<img id=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
						htmlToInsert += "<div id=\"author-name\">Paul Anthony Webb</div>";
						htmlToInsert += "</div>";
						htmlToInsert += "<div class=\"page-desc\">" + current.text + "</div>";
						htmlToInsert += "</article>";
						htmlToInsert += "</div></section>";
						htmlToInsert += "</div></div>";

					}

					function verticalLayout() {

						htmlToInsert += "<section class=\"vertical-wrapper\">";
						htmlToInsert += "<span class=\"image-attribution\">*Photo Credit*</span>";
						htmlToInsert += "<div class=\"draggable-placeholder\">";
						htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/>";
						htmlToInsert += "<div class=\"vertical-preview\">";
						htmlToInsert += "<article>";
						htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";
						htmlToInsert += "<div id=\"author-info\">";
						htmlToInsert += "<img id=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
						htmlToInsert += "<div id=\"author-name\">Paul Anthony Webb</div>";
						htmlToInsert += "</div>";
						htmlToInsert += "<div class=\"page-desc\">" + current.text + "</div>";
						htmlToInsert += "</article></div>";
						htmlToInsert += "</div></section>";
						htmlToInsert += "</div></div>";

					}

					function videoLayout() {

						htmlToInsert += "<section class=\"video-wrapper\">";
						htmlToInsert += "<span class=\"image-attribution\">*Video Credit*</span>";
						htmlToInsert += "<div class=\"video-preview\">";
						htmlToInsert += "<div class=\"button-wrapper\"><button class=\"play-video\">Play</button></div>";
						htmlToInsert += "<div class=\"video-player-container\">";
						htmlToInsert += "<iframe src=\"" + current.video + "\"></iframe>";
						htmlToInsert += "</div>";
						htmlToInsert += "<article>";
						htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";
						htmlToInsert += "<div id=\"author-info\">";
						htmlToInsert += "<img id=\"author-avatar\" src=\"/static/images/users/11.jpg\"/>";
						htmlToInsert += "<div id=\"author-name\">Paul Anthony Webb</div>";
						htmlToInsert += "</div>";
						htmlToInsert += "<div class=\"page-desc\">" + current.text + "</div>";
						htmlToInsert += "</article>";
						htmlToInsert += "</div></section>";
						htmlToInsert += "</div></div>";

					}

					var Page = (function() {

						var config = {
							$bookBlock: $("#bb-bookblock"),
							$navNext: $("#bb-nav-next"),
							$navPrev: $("#bb-nav-prev"),
							$navFirst: $("#bb-nav-first")
						},

						init = function() {

							config.$bookBlock.bookblock({
								speed: 1000,
								shadowSides: 0.8,
								shadowFlip: 0.4
							});

							initEvents();

						},

						initEvents = function() {

							var $slides = config.$bookBlock.children();

							// add navigation events
							config.$navNext.on("click touchstart", function() {
								config.$bookBlock.bookblock("next");
								return false;
							});

							config.$navPrev.on("click touchstart", function() {
								config.$bookBlock.bookblock("prev");
								return false;
							});

							config.$navFirst.on("click touchstart", function() {
								config.$bookBlock.bookblock("first");
								return false;
							});

							// add swipe events
							$slides.on({
								"swipeleft": function (event) {
									config.$bookBlock.bookblock("next");
									return false;
								},

								"swiperight": function (event) {
									config.$bookBlock.bookblock("prev");
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
										config.$bookBlock.bookblock("prev");
										break;

									case arrow.right:
										config.$bookBlock.bookblock("next");
										break;
								}

							});

						};

						return { init: init };

					})();

					Page.init();
					NProgress.done();

				});

			});
		</script>

	</body>

</html>
