<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    
    <!-- Search tags --> 
    <title></title>
    <meta name="author" content="" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        
    <!-- for Facebook -->  
    <meta property="og:title" content=""/>
    <meta property="og:type" content="article"/>
    <meta property="og:image" content=""/>
    <meta property="og:url" content=""/>
    <meta property="og:description" content=""/>
    
    <!-- for Twitter -->          
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content=""/>
    <meta name="twitter:description" content=""/>
    <meta name="twitter:image" content=""/>


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
                <h2><a href="/featured">Gapelia</a></h2>
		<ul>
                    <li><a href="/">Sign up</a> </li>
		    <li><a href="/read/755">Learn more</a></li>
                </ul>
            </div>
        </nav>

        <!--/ main-panel /-->
        <div id="featured-panel">
        	<button id="g-menu-toggle" class="notification-time">
			<span id="notification-count" style="display: none;"></span>
        		<i class="ion-drag"></i>
        	</button>
        </div>
	
	<ul id="stay-right">
		
		<li id="my-submissions">
		    <a class=submission-dropdown href="#">Submit a story</a>
                        <ul></ul>
                </li>
        </ul>
	
	<div id="contact-editor"><a href="#">Contact Editor</a></div>
	
	<!--/ main-content /-->
        <div id="featured-scroller">
            <div id="nav-wrapper">
                <ul id="featured-nav" style="opacity: 0;">
                    <li id="nav-books" class="current"><a></a></li>
		    <li id="nav-submissions"><a href="#">Review Submissions</a></li>
                </ul>
            </div>

            <!--/ Featured Books /-->
	    	<div class="scrollbar">
			<div class="handle">
				<div class="mousearea"></div>
			</div>
		</div>
            <div class="book-list-wrapper" style="opacity: 0;">
                <ul id="book-list"></ul>
            </div>
	    
	    <div class="submission-list-wrapper">
                <ul id="submission-list"></ul>
            </div>
        </div>

    </div>

    <!--/ scripts /-->
    <script src="/static/scripts/touchSwipe.min.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/userNotifications.js"></script>

    <script src="/static/scripts/classie.js"></script>
    <script src="/static/scripts/mlpushmenu.js"></script>

    <script>
        if ($vW > "1024") {
            new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

            $(".mp-pushed").ready(function () {
                $("#book-scroller").css("z-index", "0");
            });
	    
	    $("#contact-editor").click(function(){
		window.location.href = "mailto:"+libraryOwner.email+"";
	    })
        }

        $(document).on("ready", function () {
            $(".book").imgLiquid({
                fill: true
            });
        });
	
	if ($vH > "1190") {
		$(".book-list-wrapper").css("cssText", "top: 50.5% !important");
		$(".mp-menu ul .fq").css("cssText", "margin-top: 260% !important");
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
		   
		   if (typeof user != 'undefined') {
			
			
			var first = getListSubscribed();
			getNotifications();
			  var second = getListBookmarked();
		   }
		   else{
			$("#stay-right").html("<div style=\"position: absolute; z-index: 100; right: 1rem; top: 0.5rem; font-size: 1rem; width: 130px;\"><a href=\"/\" class=\"new-user white-border\" style=\"border-radius: 5px; padding: 6px 10px 7px 10px;\">Submit a Story</a></div>");
		   }
		   
               getNumSubscribers();
	       
               getUserFromLibraryId(libraryId);
	       
	       getBooksInLibraryArray();
            
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
                        "right": "initial",
			"background-image": "none"
                    });

		    $("#library-splash").css("left", "-200%");
		    $(".book-list-wrapper, #featured-nav").css("opacity", "1");
                    $("#g-menu-toggle").css("color", "#70a1b1");
		    $(".submission-dropdown").css({
			"background-color": "#transparent",
			"border-color": "#59B3A6",
			"border-width": "0",
			"color": "#59B3A6"
		     });
		    
		    if (typeof user == 'undefined') {
			$("#stay-right").html("<a href=\"/\" class=\"new-user-ii\" style=\"border: none !important; color: black !important; opacity: 0.75 !important; position: absolute !important; text-decoration: underline !important; top: 0.5rem !important; right: -4rem !important; width: 300px !important;\">Sign up and start contributing</a>");
		    } 	
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
			    $(".book-list-wrapper, #featured-nav").css("opacity", "1");
			    $("#featured-panel").append("<span id=\"category-title\"><a>"+ library.title + "</a></span>");
			    $("#featured-panel").css({
				"background-color": "white",
				"border-bottom": "1px solid rgba(89, 179, 166, 0.5)"
			    });
			    $("#featured-panel .subscribe").remove();
			    $("#featured-scroller").css("background-color", "white");
			    $(".library h1").remove();
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
			$(".book-list-wrapper, #featured-nav").css("opacity", "1");
			$("#featured-panel").append("<span id=\"category-title\"><a>"+ library.title + "</a></span>");
			$("#featured-panel").css({
				"background-color": "white",
				"border-bottom": "1px solid rgba(89, 179, 166, 0.5)"
			});
			$("#featured-panel .subscribe").remove();
			$("#featured-scroller").css("background-color", "white");
			$(".library h1").remove();
                    });
		    
		    

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
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				container.hide(); // ... nor a descendant of the container
			}

		});
	    
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

            NProgress.done();

            // Click "Title of Library"
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
	    
		//delete draft	
		loadDelete();

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
		    if ($vW > "300") {
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
            if ($vW < "1025") {
		
		$("#featured-scroller").css("cssText", "overflow-y: scroll !important");

                $("#featured-panel .featured-info").remove();

                $("#featured-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Folio</a><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-featured"><a href="/me">Me</a></li><li id="nav-featured"><a href="/libraryManager">Libraries</a></li><li id="nav-featured"><a href="/accounts">Account Settings</a></li><li id="gpl-menu-notify"><a>Notifications</a><a class="icon" style="margin-left: 10px; font-weight: 700;" href="#"></a><ul style="display: none; margin-top: 10px;"></ul></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');	    
		
		$(document).on("click", "#g-menu-toggle", function () {
                    $("#featured-nav").toggle();
                });

                // Log Out
                $(".logout").click(function (e) {
                    document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    window.location = "";
                });

            }
	    if ($vW < "1025") {
		$("#library-splash .subscribe").remove();
		$("#featured-panel").append("<button class=\"subscribe white-border\" style=\"font-size: 0.8rem; position: absolute; top: 1.3rem; right: 1.3rem;\">Subscribe</button>")
	    }
	    
            if ($vW < "421") {
                $(".book-snippet").css("display","block");
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
            //getBooksInLibrary();
	    getBooksInLibraryArray();
	    
	    if (typeof user != 'undefined') {
			getSubmissionsInLibrary();
			getUserCreatedBooksForLibrary();
	     }
	    
            load(); 				    	 	
        }, 300);
         setTimeout(function () {
                    h = $(this).outerHeight() - 92;
                    $(".book").css("height", h);

	$(".book").css("height", h);
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
			
			loadMoreBooksInLibrary(5,items);
	
			if(books.length > 4){
			
				slyBookWrapper.on('load change', function () {
					if (this.pos.dest > this.pos.end - 200) {
					loadMoreBooksInLibrary(5,items);
		
					    $(".book").css("height", h);
					    $(".book-snippet").css("display", "block")
					    
					   this.reload();
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

		loadMoreBooksInLibrary(20,items);


		if(books.length > 4){
		
			slyBookWrapper.on('load change', function () {
				if (this.pos.dest > this.pos.end - 200) {
				loadMoreBooksInLibrary(20,items);
	
				    $(".book").css("height", h);
				    $(".book-snippet").css("display", "block")
				    
				   this.reload();
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
		
		addLoggedInMenu();
		document.title = library.title;
	    
		//Meta Tags//
		document.title = library.title + " edited by " + libraryOwner.name;
		$('meta[property="author"]').attr('content', libraryOwner.name);
		$('meta[property="description"]').attr('content', library.description);
		
		//Chaging Facebook Meta Tags//
		$('meta[property="og:title"]').attr('content', library.title);
		$('meta[property="og:description"]').attr('content', library.description);
		$('meta[property="og:image"]').attr('content', library.coverPhoto);
		$('meta[property="og:url"]').attr('content', 'http://folio.is/library/' + libraryId);
	    
	       //Changing Twitter Meta Tags//
	       $('<meta[name="twitter:title"]').attr('content', library.title);
	       $('<meta[name="twitter:description"]').attr('content', library.description);
	       $('<meta[name="twitter:image"]').attr('content', library.coverPhoto);
	       
		
        },2000);
	 
	 
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
			if (status == "timeout") {
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
			if (status == "timeout") {
			    alert("Request timed out");
			}
		    }
		});
	});
	
    </script>
    <!--//scripts /-->

</body>

</html>
