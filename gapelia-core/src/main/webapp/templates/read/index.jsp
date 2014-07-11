<%@ page import="com.gapelia.core.api.Books" %>
<%@ page import="com.gapelia.core.model.Book" %>
<%@ page import="com.gapelia.core.model.User" %>
<%@ page import="com.gapelia.core.database.QueryUtils" %>
<%
  String currentURL = null;
    if( request.getAttribute("javax.servlet.forward.request_uri") != null ){
        currentURL = (String)request.getAttribute("javax.servlet.forward.request_uri");
    }
    currentURL = "http://folio.is"+currentURL;

    Integer bookId = Integer.parseInt(currentURL.substring(currentURL.lastIndexOf('/')+1));
    Book book = QueryUtils.getBookFromBookId(bookId);
    User user = QueryUtils.getUserFromBookId(bookId);

    String author = user.getName();
    String title = book.getTitle();
    String snippet = book.getSnippet();
    String coverPhoto = book.getCoverPhoto();

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
    <meta property="og:title" content="<%= title %>"/>
    <meta property="og:type" content="article"/>
    <meta property="og:image" content="<%= coverPhoto %>"/>
    <meta property="og:url" content="<%= currentURL %>"/>
    <meta property="og:description" content="<%= snippet %>"/>
    
    <!-- for Twitter -->          
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="<%= title %>" />
    <meta name="twitter:description" content="<%= snippet %>" />
    <meta name="twitter:image" content="<%= coverPhoto %>" />
    
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
		    <li><a href="/read/755">Learn more</a></li>
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
	    	<ul id="stay-right">
			<li id="my-libraries">
			    <a class=submission-dropdown href="#">&#9733;</a>
				<ul></ul>
			</li>
		</ul>
		<ul id="edit-shortcut">
			    <a class=edit-book href="#">Edit Work</a>
			    <a class=delete-book href="#">Delete</a>
		</ul>
		<ul id="collection-pop" style="display: none;"><p>Story added to library<p/></ul>
		
		<div id="delete-book-overlay" style="display: none; background-color: white; left: 0; top: 0; height: 100%; opacity: 0.85; padding-top: 12rem; position: absolute; text-align: center; width: 100%; z-index: 1000;"><h3>Hold on there, are you *sure* you want to delete your story?</h3><div class="wrapper" style="margin-top: 3rem;"><a href="#" id="confirm-delete-book" class="button a red">Yes, delete</a><a href="#" id="close-overlay" class="button b green">No, cancel</a></div></div>
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
        $("#the-book #edit-shortcut #edit-book").click(function (e) {
		window.location.href = "/editbook/" +current.bookId;
        });
	
	//Click delete book and open overlay
	$("#edit-shortcut .delete-book").click(function (e) {
		$("#delete-book-overlay").show();
        });
	
	//Close overlay
	$("#close-overlay").click(function (e) {
		$("#delete-book-overlay").hide();
        });
	
	// Confirm Delete Book
	$("#confirm-delete-book").click(function (e) {
		window.location.href = "/featured/";
		
		bookId = current.bookId;
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
	
	// Hide submission dropdown when click outisde
	$(document).mouseup(function (e) {

	var container = $("#my-libraries ul, #collection-pop");
	var clicked = $("#stay-right .clicked-list");

	// if the target of the click isn't the container...
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.hide(); // ... nor a descendant of the container
		clicked.removeClass();
	}});
	
	
	// Dropdown menu for mobile
        if ($vW < "1025") {
		
        $(".bookmark-list-wrapper").remove();
                
        $("#featured-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Folio</a><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-featured"><a href="/me">Me</a></li><li id="nav-featured"><a href="/libraryManager">Libraries</a></li><li id="nav-featured"><a href="/accounts">Account Settings</a></li><li id="gpl-menu-notify"><a>Notifications</a><a class="icon" style="margin-left: 10px; font-weight: 700;" href="#"></a><ul style="display: none; margin-top: 10px;"></ul></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');	    
	
	$("#g-menu-toggle").click(function (e) {
		$("#featured-nav").toggle();
		$("#featured-panel").css("cssText", "z-index: 1000 !important;");
		$("#g-menu-toggle").css("cssText", "z-index: 1000 !important;");
	})}
	
	if ($vW > "1919") {
		$(".notification-time #notification-count").css("cssText", "margin-right: 5.5rem !important");
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



 setTimeout(function () {

            /*$(".fluid-wrapper").imgLiquid({
                fill: true
            });*/
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
	    
	    //adding http://  and new-tab-location to all hyperlinks//
	    $(".full-book .page-desc a").each(function() {
	    var href = $(this).attr("href");
		$(this).attr("href", "http://" + href);
		$(this).attr("target", "_blank");
	    });
	    
	    //this fixes situation when a book is not yet part of a library//
	    if (getLibraryFromBookBackCover(current.bookId) == "") {
		
		$("#fin-next").css({
			"height" : "100%",
			"width" : "35%",
			"float" : "right"
		})
		
		//$(".fluid-wrapper #fin-next").css("cssText", "width: 100%");
	    }
	    
	    document.title = pages[0].title;
	    
        }, 2000);
      
        addLoggedInMenuForBook();
	window.READRBOARDCOM.actions.reInit();
	
    </script>

</body>

</html>
