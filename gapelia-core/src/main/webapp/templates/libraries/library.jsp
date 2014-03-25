
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; [Library Name] Library</title>

		<!--/ LIBRARY VIEW
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

	<body class="app library">

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
								<li><a href="#">hikari: The Future of the Operating System</a></li><input type="checkbox" class="js-switch" checked/>
								<li><a href="#">007: The Diego Regules Story</a></li>
								<li><a href="#">From the Rennaisance, to the Future of Blogging</a></li>
							</ul>
						</li>

						<li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#">&#xf104;</a>
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
				<button id="g-menu-toggle">
					<i class="ion-drag"></i>
				</button>
			</div>
			<!--//main-panel /-->

			<!--/ main-content /-->
			<div id="featured-scroller">
				<div id="nav-wrapper">
					<ul id="featured-nav">
						<li id="nav-books" class="current"><a href="#">Library Name</a></li>
						<li id="nav-submissions"><a href="#">Submissions</a></li>

						<ul id="stay-right">
							<li id="my-submissions">
								<a href="#">Add my stories</a>

								<ul>
									<li><a href="/">hikari: The Future of the Operating System</a></li>
									<li><a href="/">007: The Diego Regules Story</a></li>
									<li><a href="/">From the Rennaisance, to the Future of Blogging</a></li>
								</ul>
							</li>
						</ul>
					</ul>
				</div>

				<!--/ Featured Books /-->
				<div class="book-list-wrapper">
					<!--/
					<section>
						<p>No stories have been added to your library yet.<br/><br/>You can add your own stories, collect stories from others, and manage submissions once people start submitting their books to your library.</p>
					</section>
					/-->

					<ul id="book-list">

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Bauhaus</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Paul Anthony Webb</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/library-bauhaus.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="/book/001/hayao-miyazaki">Hayao Miyazaki</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Nokadota Xialiu</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/library-hayao-miyazaki.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Stadiums I've Performed In</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">the Wibby</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/library-performance.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Integalactic Fortress</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/library-integalactic-fortress.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-title"><a href="#">Techno-Bunka</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">The Most Fantabulous</a></div>
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

							<div class="book-title"><a href="#">Pleasantville</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Doug Funnie</a></div>
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

							<div class="book-title"><a href="#">ACDC Town</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Lan Hikari</a></div>
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

							<div class="book-title"><a href="#">Internet City</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Hub Hikari</a></div>
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

							<div class="book-title"><a href="#">Insane Aslyums</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Daria Morgendorffer</a></div>
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

							<div class="book-title"><a href="#">Museums of the Mind</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Jane Lane</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-10.jpg" alt=""/>
						</li>

					</ul>
				</div>
				<!--//Featured Books /-->


				<!--/ Submission List /-->
				<div class="submission-list-wrapper">
					<ul id="submission-list">

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #01</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Jane Lane</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/architecture-sonn-visionsofart.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #02</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Daria Morgendorffer</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/biography-dieterrams.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #03</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Hub Hikari</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/cinema-matrix.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #04</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Lan Hikari</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/cuisine-traceysculinaryadventures.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #05</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Doug Funnie</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/era-akasped.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #06</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">The Most Fantabulous</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-11.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #07</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-12.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #08</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">the Wibby</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #09</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Nokadota Xialiu</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="approve-this-book">&#xf120;</a>
								<a href="#" class="deny-this-book">&#xf128;</a>
							</div>

							<div class="book-title"><a href="#">Submitted Book #10</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Paul Anthony Webb</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb.JPG" alt=""/>
						</li>

					</ul>
				</div>
				<!--//Submission List /-->

			</div>
			<!--//main-content /-->

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/touchSwipe.min.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

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
				$(".book").imgLiquid({ fill: true });

				if ($vW > "300") {
					$(".book-info").prepend('<img class="author-avatar" src="/static/images/users/01.jpg"/>');
				}
			});
		</script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/mousewheel.js"></script>

		<script>
			$(function () {

				var $vW = $(window).width(), $vH = $(window).height();

				// Splash page
				stuff = "";
				stuff += "<section id=\"library-splash\">";
				// stuff += "<button class=\"subscribe transparent-ii\">Subscribe</button>";
				stuff += "<div id=\"library-info\">";
				stuff += "<button class=\"subscribe white\">Subscribe</button>";
				stuff += "<h1>Editor's Name &middot; 8,349 subscribers</h1>";
				stuff += "<h2>Library Name</h2>";
				stuff += "<p>This is a library description. It tells you what the library is about, so you know what to look for and stuff.</p>";
				stuff += "<section>";
				stuff += "<a id=\"featured-library\" href=\"#\">hikari: The Future of the Operating System</a>";
				stuff += "</section>";
				stuff += "</div>";
				stuff += "<div id=\"close-splash\"><i class=\"ion-ios7-arrow-right\"></i></div>";
				stuff += "<img class=\"page-bg\" src=\"/static/images/libraries/wheat-field-by-phk-dan-10.jpg\"/>";
				stuff += "</section>";

				$("#mp-pusher").prepend(stuff);

				$("#library-splash").imgLiquid({ fill: true });
				$("#g-menu-toggle").css("color", "#fcfcfc");

				if ($vW > "1024") {

					// Close splash on desktops
					$(document).on("click", "#close-splash", function () {

						$("#close-splash").css({
							"left": "-200%",
							"right": "initial"
						});

						$("#library-splash").css("left", "-200%");
						$("#g-menu-toggle").css("color", "#70a1b1");

					});

				} else {

					$(function () {

						// Close splash on mobile
						$("#library-splash").swipe({
							// Generic swipe handler for all directions
							swipeUp: function (event, direction, distance, duration, fingerCount) {

								$("#close-splash").css({
									"height": "0",
									"top": "-200%"
								});

								$("#library-splash").css("top", "-200%");
								$("#g-menu-toggle").css("color", "#70a1b1");

							}, threshold: 0
						});

						$(document).on("click", "#close-splash", function () {

							$("#close-splash").css({
								"height": "0",
								"top": "-200%"
							});

							$("#library-splash, #library-splash button").css("top", "-200%");
							$("#g-menu-toggle").css("color", "#70a1b1");

						});

					});

				}

				// Click "Add my stories"
				$("#my-submissions a").click(function (e) {

					$("#my-submissions ul").toggle();
					e.preventDefault();

				});

				// Controlled scrolling speed
				$("#featured-scroller").mousewheel(function (event, delta) {

					this.scrollLeft -= (delta * 40);
					event.preventDefault();

				});

				// Load Gapelia
				NProgress.start();

				$("#featured-panel, #featured-scroller").css("opacity", "0").show();

				var
				allBooks = $("#book-list li"),			// gets all books in a section
				firstBook = $(allBooks).first();		// gets first book in list

				$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

				setTimeout(function () {

					$("#book-list").hide();
					$("#submission-list").hide();

					var w = 0;

					$("#book-list li").each(function () {
						w += $(this).outerWidth();
					});

					w += 500;

					$("#book-list").css("width", w - 320 + "px");

					// fades in the all the books after section width is added
					$("#book-list li").fadeIn("100");
					$("#book-list").fadeIn("100");

					// "fix" featured menu pop-in
					setTimeout(function () {
						$("#featured-panel, #featured-scroller").css("opacity", "1");
					}, 400);

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

						$("#submission-list").hide();

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
					$("#nav-submissions").removeClass("current");

					NProgress.done();

				});

				// Click "Submissions"
				$("#nav-submissions").click(function (e) {

					NProgress.start();

					var
					allBooks = $("#submission-list li"),	// gets all books in a section
					firstBook = $(allBooks).first();			// gets first book in list

					$(allBooks).not(firstBook).hide();		// hides all books in a section, except the first book

					setTimeout(function () {

						$("#book-list").hide();
						$(".book-list-wrapper section").hide(); // need to create conditional, later

						var w = 0, h = 0;

						$("#submission-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#submission-list").css("width", w - 155 + "px");
						} else {
							// $("#submission-list").css("height", h + 379 + "px");
						}

						// fades in the all the books after section width is added
						$("#submission-list li").fadeIn("100");
						$("#submission-list").fadeIn("100");

					}, 1000);

					e.preventDefault();

					$("#nav-books").removeClass("current");
					$("#nav-submissions").addClass("current");

					NProgress.done();

				});

				// Dropdown menu for mobile
				if ($vW < "1025") {

					$("#featured-panel .featured-info").remove();
					$("#featured-panel").append("<span id='category-title'>[ Library Name ]</span>");

					$("#featured-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-profile"><a href="/me">My Profile</a></li></ul>');

					// $(document).on("click", "#category-switcher, #nav-books, #nav-libraries, #nav-bookmarks", function () {
					$(document).on("click", "#g-menu-toggle", function () {
						$("#featured-nav").toggle();
					});

				}

				if ($vW < "321") {

					$(".book").append('<div class="book-snippet"><p>A snippet of this book should be here, and the length shall not exceed one hundred and forty characters. This is an example of that length!!</p></div>');

				}

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
