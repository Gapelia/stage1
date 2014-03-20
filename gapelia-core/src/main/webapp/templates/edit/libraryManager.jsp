
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Library Manager</title>

		<!--/ LIBRARY MANAGER VIEW
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

		<script src="/static/scripts/selectize.js"></script>
		<script src="/static/scripts/nprogress.js"></script>

	</head>

	<body class="app library"><!--/ library-manager /-->

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">

					<h2><a href="/featured">Gapelia</a></h2>

					<ul>
						<li><a href="/me">Me</a><a class="icon" href="/accounts">&#xf13d;</a></li>
						<li><a href="/createbook">Create book</a></li>
						<li><a href="/librarymanager" id="create-library">Library Manager</a></li>

						<li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a><a class="icon" href="#">&#xf104;</a>
							<ul>
								<li><a href="#">hikari: The Future of the Operating System</a></li>
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
						<li id="nav-libraries" class="current"><a href="#">My Libraries</a></li>
						<li id="nav-subscriptions"><a href="#">My Subscriptions</a></li>
					</ul>
				</div>

				<!--/ Personal Library List /-->
				<div class="library-list-wrapper">
					<ul id="library-list">

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/016/mother-gaea">Mother Gaea</a></div>
								<div class="lib-blurb">Gaia was the great mother of all: the primal Greek Mother Goddess; creator and giver of birth to the Earth and all the Universe.</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/017/museum">Museum</a></div>
								<div class="lib-blurb">A museum is an institution that cares for artifacts and other objects of scientific, artistic, cultural, or historical importance.</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/018/on-the-road">On the Road</a></div>
								<div class="lib-blurb">Today, modern road tripping is a fast growing hobby, and not just a means of vacationing.</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/019/products-of-tomorrow">Products of Tomorrow</a></div>
								<div class="lib-blurb">Cyberpunk features advanced science, such as information technology and cybernetics, coupled with a degree of breakdown or radical change.</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/020/subculture">Subculture</a></div>
								<div class="lib-blurb">In sociology + cultural studies, a subculture is a group of people within a culture that differentiates themselves from the larger culture.</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

					</ul>
				</div>
				<!--//Personal Library List /-->

				<!--/ Subscription List /-->
				<div class="subscription-list-wrapper">
					<ul id="subscription-list">

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/001/architecture">Architecture</a></div>
								<div class="lib-blurb">Architecture is both the process and product of planning, designing, and construction, usually of buildings and other physical structures.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/architecture-sonn-visionsofart.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/002/biography">Biography</a></div>
								<div class="lib-blurb">A biography or simply bio is a detailed description or account of a person's life. It entails more than basic facts.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/biography-dieterrams.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/003/cinema">Cinema</a></div>
								<div class="lib-blurb">Filmmaking takes place in many places around the world in a range of contexts, and using a variety of technologies and cinematic techniques.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/cinema-matrix.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/004/cuisine">Cuisine</a></div>
								<div class="lib-blurb">Cuisine is a characteristic style of cooking practices and traditions, often associated with a specific culture.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/cuisine-traceysculinaryadventures.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/005/era">Era</a></div>
								<div class="lib-blurb">An era is a period of time marked by distinctive character, events, &amp;c.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/covers/era-akasped.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/006/the-far-east">The Far East</a></div>
								<div class="lib-blurb">The term evokes cultural as well as geographic separation; the Far East is not just geographically distant, but also culturally exotic.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-11.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/007/fashionista">Fashionista</a></div>
								<div class="lib-blurb">A person who creates or promotes high fashion, i.e. a fashion designer or fashion editor, + who dresses according to the trends of fashion.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-12.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/008/future">Future</a></div>
								<div class="lib-blurb">The future is the indefinite time period after the present. Its arrival is considered inevitable due to the existence of time + the physics.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/009/gapelians">Gapelians</a></div>
								<div class="lib-blurb">A biography or simply bio is a detailed description or account of a person's life. It entails more than basic facts.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/010/historian">Historian</a></div>
								<div class="lib-blurb">Historians are concerned with the continuous, methodical narrative and research of past events as relating to the human race.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb.JPG" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/011/into-the-wild">Into the Wild</a></div>
								<div class="lib-blurb">The Age of Discovery (a/k/a the Age of Exploration) was a period starting in the early 15th century and continuing to the 17th century.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/012/japanimation">Japanimation</a></div>
								<div class="lib-blurb">Anime are Japanese animated productions featuring hand-drawn art or CGI. For simplicity, many view anime as an animation product from Japan.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/013/land-of-kawaii">Land of Kawaii</a></div>
								<div class="lib-blurb">Kawaii is the quality of cuteness in the context of Japanese culture.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/014/manifesto">Manifesto</a></div>
								<div class="lib-blurb">A manifesto is a published verbal declaration of the intentions, motives, or views of the issuer, be it an individual, group, or government.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/015/modernism">Modernism</a></div>
								<div class="lib-blurb">Modernism encompasses the activities and output of those who felt the "traditional" forms of art were becoming outdated in the world.</div>
							</div>

							<div class="wrapper">
								<button class="unsubscribe red">Unsubscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

					</ul>
				</div>
				<!--//Subscription List /-->

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

				/*
				// Splash page
				stuff = "";
				stuff += "<section id=\"library-splash\">";
				// stuff += "<button class=\"subscribe transparent-ii\">Subscribe</button>";
				stuff += "<div id=\"library-info\">";
				stuff += "<button class=\"subscribe transparent-ii\">Subscribe</button>";
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
				*/

				/*
				// Click "Add my stories"
				$("#my-submissions a").click(function (e) {

					$("#my-submissions ul").toggle();
					e.preventDefault();

				});
				*/

				// Controlled scrolling speed
				$("#featured-scroller").mousewheel(function (event, delta) {

					this.scrollLeft -= (delta * 40);
					event.preventDefault();

				});

				// Load Gapelia
				NProgress.start();

				$("#featured-panel, #featured-scroller").css("opacity", "0").show();

				var
				allBooks = $("#library-list li"),			// gets all books in a section
				firstBook = $(allBooks).first();		// gets first book in list

				$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

				setTimeout(function () {

					$("#library-list").hide();
					$("#subscription-list").hide();

					var w = 0;

					$("#library-list li").each(function () {
						w += $(this).outerWidth();
					});

					w += 500;

					$("#library-list").css("width", w - 320 + "px");

					// fades in the all the books after section width is added
					$("#library-list li").fadeIn("100");
					$("#library-list").fadeIn("100");

					// "fix" featured menu pop-in
					setTimeout(function () {
						$("#featured-panel, #featured-scroller").css("opacity", "1");
					}, 400);

				}, 1000);

				$("#nav-libraries").addClass("current");

				NProgress.done();

				// Click "My Libraries"
				$("#nav-libraries").click(function (e) {

					NProgress.start();

					var
					allBooks = $("#library-list li"),		// gets all books in a section
					firstBook = $(allBooks).first();		// gets first book in list

					$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

					setTimeout(function () {

						$("#subscription-list").hide();

						var w = 0, h = 0;

						$("#library-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#library-list").css("width", w - 320 + "px");
						} else {
							// $("#library-list").css("height", h + 219 + "px");
						}

						// fades in the all the books after section width is added
						$("#library-list li").fadeIn("100");
						$("#library-list").fadeIn("100");

					}, 1000);

					e.preventDefault();

					$("#nav-libraries").addClass("current");
					$("#nav-subscriptions").removeClass("current");

					NProgress.done();

				});

				// Click "My Subscriptions"
				$("#nav-subscriptions").click(function (e) {

					NProgress.start();

					var
					allBooks = $("#subscription-list li"),		// gets all books in a section
					firstBook = $(allBooks).first();		// gets first book in list

					$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

					setTimeout(function () {

						$("#library-list").hide();

						var w = 0, h = 0;

						$("#subscription-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#subscription-list").css("width", w - 155 + "px");
						} else {
							// $("#submission-list").css("height", h + 379 + "px");
						}

						// fades in the all the books after section width is added
						$("#subscription-list li").fadeIn("100");
						$("#subscription-list").fadeIn("100");

					}, 1000);

					e.preventDefault();

					$("#nav-libraries").removeClass("current");
					$("#nav-subscriptions").addClass("current");

					NProgress.done();

				});

				/*
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
				*/

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
