<%@include file="../../tools.jsp" %>
<%@ page import="com.gapelia.core.api.Libraries" %>
<%@ page import="com.gapelia.core.model.Library" %>
<%@ page import="com.gapelia.core.database.QueryUtils" %>
<%
	String currentURL = "http://folio.is"+getUrl(request);
	Integer libraryId = getIdFromUrl(request);
	if(!isValidLibraryId(libraryId)) {
		//out.println("This library doesn't exist in the database!");
		response.sendRedirect("/");
		return;
	}
	Library library = QueryUtils.getLibraryFromLibraryId(libraryId);
	User user = QueryUtils.getUserFromLibraryId(libraryId);

	String author = user.getName();
	String title = library.getTitle();
	String snippet = library.getDescription();
	String coverPhoto = library.getCoverPhoto();

%>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<!-- Search tags -->
	<title></title>
	<meta name="author" content="<%= author %>" />
	<meta name="description" content="<%= snippet %>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	
	<!-- for Facebook -->
	<meta property="og:title" content="<%= title %>" />
	<meta property="og:type" content="article" />
	<meta property="og:image" content="<%= coverPhoto %>" />
	<meta property="og:url" content="<%= currentURL %>" />
	<meta property="og:description" content="<%= snippet %>" />
	
	<!-- for Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="<%= title %>" />
	<meta name="twitter:description" content="<%= snippet %>" />
	<meta name="twitter:image" content="<%= coverPhoto %>" />
	
	<link href="/static/css/style.css" rel="stylesheet" />
	<link href="/static/css/slytest.css" rel="stylesheet" />
	<link href="/static/images/favicon.png" rel="shortcut icon" />
	
	<script src="//use.typekit.net/web3vzl.js"></script>
	<script src="/static/scripts/modernizr.custom.js"></script>
	<script src="/static/scripts/jquery-2.1.0.min.js"></script>
	<script src="/static/scripts/sly.js"></script>
	<script src="/static/scripts/nprogress.js"></script>
	<script src="/static/scripts/ajax.js"></script>
</head>

