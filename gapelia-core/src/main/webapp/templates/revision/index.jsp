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
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="" />
    <meta name="twitter:description" content="" />
    <meta name="twitter:image" content="" />
    
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
	
	<div id="featured-panel" style="display: none;"></div>
	
        <button id="g-menu-toggle" class="notification-time">
		<span id="notification-count" style="display: none;"></span>
                <i class="ion-drag"></i>
        </button>

        <div id="bb-nav-prev">&#xf153;</div>
        <div id="bb-nav-next">&#xf154;</div>

        <div id="the-book" class="bb-custom-wrapper">
            <div id="bb-bookblock" class="bb-bookblock">
            </div>
		<ul id="edit-shortcut" style="text-align: right !important;">
			    <a class=submission-dropdown href="#" style="background-color: #59B3A6;">Go Back to this Revision</a>
			    <a class=submission-dropdown href="#" onclick="window.close();" style="background-color: #59B3A6; margin-left: 5px;">Close</a>
		</ul>
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
	
        // Hide logo after 100px when scrolling book on mobile
	$(window).scroll(function() {
		if ($(window).scrollTop() < 100) {
		    $("#g-menu-toggle").show();
		}
		else {
		    $("#g-menu-toggle").hide();
		}
	});
	
	//only show edit option if owner of book//
	$(document).ready(function (e) {
		
	var author = bookOwner.name;
	var reader = user.name;
	
		if (author == reader) {
			$("#the-book #edit-shortcut").show();
		} else {
			$("#the-book #edit-shortcut").remove();
		}	
	});
	
	// Click Edit Work
        //*$("#the-book #edit-shortcut").click(function (e) {
	//	window.location.href = "/editbook/" +current.bookId;
        //})
	
	// Dropdown menu for mobile
        if ($vW < "1025") {
		
        $(".bookmark-list-wrapper").remove();
                
        $("#featured-panel").append('<ul id="featured-nav" style="display: none;"><li id="nav-profile"><a href="/featured"></a>Folio</li><li id="nav-profile"><a href="/featured">Featured</a></li><li id="nav-profile"><a href="/librarmanager">Libraries</a></li><li id="nav-profile"><a href="/me">Me</a></li><li id="nav-accounts"><a href="accounts" id="accounts">Account Settings</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');
	
	$("#g-menu-toggle").click(function (e) {
		$("#featured-nav").toggle();
		$("#featured-panel").css("cssText", "z-index: 1000 !important;");
		$("#g-menu-toggle").css("cssText", "z-index: 1000 !important;");
	})}
	
	if ($vW > "1919") {
		$(".notification-time #notification-count").css("cssText", "right: 5.5rem !important");
	}
	
$(document).ready(function() {
     	loadDelete();
        
	document.addEventListener("readrboard.reaction",function() {
		$.ajax({
			url: "/api/notifications/createCommentNotification",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			async: false,
			type: "POST",
				data: {
				sessionId: sessionId,
				referencedBook: current.bookId
				},
			success: function (data) {
				console.log("notification submitted to book: " + current.bookId);
				console.log("data returned: " + data);
				},
			error: function (q, status, err) {
				if (status == "timeout") {
					alert("Request timed out");
				} else {
					alert("Since you are not signed in, your feedback will be anonymous!");
				}
			}
		});
	} ,false); //end readerboard block


	book = getFullBookFromBookId(bookId);
	   
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
	    
});

 //votes and recommendation get removed for revisions//
 setTimeout(function () {
	    $("#fin, #fin-next, .g-body hr, .backcover-wrapper").remove();
    }, 1000);

 setTimeout(function () {

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
	    
	    //adding http://, underline styling and new-tab-location to all hyperlinks//
	    $(function() {
		$(".full-book .page-desc a").each(function() {
		var href = $(this).attr("href");
		   $(this).attr("href", + href);
		   $(this).attr("target", "_blank");
		});
		$(".full-book .page-desc a").css("text-decoration", "underline");
	    });
    }, 2000);
      
        addLoggedInMenuForBook();
	window.READRBOARDCOM.actions.reInit();
	
    </script>

</body>

</html>
