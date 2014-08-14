<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title></title>

    <!--/ PUBLIC PROFILE PAGE /-->

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
			<div class="mp-level"><h2><a href="/"></a></h2>
				<ul>
					<li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a></li>
					<li class="not-mobile"><a href="/librarymanager">Libraries</a></li>
					<li class="not-mobile"><a href="/createbook">New Story</a></li>
					<li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a><ul id="draft-menu"></ul></li>
					<li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#"></a><ul></ul></li>
				    <div id="footer-items">
						<li class="fq"><a href="/read/755">How It Works</a>
						<li class="help"><a href="mailto:team@folio.is">Report a bug</a>
						<li class="logout"><a href="#">Log Out</a>
				    </div>
				</ul>
			</div>
		</nav>
		
		<!--/ access-to-user-records /-->
		<div id="user-records" style="display: none;">
				<h5>Content</h5>
		<!--/ published /-->
				<h5 id="published-records"><span></span><div><a href="#">Stories</a></div></h5>
				<ul id="published-records-list"></ul>
		<!--/ contributions /-->
				<h5 id="contribution-records"><span></span><div><a href="#">Libraries</a></div></h5>
				<ul id="contribution-records-list"></ul>
		</div>
		
		<!--/ main-panel /-->
		<div id="user-panel">
			<button id="g-menu-toggle" class="notification-time">
				<span id="notification-count" style="display: none;"></span>
				<i class="ion-drag"></i>
			</button>
		</div>

		<!--/ main-scroller -- used for displaying books in mobile devices /-->
		<div id="book-scroller" style="z-index: 10;">
			<!--/ books /-->
			<div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>
			<div class="user-book-list-wrapper">
				<ul id="user-book-list"></ul>
			</div>
		</div>
	</div>

 	<!--/ scripts /-->
	<script src="/static/scripts/g.money.js"></script>
	<script src="/static/scripts/charLimiter.js"></script>
	<script src="/static/scripts/classie.js"></script>
	<script src="/static/scripts/mlpushmenu.js"></script>
	<script src="/static/scripts/ajax.js"></script>
	<script src="/static/scripts/userNotifications.js"></script>
	<script src="/static/scripts/autolinker.js"></script>

    <script>
	if($vW > "1024") {
		new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));
			
		$(".mp-pushed").ready(function () {
			$("#book-scroller").css("z-index", "0");
		});
			
		$(document).on("click", "#splash-edit-wrapper .quick-edit-profile, #splash-user-bio", function (e) {
			$("#splash-user-bio").attr("contenteditable", "true").css("background-color", "rgba(252, 252, 252, 0.3)").trigger("focus");
		});
			
		$("#book-scroller").remove();
	}
    </script>


    <script>
    $(function () {
        var first = getUserPublic();
	});

    // Splash page
    function load() {
		
        $(function () {
		
        stuff = "";
        stuff += "<section id=\"user-splash\" style=\"background-size: cover; background-position: 50% 50%;\">";
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
			stuff += "<div id=\"records-access\"><img src=\"/static/images/arrow-right.png\" style=\"height: 50px; width: 50px;\"/></div>";
		} else {
			stuff += "<div id=\"close-splash\"><img src=\"/static/images/arrow-down.png\"></div>";
		}
        stuff += "</section>";
		
        $("#mp-pusher").prepend(stuff);
		
		getUserMe();
		isFollowing();
		
		// Inserting user data //
		$("#splash-user-info h1, #user-header").text(user.name);
				
		if(user.avatarImage == undefined) {
			$("#user-splash").css("background-image", "url(/static/images/users/user-avatar.jpg)");
		} else {
			$(".avatar-wrapper").css("background-image", "url(" + user.avatarImage + ")");		
		}
				
		if(user.coverImage == undefined) {
			$("#user-splash").css("background-image", "url(/static/images/cover-bg.jpg)");
		} else {
			$("#user-splash").css("background-image", "url(" + user.coverImage + ")");		
		}
				
		if(user.bio == "") {
			$("#splash-user-bio").html("Click here to add a bio...");
		} else {
			$("#splash-user-bio").html(user.bio);
		}
				
		if(user.location != "") {
			$("#location").text(user.location);
		}
				
		if(user.personalWebsite != "") {
			$("#website").text(user.personalWebsite);
		}
		
		if(user.twt != "") {
			$("#twitter").text(user.twt);
		}
		
		$("#university").text(user.university);
		$("#department").text(user.department);

        $(function () {

        var $vW = $(window).width(),
            $vH = $(window).height();
			
			if($vW < "1025") {
				$("#mp-pusher").append('<ul id="featured-nav" style="display: none; z-index: 100;"><li id="nav-featured"><a href="/featured">Folio</a><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-featured"><a href="/libraryManager">Libraries</a></li><li id="nav-featured"><a href="/accounts">Account Settings</a></li><li id="gpl-menu-notify"><a>Notifications</a><a class="icon" style="margin-left: 10px; font-weight: 700;" href="#"></a><ul style="display: none; margin-top: 10px;"></ul></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>')
				
				$("#g-menu-toggle").click(function () {
					if (typeof user != "undefined") {
						$("#featured-nav").toggle();
						if ($("#featured-nav").css("display") == "block") {
							$(".follow, .unfollow").hide();
						} else {
							$(".follow, .unfollow").show();
							$("#user-splash .follow").hide();
						}
					} else {
						window.location.href = "/";
					}
				});
				
				$("#mp-pusher").css({"overflow-y": "scroll", "overflow-x": "hidden"});
					
				// Log Out
				$("#logout").click(function (e) {
					document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
					window.location = "";
				});
				
				//follow/unfollow buttons//
				if (alreadyFollowing) {
					$("#mp-pusher").append("<button class=\"unfollow brand-blue\" style=\"position: fixed; z-index: 1000000; right: 1rem; top: 1rem;\">Unfollow</button>");
					$("#user-splash .unfollow").remove();	
				} else {
					$("#mp-pusher").append("<button class=\"follow white-border\" style=\"position: fixed; z-index: 1000000; right: 1rem; top: 1rem;\">Follow</button>");
				}
			}
			
			if ($vW < "321") {
			    $("#user-panel #user-bio, #user-panel .button-wrapper").remove();
			}

			if ($vW > "1919") {
				$("#user-splash .unfollow").css("cssText", "left: 92.5% !important");
			}
			
			if ($vH > "1079") {
				$("#follow-user").css("cssText", "bottom: 94% !important");
			}
			
			if ($vH > "1190") {
				$("#user-splash #splash-user-info").css("cssText", "top: 25.5% !important");
			}
                
		$(document).ready(function() {
			if ($vW > "1025") {
								
				//Creates hrefs when user inputs a website in the bio//
				var myTextEl = document.getElementById( "splash-user-bio" );
				myTextEl.innerHTML = Autolinker.link( myTextEl.innerHTML );
								
				//show user records side menu//
				$("#records-access").click(function(){
					getPublicUserCreatedBooksList();
								
					$("#user-records").css("right", "0").fadeIn(100);
					$("#user-records .delete-draft").css("display", "none");
								
					//counters//
					setTimeout (function () {
						publishedLength = books.length;
						contributionsLength = contributions.length,
						$("#published-records span").html(""+publishedLength+"");
						$("#contribution-records span").html(""+contributionsLength+"");
					}, 1000 );		
				});
						
					$("#user-records").mouseleave(function(){
						$("#user-records").css("right", "-25%").fadeOut(100);
					});
				}
			});
		});
		
		// Load books
		$(function () {
			NProgress.start();
						
			getContributedTo();
			getRecentlyPublished();
			addLoggedInMenu();
				    
			NProgress.done();
						
			if($vW < "1025") {
				getPublicCreatedBooks();
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
					if(books.length > 5) {
						slyBookWrapper.on('load change', function () {
							if(this.pos.dest > this.pos.end - 200) {
								if (items.children().length <= books.length-1) {
									loadMorePublicUserBooks(1,items);
									this.reload();
								}		
							}
						});
					}
					slyBookWrapper.init();
				}	
				document.title = $("#user-name").text();
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
