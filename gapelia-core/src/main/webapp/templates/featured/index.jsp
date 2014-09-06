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
	<script src="/static/scripts/typeahead.js"></script>
	<script src="/static/scripts/nprogress.js"></script>

</head>

	<!--/ <body class="app profile"> /-->

<body class="app">

		<div id="mp-pusher" class="super-wrapper">
	
		<!--/ site-menu /-->
		<nav id="site-menu" class="mp-menu">
			<div class="mp-level"><h2><a href="/"></a></h2>
				<ul>
					<li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a></li>
					<li class="not-mobile"><a href="/librarymanager">Libraries</a></li>
					<li class="not-mobile"><a href="/createbook">New Story</a></li>
					<li id="gpl-menu-drafts" class="not-mobile"><a>My Drafts</a>
						<ul id="draft-menu"></ul>
					</li>
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
		<!--//site-menu /-->
		
		<span id="welcoming-title">A Laboratory of Ideas</span>
		
		<!--/ main-panel /-->
			<div id="featured-panel">
				<button id="g-menu-toggle" class="notification-time">
					<span id="notification-count" style="display: none;"></span>
					<i class="ion-drag"></i>
				</button>

				<div class="featured-info">
					<h2></h2>
				</div>
			</div>
			
			<!--//main-panel /-->
			
						<!--/ Featured Books /-->
				<div class="book-list-wrapper-list">
					<ul id="book-list-list"></ul>
				</div>
		
			<!--/ main-content /-->
			<div id="featured-scroller">
				<div class="scrollbar">
					<div class="handle">
						<div class="mousearea"></div>
					</div>
				</div>
				
				<!--/ Featured Books /-->
				<div class="book-list-wrapper">
					<ul id="book-list"></ul>
				</div>

				<!--/ User's Bookmarks /-->
				<div class="bookmark-list-wrapper">
					<ul id="bookmark-list"></ul>
				</div>

				<!--/ Subscription List /-->
				<div class="following-list-wrapper">
					<ul id="following-list"></ul>
				</div>
				<!--//main-content /-->

			</div>

<!--/ scripts /-->
<script src="/static/scripts/g.money.js"></script>
<script src="/static/scripts/userNotifications.js"></script>
<script src="/static/scripts/ajax.js"></script>
<script src="/static/scripts/feedback.js"></script>
<script src="/static/scripts/classie.js"></script>
<script src="/static/scripts/mlpushmenu.js"></script>

