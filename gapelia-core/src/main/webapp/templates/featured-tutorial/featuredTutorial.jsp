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
		
		<!--/ tutorials /-->	
		<section id="featuredTutorial" style="position: absolute; z-index: 1000;">
			<p id="intro-tutorial"><b>Welcome to Folio's homepage.</b></br></br>Here, you you will find the most relevant articles tailored to the libraries and authors you've subscribed to.</br></br>Click on the arrow and scroll the page to the <b>right</b> with your mousepad or right/left keyboard.</p>
			</br><a><img id="right-tutorial" src="../static/images/right-tutorial.png"></a>
			<a href="/" style="bottom: 1rem; right: 1rem; font-size: 1.5rem; position: absolute;">Skip Tutorial</a>
		</section>
		
		<section id="featuredTutorialTwo" style="display: none; position: absolute; z-index: 1000;">
			<p id="intro-tutorial"><b>Stories:</b> recommended articles for you.</br></br><b>Bookmarks:</b> your collected articles to read later.</br></br><b>Following:</b> users you follow.</br></br>In addition, you can click the magnifying glass to <b>search</b> for specific content.</p>
			</br><button id="next-intro-final" class="branded">Continue Tutorial</button>
			<a href="/" style="bottom: 1rem; right: 1rem; font-size: 1.5rem; position: absolute;">Skip Tutorial</a>
		</section>
		
		<section id="featuredTutorialThree" style="display: none; position: absolute; z-index: 1000;">
			<p id="intro-tutorial">Access the main <b>menu</b> by clicking on the Folio icon.</br></br>Click on it and select <b>"New Story"</b> to finish this tutorial.</br></br></p>
			<a href="/" style="bottom: 1rem; right: 1rem; font-size: 1.5rem; position: absolute;">Skip Tutorial</a>
		</section>
		<!--/ tutorials /-->
	
		<!--/ site-menu /-->
		<nav id="site-menu" class="mp-menu">
			<div class="mp-level"><h2><a href="/"></a></h2>
				<ul>
					<li><a>Me</a><a class="icon not-mobile">&#xf13d;</a></li>
					<li class="not-mobile"><a>Libraries</a></li>
					<li class="not-mobile"><a href="/createbook">New Story</a></li>
					<li id="gpl-menu-drafts" class="not-mobile"><a>My Drafts</a>
						<ul id="draft-menu"></ul>
					</li>
					<li class="not-mobile"><a>Analytics</a></li>
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

		<!--/ main-panel /-->
			<div id="featured-panel" style="opacity: 0.25;">
				<button id="g-menu-toggle" class="notification-time">
					<span id="notification-count" style="display: none;"></span>
					<i class="ion-drag"></i>
				</button>

				<div class="featured-info">
					<h2>Gapelia</h2>
				</div>
			</div>

			<span id="welcoming-title">A Laboratory of Ideas</span>
			<!--//main-panel /-->

			<!--/ main-content /-->
			<div id="featured-scroller" style="opacity: 0.25;">
				<div id="nav-wrapper">
					<ul id="featured-nav">
						<li id="nav-books" class="current"><a href="#">Stories</a></li>
						<li id="nav-bookmarks"><a href="#">My Bookmarks</a></li>
						<li id="nav-following"><a href="#">Following</a></li>
						
						<div id="nav-search" style="display: inline-block; margin-left: 21%; opacity: 0.3;"><img href="#" src="../static/images/search.png" style="height: 18px; width: 18px;"><p id="search-ii" style="position: absolute; margin-left: 20px; top: 23px;"></p></div>		    
						<input class="typeahead" placeholder="Search stories and libraries..." style="display: none;"></input>

						<div id="stay-right">
							<button id="start-story" class="brand-i"><a href="/createbook">New Story</a>
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
						value: '<a href=\"http://folio.is/read/' + book.bookId + '\"><img src=\"'+book.coverPhoto+'\" height=50px width=50px>'+book.title+'</a>',
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
		new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

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
		
		//tutorial experience//
		$("#right-tutorial").click(function(){
			$("#featuredTutorial").fadeOut();
			$("#featured-scroller, #featured-panel").css("opacity", "1").fadeIn();
			$("#book-list a").removeAttr("href");
		});	
		
		$("#next-intro-final").click(function(){
			$("#featuredTutorialTwo, #featured-scroller").hide();
			$("#featuredTutorialThree").fadeIn();
			$("#featured-panel").css("z-index", "10000");
		});
	}	
	
	if ($vW > "1919") {
		$(".mp-pushed").ready(function () {
			$("#nav-search").css("margin-left", "34%");
		});
		
		$("#featuredTutorialTwo #intro-tutorial").css("cssText", "width: 52% !important");
	}
	
	$(function () {
		getNotifications();
		getListSubscribed();
		var second = getBookmarksArray();
		var fourth = getListBookmarked();
		var fifth = getLibraries();
	});	

	function load() {
		getFeaturedBookArray();

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
							$("#featuredTutorialTwo").show();
							$(".book-list-wrapper").css("opacity", "0.15");
	
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

		// Mobile and size optimization stuff//
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

		}
</script>
<!--//scripts /-->

</body>

</html>
