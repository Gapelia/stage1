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
                    <li><a href="/">Sign up</a> </li>
		    <li><a href="/read/755">Learn more</a></li>
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
        <div id="book-scroller" style="z-index: 10;">
            <!--/ your-books /-->
	    	<div class="scrollbar">
			<div class="handle">
				<div class="mousearea"></div>
			</div>
		</div>
            <div class="user-book-list-wrapper">
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
    <script src="/static/scripts/classie.js"></script>
    <script src="/static/scripts/mlpushmenu.js"></script>
    <script src="/static/scripts/ajax.js"></script>
    <script src="/static/scripts/userNotifications.js"></script>
	<script src="/static/scripts/autolinker.js"></script>

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
	    getNotifications();
            var first = getUserPublic();
            var second = getListBookmarked();
            var third = getUserDrafts();
		});

         // Splash page
        function load() {

        h = $(this).outerHeight() - 92;
        $(".book").css("height", h);
        // Splash page
        $(function () {
		
		
        stuff = "";
        stuff += "<section id=\"user-splash\">";
        stuff += "<div class=\"user-avatar\"><div class=\"avatar-wrapper\">";
        stuff += "</div></div>";
        stuff += "<div id=\"splash-user-info\">";
        stuff += "<h1 id=\"user-name\"></h1>";
        stuff += "<div id=\"user-box\"><div id=\"splash-user-bio\" contenteditable=\"false\"></div>";
        stuff += "<h5 id=\"recently-published\"></h5>";
        stuff += "<h5 id=\"contributes-to\"></h5></div></div>";
		stuff += "<ul id=\"user-extra\">";
		stuff += "<li id=\"location\"></li>";
		stuff += "<li id=\"university\"></li>";
		stuff += "<li id=\"department\"></li>";
		stuff += "<li><a id=\"website\"  target=\"blank\" href=\"" + user.personalWebsite + "\"></a></li>";
		stuff += "<li><a id=\"twitter\" target=\"blank\" href=\"http://www.twitter.com/" + user.twt + "\"></a></li>";
		stuff += "</ul>";
        stuff += "</div>";
		if ($vW > "1024") {
			stuff += "<div id=\"close-splash\">See all posts</div>";
		} else {
			stuff += "<div id=\"close-splash\">^</div>";
		}
        stuff += "<img class=\"page-bg\" src=\"/static/images/cover-bg.jpg\"/>";	
        stuff += "</section>";
        $("#mp-pusher").prepend(stuff);
		
		getUserMe();
		isFollowing();
		getPublicBooksArray();

		//hide archive buttons if less than two published books//
		if (books.length < 2) { $("#close-splash").remove() }

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
                    $("#g-menu-toggle").css({
					"color": "#70a1b1",
					"width": "7.5%"
					});
	            $(".user-book-list-wrapper, #user-header").css("opacity", "1");
                    $("#user-header").css("opacity", "1");

                });
		
            } 

            $(function () {

            var $vW = $(window).width(),
                $vH = $(window).height();

            // Dropdown menu for mobile
            if ($vW < "1025") {
		    $("#featured-scroller").append("<span id='category-title'>[ Library Name ]</span>");
		    $("#user-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Folio</a><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-featured"><a href="/me">Me</a></li><li id="nav-featured"><a href="/libraryManager">Libraries</a></li><li id="nav-featured"><a href="/accounts">Account Settings</a></li><li id="gpl-menu-notify"><a>Notifications</a><a class="icon" style="margin-left: 10px; font-weight: 700;" href="#"></a><ul style="display: none; margin-top: 10px;"></ul></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');	    
		    $("#mp-pusher").css({
				"overflow-y": "scroll",
				"overflow-x": "hidden"
			});
			
		    //follow/unfollow buttons//
		    if (alreadyFollowing) {
			    $("#mp-pusher").append("<button class=\"unfollow brand-blue\" style=\"position: fixed; z-index: 1000000; right: 1rem; top: 1rem;\">Unfollow</button>");
			    $("#user-splash .unfollow").remove();	
		    } else {
			    $("#mp-pusher").append("<button class=\"follow white-border\" style=\"position: fixed; z-index: 1000000; right: 1rem; top: 1rem;\">Follow</button>");
		    } 
		    
		    $(function () {
    
			if ($vW < "321") {
			    $("#user-panel #user-bio, #user-panel .button-wrapper").remove();
			}
			if ($vW < "321") {
			    $(".book-snippet").css("display","block")
			}
    
			$("#g-menu-toggle").click(function () {
			    $("#featured-nav").toggle();
				
			    if ($("#featured-nav").css("display") == "block") {
				$(".follow, .unfollow").hide();
			    } else {
				$(".follow, .unfollow").show();
				$("#user-splash .follow").hide();
			    }
    
			});
    
		    });
    
		    // Log Out
		    $("#logout").click(function (e) {
			document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			window.location = "";
		    });

                }
		
		if ($vW > "1919") {
		    $("#user-splash .unfollow").css("cssText", "left: 92.5% !important");
		    $("#user-splash #close-splash").css("cssText", "left: 85%");
		}
		
		if ($vH > "1079") {
		    $(".user-book-list-wrapper").css("cssText", "top: 51% !important");
		    $("#close-splash, #follow-user").css("cssText", "bottom: 94% !important");
		}
		
		if ($vH > "1190") {
		    $(".user-book-list-wrapper").css("cssText", "top: 50.5% !important");
		    $("#user-splash #splash-user-info").css("cssText", "top: 25.5% !important");
		}
		

        // User details
        $("#splash-user-info h1, #user-header").text(user.name);
		$("#location").text(user.location);
		$("#university").text(user.university);
		$("#department").text(user.department);
		$("#website").text(user.personalWebsite);
		$("#twitter").text(user.twt);
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
		    $("#splash-user-bio").html("This user has not added a bio yet.");
		}
		else{
		    $("#splash-user-bio").html(user.bio);
		}
		
		if (user.location == "") {
		    $("#location").remove();
		}
		
		if (user.personalWebsite == "") {
		    $("#website").remove();
		}
		
		if (user.twt == "") {
		    $("#twitter").remove();
		}
		
		var fourth = getPublicBooksArray();
                
		$(document).ready(function() {
			$("#user-panel, #book-scroller").delay(5000).fadeIn(5000);
			
			//Creates hrefs when user inputs a website in the bio//
			var myTextEl = document.getElementById( "splash-user-bio" );
			myTextEl.innerHTML = Autolinker.link( myTextEl.innerHTML );
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
			getFollowingUsers();
			addLoggedInMenu();
                        loadDelete();

                        NProgress.done();

                        $("#user-book-list").css("opacity", "1");

                        // fades in the all the books after section width is added
                        $("#user-book-list li").fadeIn("100");
                        $("#user-book-list").fadeIn("100");
			
                        // "fix" featured menu pop-in // fix height of books
                        setTimeout(function () {
                            $("#user-panel, #book-scroller").css("opacity", "1");
			    if ($vW > "1024") {
				$("#user-book-list .book").css("height", $vH - 97 + "px");
			    }
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
			
					loadMorePublicUserBooks(5,items);
			
					if(books.length > 1){
					    
					    slyBookWrapper.on('load change', function () {
						if (this.pos.dest > this.pos.end - 200) {
						    if (items.children().length <= books.length-1) {
						    loadMorePublicUserBooks(1,items);
				
							$(".book").css("height", h);
							$(".book-snippet").css("display", "block")
							    
							this.reload();
						    }
					        } 	
					    });
					}    
			
				    h = $(this).outerHeight() - 92;
				    $(".book").css("height", h);
				    $("#user-book-list li").fadeIn("100");
				    $("#user-book-list").fadeIn("100");
				    if ($vW > "300") {
					$(".book-snippet").css("display", "block")
				    }
			
				    slyBookWrapper.init();
				}
				
			if ($vW < "1025") {
				
				getUserCreatedBooks();

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
		
				loadMoreBooks(20,items);
		
		
				if(books.length > 4){
				
					slyBookWrapper.on('load change', function () {
						if (this.pos.dest > this.pos.end - 200) {
						loadMoreBooks(20,items);
			
						    $(".book").css("height", h);
						    $(".book-snippet").css("display", "block")
						    
						   this.reload();
						}
					});
				}	
		
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
		
		// Follow User
		$(document).on("click", "button.follow", function () {
		    $(this).removeClass("follow white-border").addClass("unfollow brand-blue").text("Unfollow");
		    
		    sessionId = readCookie("JSESSIONID");
		    
		    $.ajax({
			url: "/api/users/followUser",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
			    sessionId: sessionId,
			    followerId: profileUserId
			},
			error: function (q, status, err) {
			    if (status == "timeout") {
				alert("Request timed out");
			    }
			}
		    });  
		});
		
		// Un-Follow User
		$(document).on("click", "button.unfollow", function () {
    
		    $(this).removeClass("unfollow brand-blue").addClass("follow white-border").text("Follow");
		    
		    sessionId = readCookie("JSESSIONID");
		    
		    $.ajax({
			url: "/api/users/unFollowUser",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
			    sessionId: sessionId,
			    followerId: profileUserId
			},
			error: function (q, status, err) {
			    if (status == "timeout") {
				alert("Request timed out");
			    }
			}
		    });  
		});
            });
	    
	//code to make draft deletion work here...for some reason it wasnt working from ajax.js//
	setTimeout(function () {
		$(".dd-link").click(function (e) {
			$(this).next(".delete-draft").toggle();
			e.preventDefault();
		});
		
		$(".nay-dd").click(function () {
			$(this).closest(".delete-draft").hide();
		});
		
		$(".yay-dd").click(function () {
			e = $(this).closest(".yay-dd");
			console.log("deleting");
			bookId = e.parent().parent().attr("id");
			$(this).closest("li").remove();
			sessionId = readCookie("JSESSIONID");
			$.ajax({
				url: "/api/books/deleteBook",
				contentType: "application/x-www-form-urlencoded;charset=utf-8",
				type: "POST",
				data: {
					sessionId: sessionId,
					bookId: bookId
				},
				error: function (q, status, err) {
					if (status == "timeout") {
						alert("Request timed out");
					}
				}
			});
		});
	}, 2000);	
        }
    </script>

    <script src="/static/scripts/filepicker2.js"></script>

</body>

</html>
