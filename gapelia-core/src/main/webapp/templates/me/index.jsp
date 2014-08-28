<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title></title>
	
	<!--/ ME PAGE /-->
	
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
					<li id="gpl-menu-drafts" class="not-mobile"><a>My Drafts</a><ul id="draft-menu"></ul></li>
					<li class="not-mobile"><a href="/analytics">Analytics</a></li>
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
			var fifth = getNotifications();
			var first = getUser();
		});
		
		// metadata from Filepicker to get right file name from S3 //
		function insertBackgroundImage(file) {
			filepicker.stat({
					url: file
				}, {
					container: true,
					path: true
				}, function (metadata) {
					$('.spinner').show();
					$('.user-avatar').attr('src', url);
					$('#user-splash').css({
						'background-image': 'url("https://s3.amazonaws.com/' + metadata.container + '/' + metadata.path + '")',
						'background-position': '50% 50%',
						'background-repeat': 'no-repeat no-repeat',
						'background-size': 'cover'
					});
					$('.spinner').hide();
			});
		}
		
		// Splash page on load //
		function load() {

			$(function () {
				stuff = "";
				stuff += "<section id=\"user-splash\" style=\"background-size: cover; background-position: 50% 50%;\">";
				stuff += "<div class=\"overlay-controls\">";
				stuff += "<input type=\"filepicker\" id=\"change-cover-photo\" data-fp-apikey=\"AqrddQT2HQIebG8DinaqUz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" data-fp-maxSize=\"10485760*1024\" onchange=\"url=event.fpfile.url; insertBackgroundImage(url);\">";
				stuff += "</div>";
				stuff += "<div class=\"user-avatar\"><div class=\"avatar-wrapper\">";
				stuff += "<a href=\"#\" id=\"splash-edit-profile\">&#xf13d;</a>";
				stuff += "<div id=\"splash-edit-wrapper\">";
				if($vW > "1024") {
					stuff += "<a class=\"edit-profile\" href=\"/accounts\">Account Settings</a>";
					stuff += "<a class=\"quick-edit-profile\" href=\"#\">Edit Profile</a>";
				} else {
					stuff += "<a class=\"quick-edit-profile\" href=\"#\">Edit Profile</a>";
				}
				stuff += "</div></div></div>";
				stuff += "<div id=\"splash-user-info\">";
				stuff += "<h1 id=\"user-name\"></h1>";
				stuff += "<div id=\"user-box\"><div id=\"splash-user-bio\" contenteditable=\"false\"></div>";
				stuff += "<h5 id=\"recently-published\"></h5>";
				stuff += "<h5 id=\"contributes-to\"></h5></div></div>";
				stuff += "<ul id=\"user-extra\">";
				stuff += "<li id=\"location\"></li>"
				stuff += "<li id=\"university\"></li>";
				stuff += "<li id=\"department\"></li>";
				stuff += "<li><a id=\"website\"  target=\"blank\" href=\"" + user.personalWebsite + "\"></a></li>";
				stuff += "<li><a id=\"twitter\" target=\"blank\" href=\"http://www.twitter.com/" + user.twt + "\"></a></li>";
				stuff += "</ul></div>";
				if($vW > "1024") {
					stuff += "<div id=\"records-access\"><img src=\"/static/images/arrow-right.png\"/></div>";
				} else {
					stuff += "<div id=\"close-splash\"><img src=\"/static/images/arrow-down.png\"></div>";
				}
				stuff += "</section>";
				
				$("#mp-pusher").prepend(stuff);
				
				var element = $("#change-cover-photo");
				element = element[0];
				element.type = "filepicker";
				filepicker.constructWidget(element);
			});
			
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
				
		     // description input limiter
				var titleElem = "splash-user-bio";
				titleMax = 300;
				$("#" + titleElem).keydown(function (e) {
					check_charcount(titleElem, titleMax, e);
				});

				function check_charcount(titleElem, titleMax, e) {
					if(e.which != 8 && $("#" + titleElem).text().length > titleMax) {
						e.preventDefault();
					}
				}
		    
			// Responsive design //
			$(function () {
				var $vW = $(window).width(),
					$vH = $(window).height();
					
				if($vW < "1025") {
				    // Dropdown menu for mobile
					$("#mp-pusher").append('<ul id="featured-nav" style="display: none; z-index: 100;"><li id="nav-featured"><a href="/featured">Folio</a><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-featured"><a href="/libraryManager">Libraries</a></li><li id="nav-featured"><a href="/accounts">Account Settings</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>')
				    $("#g-menu-toggle").click(function () { $("#featured-nav").toggle(); });
					$("#mp-pusher").css({"overflow-y": "scroll", "overflow-x": "hidden"});
					$("#site-menu, #user-records").remove();
					
					// Log Out
					$("#logout").click(function (e) {
						document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
						window.location = "";
					});
				}
				
				if($vW > "1919") {
					$(".profile .follow").css("cssText", "left: 92.5% !important");
				}

		     $(document).ready(function () {
				    
				if ($vW > "1025") {
								
						//Creates hrefs when user inputs a website in the bio//
						var myTextEl = document.getElementById( "splash-user-bio" );
						myTextEl.innerHTML = Autolinker.link( myTextEl.innerHTML );
								
						//show user records side menu//
						$("#records-access").click(function(){
								getUserCreatedBooksList();
								
								$("#user-records").css("right", "0").fadeIn(100);;
								$("#user-records .delete-draft").css("display", "none");
								
								//counters//
								setTimeout (function () {
										publishedLength = books.length;
										contributionsLength = contributions.length,
										$("#published-records span").html(""+publishedLength+"");
										$("#contribution-records span").html(""+contributionsLength+"");
								}, 100 );		
						});
						
								$("#user-records").mouseleave(function(){
										$("#user-records").css("right", "-25%").fadeOut(100);
								});
						}
				});
			 
				//cleans up text when copty/paste
				$('[contenteditable]').on('paste', function (e) {
					e.preventDefault();
					var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
					document.execCommand('insertText', false, text);
				});
		
				// Load books
				$(function () {
					NProgress.start();
						
				    getContributedTo();
				    getRecentlyPublished();
				    loadDelete();
				    
					NProgress.done();
						
				    if($vW < "1025") {
						getUserBooksArray();
						var options = {};
								var slyBookWrapper = new Sly('.user-book-list-wrapper', options);
								var items = $('#user-book-list');
								
								loadMoreUserBooks(5, items);
								
								//show load more button when more than 10 books//
								if(books.length > 5){
										if ($vW > "321") {
												$("#user-book-list").append("<div style=\"text-align: center; padding-bottom: 4rem; width: 100%;\"><button id=\"load-more\">Load More</button></div>");
										} else {
												$("#user-book-list").append("<div style=\"text-align: center; padding-bottom: 4rem; position: relative; top: 1.5rem; width: 100%;\"><button id=\"load-more\">Load More</button></div>");
										}
								}
			
								//load more calculating difference between total and 10 firstly loaded//
								$("#load-more").click(function(){
									$("#load-more").hide();
									if (books.length > 5) {
											loadMoreUserBooks(books.length - 6,items);		
										}
								});
						}
							
						document.title = user.name;
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