<script>
	// instantiate the bloodhound suggestion engine
	var books = new Bloodhound({
		datumTokenizer: function (d) {
			return Bloodhound.tokenizers.whitespace(d.value);
		},
		
		limit: 20,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: 'http://folio.is/api/utils/search/%QUERY',
			filter: function (results) {
				return $.map(results.books, function (book) {
					return {
						value: '<a href=\"http://folio.is/read/' + book.bookId + '\"><img src=\"'+book.coverPhoto+'\" height=50px width=50px>'+book.title+'</a>'
					}
				}); 
			}
		}
	});
	
	var libraries = new Bloodhound({
		datumTokenizer: function (d) {
			return Bloodhound.tokenizers.whitespace(d.value);
		},
		
		limit: 20,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: 'http://folio.is/api/utils/search/%QUERY',
			filter: function (results) {
				return $.map(results.libraries, function (library) {
					return {
						value: '<a href=\"http://folio.is/library/' + library.libraryId + '\"><img src=\"'+library.coverPhoto+'\" height=50px width=50px>'+library.title+'</a>'
					}
				});
			}
		}
	});
	
	// initialize the bloodhounds!
	books.initialize();
	libraries.initialize();
	
	// instantiate the typeahead UI
	$('.typeahead').typeahead({
		highlight: true,
		hint: false,
		minLength: 2
	},
	{
		name: 'books',
		displayKey: 'value',
		source: books.ttAdapter(),
		templates: {
			header: '<center><h5 class="label-name" style="font-size: 0.7rem; margin-top: 0.2rem; opacity: 0.7; text-transform: uppercase;">Stories</h5></center>'
		}
	},
	{
		name: 'libraries',
		displayKey: 'value',
		source: libraries.ttAdapter(),
		templates: {
			header: '<center><h5 class="label-name" style="font-size: 0.7rem; margin-top: 0.5rem; opacity: 0.7; text-transform: uppercase;">Libraries</h5></center>'
		}
	});

	if ($vW > "1024") {
		
		//Inserting menus and search UI//
		$(function () {
				var toInsert = "";
				toInsert += "<div id=\"nav-wrapper\"><ul id=\"featured-nav\">";
				toInsert += "<li id=\"nav-books\" class=\"current\"><a href=\"#\">Stories</a></li>";
				toInsert += "<li id=\"nav-bookmarks\"><a href=\"#\">My Bookmarks</a></li>";
				toInsert += "<li id=\"nav-following\"><a href=\"#\">Following</a></li>";
				toInsert += "<div id=\"nav-search\" style=\"display: inline-block; margin-left: 21%; opacity: 0.3;\"><img href=\"#\" src=\"../static/images/search.png\" style=\"height: 18px; width: 18px;\"><p id=\"search-ii\" style=\"position: absolute; margin-left: 20px; top: 23px;\"></p></div>";		    
				toInsert += "<input class=\"typeahead\" placeholder=\"Search stories and libraries...\" style=\"display: none;\"></input>";
				toInsert += "<div><a id=\"view-change\" style=\"font-size: 1rem; position: absolute; right: 8.5rem; top: 1.7rem;\">LIST VIEW</a></div>";
				toInsert += "<div><a id=\"view-change-back\" style=\"display: none; font-size: 1rem; position: absolute; right: 8.5rem; top: 1.7rem;\">HORIZONTAL VIEW</a></div>";
				toInsert += "<div><a id=\"start-story\" href=\"/createbook\" style=\"font-size: 1rem; position: absolute; right: 1.5rem; top: 1.7rem;\">NEW STORY</a></div>";
				toInsert += "<div id=\"contactable\"></div></ul></div>";	
				
				$("#mp-pusher").append(toInsert);
		});		
		
		//side menu opens//
		new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));
				$("#g-menu-toggle").click(function() {
						$("#nav-wrapper").css("z-index", "0");
				});
				$("#mp-pusher").click(function() {
						$("#nav-wrapper").css("z-index", "1");
				});

		$(".mp-pushed").ready(function () {
			$("#book-scroller").css("z-index", "0");
			$("#welcoming-title").css("display", "none");
		});
		
		//hide and show search engine//
		$("#nav-search").mouseenter(function () {
			$(".typeahead").css("display", "inline-block");
			$("#nav-search").hide();
		});
		
		$(".book-list-wrapper, .bookmark-list-wrapper, .following-list-wrapper").mouseenter(function () {
			$(".typeahead").css("display", "none");
			$("#nav-search").fadeIn("slow");
		});
		
		//feedback form//
		$('#contactable').contactable({
			subject: 'A Feeback Message'
		});
		
		//hide search box after clicking on item//
		$(".tt-dropdown-menu").click(function () {
			$(".typeahead").css("display", "none");
		});
		
		//view changes//
		$("#view-change").click(function () {
				$("#view-change-back").show();
				$(".book-list-wrapper, #contactable, #view-change").hide();
				$(".book-list-wrapper-list").fadeIn("slow");
				$("#nav-wrapper").css("z-index", "100000");
				$("#featured-panel").css("z-index", "1000000");
				$(".super-wrapper").css("background-color", "white");
				$("#featured-panel").css("position", "fixed");
				$("#nav-wrapper").css({"background-color": "white", "height": "75px", "z-index": "1000"});
				$("#mp-pusher").append("<div style=\"height: 100%; width: 100%; background-color: white; opacity: 0.75; position: absolute; z-index: 1000000;\" id=\"loading-view\"><div style=\"left: 25%; width: 50%; position: absolute; text-align: center;\"><img src=\"http://i.stack.imgur.com/FhHRx.gif\" style=\"margin-top: 45%;\"><p style=\"margin-top: 1rem;\"><b>Be Curious</b></p></div>");
				setTimeout(function(){
						var items = $('#book-list-list');
						loadMoreBooksListView(20,items)		
				}, 100);
				
				setTimeout(function() {
					$("#loading-view").fadeOut('slow').remove();
				}, 3000);
				$("#g-menu-toggle").click(function() {
						$("#nav-wrapper, .book-list-wrapper-list").css("z-index", "0");
						$(".app").css("overflow-y", "hidden");
				});
				$("#mp-pusher").click(function() {
						$("#nav-wrapper, .book-list-wrapper-list").css("z-index", "100000");
						$(".app").css("overflow-y", "auto");
				});
		});
		
		//view changes//
		$("#view-change-back").click(function () {
				$("#view-change-back").hide();
				$("#view-change").fadeIn();
				$(".book-list-wrapper-list").hide();
				$(".book-list-wrapper").fadeIn("slow");
				$("#mp-pusher").append("<div style=\"height: 100%; width: 100%; background-color: white; opacity: 0.75; position: absolute; z-index: 1000;\" id=\"loading-view\"><div style=\"left: 25%; width: 50%; position: absolute; text-align: center;\"><img src=\"http://i.stack.imgur.com/FhHRx.gif\" style=\"margin-top: 45%;\"><p style=\"margin-top: 1rem;\"><b>Be Curious</b></p></div>");
				setTimeout(function() {
					$("#loading-view").fadeOut('slow').remove();
				}, 2000);
		});
   }
	
	if ($vW > "1919") {
		$(".mp-pushed").ready(function () {
			$("#nav-search").css("margin-left", "34%");
		});
	}
	
	$(function () {
		getNotifications();
		getListSubscribed();
		var second = getBookmarksArray();
		var fourth = getListBookmarked();
		var fifth = getLibraries();

		$(".dd-link").off().click(function () {
			$(this).next(".delete-draft").toggle();
		});

		$(".nay-dd").off().click(function () {
			$(this).closest(".delete-draft").hide();
		});

		$(".yay-dd").off().click(function () {
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
	});	

	function load() {
		getFeaturedBookArray();
		getFollowingUsers();

		var $vW = $(window).width(),
		$vH = $(window).height();
		
		h = $(this).outerHeight() - 92;
		
		$(".book, .library").css("height", h);
		$("#book-list li").fadeIn("100");
		$("#book-list").fadeIn("100");
		
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
			
			var slyBookWrapper = new Sly('.book-list-wrapper', options);
			var items = $('#book-list');

			loadMoreBooks(5,items);

			if(books.length > 5){
				slyBookWrapper.on('load change', function () {
					if (this.pos.dest > this.pos.end - 200) {
						if (items.children().length <= books.length-1) {
							loadMoreBooks(1,items);
	
							$(".book").css("height", h);
							$(".book-snippet").css("display", "block")
	
							this.reload();
						}	
					}
				});
			} 

			h = $(this).outerHeight() - 92;
			$(".book").css("height", h);
			$("#book-list li").fadeIn("100");
			$("#book-list").fadeIn("100");
			if ($vW > "300") {
				$(".book-snippet").css("display", "block")
			}

			slyBookWrapper.init();
		}

		if ($vW < "1025") {

			var options = {};
			var slyBookWrapper = new Sly('.book-list-wrapper', options);
			var items = $('#book-list');

		    loadMoreBooks(10,items);	
			 
			//show load more button when more than 10 books//
			if(books.length > 10){
				if ($vW > "321") {
						$("#book-list").append("<div style=\"text-align: center; padding-bottom: 4rem; width: 100%;\"><button id=\"load-more\">Load More</button></div>");
				} else {
						$("#book-list").append("<div style=\"text-align: center; padding-bottom: 4rem; position: relative; top: 1.5rem; width: 100%;\"><button id=\"load-more\">Load More</button></div>");
				}
			}
			
			//load more calculating difference between total and 10 firstly loaded//
		    $("#load-more").click(function(){
				$("#load-more").hide();
				if (books.length > 10) {
						loadMoreBooks(books.length - 11,items);		
				}
		    });		
			

			h = $(this).outerHeight() - 92;
			$(".book").css("height", h);
			$("#book-list li").fadeIn("100");
			$("#book-list").fadeIn("100");
			if ($vW > "300") {
				$(".book-snippet").css("display", "block")
			}

			slyBookWrapper.init();
			
			//responsive optimizations//
		    $("#featured-scroller, .book-list-wrapper").css("cssText", "overflow-y: scroll !important");
		    $(".bookmark-list-wrapper, .following-list-wrapper, #featured-panel .featured-info").remove();
		    $(".book-list-wrapper").css({"top": "450px", "background-color": "white"})
		    $("#featured-scroller").css({"z-index": "10"})
		    $("#featured-scroller").append('<button id="g-menu-toggle" class="notification-time"><span id="notification-count">0</span><i class="ion-drag"></i></button>');
		    $(".book-list-wrapper").append("<div id=\"footer-menu\"><ul><li><a href=\"/libraryManager\">Explore Libraries</a></li><li><a href=\"/me\">My Profile</a></li><li><a href=\"/accounts\">Account Settings</a></li><li><a href=\"/#\">Log Out</a></li></ul></div>")
				
		    // Log Out
		    $("#logout").click(function (e) {
				document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				window.location = "";
		    });
		}

		//more responsive optimizations//
		if ($vW < "361") {
			$(".book-snippet").css("display", "block")
			$(".book-list-wrapper").css({"top": "300px", "background-color": "white"});
		}
	
		if ($vW > "1599") {
			$("#contactable-contactForm").css("cssText", "top: 76% !important");
		}
	
		if ($vW > "1919") {
			$(".app .following-list-wrapper img").css("cssText", "left: 37% !important");
		}

		//imacs specs//
		if ($vH > "1079") {
			$(".book-list-wrapper, .bookmark-list-wrapper, .following-list-wrapper").css("cssText", "top: 53% !important");
			$("#contactable-inner").css("cssText", "top: 92% !important");
			$("#contactable-contactForm").css("cssText", "top: 80% !important");
		}
		
		if ($vH > "1190") {
			$("#contactable-contactForm").css("cssText", "top: 82% !important");
			$("#contactable-inner").css("cssText", "top: 93% !important");
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

					$("#view-change").show();
					$("#following-list").hide();
					$("#bookmark-list").hide();
					$(".bookmark-list-wrapper section, .bookmark-list-wrapper p, .following-list-wrapper p").remove();

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
				$("#nav-following").removeClass("current");
				$("#nav-bookmarks").removeClass("current");

				NProgress.done();

			});

		//delete draft	
		loadDelete();

		// Click "Bookmarks"
		$("#nav-bookmarks").click(function (e) {

				NProgress.start();

				var allBooks = $("#bookmark-list li"), // gets all books in a section
					firstBook = $(allBooks).first(); // gets first book in list

				$(allBooks).not(firstBook).hide(); // hides all books in a section, except the first book

				setTimeout(function () {

					$("#book-list, #book-list-list, #view-change").hide();
					$("#following-list").hide();
					$(".following-list-wrapper p").remove();

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

						var slyBookWrapper = new Sly('.bookmark-list-wrapper', options);
						var items = $('#bookmark-list');

						loadMoreBookmarks(5,items);


						if(bookmarks.length > 5){

							slyBookWrapper.on('load change', function () {
								if (this.pos.dest > this.pos.end - 200) {
									if (items.children().length <= bookmarks.length-1) {
										loadMoreBookmarks(1,items);
	
										$(".book").css("height", h);
										$(".book-snippet").css("display", "block")
	
										this.reload();
									}	
								}
							});
						}

						h = $(this).outerHeight() - 92;
						$(".book").css("height", h);
						$("#bookmark-list li").fadeIn("100");
						$("#bookmark-list").fadeIn("100");
						if ($vW > "300") {
							$(".book-snippet").css("display", "block")
						}

						slyBookWrapper.init();
					}

				}, 1000);

		e.preventDefault();
		
		$("#nav-books").removeClass("current");
		$("#nav-following").removeClass("current");
		$("#nav-bookmarks").addClass("current");
		
		NProgress.done();

		});

		// Click "Following"
		$("#nav-following").click(function (e) {

		NProgress.start();

				var allBooks = $("#following li"), // gets all books in a section
					firstBook = $(allBooks).first(); // gets first book in list

				$(allBooks).not(firstBook).hide(); // hides all books in a section, except the first book

				setTimeout(function () {

					$("#book-list, #book-list-list, #view-change").hide();
					$("#bookmark-list").hide();
					$(".bookmark-list-wrapper p").remove();

					var w = 0,
					h = 0;

					$("#following-list li").each(function () {
						w += $(this).outerWidth();
						h += $(this).outerHeight();
					});

					w += 500;

					// fades in the all the books after section width is added
					$("#following-list li").fadeIn("100");
					$("#following-list").fadeIn("100");
					$(".following-list-wrapper section").css("width", $vW + "px");

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

						var slyBookWrapper = new Sly('.following-list-wrapper', options);
						var items = $('#following-list');
						
						loadMoreUsers(5,items);
						
						if(friends.length > 5){
							slyBookWrapper.on('load change', function () {
								if (this.pos.dest > this.pos.end - 200) {
									if (items.children().length <= friends.length-1) {
										loadMoreUsers(1,items);
	
										$(".book").css("height", h);
										$(".book-snippet").css("display", "block")
	
										this.reload();
									}	
								}
							});
						}

						h = $(this).outerHeight() - 92;
						$(".book").css("height", h);
						$("#following-list li").fadeIn("100");
						$("#following-list").fadeIn("100");
						
						slyBookWrapper.init();
				}

				//unfollow user//
				$("#following-list .unfollow").click(function () {
					$(this).removeClass("unfollow brand-blue").addClass("follow white-border").text("Follow");
					
					e = $(this).closest("button");
					profileUserId = e.parent().parent();
					profileUserId = profileUserId.attr("id");
					a = parseInt(profileUserId);
					
					sessionId = readCookie("JSESSIONID");
					profileUserId = friend.userId;
					
					$.ajax({
						url: "/api/users/unFollowUser",
						contentType: "application/x-www-form-urlencoded;charset=utf-8",
						type: "POST",
						data: {
							sessionId: sessionId,
							followerId: a
						},
						error: function (q, status, err) {
							if (status == "timeout") {
								alert("Request timed out");
							}
						}
					});  
				});
		
		}, 1000);

				e.preventDefault();
				
				$("#nav-books").removeClass("current");
				$("#nav-following").addClass("current");
				$("#nav-bookmarks").removeClass("current");
				
				NProgress.done();
				
				});
		}
</script>
<!--//scripts /-->

</body>

</html>
