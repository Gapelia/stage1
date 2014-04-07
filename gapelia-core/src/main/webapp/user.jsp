<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title>Gapelia &middot; Your Library</title>

    <!--/User Public VIEW
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
				\/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

    <meta name="author" content="Gapelia" />
    <meta name="description" content="Better stories, together." />
    <meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <link href="/static/css/style.css" rel="stylesheet" />
    <link href="/static/images/favicon.png" rel="shortcut icon" />

    <script src="//use.typekit.net/web3vzl.js"></script>
    <script>
        try {
            Typekit.load();
        } catch (e) {}
    </script>

    <script src="/static/scripts/modernizr.custom.js"></script>
    <script src="/static/scripts/jquery-2.1.0.min.js"></script>
    <script src="/static/scripts/nprogress.js"></script>


</head>

<body class="app profile">

    <div id="mp-pusher" class="super-wrapper">

        <!--/ site-menu /-->
        <nav id="site-menu" class="mp-menu">
            <div class="mp-level">

                <h2><a href="/featured">Gapelia</a></h2>

                <ul id='user-dock'>
                    <li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a>
                    </li>
                    <li class="not-mobile"><a href="/createbook">Create book</a>
                    </li>
                    <li class="not-mobile"><a href="/librarymanager">Library Manager</a>
                    </li>

                    <li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a><a class="icon" href="#">&#xf104;</a>
                        <ul id="draft-menu"></ul>
                    </li>

                    <li id="gpl-menu-notify"><a>Notifications</a>
                        <a class="icon" href="#"></a>
                        <ul>
                        </ul>
                    </li>
		    
		    <li class="logout"><a href="#">Log Out</a></li>
		    
                </ul>
            </div>
        </nav>
        <!--//site-menu /-->

        <!--/ main-panel /-->
        <div id="user-panel">
            <button id="g-menu-toggle">
                <i class="ion-drag"></i>
            </button>

            <span id="user-header">USERNAME</span>

            <h1 id="mobile-header" style="display: none;"><a href="/featured">Gapelia</a></h1>

            <div id="user-wrapper">
                <div class="user-avatar">
                    <div class="avatar-wrapper">
                    </div>
                </div>

                <div class="user-data">
                    <h2 id="user-info"></h2>
                    <span id="user-bio"></span>
                </div>
            </div>
        </div>
        <!--//main-panel /-->
        <!--/ main-scroller /-->
        <div id="book-scroller">
            <!--/ your-books /-->
            <div class="user-book-list-wrapper">
                <ul id="user-book-list"></ul>
            </div>

        </div>
    </div>
    <!--/ scripts /-->
    <script src="/static/scripts/touchSwipe.min.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/classie.js"></script>
    <script src="/static/scripts/mlpushmenu.js"></script>
    <script src="/static/scripts/ajax.js"></script>
    <script>
        if ($vW > "1024") {
            new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

            $(".mp-pushed").ready(function () {
                $("#book-scroller").css("z-index", "0");
            });
        }

        $(function () {
            $(".user-bg, .book, .collection, .draft").imgLiquid({
                fill: true
            });
        });
    </script>

    <!--/ scripts/layout-scroller /-->
    <script src="/static/scripts/mousewheel.js"></script>
    <script src="/static/scripts/scroll.js"></script>

    <script>
        $(function () {
            var first = getUserPublic();
            var second = getListBookmarked();
            var third = getUserDrafts();
        });

        function load() {

            $(function () {
                stuff = "";
                stuff += "<section id=\"user-splash\">";
                stuff += "<div class=\"user-avatar\"><div class=\"avatar-wrapper\"></div>";
                stuff += "</div>";
		stuff += "<div id=\"splash-user-info\">";
                stuff += "<h1 id=\"user-name\"></h1>";
                stuff += "<div id=\"splash-user-bio\"></div>";
		stuff += "<h5>Recently published <a href=\"\">The Picture of Dorian Gray</a></h5>";
		stuff += "<h5>Contributes to <a href=\"\">Digital Humanities</a> and <a href=\"\">Technological Marvels</a></h5>";
		stuff += "</div>";
                stuff += "<div id=\"close-splash\">SEE MY BOOKS</div>";
                stuff += "<img class=\"page-bg\" src=\"/static/images/cover-bg.jpg\"/>";
                stuff += "</section>";
		
                $("#mp-pusher").prepend(stuff);
                $("#user-splash").imgLiquid({
                    fill: true
                });
                $("#g-menu-toggle").css("color", "#fcfcfc");
            });

            if ($vW > "1024") {

                $(document).on("click", "#close-splash", function () {

                    $("#close-splash").css({
                        "left": "-200%",
                        "right": "initial"
                    });

                    $("#user-splash").css("left", "-200%");
                    $("#user-panel").css("width", "100%");
                    $("#user-splash .overlay-controls").css("left", "-200%");
                    $("#g-menu-toggle").css("color", "#70a1b1");

                    $("#user-header").css("opacity", "1");

                });

            } else {

                $(function () {

                    $("#user-splash").swipe({
                        swipeUp: function (event, direction, distance, duration, fingerCount) {

                            $("#close-splash").css({
                                "height": "0",
                                "top": "-200%"
                            });

                            $("#user-splash").css("top", "-200%");
                            $("#user-splash .overlay-controls").css("top", "-200%");
                            $("#g-menu-toggle").css("color", "#70a1b1");

                        },
                        threshold: 0
                    });

                    $(document).on("click", "#close-splash", function () {

                        $("#close-splash").css({
                            "height": "0",
                            "top": "-200%"
                        });

                        $("#user-splash").css("top", "-200%");
                        $("#user-splash .overlay-controls").css("top", "-200%");
                        $("#g-menu-toggle").css("color", "#70a1b1");

                    });

                });

            }

            $(function () {

                var $vW = $(window).width(),
                    $vH = $(window).height();

                // Scrolling on desktop
                if ($vW > "1024") {

                    $("#book-scroller").mousewheel(function (event, delta) {

                        $("#book-scroller").stop().animate({
                            scrollLeft: "-=" + (75 * delta) + "px"
                        }, "150", "easeOutCubic");

                        event.preventDefault();

                    });

                }

                // Dropdown menu for mobile
                if ($vW < "1025") {

                    $("#user-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-profile" class="current"><a href="/me">My Profile</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');

                    $(function () {

                        if ($vW < "321") {
                            $("#user-panel #user-bio, #user-panel .button-wrapper").remove();
                        }

                        $("#g-menu-toggle").click(function () {
                            $("#featured-nav").toggle();
                        });

                    });

                    // Log Out
                    $("#logout").click(function (e) {
                        document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        window.location = "";
                    });

                }

                // User details
                $("#splash-user-info h1, #user-header").text(user.name);
                $(".avatar-wrapper").css("background-image", "url(" + user.avatarImage + ")");
                $("#user-splash").css("background-image", "url(" + user.coverImage + ")");

                if (user.avatarImage == undefined) {
                    $("#user-splash").css("background-image", "url(/static/images/users/user-avatar.jpg)");
                }

                if (user.coverImage == undefined) {
                    $("#user-splash").css("background-image", "url(/static/images/cover-bg.jpg)");
                }

                $("#splash-user-bio").html(user.bio);
                var fourth = getPublicCreatedBooks();
            });

        }
        setInterval(function () {
            $("#book-list li").fadeIn("100");
            $("#book-list").fadeIn("100");
            var w = 0;
            $("#user-book-list li").each(function () {
                w += $(this).outerWidth();
            });

            w += 1000;

            if ($vW > "1024") {
                $("#user-book-list").css("width", w + 320 + "px");
            }
            h = $(this).outerHeight() - 92;
            $("#user-book-list .book").css("height", h);
        }, 1000);
    </script>

</body>

</html>
