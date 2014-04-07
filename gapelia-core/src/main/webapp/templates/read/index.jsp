
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Now reading *BOOK TITLE*</title>

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

		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/css/fluidbox.css" rel="stylesheet"/>

		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try { Typekit.load(); } catch (e) {}</script>

		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>

	</head>

	<body class="app full-book g-body">

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">

					<h2><a href="/featured">Gapelia</a></h2>

					<ul>
						<li class="not-mobile"><a href="/featured">Home</a></li>
						<li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a></li>
						<li class="not-mobile"><a href="/createbook">Create book</a></li>
						<li class="not-mobile"><a href="/librarymanager">Library Manager</a></li>

						<li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a>
							<ul id="draft-menu"></ul>
						</li>

						<li id="gpl-menu-notify"><a>Notifications</a>
							<a class="icon" href="#"></a>
							<ul></ul>
						</li>

						<li class="logout"><a href="#">Log Out</a></li>
					</ul>

				</div>
			</nav>
			<!--//site-menu /-->

			<button id="g-menu-toggle"><i class="ion-drag"></i></button>
			<button id="next-book-toggle"><i class="ion-forward"></i></button>

			<header>
				<div id="header-info">
					<span id="header-title"></span>
					<span id="header-author"></span>
				</div>

				<ul class="share-book"></ul>
			</header>

			<div id="bb-nav-prev">&#xf153;</div>
			<div id="bb-nav-next">&#xf154;</div>
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

		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/vimeothumb.js"></script>

		<!--/ scripts/page-flip /-->
		<script src="/static/scripts/jquerypp.custom.js"></script>
		<script src="/static/scripts/bookblock.js"></script>

		<!--/ scripts/fluidbox /-->
		<script src="/static/scripts/imagesloaded.min.js"></script>
		<script src="/static/scripts/fluidbox.min.js"></script>

		<script src="/static/scripts/ajax.js"></script>
		<!--/ <script src="/static/scripts/readBook.js"></script> /-->


		<script>
			$(function () {
        function getUserFromBook(bookId) {
            responseText = '';
            $.ajax({
                url: "/api/utils/getUserFromBookId",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                async: false,
                type: "POST",
                data: {
                    bookId: bookId
                },
                success: function (data) {
                    bookOwner = data;
                    responseText = "<div class=\"author-info\"><div class=\"author-name\"><a href=\""+data.displayName+"\">" + data.displayName + "</a><img class=\"author-avatar\" src=\"" + data.avatarImage + "\"></div></div>";
                },
                error: function (q, status, err) {
                    if (status == "timeout") {
                        alert("Request timed out");
                    } else {
                        alert("Some issue happened with your request: " + err.message);
                    }
                }
            });
            return responseText;
        }
				var $vW = $(window).width(), $vH = $(window).height();

				// Load Gapelia
				NProgress.start();

				// Get book info and its pages
				bookId = document.URL.split("/")[document.URL.split("/").length - 1];
				getUserFromBook(bookId);

				$.ajax({
					url: "/api/users/getPages",
					contentType: "application/x-www-form-urlencoded;charset=utf-8",
					type: "POST",
					data: { bookId: bookId },
					success: function (data) {

						pages = data;
						pages.sort(function (a, b) { return a.pageNumber - b.pageNumber; });

						htmlToInsert = "";

						for (i = 0; i < pages.length; i++) {
							current = pages[i];

							// TODO get author photo and name and insert in places
							if (i == 0) {
								htmlToInsert += "<div class=\"bb-item front-cover\" style=\"display: block\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
								insertPage(1);
							} else {
								htmlToInsert += "<div style=\"display: none\" class=\"bb-item\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
								insertPage(0);
							}
						}

						$("#bb-bookblock").html(htmlToInsert);

					    $("#header-author").html(bookOwner.name);
					    $("#header-title").html(pages[0].title);
						$(".inserted-img").fluidbox();

						$(function () {

							// Styling layouts
							$(".backcover-wrapper #fin-next").imgLiquid({ fill: true });

							if ($vW > "1024") {

								$("img").VimeoThumb();

								setTimeout(function () {
									$(".video-player-container").imgLiquid({ fill: true });
								}, 1000); // prevent placeholder from appearing

								$(".fluid-wrapper").imgLiquid({ fill: true });
								$(".photo-wrapper .page-bg-wrapper").imgLiquid({ fill: true });
								$(".overlay-wrapper").imgLiquid({ fill: true });
								$(".phototext-wrapper").imgLiquid({ fill: true });
								$(".vertical-wrapper .draggable-placeholder").imgLiquid({ fill: true });

								$(".photo-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");

								$(document).on("click", ".play-video", function () {

									$(".play-video").hide();

									$(".video-player-container img").hide();
									$(".video-player-container iframe").show();

								});

							}

							$(document).on("mouseenter", ".inserted-img", function () {

								if ($(this).parent().hasClass("minimized-p")) {
									$(this).before("<div class=\"resize-bigger\">[bigger]</div>");
								} else {
									$(this).before("<div class=\"resize-smaller\">[smaller]</div>");
								}

							});

							/*
							$(document).on("mouseleave", ".inserted-img", function () {

								$(this).prev(".resize-smaller", ".resize-bigger").remove();
								// $(this).closest(".resize-smaller", ".resize-bigger").remove();

							});
							*/

							$(document).on("click", ".resize-smaller", function () {

								$(this).parent().addClass("minimized-p");
								$(this).parent().mouseleave();

							});

							$(document).on("click", ".resize-bigger", function () {

								$(this).parent().removeClass("minimized-p");
								$(this).parent().mouseleave();

							});

							$(document).on("mouseleave", ".resize-smaller, .resize-bigger", function () {
								$(".resize-smaller, .resize-bigger").remove();
							});

							/*
							$(".inserted-img").hover(function () {

								if ($(this).parent().hasClass("minimized-p")) {

									// $(this).append('<a class="mediumInsert-imageResizeBigger"></a>');
									$(this).before("<div class=\"resize-bigger\">[bigger]</div>");

								} else {

									// $(this).append('<a class="mediumInsert-imageResizeSmaller"></a>');
									$(this).before("<div class=\"resize-smaller\">[smaller]</div>");

								}

								// $(this).show();

							}, function () {

								$(this).prev(".resize-smaller", ".resize-bigger").remove();
								// $(this).hide();

							});
							*/

							/*
							$('img.col-image1').mouseover(function () {
								$(this).siblings('a.plus-sign').show();
							});

							$('img.col-image1').mouseleave(function () {
								$(this).siblings('a.plus-sign').hide();
							});
							*/

						});

						// Initialize book structure
						if ($vW > "1024") {

							$(".content").css({
								"width": $vW + "px",
								"height": $vH + "px"
							});

							var Page = (function () {

								var config = {
									$bookBlock:	$("#bb-bookblock"),
									$navNext:		$("#bb-nav-next"),
									$navPrev:		$("#bb-nav-prev"),
									$navFirst:	$("#bb-nav-first")
								   // $navLast: $('#back-covert')

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
									config.$navNext.on("click touchstart", function () {
										config.$bookBlock.bookblock("next");
										return false;
									});

									config.$navPrev.on("click touchstart", function () {
										config.$bookBlock.bookblock("prev");
										return false;
									});

									config.$navFirst.on("click touchstart", function () {
										config.$bookBlock.bookblock("first");
										return false;
									});
                                    /*
									config.$navLast.on("click touchstart", function () {
										console.log("end of book");
									});
*/
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

						}

						Page.init();

					},

					error: function (q, status, err) {

						if (status == "timeout") {
							alert("Request timed out");
						} else {
							alert("Some issue happened with your request: " + err.message);
						}

					}
				});

				// Set up page layouts
				function insertPage(isFirst) {

					switch (current.templateId) {
						case 0:
							fluidLayout(isFirst);
							break;

						case 1:
							photoLayout(isFirst);
							break;

						case 2:
							overlayLayout(isFirst);
							break;

						case 3:
							phototextLayout(isFirst);
							break;

						case 4:
							verticalLayout(isFirst);
							break;

						case 5:
							videoLayout(isFirst);
							break;

						default:
							fluidLayout(isFirst);
							break;
					}

				}

				function fluidLayout(isFirst) {

					htmlToInsert += "<section class=\"fluid-wrapper\">";
					htmlToInsert += "<section class=\"draggable-placeholder\">";
					htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";

					if (current.creativeCommons != "Add photo credit?") {
						htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
					}

					htmlToInsert += "</section>";
					htmlToInsert += "<div class=\"fluid-preview\">";

					if (isFirst == 1) {
                            htmlToInsert += responseText;
                        }
					htmlToInsert += "<article>";
					htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

					htmlToInsert += "<div class=\"page-desc\">" + current.content + "";

					if (current.file != undefined) { htmlToInsert += "" + current.file + ""; }

					htmlToInsert += "</div>";

					htmlToInsert += "</article></div>";
					htmlToInsert += "</section>";
					htmlToInsert += "</div></div>";

				}

				function photoLayout(isFirst) {

					htmlToInsert += "<section class=\"photo-wrapper\">";
					htmlToInsert += "<div class=\"page-bg-wrapper\">";

					if (current.attribution != "Add photo credit?") {
						htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
					}

					htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
					htmlToInsert += "</div>";
					htmlToInsert += "<div class=\"photo-preview\">";
					htmlToInsert += "<article>";
					htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

					if (isFirst == 1) {
                            htmlToInsert += responseText;
                        }

					htmlToInsert += "</article>";
					htmlToInsert += "</div></section>";
					htmlToInsert += "</div></div>";

				}

				function overlayLayout(isFirst) {

					htmlToInsert += "<section class=\"overlay-wrapper\">";
					htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
					htmlToInsert += "<div class=\"overlay-preview\">";
					htmlToInsert += "<article>";
					htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";

					if (isFirst == 1) {
                            htmlToInsert += responseText;
                        }

					htmlToInsert += "</article></div>";

					if (current.creativeCommons != "Add photo credit?") {
						htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
					}

					htmlToInsert += "</section>";
					htmlToInsert += "</div></div>";

				}

				function phototextLayout(isFirst) {

					htmlToInsert += "<section class=\"phototext-wrapper\">";

					if (current.creativeCommons != "Add photo credit?") {
						htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
					}

					htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
					htmlToInsert += "<div class=\"phototext-preview\">";
					htmlToInsert += "<article>";
					htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

					if (isFirst == 1) {
                            htmlToInsert += responseText;
                        }

					htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";
					htmlToInsert += "</article>";
					htmlToInsert += "</div></section>";
					htmlToInsert += "</div></div>";

				}

				function verticalLayout(isFirst) {

					htmlToInsert += "<section class=\"vertical-wrapper\">";

					if (current.creativeCommons != "Add photo credit?") {
						htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
					}

					htmlToInsert += "<div class=\"draggable-placeholder\">";
					htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
					htmlToInsert += "<div class=\"vertical-preview\">";
					htmlToInsert += "<article>";
					htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

					if (isFirst == 1) {
                            htmlToInsert += responseText;
                        }

					htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";
					htmlToInsert += "</article></div>";
					htmlToInsert += "</div></section>";
					htmlToInsert += "</div></div>";

				}

				function videoLayout(isFirst) {

					htmlToInsert += "<section class=\"video-wrapper\">";

					if (current.creativeCommons != "Add photo credit?") {
						htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
					}

					htmlToInsert += "<div class=\"video-preview\">";

					htmlToInsert += "<div class=\"button-wrapper\"><button class=\"play-video\">Play</button></div>";
					htmlToInsert += "<div class=\"video-player-container\">";
					htmlToInsert += "<iframe src=\"" + current.videoUrl + "\"></iframe>";
					htmlToInsert += "</div>";
					htmlToInsert += "<article>";
					htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

					if (isFirst == 1) {
                            htmlToInsert += responseText;
                        }

					htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";
					htmlToInsert += "</article>";
					htmlToInsert += "</div></section>";
					htmlToInsert += "</div></div>";

				}

				// Streamline book for mobile
				if ($vW < "1025") {

					// $("#header-toggle, #next-book-toggle, #bb-nav-prev, #bb-nav-next").css("display", "none");
					$("#header-toggle, #bb-nav-prev, #bb-nav-next").css("display", "none");

					$(".video-player-container img").hide();
					$(".video-player-container iframe").show();

				}

				if ($vW < "321") {

					// $(".frontcover-wrapper, .frontcover-wrapper article, .overlay-wrapper").css("height", $vH - 50 + "px");
					$(".frontcover-wrapper, .frontcover-wrapper article, .overlay-wrapper").css("height", $vH);
					$(".frontcover-wrapper, .overlay-wrapper").imgLiquid({ fill: true });

				}

				// FIN
				NProgress.done();
 var currentWebsite = document.URL;

					var currentWebsite = document.URL;
                    facebookShare = 'http://www.facebook.com/sharer/sharer.php?u=' + currentWebsite;
                    twitterShare = 'http://twitter.com/share?url=' + currentWebsite;
                    emailShare = 'mailto:?subject=Oh%20hai&amp;body=I enjoyed Reading and thought you would too. Check it out at ' + currentWebsite;

                share = "";

					share += "<li><a href=\"javascript:window.open("+ facebookShare +",'','width=555,height=368');void(0)\"><i class=\"ion-social-facebook\"></i></a></li>";
					share += "<li><a href=\"javascript:window.open("+twitterShare+",'','width=550,height=257');void(0)\"><i class=\"ion-social-twitter\"></i></a></li>";
					share += "<li><a href=\""+emailShare+"\"><i class=\"ion-email\"></i></a></li>";
				$(".share-book").html(share);
				var third = getUserDrafts();

				// Slide menu for desktop
				if ($vW > "1024") {
					new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

					$(".mp-pushed").ready(function () {
						$("#book-scroller").css("z-index", "0");
					});
				}

				// Dropdown menu for mobile
				if ($vW < "1025") {

					menu = "";
					menu += "<ul id=\"book-menu\" style=\"display: none;\">";
					menu += "<li id=\"nav-featured\"><a href=\"/featured\">Featured</a></li>";
					menu += "<li id=\"nav-profile\"><a href=\"/me\">My Profile</a></li>";
					menu += "<li id=\"nav-notify\"><a href=\"#\">Notifications</a>";
					menu += "<ul>";
					menu += "<li><a href=\"#\">Diego thanked you for your story: \"The Matrix Has You\"</a></li>";
					menu += "<li><a href=\"#\">Tommy commented on your story: \"Well that was weird\"</a></li>";
					menu += "<li><a href=\"#\">Daniel added your story to a library: \"Gapelia Nation\"</a></li>";
					menu += "<li><a href=\"#\">Frankie wants to collaborate on your story: \"Hoverboards Are The Future\"</a></li>";
					menu += "<li><a href=\"#\">2 edit requests are pending for your review</a></li>";
					menu += "</ul>";
					menu += "</li>";
					menu += "</ul>";

					share = "";
					share += "<ul id=\"share-menu\" style=\"display: none;\">";

					share += "<li><a href=\"javascript:window.open(facebookShare,'','width=555,height=368');void(0)\">Share via Facebook</a></li>";
					share += "<li><a href=\"javascript:window.open(twitterShare,'','width=550,height=257');void(0)\">Share via Twitter</a></li>";
					share += "<li><a href=\"emailShare\">Share via Email<i class=\"ion-email\"></i><</a></li>";
					share += "</ul>";

					$("#g-menu-toggle").after(menu);
					$("#next-book-toggle").after(share);

					$(document).on("click", "#g-menu-toggle", function () {

						$("#book-menu").toggle();

						if ($("#book-menu").css("display") == "block") {
							$("#g-menu-toggle, #next-book-toggle").css("color", "#70a1b1");
						} else {
							$("#g-menu-toggle, #next-book-toggle").css("color", "#fcfcfc");
						}

						if ($("#share-menu").css("display") == "block") {
							$("#share-menu").hide();
						}

					});

					$(document).on("click", "#next-book-toggle", function () {

						$("#share-menu").toggle();

						if ($("#share-menu").css("display") == "block") {
							$("#g-menu-toggle, #next-book-toggle").css("color", "#70a1b1");
						} else {
							$("#g-menu-toggle, #next-book-toggle").css("color", "#fcfcfc");
						}

						if ($("#book-menu").css("display") == "block") {
							$("#book-menu").hide();
						}

					});

					$(document).on("click", "#nav-notify", function (e) {

						$("#nav-notify ul").toggle();

						if ($("#nav-notify ul").css("display") == "block") {
							$("#nav-notify").css("padding", "1rem 0 0 0");
						} else {
							$("#nav-notify").css("padding", "1rem");
						}

						e.preventDefault();

					});

				}

				// var third = getUserDrafts();

			});
		</script>

	</body>

</html>
