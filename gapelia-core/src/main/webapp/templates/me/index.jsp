
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Your Library | Gapelia</title>

		<!--/ ME VIEW
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
		<link href="/static/css/selectize.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<!--* if lt IE 9 *>
			<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<!* endif *-->

		<script src="/static/scripts/jquery-2.0.3.min.js"></script>
		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/nprogress.js"></script>
		<script src="/static/scripts/selectize.js"></script>

		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try{Typekit.load();}catch(e){}</script>

	</head>

	<body class="app profile">
	
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
			<div id="user-panel">
				<button id="g-menu-toggle"><a href="#">Gapelia Logo</a></button>

				<div class="user-avatar">
					<img src="/static/images/users/11.jpg"/>
				</div>

				<div class="user-data">
					<h2>Paul Anthony Webb</h2>

					<span>Space Bandit / ♈ / Protogenoi / Eccentric Dreamer / Pluviophile / Futurist / Musician / Casual Enthusiast</span>

					<div class="wrapper">
						<button>Edit Profile</button>
					</div>
				</div>

				<div class="user-bg">
					<img src="/static/images/space-bb.jpg"/>
				</div>
			</div>
			<!--//main-panel /-->

			<!--/ main-scroller /-->
			<div id="book-scroller">
				<ul id="book-nav">
					<li id="nav-books" class="current"><a href="#">Bookshelf</a></li>
					<li id="nav-collections"><a href="#">Scrapbook</a></li>
					<li id="nav-libraries"><a href="#">Library</a></li>
					<li id="nav-drafts"><a href="#">Drafts</a></li>

					<li id="nav-bookmarks-toggle">
						<span class="top-bm"></span>
						<span class="bottom-bm"></span>
						<span class="right-bm"></span>
						<!--/ <a href="#">&#128278;</a> /-->
					</li>
				</ul>

				<!--/ your-books /-->
				<div class="user-book-list-wrapper">
					<ul id="user-book-list">

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-03.jpg" alt=""/>
						</li>

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-04.jpg" alt=""/>
						</li>

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-05.jpg" alt=""/>
						</li>

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-06.jpg" alt=""/>
						</li>

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-07.jpg" alt=""/>
						</li>

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-08.jpg" alt=""/>
						</li>

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-09.jpg" alt=""/>
						</li>

						<li class="book">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="book-info">
								<div class="title"><a href="#">Japanimation</a></div>
								<div class="library-location">Found in <a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-10.jpg" alt=""/>
						</li>

						<li class="new">
							<a class="new-inner-wrapper" href="{% url 'create' %}">
								<span class="entypo">&#10133;</span>
								<div>Create a new book</div>
							</a>

							<span class="image-overlay"></span>
						</li>

					</ul>
				</div>
				<!--//your-books /-->

				<!--/ your-scrapbook /-->
				<div class="user-collection-list-wrapper">
					<ul id="user-collection-list">

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-11.jpg" alt=""/>
						</li>

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-12.jpg" alt=""/>
						</li>

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb.JPG" alt=""/>
						</li>

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-03.jpg" alt=""/>
						</li>

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-04.jpg" alt=""/>
						</li>

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-05.jpg" alt=""/>
						</li>

						<li class="collection">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="collection-pages"><span>10</span> pages</div>
								<div class="collection-contributors"><span>3</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-06.jpg" alt=""/>
						</li>

						<li class="new">
							<div class="book-info">Doesn't make sense to have this here.</div>
							<span class="image-overlay"></span>
						</li>

					</ul>
				</div>
				<!--//your-scrapbook /-->

				<!--/ your-library /-->
				<div class="user-library-list-wrapper">
					<ul id="user-library-list">

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-07.jpg" alt=""/>
						</li>

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-08.jpg" alt=""/>
						</li>

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-09.jpg" alt=""/>
						</li>

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-10.jpg" alt=""/>
						</li>

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-11.jpg" alt=""/>
						</li>

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-12.jpg" alt=""/>
						</li>

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb.JPG" alt=""/>
						</li>

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="library">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="library-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="library-books"><span>25</span> books</div>
								<div class="library-contributors"><span>14</span> contributors</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="new">
							<div class="book-info">Doesn't make sense to have this here.</div>
							<span class="image-overlay"></span>
						</li>

					</ul>
				</div>
				<!--//your-library /-->

				<!--/ your-drafts /-->
				<div class="user-draft-list-wrapper">
					<ul id="user-draft-list">

						<li class="draft">
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>

							<div class="draft-info">
								<div class="title"><a href="#">Mother Gaea</a></div>
								<div class="draft-pages"><span>7</span> pages</div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-07.jpg" alt=""/>
						</li>

					</ul>
				</div>
				<!--//your-drafts /-->
			</div>
			<!--//main-scroller /-->

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
		<script src="/static/scripts/g.money.js"></script>
		<!--/ <script src="/static/scripts/greyscale.js"></script> /-->

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

					$("#user-book-list").css("opacity", "0").show();

					$("#user-book-list").mCustomScrollbar({
						autoHideScrollbar: false,
						horizontalScroll: true,
						theme: "dark-thin",
						advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
					});

					NProgress.done();

					$("#user-book-list").css("opacity", "1");

				});

				$("#nav-books").addClass("current");

				// Click "Books"
				$("#nav-books").click(function (e) {

					NProgress.start();

					setTimeout(function() {

						$("#user-book-list").show();
						$("#user-collection-list").hide();
						$("#user-library-list").hide();
						$("#user-draft-list").hide();

						$("#user-book-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-collection-list").mCustomScrollbar("destroy");
						$("#user-library-list").mCustomScrollbar("destroy");
						$("#user-draft-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").addClass("current");
					$("#nav-collections").removeClass("current");
					$("#nav-libraries").removeClass("current");
					$("#nav-drafts").removeClass("current");
					e.preventDefault();

				});

				// Click "Collections"
				$("#nav-collections").click(function (e) {

					NProgress.start();

					$("#user-book-list").hide();
					$("#user-collection-list").show();
					$("#user-library-list").hide();
					$("#user-draft-list").hide();

					setTimeout(function() {

						$("#user-collection-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-book-list").mCustomScrollbar("destroy");
						$("#user-library-list").mCustomScrollbar("destroy");
						$("#user-draft-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-collections").addClass("current");
					$("#nav-libraries").removeClass("current");
					$("#nav-drafts").removeClass("current");
					e.preventDefault();

				});

				// Click "Libraries"
				$("#nav-libraries").click(function (e) {

					NProgress.start();

					$("#user-book-list").hide();
					$("#user-collection-list").hide();
					$("#user-library-list").show();
					$("#user-draft-list").hide();

					setTimeout(function() {

						$("#user-library-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-book-list").mCustomScrollbar("destroy");
						$("#user-collection-list").mCustomScrollbar("destroy");
						$("#user-draft-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-collections").removeClass("current");
					$("#nav-libraries").addClass("current");
					$("#nav-drafts").removeClass("current");
					e.preventDefault();

				});

				// Click "Drafts"
				$("#nav-drafts").click(function (e) {

					NProgress.start();

					$("#user-book-list").hide();
					$("#user-collection-list").hide();
					$("#user-library-list").hide();
					$("#user-draft-list").show();

					setTimeout(function() {

						$("#user-draft-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-book-list").mCustomScrollbar("destroy");
						$("#user-collection-list").mCustomScrollbar("destroy");
						$("#user-library-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-collections").removeClass("current");
					$("#nav-libraries").removeClass("current");
					$("#nav-drafts").addClass("current");
					e.preventDefault();

				});

			});
		</script>

		<!--/ scripts/dialog /-->
		<script src="/static/scripts/vex.js"></script>
		<script src="/static/scripts/vex.dialog.js"></script>
		
		<script>
			var demo = {};
			demo.className = "vex-theme-wireframe";

			vex.defaultOptions.className = "vex-theme-wireframe";
			vex.dialog.defaultOptions.showCloseButton = true;

			demo.loadInitialDialogs = function () {

				$("body").addClass("page-intro");

				demo.initialDialogsClassName = "vex-theme-wireframe";

				for (var i = 0; i > -1; i--) {
					vex.dialog.alert({
						appendLocation: ".stack",
						message: $(".modal-book-creation > div:nth-child(" + (i + 1) + ")").html(),
						className: demo.initialDialogsClassName,
						buttons: [
							$.extend({}, vex.dialog.buttons.YES, {
								text: "Skip"
							})
						],
						callback: function (value) {
							setTimeout(function () {
								demo.advanceDemoDialogs();
							}, 0);
						}
					});
				}

				demo.advanceDemoDialogs();

			};

			demo.advanceDemoDialogs = function () {

				var $remaining = $('.stack > .vex:not(".vex-closing")');
				var $vW = $(window).width(), $vH = $(window).height();

				$(".stack").show();

				$(".stack").css({
					"width": $vW + "px",
					"height": $vH + "px"
				});

				$("#g-menu-toggle").css("opacity", "0.3");

				$.each($remaining.removeClass("v0").toArray().reverse(), function (i, item) {
					$(item).addClass("v" + i);
				});

				$('.stack > .v0:not(".vex-closing") input[type="submit"]').focus();

				if ($remaining.length === 0) {
					$("body").removeClass("page-intro");

					setTimeout(function () {
						$(".stack").hide();
					}, 600);
				}

			};

			$(".demo-link").click(function () {
				demo.loadInitialDialogs();
			});
		</script>

		<script>
			$(function() {

				$("#user-search").selectize({
					valueField: 'title',
					labelField: 'title',
					searchField: 'title',
					options: [],
					create: false,
					render: {
						option: function (item, escape) {
							var actors = [];

							for (var i = 0, n = item.abridged_cast.length; i < n; i++) {
								actors.push('<span>' + escape(item.abridged_cast[i].name) + '</span>');
							}

							return '<div>' +
								'<img src="' + escape(item.posters.thumbnail) + '" alt="">' +
								'<span class="title">' +
								'<span class="name">' + escape(item.title) + '</span>' +
								'</span>' +
								'<span class="description">' + escape(item.synopsis || 'No synopsis available at this time.') + '</span>' +
								'<span class="actors">' + (actors.length ? 'Starring ' + actors.join(', ') : 'Actors unavailable') + '</span>' +
								'</div>';
						}
					},
					load: function (query, callback) {

						if (!query.length) return callback();

						$.ajax({
							url: 'http://api.rottentomatoes.com/api/public/v1.0/movies.json',
							type: 'GET',
							dataType: 'jsonp',
							data: {
								q: query,
								page_limit: 10,
								apikey: '3qqmdwbuswut94jv4eua3j85'
							},
							error: function () { callback(); },
							success: function (res) { callback(res.movies); }
						});

					}
				});

				// $("#book-dimension-picker").selectize();

				/*
				$("#user-search").selectize({
					create: true,
					sortField: "text",
					dropdownParent: "body"
				});
				*/

			});
		</script>

	</body>

</html>
