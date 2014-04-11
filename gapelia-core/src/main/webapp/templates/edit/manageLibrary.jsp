<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title>Gapelia &middot; [Library Name] Library</title>

    <!--/ LIBRARY VIEW
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
    <script src="/static/scripts/ajax.js"></script>


</head>

<body class="app library">

    <div id="mp-pusher" class="super-wrapper">

        <!--/ site-menu /-->
        <nav id="site-menu" class="mp-menu">
            <div class="mp-level">

                <h2><a href="/featured">Gapelia</a></h2>

                <ul>
                    <li class="home"><a href="/featured">Folio</a>
                    </li>
                    <li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a>
                    </li>
                    <li class="not-mobile"><a href="/createbook">Create book</a>
                    </li>
                    <li class="not-mobile"><a href="/librarymanager">Library Manager</a>
                    </li>

                    <li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a>
                        <ul id="draft-menu"></ul>
                    </li>

                    <li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#">6</a>
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
                <span id="notification-count">6</span>
                <i class="ion-drag"></i>
            </button>
        </div>

        <!--/ main-content /-->
        <div id="featured-scroller">
            <div id="nav-wrapper">
                <ul id="featured-nav">
                    <li id="nav-books" class="current"><a href="#">Library Books</a>
                    </li>
                    <li id="nav-submissions"><a href="#">Submissions</a>
                    </li>

                    <ul id="stay-right">
                        <li id="my-submissions">
                            <a href="#">Add my stories</a>

                            <ul>
                                <li><a href="/">hikari: The Future of the Operating System</a>
                                </li>
                                <li><a href="/">007: The Diego Regules Story</a>
                                </li>
                                <li><a href="/">From the Rennaisance, to the Future of Blogging</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </ul>
            </div>

            <!--/ Featured Books /-->
            <div class="book-list-wrapper">
                <!--/
					<section>
						<p>No stories have been added to your library yet.<br/><br/>You can add your own stories, collect stories from others, and manage submissions once people start submitting their books to your library.</p>
					</section>
					/-->

                <ul id="book-list">


                </ul>
            </div>
            <!--//Featured Books /-->


            <!--/ Submission List /-->
            <div class="submission-list-wrapper">
                <ul id="submission-list">

                    <li class="book">
                        <div class="book-buttons">
                            <a href="#" class="approve-this-book">&#xf120;</a>
                            <a href="#" class="deny-this-book">&#xf128;</a>
                        </div>

                        <div class="book-title"><a href="#">Submitted Book #01</a>
                        </div>

                        <div class="book-info">
                            <div class="author-name"><a href="#">Jane Lane</a>
                            </div>
                        </div>

                        <span class="image-overlay"></span>
                        <img src="/static/images/covers/architecture-sonn-visionsofart.jpg" alt="" />
                    </li>

                    <li class="book">
                        <div class="book-buttons">
                            <a href="#" class="approve-this-book">&#xf120;</a>
                            <a href="#" class="deny-this-book">&#xf128;</a>
                        </div>

                        <div class="book-title"><a href="#">Submitted Book #02</a>
                        </div>

                        <div class="book-info">
                            <div class="author-name"><a href="#">Daria Morgendorffer</a>
                            </div>
                        </div>

                        <span class="image-overlay"></span>
                        <img src="/static/images/covers/biography-dieterrams.jpg" alt="" />
                    </li>



                </ul>
            </div>
            <!--//Submission List /-->

        </div>

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
            $(".book").imgLiquid({
                fill: true
            });
        });
    </script>

    <!--/ scripts/layout-scroller /-->
    <script src="/static/scripts/mousewheel.js"></script>

    <script>
        $(document).ready(function () {
            var first = getListSubscribed();
            var second = getListBookmarked();
            var third = getUserDrafts();
            var fourth = getBooksInLibraryOwner();
            getUser();
        });

        function load() {
            $("#library-splash").imgLiquid({
                fill: true
            });
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

                // Controlled scrolling speed
                $("#featured-scroller").mousewheel(function (event, delta) {

                    this.scrollLeft -= (delta * 40);
                    event.preventDefault();

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
                            $("#g-menu-toggle").css("color", "#fcfcfc");

                        },
                        threshold: 0
                    });

                    $(document).on("click", "#close-splash", function () {

                        $("#close-splash").css({
                            "height": "0",
                            "top": "-200%"
                        });

                        $("#library-splash, #library-splash button").css("top", "-200%");
                        $("#g-menu-toggle").css("color", "#fcfcfc");

                    });

                });

            }

            // Click "Add my stories"
            $("#my-submissions a").click(function (e) {

                $("#my-submissions ul").toggle();
                e.preventDefault();

            });

            // Load Gapelia
            NProgress.start();

            $("#featured-panel, #featured-scroller").css("opacity", "0").show();

            var
            allBooks = $("#book-list li"), // gets all books in a section
                firstBook = $(allBooks).first(); // gets first book in list

            $(allBooks).not(firstBook).hide(); // hides all books in a section, except the first book

            setTimeout(function () {

                $("#book-list").hide();
                $("#submission-list").hide();

                var w = 0;

                $("#book-list li").each(function () {
                    w += $(this).outerWidth();
                });

                w += 500;

                if ($vW > "1024") {
                    $("#book-list").css("width", w - 320 + "px");
                }

                // fades in the all the books after section width is added
                $("#book-list li").fadeIn("100");
                $("#book-list").fadeIn("100");

                // "fix" featured menu pop-in
                setTimeout(function () {
                    $("#featured-panel, #featured-scroller").css("opacity", "1");
                }, 400);

            }, 1000);

            $("#nav-books").addClass("current");
            h = $(this).outerHeight() - 92;
            $(".book").css("height", h);
            NProgress.done();

            // Click "Books"
            $("#nav-books").click(function (e) {

                NProgress.start();

                var
                allBooks = $("#book-list li"), // gets all books in a section
                    firstBook = $(allBooks).first(); // gets first book in list

                $(allBooks).not(firstBook).hide(); // hides all books in a section, except the first book

                setTimeout(function () {

                    $("#submission-list").hide();

                    var w = 0,
                        h = 0;

                    $("#book-list li").each(function () {
                        w += $(this).outerWidth();
                        h += $(this).outerHeight();
                    });

                    w += 500;

                    if ($vW > "1024") {
                        $("#book-list").css("width", w - 320 + "px");
                    } else {
                        // $("#book-list").css("height", h + 219 + "px");
                    }

                    // fades in the all the books after section width is added
                    $("#book-list li").fadeIn("100");
                    $("#book-list").fadeIn("100");

                }, 1000);

                e.preventDefault();

                $("#nav-books").addClass("current");
                $("#nav-submissions").removeClass("current");

                NProgress.done();

            });

            // Click "Submissions"
            $("#nav-submissions").click(function (e) {

                NProgress.start();

                var
                allBooks = $("#submission-list li"), // gets all books in a section
                    firstBook = $(allBooks).first(); // gets first book in list

                $(allBooks).not(firstBook).hide(); // hides all books in a section, except the first book

                setTimeout(function () {

                    $("#book-list").hide();
                    $(".book-list-wrapper section").hide(); // need to create conditional, later

                    var w = 0,
                        h = 0;

                    $("#submission-list li").each(function () {
                        w += $(this).outerWidth();
                        h += $(this).outerHeight();
                    });

                    w += 500;

                    if ($vW > "1024") {
                        $("#submission-list").css("width", w - 155 + "px");
                    } else {
                        // $("#submission-list").css("height", h + 379 + "px");
                    }

                    // fades in the all the books after section width is added
                    $("#submission-list li").fadeIn("100");
                    $("#submission-list").fadeIn("100");

                }, 1000);

                e.preventDefault();

                $("#nav-books").removeClass("current");
                $("#nav-submissions").addClass("current");

                NProgress.done();

            });

            // Dropdown menu for mobile
            if ($vW < "1025") {

                $("#featured-panel .featured-info").remove();
                $("#featured-panel").append("<span id='category-title'>[ Library Name ]</span>");

                $("#featured-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-profile"><a href="/me">My Profile</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');

                // $(document).on("click", "#category-switcher, #nav-books, #nav-libraries, #nav-bookmarks", function () {
                $(document).on("click", "#g-menu-toggle", function () {
                    $("#featured-nav").toggle();
                });

                // Log Out
                $("#logout").click(function (e) {
                    document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    window.location = "";
                });

            }
        }
        setTimeout(function () {
            h = $(this).outerHeight() - 92;
            $(".book").css("height", h);
        }, 2000);
        setTimeout(function () {
            getBooksInLibraryOwner();
            getSubmissionsInLibrary();
            getUserCreatedBooksForLibrary();
            load();
        }, 300);
    </script>
    <!--//scripts /-->

</body>

</html>