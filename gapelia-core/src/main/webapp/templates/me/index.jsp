<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title></title>

    <!--/ ME VIEW
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
    <link href="/static/images/favicon.png" rel="shortcut icon" />

    <script src="/static/scripts/modernizr.custom.js"></script>
    <script src="/static/scripts/jquery-2.1.0.min.js"></script>
    <script src="/static/scripts/sly.js"></script>
    <script src="/static/scripts/nprogress.js"></script>


</head>

<body class="app profile">

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
                    <li class="not-mobile"><a href="/createbook">New Story</a>
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
        <div id="user-panel">
            <button id="g-menu-toggle" class="notification-time">
		<span id="notification-count" style="display: none;"></span>
                <i class="ion-drag"></i>
            </button>

            <span id="user-header" style="opacity: 0;">USERNAME</span>

            <h1 id="mobile-header" style="display: none;"><a href="/featured">Gapelia</a></h1>

            <div id="user-wrapper">
                <div class="user-avatar">
                    <div class="avatar-wrapper">
                        <!--/ <img src="/static/images/users/user-avatar.jpg"/> /-->
                    </div>
                </div>

                <div class="user-data">
                    <h2 id="user-info"></h2>
                    <span id="user-bio" contenteditable="false"></span>
                </div>

                <div class="button-wrapper">
                    <button class="edit-profile slate">Edit Profile</button>
                </div>
            </div>
        </div>
        <!--//main-panel /-->

        <!--/ main-scroller /-->
        <div id="book-scroller">
            <!--/ your-books /-->
	    	<div class="scrollbar">
			<div class="handle">
				<div class="mousearea"></div>
			</div>
		</div>
            <div class="user-book-list-wrapper" style="opacity: 0;">
                <ul id="user-book-list"></ul>
            </div>
            <!--//your-books /-->
        </div>
        <!--//main-scroller /-->

    </div>

    <!--/ scripts /-->
    <script src="/static/scripts/touchSwipe.min.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/charLimiter.js"></script>

    <script src="/static/scripts/classie.js"></script>
    <script src="/static/scripts/mlpushmenu.js"></script>
    <script src="/static/scripts/ajax.js"></script>
    <script src="/static/scripts/userNotifications.js"></script>


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


    <script>
        $(function () {
            var fifth = getNotifications();
            var second = getUserBooksArray();
          var first = getUser();
        });

         // Splash page
        function load() {
            h = $(this).outerHeight() - 92;
            $(".book").css("height", h);
            // Splash page
            $(function () {

                stuff = "";
                stuff += "<section id=\"user-splash\">";
                stuff += "<div class=\"overlay-controls\">";
                stuff += "<input type=\"filepicker\" id=\"change-cover-photo\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; console.log(url); $('.spinner').show(); $('.user-avatar').attr('src', url); $('#user-splash').css({ 'background-image': 'url(' + url + ')', 'background-position': '50% 50%', 'background-repeat': 'no-repeat no-repeat', 'background-size': 'cover' }); $('.spinner').hide();\">";
                stuff += "</div>";
                stuff += "<div class=\"user-avatar\"><div class=\"avatar-wrapper\">";
                stuff += "<a href=\"#\" id=\"splash-edit-profile\">&#xf13d;</a>";
                stuff += "<div id=\"splash-edit-wrapper\">";

                if ($vW > "1024") {

                    stuff += "<a class=\"edit-profile\" href=\"/accounts\">Account Settings</a>";
                    stuff += "<a class=\"quick-edit-profile\" href=\"#\">Edit Profile</a>";

                } else {

                    stuff += "<a class=\"quick-edit-profile\" href=\"#\">Edit Profile</a>";

                }

                stuff += "</div>";
                stuff += "</div></div>";
                stuff += "<div id=\"splash-user-info\">";
                stuff += "<h1 id=\"user-name\"></h1>";
		stuff += "<div id=\"user-box\"><div id=\"splash-user-bio\" placeholder=\"Add a bio here...\" contenteditable=\"false\">Click here to add a bio..</div>";
                stuff += "<h5 id=\"recently-published\"></h5>";
                stuff += "<h5 id=\"contributes-to\"></h5></div>";
		stuff += "<ul id=\"user-extra\">";
		stuff += "<li id=\"location\"></li>"
		stuff += "<li id=\"university\"></li>"
		stuff += "<li id=\"department\"></li>"
		stuff += "<li><a id=\"website\"  href=\"http://" +user.personalWebsite+ "\"></a></li>"
		stuff += "<li><a id=\"twitter\" href=\"http://www.twitter.com/" +user.twt+ "\"></a></li>"
		stuff += "</ul></div>";
                stuff += "</div>";
		if ($vW > "1024") {
			stuff += "<div id=\"close-splash\" style=\"left: 90%;\">See all posts</div>";
		} else {
			stuff += "<div id=\"close-splash\">^</div>";
		}
                stuff += "<img class=\"page-bg\" src=\"/static/images/cover-bg.jpg\"/>";
                stuff += "</section>";

                $("#mp-pusher").prepend(stuff);

                $("#user-splash").imgLiquid({
                    fill: true
                });
                $("#g-menu-toggle").css("color", "#fcfcfc");

                var element = $("#change-cover-photo");
                element = element[0];
                element.type = "filepicker";
                filepicker.constructWidget(element);

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
                    $("#g-menu-toggle").css({
			"color": "#70a1b1",
			"width": "7.5%"
		    });
	            $(".user-book-list-wrapper, #user-header").css("opacity", "1");
                    $("#user-header").css("opacity", "1");
		    
                });

            } else {

                $(function () {

                    $("#user-splash").swipe({
                        swipeUp: function (event, direction, distance, duration, fingerCount) {

                            $("#close-splash").css({
                                "height": "0",
                                "top": "0" // -200%
                            });

                            $("#user-splash").css("top", "0"); // -200%
                            $("#user-splash .overlay-controls").css("top", "0"); // -200%
                            $("#g-menu-toggle").css("color", "#70a1b1");
                        },
                        threshold: 0
                    });

                    $(document).on("click", "#close-splash", function () {

                        $("#close-splash").css({
                            "height": "0",
                            "top": "0" // -200%
                        });

                        $("#user-splash").css("top", "0"); // -200%
                        $("#user-splash .overlay-controls").css("top", "0"); -200%
                        $("#g-menu-toggle").css("color", "#70a1b1");
			$(".user-book-list-wrapper, #user-header").css("opacity", "1");

                    });

                });

            }

            $(function () {

                var $vW = $(window).width(),
                    $vH = $(window).height();

                // Dropdown menu for mobile
                if ($vW < "1025") {
		$("#book-scroller").remove(); // removed until book list is optimized
                $("#featured-scroller").append("<span id='category-title'>[ Library Name ]</span>");
		    $("#user-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Folio</a><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-featured"><a href="/libraryManager">Libraries</a></li><li id="nav-featured"><a href="/accounts">Account Settings</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');

                    $(function () {

                        if ($vW < "321") {
                            $("#user-panel #user-bio, #user-panel .button-wrapper").remove();
                        }
                        if ($vW < "321") {
                            $(".book-snippet").css("display","block")
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
		
		if ($vH > "1079") {
			$(".user-book-list-wrapper").css("cssText", "top: 51% !important");
		}
		
		if ($vH > "1190") {
			$(".user-book-list-wrapper").css("cssText", "top: 50.5% !important");
			$(".mp-menu ul .fq").css("cssText", "margin-top: 260% !important");
		}
		

                // User details
                $("#splash-user-info h1, #user-header").text(user.name);
		$("#splash-user-info #location").text(user.location);
		$("#splash-user-info #university").text(user.university);
		$("#splash-user-info #department").text(user.department);
		$("#splash-user-info #website").text(user.personalWebsite);
		$("#splash-user-info #twitter").text(user.twt);
                $(".avatar-wrapper").css("background-image", "url(" + user.avatarImage + ")");
                $("#user-splash").css("background-image", "url(" + user.coverImage + ")");

                //scenarios with empty classes//
		if (user.avatarImage == undefined) {
                    $("#user-splash").css("background-image", "url(/static/images/users/user-avatar.jpg)");
                }

                if (user.coverImage == undefined) {
                    $("#user-splash").css("background-image", "url(/static/images/cover-bg.jpg)");
                }
		
		if (user.bio == "") {
			$("#splash-user-bio").html("Click here to add a bio...");
		}
		else{
			$("#splash-user-bio").html(user.bio);
		}
		
		if (user.location == "") {
			$("#splash-user-info #location").remove();
		}
		
		if (user.personalWebsite == "") {
			$("#splash-user-info #website").remove();
		}
		
		if (user.twt == "") {
			$("#splash-user-info #twitter").remove();
		}
		
		// description input limiter
		var titleElem = "splash-user-bio";
		titleMax = 300;
		
		$("#" + titleElem).keydown(function (e) {
		check_charcount(titleElem, titleMax, e);
		});
		
		function check_charcount(titleElem, titleMax, e) {
			if (e.which != 8 && $("#" + titleElem).text().length > titleMax) {
			e.preventDefault();
			}
		}
                
		
		$(document).ready(function() {
			$("#user-panel, #book-scroller").delay(5000).fadeIn(5000);
		});
		
		//cleans up text when copty/paste
		$('[contenteditable]').on('paste',function(e) {
			e.preventDefault();
			var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
			document.execCommand('insertText', false, text);
		});
		
		// Load Gapelia
                $(function () {

                    NProgress.start();

                    $("#user-panel, #book-scroller").css("opacity", "0").show();

                    var
                    allBooks = $("#user-book-list li"), // gets all books in a section
                        firstBook = $(allBooks).first(); // gets first book in list
                    $(allBooks).not(firstBook).hide(); // hides all books in a section, except the first book

                    setTimeout(function () {

                        // $("#user-book-list").hide();
                        $("#user-book-list").css("opacity", "0").show();

                        if ($vW > "1024") {
                            $("#user-book-list .book").css("height", $vH - 97 + "px");
                        }

                        $(".book").imgLiquid({
                            fill: true
                        });

                        var w = 0,
                            h = 0;

                        $("#user-book-list li").each(function () {
                            w += $(this).outerWidth();
                            h += $(this).outerHeight();
                        });

                        w += 500;

                        if ($vW > "1024") {
                            $("#user-book-list").css("width", w + 320 + "px");

                                                                                  
                        }
                        getContributedTo();
                        getRecentlyPublished();
                        loadDelete();

                        NProgress.done();

                        $("#user-book-list").css("opacity", "1");

                        // fades in the all the books after section width is added
                        $("#user-book-list li").fadeIn("100");
                        $("#user-book-list").fadeIn("100");

                        // "fix" featured menu pop-in // not even sure if this is a problem anymore, I forget
                        setTimeout(function () {
                            $("#user-panel, #book-scroller").css("opacity", "1");
                        }, 600);
			
			
			setTimeout(function () {
			$("#user-book-list li").fadeIn("100");
			$("#user-book-list").fadeIn("100");
			if ($vW > "1024") {
		
					var options = {
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
					};
						
					var slyBookWrapper = new Sly('.user-book-list-wrapper', options);
					var items = $('#user-book-list');
			
					loadMoreUserBooks(5,items);
			
			
					slyBookWrapper.on('load change', function () {
						if (this.pos.dest > this.pos.end - 200) {
						loadMoreUserBooks(5,items);
							
						    $(".book").css("height", h);
						    $(".book-snippet").css("display", "block")
						    
						   this.reload();
						}
					});
			
				    h = $(this).outerHeight() - 92;
				    $(".book").css("height", h);
				    $("#user-book-list li").fadeIn("100");
				    $("#user-book-list").fadeIn("100");
				    if ($vW > "300") {
					$(".book-snippet").css("display", "block")
				    }
			
				       slyBookWrapper.init();
				}
		
		
			}, 1000);
			
                    });
                });
            });
        }
    </script>
    
    <script src="/static/scripts/filepicker2.js"></script>

    <script>
        $(function () {
            $(".overlay-controls button").addClass("transparent-ii").text("Change cover photo");
        });
    </script>

</body>

</html>
