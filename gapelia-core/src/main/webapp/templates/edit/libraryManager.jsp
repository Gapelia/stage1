<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

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

	<body class="app library-manager"><!--/ library-manager /-->

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">

					<h2><a href="/featured">Gapelia</a></h2>

					<ul>
                                                <li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a></li>
                                                <li class="not-mobile"><a href="/librarymanager">Libraries</a></li>
						<li class="not-mobile"><a href="/createbook">Create book</a></li>

						<li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a>
							<ul id="draft-menu"></ul>
						</li>

						<li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#"></a>
							<ul></ul>
						</li>

						<li class="fq"><a href="#">Help</a>
                                                <li class="help"><a href="#">Contact</a>
                                                <li class="logout"><a href="#">Log Out</a>
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
					    <li id="nav-explore" class="current"><a href="#">Explore</a></li>
					    <li id="nav-subscriptions"><a href="#">Subscriptions</a></li>
						<li id="nav-libraries"><a href="#">My Libraries</a></li>
						<div id="stay-right">
							<button id="add-new-library" class="brand-i">New Library</button>
						</div>
					</ul>
				</div>
                <!--/ explore List /-->
 				<div class="library-list-wrapper">
 					<ul id="explore-list"></ul>
 				</div>
 				<!--//explore List /-->
                <!--/ Subscription List /-->
				<div class="subscription-list-wrapper">
					<ul id="subscription-list"></ul>
				</div>
		        <!--//Subscription List /-->

				<!--/ Personal Library List /-->
				<div class="library-list-wrapper">
					<ul id="library-list"></ul>
				</div>
				<!--//Personal Library List /-->

			</div>
			<!--//main-content /-->

		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/touchSwipe.min.js"></script>
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/ajax.js"></script>
		<script src="/static/scripts/userNotifications.js"></script>
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
				var third = getUserDrafts();
				$(".book").imgLiquid({ fill: true });

				if ($vW > "300") {
					$(".book-info").prepend('<img class="author-avatar" src="/static/images/users/01.jpg"/>');
				}
			});
                        
                        // Dropdown menu for mobile
                        if ($vW < "1024") {
        
                        $(".bookmark-list-wrapper").remove();
                        
                        $("#featured-panel .featured-info").remove();
                        $("#featured-panel").append('<span id="category-title">Explore Libraries</span>');
        
                        $("#featured-panel").append('<ul id="featured-nav" style="display: none;"><li id="nav-profile"><a href="/featured">Featured</a></li><li id="nav-profile"><a href="/me">My Profile</a></li><li id=\"nav-notify\"><a href=\"#\">Notifications</a><li id="nav-accounts"><a href="accounts" id="accounts">Account Settings</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');
        
                        $("#book-list").append('<li class="book" id="book-cta"><p><a href="#">Explore</a> some of our featured topic-based libraries.</p><img src="/static/images/covers/bg.jpg" alt=""/></li>');
        
                        $(document).on("click", "#g-menu-toggle, #nav-books", function () {
                            $("#featured-nav").toggle();
                        });


                // Log Out
                $("#logout").click(function (e) {
                    document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    window.location = "";
                });

            }
		</script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/mousewheel.js"></script>
                <script src="/static/scripts/scroll.js"></script>
                <!--/ scripts/layout-scroller /-->

		<script>
			$(function () {
                getNotifications();
				getListSubscribed();
				getSubscribedLibrary();
				getCreatedLibraries();
				var fifth = getLibraries();
				load();

			});

			function load() {

				var $vW = $(window).width(), $vH = $(window).height();

				// Controlled scrolling speed
                                if ($vW > "1024") {
                
                                    $("#featured-scroller").mousewheel(function (event, delta) {
                
                                        $("#featured-scroller").stop().animate({
                                            scrollLeft: "-=" + (75 * delta) + "px"
                                        }, "150", "easeOutCubic");
                
                                        event.preventDefault();
                
                                    });
                
                                }

				$("#add-new-library").click(function () { window.location.href = "/createlibrary"; });

				// Load Gapelia
				NProgress.start();

				$("#featured-panel, #featured-scroller").css("opacity", "0").show();

				var
				allBooks = $("#explore-list li"),			// gets all books in a section
				firstBook = $(allBooks).first();		// gets first book in list

				$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

				setTimeout(function () {

                    $("#explore-list").hide();
					$("#library-list").hide();
					$("#subscription-list").hide();

					var w = 0;

					$("#explore-list li").each(function () {
						w += $(this).outerWidth();
					});

					w += 500;

					$("#explore-list").css("width", w + "px");

					// fades in the all the books after section width is added
					$("#explore-list li").fadeIn("100");
					$("#explore-list").fadeIn("100");

					// "fix" featured menu pop-in
					setTimeout(function () {
						$("#featured-panel, #featured-scroller").css("opacity", "1");
					}, 400);

				}, 1000);

				//$("#nav-explore").addClass("current");

				NProgress.done();

				// Click "My Libraries"
				$("#nav-libraries").click(function (e) {

					NProgress.start();

					var
					allBooks = $("#library-list li"),		// gets all books in a section
					firstBook = $(allBooks).first();		// gets first book in list

					$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

					setTimeout(function () {

                                        $("#explore-list").hide();
					$("#library-list").hide();
					$("#subscription-list").hide();

						var w = 0, h = 0;

						$("#library-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#library-list").css("width", w + "px");
						}

						// fades in the all the books after section width is added
						$("#library-list li").fadeIn("100");
						$("#library-list").fadeIn("100");

					}, 1000);

					e.preventDefault();

					$("#nav-libraries").addClass("current");
					$("#nav-subscriptions").removeClass("current");
                                        $("#nav-explore").removeClass("current");
					NProgress.done();

				});

                                // Click "Explore"
				$("#nav-explore").click(function (e) {

					NProgress.start();

					var
					allBooks = $("#explore-list li"),		// gets all books in a section
					firstBook = $(allBooks).first();		// gets first book in list

					$(allBooks).not(firstBook).hide();	// hides all books in a section, except the first book

					setTimeout(function () {

						 $("#explore-list").hide();
                        					$("#library-list").hide();
                        					$("#subscription-list").hide();
						var w = 0, h = 0;

						$("#explore-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#explore-list").css("width", w + "px");
						}

						// fades in the all the books after section width is added
						$("#explore-list li").fadeIn("100");
						$("#explore-list").fadeIn("100");

					}, 1000);

					e.preventDefault();

					$("#nav-libraries").removeClass("current");
					$("#nav-subscriptions").removeClass("current");
                                        $("#nav-explore").addClass("current");
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

			                    $("#explore-list").hide();
            					$("#library-list").hide();
            					$("#subscription-list").hide();
						var w = 0, h = 0;

						$("#subscription-list li").each(function () {
							w += $(this).outerWidth();
							h += $(this).outerHeight();
						});

						w += 500;

						if ($vW > "1024") {
							$("#subscription-list").css("width", w + "px");
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
                                        $("#nav-explore").removeClass("current");
					NProgress.done();

				});

			}
			 setInterval(function () {
                                h = $(this).outerHeight() - 92;
                                                $(".library").css("height", h);
                                                h = $(this).outerHeight() - 92;
                                                $(".book").css("height", h);
                                                loadDelete();
                    }, 1000);
		</script>
		<!--//scripts /-->

	</body>

</html>
