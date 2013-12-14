<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

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
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<%@include file="../../userDetails.jsp" %> <!-- Dont use this. It is for testing only -->
        <script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.0.3.min.js"></script>
		<script src="/static/scripts/nprogress.js"></script>

		<% /* ******************************* */ %>
		<% /* Copy this on all jsp get sessionId %>
		<!--/ To get session id /-->
		<script>
		    <% String id = session.getId(); %>
		    var sessionId = <%= id %>
		</script>
        <% /* ******************************* */ %>
	</head>

	<body class="app profile">
	
		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">
					<h2><a href="/featured">Gapelia</a></h2>

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
			<div id="user-panel">
				<button id="g-menu-toggle"><a href="#">Gapelia Logo</a></button>

				<div class="user-avatar">
					<img src="/static/images/users/11.jpg"/>
				</div>

				<div class="user-data">
					<h2>Paul Anthony Webb</h2>

					<span id="user-bio" contenteditable="false">Space Bandit / Aries / Protogenoi / Eccentric Dreamer / Pluviophile / Futurist / Musician / Casual Enthusiast</span>
				</div>

				<div class="button-wrapper">
					<button class="edit-profile slate">Edit Profile</button>
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
					<li id="nav-collections"><a href="#">Bookmarks</a></li>
					<li id="nav-drafts"><a href="#">Drafts</a></li>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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
								<div class="library-location"><a href="#">Camp Awesome</a></div>
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

				<!--/ your-bookmarks /-->
				<div class="user-bookmark-list-wrapper">
					<ul id="user-bookmark-list">

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-11.jpg" alt=""/>
						</li>

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-12.jpg" alt=""/>
						</li>

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-13.jpg" alt=""/>
						</li>

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb.JPG" alt=""/>
						</li>

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-03.jpg" alt=""/>
						</li>

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-04.jpg" alt=""/>
						</li>

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-05.jpg" alt=""/>
						</li>

						<li class="collection">
							<div class="bookmark-this">
								<span class="top-bm"></span>
								<span class="bottom-bm"></span>
								<span class="right-bm"></span>
							</div>

							<div class="collection-info">
								<div class="title"><a href="#">Nature is Everything</a></div>
								<div class="author-name"><a href="#">Spaceman Fresh</a></div>
								<div class="library-location"><a href="#">Camp Awesome</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-06.jpg" alt=""/>
						</li>

					</ul>
				</div>
				<!--//your-bookmarks /-->

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
				$(".user-bg, .book, .collection, .draft").imgLiquid({ fill: true });
			});
		</script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/jquery.mCustomScrollbar.js"></script>

		<script>
			$(document).ready(function() {

				// Load Gapelia
				$("#user-panel, #book-scroller").css("opacity", "0").show();
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

					// "fix" featured menu pop-in
					setTimeout(function () {
						$("#user-panel, #book-scroller").css("opacity", "1");
					}, 400).show();

				});

				$("#nav-books").addClass("current");

				// Click "Books"
				$("#nav-books").click(function (e) {

					NProgress.start();

					setTimeout(function() {

						$("#user-book-list").show();
						$("#user-bookmark-list").hide();
						$("#user-draft-list").hide();

						$("#user-book-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-bookmark-list").mCustomScrollbar("destroy");
						$("#user-draft-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").addClass("current");
					$("#nav-collections").removeClass("current");
					$("#nav-drafts").removeClass("current");
					e.preventDefault();

				});

				// Click "Collections"
				$("#nav-collections").click(function (e) {

					NProgress.start();

					$("#user-book-list").hide();
					$("#user-bookmark-list").show();
					$("#user-draft-list").hide();

					setTimeout(function() {

						$("#user-bookmark-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-book-list").mCustomScrollbar("destroy");
						$("#user-draft-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-collections").addClass("current");
					$("#nav-drafts").removeClass("current");
					e.preventDefault();

				});

				// Click "Drafts"
				$("#nav-drafts").click(function (e) {

					NProgress.start();

					$("#user-book-list").hide();
					$("#user-bookmark-list").hide();
					$("#user-draft-list").show();

					setTimeout(function() {

						$("#user-draft-list").mCustomScrollbar({
							autoHideScrollbar: false,
							horizontalScroll: true,
							theme: "dark-thin",
							advanced: { autoExpandHorizontalScroll: true, updateOnContentResize: false }
						});

						$("#user-book-list").mCustomScrollbar("destroy");
						$("#user-bookmark-list").mCustomScrollbar("destroy");

						NProgress.done();

					});

					$("#nav-books").removeClass("current");
					$("#nav-collections").removeClass("current");
					$("#nav-drafts").addClass("current");
					e.preventDefault();

				});

			});
			
			$(".user-data h2").html(_fullName);
			$(".user-avatar img").attr("src", _image);
		</script>

	</body>

</html>
