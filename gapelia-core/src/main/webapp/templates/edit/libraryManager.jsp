
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

	<body class="app library-manager">

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

				<h4>[Library Name]</h4>
			</div>
			<!--//main-panel /-->

			<!--/ main-content /-->
			<div id="featured-scroller">
				<!--/ Featured Books /-->
				<div class="book-list-wrapper">
					<ul id="book-list">

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">Teletubbies Are the Future</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Daria Morgendorffer</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-01.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">How to be Super Saiyan</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Jane Lane</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-02.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">I am Sailor Moon and you can too!</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Hub Hikari</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-03.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">Dreaming of Stars</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Dimmi Bolling</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-04.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">Fresh Renders of Sound from my Head × Beats Take Significance</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">The Kitchen Collective</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-05.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">Save the trees, too!</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">National Geographic</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-06.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">BOkeH!</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Lan Hikari</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-07.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">The Wild Thornberrys!</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Eliza Thornberry</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-08.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">Crying Rivers: The Justin Timberlake Story</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Doug Funnie</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-09.jpg" alt=""/>
						</li>

						<li class="book">
							<div class="book-buttons">
								<a href="#" class="delete-this-book">&#xf252;</a>
								<a href="#" class="edit-this-book">&#xf13d;</a>
							</div>

							<div class="book-title"><a href="#">Trees Yo</a></div>

							<div class="book-info">
								<div class="author-name"><a href="#">Nokadota Xialiu</a></div>
							</div>

							<span class="image-overlay"></span>
							<img src="/static/images/book-thumb-10.jpg" alt=""/>
						</li>

					</ul>
				</div>
				<!--//Featured Books /-->
			</div>
			<!--//main-content /-->

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/filepicker2.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/mousewheel.js"></script>

		<script>
			if ($vW > "1024") {
				new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

				$(".mp-pushed").ready(function () {
					$("#book-scroller").css("z-index", "0");
				});
			}

			$(function () {

				$("#featured-scroller").mousewheel(function (event, delta) {

					this.scrollLeft -= (delta * 40);
					event.preventDefault();

				});

				// Dropdown menu for mobile
				if ($vW < "1025") {

					$("#featured-panel .featured-info").remove();
					$("#featured-panel").append("<span id='category-title'>[ Library Name ]</span>");

					$("#featured-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-profile"><a href="/me">My Profile</a></li></ul>');

					$(document).on("click", "#g-menu-toggle", function () {
						$("#featured-nav").toggle();
					});

				}

				if ($vW < "321") {

					$(".book").append('<div class="book-snippet"><p>A snippet of this book should be here, and the length shall not exceed one hundred and forty characters. This is an example of that length!!</p></div>');

				}

				// Load Gapelia
				$(function () {

					if ($vW > "1024") {

						NProgress.start();

						$("#featured-panel, #featured-scroller").css("opacity", "0").show();

						var
						allBooks = $("#book-list li"),			// gets all books in a section
						firstBook = $(allBooks).first();		// gets first book in list

						$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

						setTimeout(function () {

							$("#book-list").hide();
							$("#library-list").hide();
							$("#bookmark-list").hide();

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

					} else {
					}

				});

			});

			// Confirm book deletion
			$(document).on("click", ".yay-delete-book", function (e) {

				if ($vW > "1024") {

					// Recalculate horizontal list width
					$("#book-list").css({
						"opacity": "0",
						"margin": "2px 0 0 0"
					});

					$(this).closest("li").remove();

					// gets all books in a section
					var allBooks = $("#book-list li");

					// holds function for one second and then adds width to body tag
					setTimeout(function () {

						var w = 0;

						$("#book-list li").each(function () { w += $(this).outerWidth(); });

						w += 500;

						$("#book-list").css("width", w - 320 + "px");

						$("#book-list").css({
							"opacity": "1",
							"margin": "2px 0 0 0"
						});

					}, 500);

				} else {

					// Carry on
					$(this).closest("li").remove();

				}

				e.preventDefault();

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
