<!DOCTYPE html>
<html lang="en">

<head>
	
    <meta charset="utf-8" />

    <title></title>
    <meta name="author" content="" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    
    <meta property="og:title" content=""/>
    <meta property="og:image" content=""/>
    <meta property="og:url" content=""/>
    <meta property="og:description" content=""/>
    
    <link href="/static/images/favicon.png" rel="shortcut icon" />

    <link href="/static/css/style.css" rel="stylesheet" />
    <link href="/static/css/fluidbox.css" rel="stylesheet" />

    <script defer src='http://www.readrboard.com/static/engage.js'></script>

    <script src="/static/scripts/modernizr.custom.js"></script>
    <script src="/static/scripts/jquery-2.1.0.min.js"></script>

</head>

<body class="app full-book g-body">

    <div id="mp-pusher" class="super-wrapper">

        <!--/ site-menu /-->
        <nav id="site-menu" class="mp-menu">
            <div class="mp-level">
                <h2><a href="/featured">Gapelia</a></h2>
		<ul>
                    <li><a href="/">Sign up</a> </li>
		    <li><a href="#">Learn more</a></li>
                </ul>
            </div>
        </nav>
        <!--//site-menu /-->

        <button id="g-menu-toggle" class="notification-time">
		<span id="notification-count" style="display: none;"></span>
                <i class="ion-drag"></i>
        </button>

        <header>
            <div id="header-info">
                <span id="header-title"></span>
                <span id="header-author"></span>
            </div>

            <ul class="share-book"></ul>
        </header>

        <div id="bb-nav-prev">&#xf153;</div>
        <div id="bb-nav-next">&#xf154;</div>
        <!--/ div id="the-book" /-->
        <div id="the-book" class="bb-custom-wrapper">
            <div id="bb-bookblock" class="bb-bookblock">
            </div>
	    	<ul id="stay-right">
			<li id="my-libraries">
			    <a class=submission-dropdown href="#">&#9733;</a>
				<ul></ul>
			</li>
		</ul>
		<ul id="collection-pop" style="display: none;"><p>Story added to library<p/></ul>
        </div>

    </div>

    <!--/ scripts /-->
    <script src="/static/scripts/nprogress.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/books.js"></script>
    <script defer src='http://www.readrboard.com/static/engage.js'></script>

    <script src="/static/scripts/classie.js"></script>
    <script src="/static/scripts/mlpushmenu.js"></script>

    <script src="/static/scripts/jquery.mousewheel.js"></script>
    <script src="/static/scripts/vimeothumb.js"></script>

    <!--/ scripts/page-flip /-->
    <script src="/static/scripts/jquerypp.custom.js"></script>
    <script src="/static/scripts/bookblock.js"></script>

    <!--/ scripts/fluidbox /-->
    <script src="/static/scripts/imagesloaded.min.js"></script>
    <script src="/static/scripts/fluidbox.min.js"></script>

    <script src="/static/scripts/ajax.js"></script>
    <script src="/static/scripts/userNotifications.js"></script>
    <script src="/static/scripts/readBook.js"></script>
    
    <script src="/static/scripts/cookie.js"></script>
    <script src="/static/scripts/merci.js"></script>
    
    
     <script>
				$(function () {
					if (typeof user != "undefined")
						getCreatedLibrariesForBook();
					else
						$(".submission-dropdown").remove();
					});
    </script>
    
    <script>
	
	
        // Hide logo after 100px when scrolling book on mobile
	$(window).scroll(function() {
		if ($(window).scrollTop() < 100) {
		    $("#g-menu-toggle").show();
		}
		else {
		    $("#g-menu-toggle").hide();
		}
	});
	
	// Click "Collect to Libraries"
        $("#the-book #my-libraries a").click(function (e) {

		$("#my-libraries ul").toggle();
		e.preventDefault();
		
		$("#stay-right .submission-dropdown").addClass("clicked-list");


        });

	
	// submissions confirm popup
		
	$(document).on("click", "#my-libraries ul a", function () {
		$("#collection-pop").css({"display": "block"});
		
		setTimeout(function() {
		$("#collection-pop").fadeOut("slow");
		}, 2500);
	});
	
	// Hide submission dropdown when click outisde

	$(document).mouseup(function (e) {

	var container = $("#my-libraries ul, #collection-pop");
	var clicked = $("#stay-right .clicked-list");

	// if the target of the click isn't the container...
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.hide(); // ... nor a descendant of the container
		clicked.removeClass();
	}

	});
	
	// Dropdown menu for mobile
        if ($vW < "1024") {
        
        $(".bookmark-list-wrapper").remove();
                        
        $("#featured-panel .featured-info").remove();
        $("#featured-panel").append('<span id="category-title">Explore Libraries</span>');
        
        $("#featured-panel").append('<ul id="featured-nav" style="display: none;"><li id="nav-profile"><a href="/featured"></a>Folio</li><li id="nav-profile"><a href="/featured">Featured</a></li><li id="nav-profile"><a href="/me">Me</a></li><li id="nav-accounts"><a href="accounts" id="accounts">Account Settings</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');
        
        $("#book-list").append('<li class="book" id="book-cta"><p><a href="#">Explore</a> some of our featured topic-based libraries.</p><img src="/static/images/covers/bg.jpg" alt=""/></li>');
        
        $(document).on("click", "#g-menu-toggle, #nav-books", function () {
        $("#featured-nav").toggle();
        });
	}
	
	if ($vW > "1919") {
		$(".notification-time #notification-count").css("cssText", "right: 5.5rem !important");
	}

        setTimeout(function () {
        loadDelete();
            $(".fluid-wrapper").imgLiquid({
                fill: true
            });
	    $(".photo-wrapper .page-bg-wrapper").imgLiquid({
                fill: true
            });
            $(".overlay-wrapper").imgLiquid({
                fill: true
            });
            $(".phototext-wrapper").imgLiquid({
                fill: true
            });
            $(".vertical-wrapper .draggable-placeholder").imgLiquid({
                fill: true
            });

            $(".photo-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");
            
	    
	   
	book = getFullBookFromBookId(current.bookId);
	
	 //Meta Tags//
	    document.title = current.title + " by " + bookOwner.name;
	    $('meta[property="author"]').attr('content', bookOwner.name);
	    $('meta[property="description"]').attr('content', book.snippet);
	    
	//Chaging Facebook Meta Tags//
	    $('meta[property="og:title"]').attr('content', current.title);
	    $('meta[property="og:description"]').attr('content', book.snippet);
	    $('meta[property="og:image"]').attr('content', book.coverPhoto);
	    $('meta[property="og:url"]').attr('content', window.location.href);

	    
        }, 2000);
        addLoggedInMenu();
	//getCreatedLibraries();
	window.READRBOARDCOM.actions.reInit();
	
    </script>

</body>

</html>