<body class="app library">
	<div id="mp-pusher" class="super-wrapper">
		<!--/ site-menu /-->
		<nav id="site-menu" class="mp-menu">
			<div class="mp-level">
				<h2><a href="/"></a></h2>
				<ul>
					<li><a href="/">Sign up</a> </li>
					<li><a href="/read/755">Learn more</a></li>
				</ul>
			</div>
		</nav>
		
		<!--/ main-panel /-->
		<div id="featured-panel">
			<button id="g-menu-toggle" class="notification-time">	<span id="notification-count" style="display: none;"></span>
				<i class="ion-drag"></i>
			</button>
		</div>
		
		<ul id="edit-shortcut">
				<a href="#" class="edit-library">Edit Library</a>
		</ul>
		
		<ul id="stay-right">
			<li id="my-submissions"><a class=submission-dropdown href="#">Submit a story</a>
				<ul></ul>
			</li>
		</ul>
		
		<!--/ access-to-user-records /-->
		<div id="archive-container" style="display: none;">
				<h5>Content</h5>
		<!--/ published /-->
				<h5 id="archive-title"><span></span><div><a href="#">Stories</a></div></h5>
				<ul id="archive-list"></ul>
		</div>
		
		<div id="contact-editor"><a href="#">Contact Editor</a>	
		</div>
		
		<!--/ main-content /-->
		<div id="featured-scroller">
			<div id="nav-wrapper">
				<ul id="featured-nav" style="display: none;">
					<li id="nav-books" class="current">
						<a></a>
					</li>
					<li id="nav-submissions"><a href="#">Review Submissions</a>
					</li>
				</ul>
			</div>
			
		<!--/ Featured Books /-->
			<div class="scrollbar">
				<div class="handle">
					<div class="mousearea"></div>
				</div>
			</div>
			<div class="book-list-wrapper">
				<ul id="book-list"></ul>
			</div>
			<div class="submission-list-wrapper">
				<ul id="submission-list"></ul>
			</div>
		</div>
	</div>
	
	<!--/ scripts /-->
	<script src="/static/scripts/g.money.js"></script>
	<script src="/static/scripts/autolinker.js"></script>
	<script src="/static/scripts/userNotifications.js"></script>
	<script src="/static/scripts/classie.js"></script>
	<script src="/static/scripts/mlpushmenu.js"></script>
	<script>
		
		if($vW > "1024") {
			new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));
			
			$(".mp-pushed").ready(function () {
				$("#book-scroller").css("z-index", "0");
			});
			
			$("#contact-editor").click(function () {
				window.location.href = "mailto:" + libraryOwner.email + "";
			})	
		}
		
		if($vH > "1190") {
			$(".book-list-wrapper").css("cssText", "top: 50.5% !important");
		}
	</script>
	
	<script>
		libraryId = document.URL.split("/")[document.URL.split("/").length - 1];
		$(document).ready(function () {
			sessionId = readCookie("JSESSIONID");
			$.ajax({
				url: "/api/users/getUser",
				contentType: "application/x-www-form-urlencoded;charset=utf-8",
				type: "POST",
				async: false,
				data: {
					sessionId: sessionId
				},
				success: function (data) {
					user = data;
				}
			});
			
			if(typeof user != 'undefined') {
				var first = getListSubscribed();
				var second = getListBookmarked();
			} else {
				$("#stay-right").html("<div style=\"position: absolute; z-index: 100; right: 0rem; top: 0.5rem; font-size: 1rem; width: 130px;\"><a href=\"/\" class=\"new-user white-border\" style=\"border-radius: 5px; padding: 6px 10px 7px 10px;\">Submit a Story</a></div>");
			}
			
			getNumSubscribers();
			getUserFromLibraryId(libraryId);
			
		    //scroll animation when clicking on down arrow//
			setTimeout(function(){
				$("#arrow-down, #read-more").click(function() {
					$('html, body').animate({
						scrollTop: $("#about-section").offset().top
					}, 1500);
				});
			}, 1000); 
		});

		function load() {
		    //Creates hrefs when a website link is part of the description//
			var myTextEl = document.getElementById( "library-extra" );
			myTextEl.innerHTML = Autolinker.link( myTextEl.innerHTML );
			var myTextElTwo = document.getElementById( "about-section" );
			myTextElTwo.innerHTML = Autolinker.link( myTextElTwo.innerHTML );
			
			if($vW > "1024") {
				
				if (typeof user == "undefined"){
						getLastBookInLibrary();
				}
				
				//archive side menu//
				$("#library-archive").click(function(){
						getBooksInLibraryArray();
						
						$("#mp-pusher").css("overflow-y", "hidden"); //prevents issues when about section exists//
						
						var items = $('#archive-list');
						
						if ($("#archive-title span").html() == "") { //aka if archive has not been previously open//
								loadMoreBooksInLibraryArchive(5, items);
								
								//show load more button when more than 10 books//
								setTimeout( function(){
										
										//book counter//
										publishedLength = $("#archive-list li").length;
										$("#archive-container span").html(""+publishedLength+"");
								}, 1000);
						}
						
						$("#archive-container").css("right", "0").show();	
				});
						
				$("#archive-container").mouseleave(function(){
						$("#archive-container").css("right", "-35%").fadeOut(100);
						$("#mp-pusher").css("overflow-y", "initial");
				});
				
				//scroll animation when clicking on down arrow//
				setTimeout(function(){
					$("#more-info").click(function() {
						$('html, body').animate({
							scrollTop: $("#about-section").offset().top
						}, 1500);
					});
					
				//hide arrow on scroll//
				$(window).scroll(function() {
						if ($(this).scrollTop()>0) {
							$("#arrow-down, #close-splash, #contact-editor, #library-share").fadeOut("slow");	
						} else {
							$("#arrow-down, #close-splash, #contact-editor, #library-share").fadeIn("slow");	
						}
				});	
					
				}, 1000);
				
				//hide arrow and about section when not needed//
				if (library.about == undefined || library.about == "") {
					$("#arrow-down, #more-info, #about-section").remove()
				}
				
				//add footer with latest post//
				setTimeout(function(){
						if (books.length != 0) {
								bookId = books[0].bookId;
								footer = "";
								getUserFromBookIdLibraryFooter();
								footer += "<hr><h5>Latest Story</h5><section>";
								footer += "<a href=\"/read/"+books[0].bookId+"\"><img src=\""+books[0].coverPhoto+"\"></a>";
								footer += "<p id=\"last-book-title\"><a href=\"/read/"+books[0].bookId+"\">"+books[0].title+"</a><a id=\"last-book-owner\" href=\"/"+bookOwnerLastPost.userId+"\"> by "+bookOwnerLastPost.name+"</a></p>";
								footer += "<p id=\"last-book-snippet\">"+books[0].snippet+"</p>";
								footer += "<div id=\"browse-more\"><button>Browse more stories...</button></div></section>"
								$("#about-section section").append(footer);
						}
				}, 1000);		
				
				// load books after clicking and using Sly //
				$(document).on("click", "#close-splash, #browse-more", function () {
				    getBooksInLibraryArray();
				    
				    $("#library-splash, #close-splash, #contact-editor, #about-section, .new-user-ii, .new-user").hide();
				    $("#featured-nav, #book-list").fadeIn("fast").css("cssText", "display: block !important");
				    if ($(".book-list-wrapper li").length == 0){
						$("#featured-scroller").append("<div style=\"height: 100%; width: 100%; background-color: rgba(11, 72, 107, 0.05); opacity: 0.75; position: absolute; top: 0; z-index: 100000;\" id=\"loading-view\"><div style=\"left: 25%; width: 50%; position: absolute; text-align: center;\"><img src=\"../static/images/loading-books.gif\" style=\"margin-top: 45%;\"><p style=\"margin-top: 1rem;\"><b>Be Curious</b></p></div>");
						setTimeout(function() {
								$("#loading-view").fadeOut('slow').remove();
						}, 1000);
				    }
					
					if(typeof user == 'undefined') {
						$("#stay-right").html("<a href=\"/\" class=\"new-user-ii\" style=\"border: none !important; color: black !important; opacity: 0.75 !important; position: absolute !important; text-decoration: underline !important; top: 0.5rem !important; right: -4rem !important; width: 300px !important;\">Sign up and start contributing</a>");
					}
					
					setTimeout(function () {
						h = $(this).outerHeight() - 92;
						$(".book").css("height", h);
						
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
							
						var slyBookWrapper = new Sly('.book-list-wrapper', options);
						var items = $('#book-list');
						loadMoreBooksInLibrary(5, items);
							if(books.length > 5) {
								slyBookWrapper.on('load change', function () {
									if(this.pos.dest > this.pos.end - 200) {
										if(items.children().length <= books.length - 1) {
											loadMoreBooksInLibrary(1, items);
											$(".book").css("height", h);
											this.reload();
										}
									}
								});
							}
						h = $(this).outerHeight() - 92;
						$(".book").css("height", h);;
						$(".submission-dropdown").css({"background-color": "#transparent","border-color": "#59B3A6","border-width": "0","color": "#59B3A6"});
							
						slyBookWrapper.init();
					}, 1000);
				});
			}
			
			// submissions confirm popup
			$(document).on("click", "#stay-right ul li a", function () {
				$("#submission-pop").css({"display": "block"});
			});
			
			// Hide submission dropdown when click outisde
			$(document).mouseup(function (e) {
				var container = $("#stay-right ul, #submission-pop");
				// if the target of the click isn't the container...
				if(!container.is(e.target) && container.has(e.target).length === 0) {
					container.hide(); // ... nor a descendant of the container
				}
			});
			
			// Click "Add my stories"
			$("#my-submissions a").click(function (e) {
				$("#my-submissions ul").toggle();
				e.preventDefault();
			});
			
			// Load Books
			NProgress.start();
			$("#featured-panel, #featured-scroller").css("opacity", "0").show();
			
			var allBooks = $("#book-list li"), // gets all books in a section
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
				if($vW > "1024") {
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
			NProgress.done();
			
			// Click "Title of Library"
			$("#nav-books").click(function (e) {
				
				//back to cover page and also back to books in case editor was reviewing submissions//
				$("#library-splash, #about-section, .new-user-ii, .new-user").fadeIn("slow");
				$("#book-list, #featured-nav").css("cssText", "display: none !important");
				$("#stay-right").html("<div style=\"position: absolute; z-index: 100; right: 0rem; top: 0.5rem; font-size: 1rem; width: 130px;\"><a href=\"/\" class=\"new-user white-border\" style=\"border-radius: 5px; padding: 6px 10px 7px 10px;\">Submit a Story</a></div>");
				$(".submission-dropdown").css({
						"border-color":"rgba(255, 255, 255, 0.53)",
						"border-width":"1px",
						"color":"white"
				});
				
				NProgress.start();
				var allBooks = $("#book-list li"), // gets all books in a section
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
					if($vW > "1024") {
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
			
			//delete draft	
			loadDelete();
			
			// Click "Submissions"
			$("#nav-submissions").click(function (e) {
				NProgress.start();
				var allBooks = $("#submission-list li"), // gets all books in a section
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
					
					if($vW > "1024") {
						$("#submission-list").css("width", w - 155 + "px");
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
						var slyBookWrapper = new Sly('.submission-list-wrapper', options);
						var items = $('#submission-list');
						/*loadMoreSubmissions(5,items);
						slyBookWrapper.on('load change', function () {
							if (this.pos.dest > this.pos.end - 200) {
							loadMoreSubmissions(5,items);
			
								$(".book").css("height", h);
								$(".book-snippet").css("display", "block")
								
							   this.reload();
							}
						});*/
						h = $(this).outerHeight() - 92;
						$(".book").css("height", h);
						$("#submission-list li").fadeIn("100");
						$("#submission-list").fadeIn("100");
						if($vW > "300") {
							$(".book-snippet").css("display", "block")
						}
						slyBookWrapper.init();
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
			if($vW < "1025") {
				$("#featured-scroller").css("cssText", "height: auto !important;");
				$("#featured-panel .featured-info, #library-splash .expand, #library-splash .new-user, #right-half, #about-section").remove();
				$("#g-menu-toggle").click(function () {
						if (typeof user !=  "undefined") {
								$("#mp-pusher").append('<ul id="featured-nav" style="display: block; z-index: 100;"><li id="nav-featured"><img id="close-mobile-menu" style="height: 50px; left: 1rem; position: absolute; top: 12px; width: 50px;" src="/static/images/folio-icon-solid.png"><a href="/featured">Folio</a><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-featured"><a href="/libraryManager">Libraries</a></li><li id="nav-featured"><a href="/accounts">Account Settings</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');
								$("#close-mobile-menu").click(function(){ $("#featured-nav").remove(); })
						} else {
								window.location.href = "/";
						}
				});
				
				//subscribed/unsubscribe buttons//
				if (typeof user != "undefined") {
						if(library.libraryId in subscribed == true) {
							$("#featured-panel").append("<button class=\"unsubscribe brand-blue\" style=\"font-size: 0.8rem; position: absolute; top: 1.3rem; right: 1.3rem;\">Unsubscribe</button>");
							$(".subscribe, #library-splash .unsubscribe").remove();
						} else {
							$("#featured-panel").append("<button class=\"subscribe white-border\" style=\"font-size: 0.8rem; position: absolute; top: 1.3rem; right: 1.3rem;\">Subscribe</button>");
							$("#library-splash .subscribe").remove();
						}	
				}
			}
			
			if($vW > "1919") {
				$("#edit-shortcut").css("top", "2.25rem");
			}
			
			if($vW < "421") {
				$(".book-snippet").css("display", "block");
				$(".library #library-splash h1").remove();
				$("#featured-panel .subscribe").css({
					"font-size": "0.6rem",
					"right": "1.5rem",
					"top": "1.5rem"
				});
			}
			h = $(this).outerHeight() - 92;
			$(".book").css("height", h);
		}
		setTimeout(function () {
			getLibrary();
			
			//library owner can edit//
			if (typeof user != "undefined") {
				if (libraryOwner.userId != user.userId) {
					$("#edit-shortcut").remove();
				}
			} else {
				$("#edit-shortcut").remove();
			}
			$(".edit-library").attr("href", "/editlibrary/"+ library.libraryId +"");
			
			//remove library archive if not logged in//
			if (typeof user == "undefined") {
				$("#library-archive").remove(); 
			}
			
			//getBooksInLibraryArray();
			if(typeof user != 'undefined') {
				getSubmissionsInLibrary();
				getUserCreatedBooksForLibrary();
			}
			load();
		}, 300);
		
		setTimeout(function () {
			if($vW < "1025") {
				getBooksInLibraryArray();
				var options = {};
				var slyBookWrapper = new Sly('.book-list-wrapper', options);
				var items = $('#book-list');
				
				loadMoreBooksInLibrary(5, items);
				
				//show load more button when more than 10 books//
				if(books.length > 5){
					if ($vW > "321") {
						$("#book-list").append("<div style=\"text-align: center; padding-bottom: 4rem; width: 100%;\"><button id=\"load-more\">Load More</button></div>");
					} else {
						$("#book-list").append("<div style=\"text-align: center; padding-bottom: 4rem; position: relative; top: 1.5rem; width: 100%;\"><button id=\"load-more\">Load More</button></div>");
					}
				}
			
				//load more calculating difference between total and 10 firstly loaded//
				$("#load-more").click(function(){
					$("#load-more").hide();
					if (books.length > 5) {
							loadMoreBooksInLibrary(books.length - 6,items);		
						}
				});
				
				h = $(this).outerHeight() - 92;
				$(".book").css("height", h);
				$("#book-list li").fadeIn("100");
				$("#book-list").fadeIn("100");
				if($vW > "300") {
					$(".book-snippet").css("display", "block")
				}
				slyBookWrapper.init();
			}
			addLoggedInMenu();
			
			// Log Out
			$(".logout").click(function (e) {
				document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
				window.location = "/";
			});
			
			document.title = library.title;
		}, 2000);
		
		 //subscribing + unsubscribing calls//
		$(document).on("click", ".subscribe", function (ev) {
			sessionId = readCookie("JSESSIONID");
			$.ajax({
				url: "/api/actions/subscribeLibrary",
				contentType: "application/x-www-form-urlencoded;charset=utf-8",
				type: "POST",
				data: {
					sessionId: sessionId,
					libraryId: libraryId
				},
				error: function (q, status, err) {
					if(status == "timeout") {
						alert("Request timed out");
					}
				}
			});
		});
		
		$(document).on("click", ".unsubscribe", function (ev) {
			sessionId = readCookie("JSESSIONID");
			$.ajax({
				url: "/api/actions/removeSubscriptionLibrary",
				contentType: "application/x-www-form-urlencoded;charset=utf-8",
				type: "POST",
				data: {
					sessionId: sessionId,
					libraryId: libraryId
				},
				error: function (q, status, err) {
					if(status == "timeout") {
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
						if(status == "timeout") {
							alert("Request timed out");
						}
					}
				});
			});
			
			$("#library-splash .expand").click(function (e) {
				$("#library-splash, #contact-editor, #stay-right, #g-menu-toggle").fadeOut("slow").css("cssText", "display: none");
				$("#mp-pusher").append("<div id=\"expanded-cover\" style=\"display: block !important\"><img src=\"" + library.coverPhoto + "\"></div>");
				$("#mp-pusher").append("<div id=\"library-data\"><p class=\"lib-title\">" + library.title + ", edited by " + libraryOwner.name + "</p><button id=\"resize-back\"><img src=\"../static/images/eye-close.png\"</button></div>");
				$("#mp-pusher").css("overflow", "scroll");
				$("#resize-back").click(function () {
					window.location.href = "/library/" + library.libraryId;
				});
			});
		}, 3000);
	</script>
	<!--//scripts /-->
</body>

</html>