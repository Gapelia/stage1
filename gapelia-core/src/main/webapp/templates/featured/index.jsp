<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title>Folio &middot; Scholarly Publishing</title>

    <!--/ FEATURED VIEW
			 ______   ______   ______  ______   __       __   ______
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\
			  \/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/

				01000111011000010111000001100101011011000110100101100001

		/-->

    <meta name="author" content="Folio" />
    <meta name="description" content="Reimagining scholarly publishing" />
    <meta name="keywords" content="academia, publishing, blogging, scholar, ideas, storytelling, long-form, platform, collaboration" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <link href="/static/css/style.css" rel="stylesheet" />
    <link href="/static/css/slytest.css" rel="stylesheet" />
    <link href="/static/css/feedback.css" rel="stylesheet" />
    <link href="/static/images/favicon.png" rel="shortcut icon" />
    
    <script src="/static/scripts/modernizr.custom.js"></script>
    <script src="/static/scripts/jquery-2.1.0.min.js"></script>
    <script src="/static/scripts/sly.js"></script>
    <script src="/static/scripts/selectize.js"></script>
    <script src="/static/scripts/nprogress.js"></script>




</head>

<!--/ <body class="app profile"> /-->

<body class="app">



    <div id="mp-pusher" class="super-wrapper">

        <!--/ site-menu /-->
        <nav id="site-menu" class="mp-menu">
            <div class="mp-level">

                <h2><a href="/featured">Gapelia</a></h2>

                <ul>
                    <li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a>
                    </li>
		    <li class="not-mobile"><a href="/librarymanager">Libraries</a>
                    </li>
                    <li class="not-mobile"><a href="/createbook">Create book</a>
                    </li>

                    <li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a>
                        <ul id="draft-menu"></ul>
                    </li>

                    <li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#"></a>
                        <ul>
                        </ul>
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
            <button id="g-menu-toggle" class="notification-time">
                <span id="notification-count" style="display: none;"></span>
                <i class="ion-drag"></i>
            </button>

            <div class="featured-info">
                <h2>Gapelia</h2>
            </div>
        </div>
	
	<span id="welcoming-title">Forward Thinking</span>
        <!--//main-panel /-->

        <!--/ main-content /-->
	<div id="featured-scroller">
            <div id="nav-wrapper">
                <ul id="featured-nav">
                    <li id="nav-books" class="current"><a href="#">Stories</a></li>
                    <li id="nav-bookmarks"><a href="#">Bookmarks</a></li>
		    <div id="nav-search" style="display: inline-block; margin-left: 30%; opacity: 0.15;"><img href="#" src="../static/images/search.png" style="height: 18px; width: 18px;"></a></div>		    
		    <div id="library-search" placeholder="Search users, stories or libraries on Folio..."></div>
				<script>
					$("#library-search").selectize({
						valueField: 'title',
						labelField: 'title',
						searchField: 'title',
						options: [],
						create: false,
						render: {
						    option: function(item, escape) {
							var actors = [];
							for (var i = 0, n = item.abridged_cast.length; i < n; i++) {
							    actors.push('<span>' + escape(item.abridged_cast[i].name) + '</span>');
							}
					    
							return '<div>' +
							    '<img src="' + escape(item.posters.thumbnail) + '" alt="">' +
							    '<span class="title">' +
								'<span class="name">' + escape(item.title) + '</span>' +
							    '<span Id="category-search">  &#x2022;  Library</span></span>' + 
							'</div>';
						    }
						},
						load: function(query, callback) {
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
							error: function() {
							    callback();
							},
							success: function(res) {
							    callback(res.movies);
							}
						    });
						}
					    });
				</script>
				
                    <div id="stay-right">
                        <button id="start-story" class="brand-i"><a href="/createBook">New Story</a>
                        </button>
                    </div>
		    <div id="contactable"></div>
                </ul>
            </div>


		<div class="scrollbar">
			<div class="handle">
				<div class="mousearea"></div>
			</div>
		</div>
            <!--/ Featured Books /-->
            <div class="book-list-wrapper">
                <ul id="book-list"></ul>
            </div>
            <!--//Featured Books /-->


            <!--/ User's Bookmarks /-->
            <div class="bookmark-list-wrapper">
                <ul id="bookmark-list"></ul>
            </div>
            <!--//User's Bookmarks /-->
        </div>
        <!--//main-content /-->

    </div>

    <!--/ scripts /-->
    <script src="/static/scripts/touchSwipe.min.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/userNotifications.js"></script>
    <script src="/static/scripts/ajax.js"></script>
    <script src="/static/scripts/feedback.js"></script>

    <script src="/static/scripts/classie.js"></script>
    <script src="/static/scripts/mlpushmenu.js"></script>

    <!--/ scripts/layout-scroller /-->

    <script>
        if ($vW > "1024") {
            new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

            $(".mp-pushed").ready(function () {
                $("#book-scroller").css("z-index", "0");
            });
	    
	    $(".mp-pushed").ready(function () {
                $("#welcoming-title").css("display", "none");
            });
	    
	    $("#nav-search").mouseenter(function () {
                $("#featured-nav .selectize-control").css("display", "inline-block");
		$("#nav-search").hide();
            });
	    
	    $(".book-list-wrapper").mouseenter(function () {
                $("#featured-nav .selectize-control").css("display", "none");
		$("#nav-search").fadeIn("slow");
            });
		$('#contactable').contactable({
		subject: 'A Feeback Message'
	    });
	    
        }
	
	if ($vW > "1919") {
		$(".mp-pushed").ready(function () {
                $("#nav-search").css("margin-left", "34%");
            });
	}	

        $(function () {
            getNotifications();
            var second = getBookmarkedBooks();
            var fourth = getListBookmarked();
            var fifth = getListSubscribed();
            var fifth = getLibraries();

        });

        function load() {
            getFeaturedBooks()
            var $vW = $(window).width(),
                $vH = $(window).height();
            h = $(this).outerHeight() - 92;
            $(".book").css("height", h);
            $("#book-list li").fadeIn("100");
            $("#book-list").fadeIn("100");
            if ($vW > "1024") {
               $(".book-list-wrapper").sly({
			horizontal: 1,
			itemNav: 'forceCentered',
			smart: 1,
			activateMiddle: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			swingSpeed: 1,
			releaseSwing: 0,
			startAt: 0,
			scrollBar: $(".scrollbar"),
			scrollBy: 1,
			speed: 0.0001,
			elasticBounds: 1,
			easing: 'swing',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,
			keyboardNavBy: 'items',
		});
            }

            // Dropdown menu for mobile
            if ($vW < "1024") {
		
                $(".bookmark-list-wrapper").remove();
		
		$("#featured-panel .featured-info").remove();
		
		//$("featured-scroller").append('<button id="cover-header-mobile" class="notification-time"><span id="notification-count">0</span><i class="ion-drag"></i></button>');

                //$("#featured-panel").append('<ul id="featured-nav" style="display: none;"><li id="nav-books" class="current"><a href="#">Featured</a></li><li id="nav-libraries"><a href="/libraryManager">Libraries</a></li><li id="nav-profile"><a href="/me">My Profile</a></li><li id="nav-accounts"><a href="accounts" id="accounts">Account Settings</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');

                $("#book-list").append('<li class="book" id="book-cta"><p><a href="/libraryManager">Explore</a> topic-based libraries or revisit your latest <a href="/me">posts.</a></p></li>');

                /*
		$(document).on("click", "#g-menu-toggle, #nav-books, #nav-libraries, #nav-bookmarks", function () {
                    $("#featured-nav").toggle();
                });

		$(document).on("click", "#nav-books", function () {
                    $("#welcoming-title").html("Bookshelf");
                });

                $(document).on("click", "#nav-libraries", function () {
                    $("#welcoming-title").html("Libraries");
                });

                $(document).on("click", "#nav-bookmarks", function () {
                    $("#welcoming-title").html("Bookmarks");
                });*/

                // Log Out
                $("#logout").click(function (e) {
                    document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    window.location = "";
                });
            }
	    
	    if ($vW < "1024") {
                $(".book-list-wrapper").css({
			"top": "450px",
			"background-color": "white"
		})
		
		$("#featured-scroller").css({"z-index": "10"})
		
		$("#featured-scroller").append('<button id="g-menu-toggle" class="notification-time"><span id="notification-count">0</span><i class="ion-drag"></i></button>');
            }

            if ($vW < "361") {
                $(".book-snippet").css("display", "block")
		$(".book-list-wrapper").css({
			"top": "300px",
			"background-color": "white"
		})
            }
	    
	    if ($vH > "1190") {
		$(".book-list-wrapper").css("cssText", "top: 50.5% !important");
		$(".mp-menu ul .fq").css("cssText", "margin-top: 260% !important");
	    }

            $("#nav-books").addClass("current");

            NProgress.done();

            // Click "Books"
            $("#nav-books").click(function (e) {

                NProgress.start();

                var
                allBooks = $("#book-list li"), // gets all books in a section
                    firstBook = $(allBooks).first(); // gets first book in list

                $(allBooks).not(firstBook).hide(); // hides all books in a section, except the first book

                setTimeout(function () {

                    $("#library-list").hide();
                    $("#bookmark-list").hide();
                    $(".bookmark-list-wrapper section").remove();

                    var w = 0,
                        h = 0;

                    $("#book-list li").each(function () {
                        w += $(this).outerWidth();
                        h += $(this).outerHeight();
                    });

                    w += 500;

                    if ($vW > "1024") {
                        $("#book-list").css("width", w + "px");
                    } else {
                        // $("#book-list").css("height", h + 219 + "px");
                    }

                    // fades in the all the books after section width is added
                    $("#book-list li").fadeIn("100");
                    $("#book-list").fadeIn("100");

                }, 1000);

                e.preventDefault();

                $("#nav-books").addClass("current");
                $("#nav-libraries").removeClass("current");
                $("#nav-bookmarks").removeClass("current");

                NProgress.done();

            });
	    
	    //delete draft	
	     loadDelete();

            // Click "Bookmarks"
            $("#nav-bookmarks").click(function (e) {

                NProgress.start();

                var
                allBooks = $("#bookmark-list li"), // gets all books in a section
                    firstBook = $(allBooks).first(); // gets first book in list

                $(allBooks).not(firstBook).hide(); // hides all books in a section, except the first book

                setTimeout(function () {

                    $("#book-list").hide();
                    $("#library-list").hide();

                    var w = 0,
                        h = 0;

                    $("#bookmark-list li").each(function () {
                        w += $(this).outerWidth();
                        h += $(this).outerHeight();
                    });

                    w += 500;

                    // fades in the all the books after section width is added
                    $("#bookmark-list li").fadeIn("100");
                    $("#bookmark-list").fadeIn("100");
                    $(".bookmark-list-wrapper section").css("width", $vW + "px");

                }, 1000);

                e.preventDefault();

                $("#nav-books").removeClass("current");
                $("#nav-libraries").removeClass("current");
                $("#nav-bookmarks").addClass("current");

                NProgress.done();

		


            });
        }
    </script>
    <!--//scripts /-->

</body>

</html>
