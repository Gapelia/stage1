
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
		<meta name="description" content="Better stories, together."/>
		<meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.0.3.min.js"></script>

		<script src="/static/scripts/nprogress.js"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				html = "<ul id=\"book-list\">",
				sId=123456;
				$.ajax({
					url: "http://localhost:8080/api/libraries/getFeaturedBooks",
					contentType: "application/x-www-form-urlencoded;charset=utf-8",
					type: "POST",
					data: {
						sessionId: sId,
						dimension:"Art"
					},
					success: function (data) {
						featuredBooks=data;
						console.log("books" + data);
					},
					error: function (q, status, err) {
						if (status == "timeout") {
							alert("Request timed out");
						} else {
							alert("Some issue happened with your request: " + err);
						}
					}


					//$(".book-list-wrapper").html(parsedHtml);
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
				});
				$.ajax({
					url: "http://localhost:8080/api/libraries/getAllLibraries",
					contentType: "application/x-www-form-urlencoded;charset=utf-8",
					type: "POST",
					data: {
						sessionId: sId
					},
					success: function (data) {
						html="";
						libraries=data;
						parseJsonToStringForLibraries(libraries);

						console.log("libraries" + data);
					},
					error: function (q, status, err) {
						if (status == "timeout") {
							alert("Request timed out");
						} else {
							alert("Some issue happened with your request: " + err);
						}
					}
					//$(".library-list-wrapper").html(parsedHtml);
					$("#library-list").css("opacity", "0").show();

					$("#library-list").mCustomScrollbar({
						autoHideScrollbar: false,
						horizontalScroll: true,
						theme: "dark-thin",
						advanced: {
							autoExpandHorizontalScroll: true,
							updateOnContentResize: false
						}
					});
					NProgress.done();
					$("#library-list .library").css("height", $vH - 97 + "px");
					$("#library-list").css("opacity", "1");
				)};
				function parseJsonToStringForLibraries(libraries){
					html+="<ul id=\"library-list\">";
					$.each(libraries, function () {
						html+="<li class=\"library\"><div class=\"library-info\">
								<div class="title"><a href=\""+this["libraryHref"]+"\">"+this['title']+"</a></div><div class=\"lib-blurb\">"+this['blurb']+"</div></div>";
						html+="<div class=\"wrapper\"><button class=\"subscribe slate\">Subscribe</button></div><span class=\"image-overlay\"></span>
							<img src=\""+this['image']+"\" alt=\"\"/></li>";
					});
				}

				function parseJsonToStringForBooks(books) {
						$.each(books, function () {
							html += "<li class='book' bookid=\"" + this['bookId'] + "\">";
							html += "<div class=\"bookmark-this\"><span class=\"top-bm\"></span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div><div class='book-info'>";
							html += "<div class='title'><a href='#'>" + this['title'] + "</a></div>";
							html += "<div class='author-name'>Published by <a href='#'>" + this['createdByUserIds'] + "</a></div><div class=\"library-location\">Found in <a href=\"#\">" + this['libraryId'] + "</a></div></div>";
							html += "<span class=\"image-overlay\"></span>";
							html += "<img src=\"" + this.pages[0].photo.photoUrl + "\" alt=''/>";
							html += "</li>";
						});
						html += "</ul>";
						return html;
				}
			});
		</script>
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
					</ul>

					<div id="account-links">
						<a href="/accounts">Account</a>
						<a href="#">Sign Out</a>
					</div>

				</div>
			</nav>
			<!--//site-menu /-->

			<!--/ main-panel /-->
			<div id="featured-panel">
				<button id="g-menu-toggle"><a href="#">Gapelia Logo</a></button>

				<div class="featured-info">
					<h2>Gapelia</h2>
					<p>A better place for collaborative blogging. Explore our users' featured books and libraries.</p>
				</div>

				<img src="/static/images/covers/bg.jpg" alt=""/>
			</div>
			<!--//main-panel /-->

			<!--/ main-content /-->
			<div id="featured-scroller">
				<ul id="featured-nav">
					<li id="nav-books" class="current"><a href="#">Bookshelf</a></li>
					<li id="nav-libraries"><a href="#">Libraries</a></li>
				</ul>

				<!--/ Featured Books /-->
				<div class="book-list-wrapper">
					<ul id="book-list">

						<li class="book">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
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
					<ul id="library-list">

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/001/architecture">Architecture</a></div>
								<div class="lib-blurb">Architecture is both the process and product of planning, designing, and construction, usually of buildings and other physical structures.</div>
							</div>

							<div class="wrapper">
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/012/japanimation">Japanimation</a></div>
								<div class="lib-blurb">Anime are Japanese animated productions featuring hand-drawn or CGI. For simplicity, many view anime as an animation product from Japan.</div>
							</div>

							<div class="wrapper">
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
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
								<button class="subscribe slate">Subscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/015/modernism">Modernism</a></div>
								<div class="lib-blurb">Modernism encompasses the activities and output of those who felt the "traditional" forms of art were becoming outdated in the world. </div>
							</div>

							<div class="wrapper">
								<button class="subscribe slate">Subscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/016/mother-gaea">Mother Gaea</a></div>
								<div class="lib-blurb">Gaia was the great mother of all: the primal Greek Mother Goddess; creator and giver of birth to the Earth and all the Universe.</div>
							</div>

							<div class="wrapper">
								<button class="subscribe slate">Subscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/017/museum">Museum</a></div>
								<div class="lib-blurb">A museum is an institution that cares for artifacts and other objects of scientific, artistic, cultural, or historical importance.</div>
							</div>

							<div class="wrapper">
								<button class="subscribe slate">Subscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/018/on-the-road">On the Road</a></div>
								<div class="lib-blurb">Today, modern road tripping is a fast growing hobby, and not just a means of vacationing.</div>
							</div>

							<div class="wrapper">
								<button class="subscribe slate">Subscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/019/products-of-tomorrow">Products of Tomorrow</a></div>
								<div class="lib-blurb">Cyberpunk features advanced science, such as information technology and cybernetics, coupled with a degree of breakdown or radical change.</div>
							</div>

							<div class="wrapper">
								<button class="subscribe slate">Subscribe</button>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="library">
							<div class="library-info">
								<div class="title"><a href="/library/020/subculture">Subculture</a></div>
								<div class="lib-blurb">In sociology + cultural studies, a subculture is a group of people within a culture that differentiates themselves from the larger culture.</div>
							</div>

							<div class="wrapper">
								<button class="subscribe slate">Subscribe</button>
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
		<script src="/static/scripts/imgLiquid.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<script>
			new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

			$(".mp-pushed").ready(function() {
				$("#book-scroller").css("z-index", "0");
			});

			$(function() {
				$("#featured-panel, .book, .library").imgLiquid({ fill: true });
			});
		</script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/jquery.mCustomScrollbar.js"></script>

		<script>
			$(document).ready(function () {

				// Load Gapelia
				$("#featured-panel, #featured-scroller").css("opacity", "0").show();
				NProgress.start();

				setTimeout(function () {

					$("#book-list").css("opacity", "0").show();

					$("#book-list").mCustomScrollbar({
						autoHideScrollbar: false,
						horizontalScroll: true,
						theme: "dark-thin",
						advanced: {
							autoExpandHorizontalScroll: true,
							updateOnContentResize: false
						},
						callbacks: {
							onScroll: function() {
								$("#featured-panel").css("width", "7%");

								$("#featured-scroller").css({
									"transition": "all 0.1s ease",
									"-webkit-transition": "all 0.1s ease",
									"width": "93%"
								});

								$("#featured-panel p").css("display", "none");

								$("#featured-panel h2").css({
									"margin": "0",
									"padding": "0 0 4rem 0",
									"bottom": "2rem",
									"position": "fixed",
									"transform": "rotate(-90deg)",
									"-webkit-transform": "rotate(-90deg)"
								});

								$(this).mCustomScrollbar("update");
							},
							onTotalScrollBack: function() {
								$("#featured-panel").css("width", "25%");

								$("#featured-scroller").css({
									"transition": "all 0.1s ease",
									"-webkit-transition": "all 0.1s ease",
									"width": "75%"
								});

								$("#featured-panel p").css("display", "block");

								$("#featured-panel h2").css({
									"margin": "0 0 10px 0",
									"padding": "0",
									"bottom": "0",
									"position": "relative",
									"transform": "rotate(0deg)",
									"-webkit-transform": "rotate(0deg)"
								});

								$(this).mCustomScrollbar("update");
							},
							onTotalScrollBackOffset: 10
						}
					});

					NProgress.done();

					$("#book-list").css("opacity", "1");

					// "fix" featured menu pop-in
					setTimeout(function () {
						$("#featured-panel, #featured-scroller").css("opacity", "1");
					}, 400);

				});

				$("#nav-books").addClass("current");

				// Click "Books"
				$("#nav-books").click(function (e) {

					NProgress.start();

					setTimeout(function () {

						$("#book-list").show();
						$("#library-list").hide();

						$("#book-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: {
								autoExpandHorizontalScroll: true,
								updateOnContentResize: false
							}
						});

						$("#library-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").addClass("current");
					$("#nav-libraries").removeClass("current");
					e.preventDefault();

				});

				// Click "Libraries"
				$("#nav-libraries").click(function (e) {

					NProgress.start();

					$("#book-list").hide();
					$("#library-list").show();

					setTimeout(function () {

						$("#library-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: {
								autoExpandHorizontalScroll: true,
								updateOnContentResize: false
							}
						});

						$("#book-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-libraries").addClass("current");
					e.preventDefault();

				});

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
