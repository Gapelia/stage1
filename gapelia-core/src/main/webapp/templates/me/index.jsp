<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Your Library</title>

		<!--/ ME VIEW
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

		<%@include file="../../userDetails.jsp" %> <!-- Dont use this. It is for testing only -->
		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.0.3.min.js"></script>
		<script src="/static/scripts/nprogress.js"></script>

		<% /* ******************************* */ %>
		<% /* Copy this on all jsp get sessionId %>
		<!--/ To get session id /-->
		<script>
		    <% String id = session.getId();  %>
		    var sessionId = <%= id %>
		</script>
        <% /* ******************************* */ %>
	</head>

	<body class="app profile">
	
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

					<!--/
					<div id="account-links">
						<a href="/accounts">Account</a>
						<a href="#">Sign Out</a>
					</div>
					/-->

				</div>
			</nav>
			<!--//site-menu /-->

			<!--/ main-panel /-->
			<div id="user-panel">
				<button id="g-menu-toggle"><a href="#">Gapelia Logo</a></button>

				<div class="user-avatar">
					<div class="avatar-wrapper">
						<img src="/static/images/users/11.jpg"/>
					</div>
				</div>

				<div class="user-data">
					<h2>Paul Anthony Webb</h2>

					<span id="user-bio" contenteditable="false">Space Bandit / Aries / Protogenoi / Eccentric Dreamer / Pluviophile / Futurist / Musician / Casual Enthusiast</span>
				</div>

				<div class="button-wrapper">
					<button class="edit-profile slate">Edit Profile</button>
				</div>

				<!--/
				<div class="user-bg">
					<img src="/static/images/space-bb.jpg"/>
				</div>
				/-->
			</div>
			<!--//main-panel /-->

			<!--/ main-scroller /-->
			<div id="book-scroller">
				<ul id="book-nav">
					<li id="nav-books" class="current"><a href="#">Your Personal Collection</a></li>
					<!--/ <li id="nav-collections"><a href="#">Bookmarks</a></li> /-->
					<!--/ <li id="nav-drafts"><a href="#">Drafts</a></li> /-->
				</ul>

				<!--/ your-books /-->
				<div class="user-book-list-wrapper">
					<ul id="user-book-list">

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">Teletubbies Are the Future</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Insane Asylum</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">How to be Super Saiyan</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">The Teachings of Goku</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">I am Sailor Moon and you can too!</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Space Cadets</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-03.jpg" alt=""/>
						</li>

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">Dreaming of Stars</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Dimmi Bolling Press Kit</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-04.jpg" alt=""/>
						</li>

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">Fresh Renders of Sound from my Head × Beats Take Significance</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">The Kitchen Collective</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-05.jpg" alt=""/>
						</li>

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">Japanimation</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Camp Awesome</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-06.jpg" alt=""/>
						</li>

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">Japanimation</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Camp Awesome</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-07.jpg" alt=""/>
						</li>

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">Japanimation</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Camp Awesome</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-08.jpg" alt=""/>
						</li>

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">Japanimation</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Camp Awesome</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-09.jpg" alt=""/>
						</li>

						<li class="book">
							<!--/
							<ul class="edit-delete">
								<li class="edit"><a href="#">&#9998;</a></li>
								<li class="delete"><a href="#">&#9749;</a></li>
							</ul>
							/-->

							<div class="book-title"><a href="#">Japanimation</a></div>

							<div class="book-info">
								<div class="library-location"><a href="#">Camp Awesome</a></div>
								<small><a href="#">EDIT THIS BOOK</a></small>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-10.jpg" alt=""/>
						</li>

						<!--/
						<li class="new">
							<a class="new-inner-wrapper" href="{% url 'create' %}">
								<span class="entypo">&#10133;</span>
								<div>Create a new book</div>
							</a>

							<span class="image-overlay"></span>
						</li>
						/-->

					</ul>
				</div>
				<!--//your-books /-->

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
						callbacks: {
							onScroll: function() {

								$("#user-panel").css("width", "7%");
								$("#book-scroller").css("width", "93%");
								$("#user-panel .user-avatar, #user-panel #user-bio, #user-panel .button-wrapper").css("display", "none");

								/*
								$("#user-panel h2").css({
									"margin": "2rem 0",
									"padding": "0 0 4rem 0",
									"bottom": "2rem",
									"left": "-3.8rem",
									"background-image": "url('/static/images/sprite-sheet.png')",
									"background-position": "0 -333px",
									"background-repeat": "no-repeat",
									"background-size": "200px 500px",
									"font-size": "0",
									"line-height": "0",
									"position": "fixed",
									"transform": "rotate(-90deg)",
									"width": "200px",
									"-webkit-transform": "rotate(-90deg)"
								});
								*/

								$("#user-panel h2").css({
									"bottom": "2rem",
									"left": "-3.1rem",
									"margin": "2rem 0",
									"position": "fixed",
									"transform": "rotate(-90deg)",
									"width": "194px",
									"-webkit-transform": "rotate(-90deg)"
								});

								$(this).mCustomScrollbar("update");
								$(this).mCustomScrollbar("stop");

							},

							onTotalScrollBack: function() {

								$("#user-panel").css("width", "25%");
								$("#book-scroller").css("width", "75%");
								$("#user-panel .user-avatar, #user-panel #user-bio, #user-panel .button-wrapper").css("display", "block");

								/*
								$("#user-panel h2").css({
									"margin": "0 0 10px 0",
									"padding": "0",
									"bottom": "0",
									"left": "0",
									"background-image": "none",
									"font-size": "28px",
									"line-height": "40px",
									"position": "relative",
									"transform": "rotate(0deg)",
									"width": "auto",
									"-webkit-transform": "rotate(0deg)"
								});
								*/

								$("#user-panel h2").css({
									"margin": "0 0 10px 0",
									"position": "static",
									"transform": "rotate(0deg)",
									"width": "100%",
									"-webkit-transform": "rotate(0deg)"
								});

								$(this).mCustomScrollbar("update");
								$(this).mCustomScrollbar("stop");

							},

							onTotalScrollBackOffset: 100
						},

						advanced: { autoExpandHorizontalScroll: true }
					});

					NProgress.done();

					$("#user-book-list").css("opacity", "1");

					// "fix" featured menu pop-in
					setTimeout(function () {
						$("#user-panel, #book-scroller").css("opacity", "1");
					}, 400).show();

				});

				$("#nav-books").addClass("current");

			});

			$(".user-data h2").html(_fullName);
			$(".user-avatar img").attr("src", _image);
		</script>

	</body>

</html>
