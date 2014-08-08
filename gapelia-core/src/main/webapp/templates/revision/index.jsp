<%@include file="../../tools.jsp" %>
<%@ page import="com.gapelia.core.api.Books" %>
<%@ page import="com.gapelia.core.model.Book" %>
<%@ page import="com.gapelia.core.database.QueryUtils" %>
<%
	String currentURL = "http://folio.is"+getUrl(request);
	Integer bookId = getIdFromUrl(request);
	if(!isValidBookId(bookId)) {
		//out.println("This book doesn't exist in the database!");
		response.sendRedirect("/");
		return;
	}
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
		    <a id="back-to-revision" href="#" style="background-color: #59B3A6;">Go Back to this Revision</a>
		    <a id="close-revision" href="#" style="background-color: #59B3A6; margin-left: 5px;">Close</a>
		</ul>
        </div>

    </div>

    <!--/ scripts /-->
    <script defer src='http://www.readrboard.com/static/engage.js'></script>

	<script src="/static/scripts/modernizr.custom.js"></script>
	<script src="/static/scripts/jquery-2.1.0.min.js"></script>    
    
    <script src="/static/scripts/nprogress.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/books.js"></script>

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
    
	//readrboard block

	document.addEventListener("readrboard.hashed_nodes",function(){
		console.log("readrboard ready!");
		var hash = GetURLParameter("commentLocation");
		if(hash) $("body").animate({ scrollTop: $("p[rdr-hash='"+hash+"']").offset().top-100 }, 1000);
		//$("p[rdr-hash='"+hash+"']").css({"background-color":"#59B3A6"});
	},false);

	document.addEventListener("readrboard.reaction",function(){
		console.log("readrboard.reaction event:");
		console.log( readrboard.getLastEvent() );
		//TODO: This is stupid, we should contact Porter to fix this!
		//it should be all done in the comment eventlistener
		readrboard_type = readrboard.getLastEvent().value;
		$(".rdr_commentSubmit").click(function(){ $("div.rdr.rdr_window.w320").fadeOut("slow")}); //hiding box after commenting//
	},false);

	document.addEventListener("readrboard.comment",function() {
		console.log("readrboard.comment event:");
		console.log(readrboard.getLastEvent());
		createNotification(current.bookId, current.bookId, readrboard_type, readrboard.getLastEvent().supplementary.hash, readrboard.getLastEvent().value);
	} ,false);

	//end readerboard block
	
	
    // Hide logo after 100px when scrolling book on mobile
    $(window).scroll(function() {
	if ($(window).scrollTop() < 100) {
	    $("#g-menu-toggle").show();
	} else {
	    $("#g-menu-toggle").hide();
	}
    });
	
    //only show edit option if owner of book//
    $(document).ready(function (e) {
		
		if (typeof user == "undefined") {
			$("#the-book #edit-shortcut").remove();
		} else {
			var author = bookOwner.name;
			var reader = user.name;
		
			if (author == reader) {
				$("#the-book #edit-shortcut").show();
			} else {
				$("#the-book #edit-shortcut").remove();
			}
		}	
    });
	
    // Dropdown menu for mobile
    if ($vW < "1025") {
		
        $(".bookmark-list-wrapper").remove();
                
        $("#featured-panel").append('<ul id="featured-nav" style="display: none;"><li id="nav-profile"><a href="/featured"></a>Folio</li><li id="nav-profile"><a href="/featured">Featured</a></li><li id="nav-profile"><a href="/librarmanager">Libraries</a></li><li id="nav-profile"><a href="/me">Me</a></li><li id="nav-accounts"><a href="accounts" id="accounts">Account Settings</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');
	
	$("#g-menu-toggle").click(function (e) {
	    $("#featured-nav").toggle();
	    $("#featured-panel").css("cssText", "z-index: 1000 !important;");
	    $("#g-menu-toggle").css("cssText", "z-index: 1000 !important;");
	}	
    )};
	
    if ($vW > "1919") {
	$(".notification-time #notification-count").css("cssText", "right: 5.5rem !important");
    }
	
    $(document).ready(function() {
     	loadDelete();
        
	//retireving original bookId//
	originalBookId = $.ajax({
	    url: "/api/books/getOriginalBookIdFromRevisionId",
	    contentType: "application/x-www-form-urlencoded;charset=utf-8",
	    type: "POST",
	    async: false,
	    data: {
		sessionId: sessionId,
		revisionBookId: bookId
	    },
	    error: function (q, status, err) {
		if (status == "timeout") {
		alert("Request timed out");
	    }
	}
    }).responseText;
	
	
    //close revision and back to draft//
    $("#close-revision").click(function (e) {
	$("#close-revision").attr("href", "/editbook/" + originalBookId  + "");
    })
	
    //transplanting revision//
    $(document).on("click", "#back-to-revision", function (ev) {
	    
	$("#back-to-revision").attr("href", "/editbook/" + originalBookId  + "");
	    
	sessionId = readCookie("JSESSIONID");
		
	$.ajax({
	    url: "/api/actions/revertToRevision",
	    contentType: "application/x-www-form-urlencoded;charset=utf-8",
	    type: "POST",
	    async: false,
	    data: {
		sessionId: sessionId,
		revisionBookId: bookId
	    },
	    error: function (q, status, err) {
		if (status == "timeout") {
		    alert("Request timed out");
		}
	    }
	});
	    
    });
	
    book = getFullBookFromBookId(bookId);
	   
	$(".fluid-wrapper").imgLiquid({fill: true});
	$(".photo-wrapper .page-bg-wrapper").imgLiquid({fill: true});
        $(".overlay-wrapper").imgLiquid({fill: true});
        $(".phototext-wrapper").imgLiquid({fill: true});
        $(".vertical-wrapper .draggable-placeholder").imgLiquid({fill: true});
	$(".photo-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");	    
    });

    //votes and recommendation get removed for revisions//
    setTimeout(function () {
	$("#fin, #fin-next, .g-body hr, .backcover-wrapper, #next-book").remove();    
    }, 1000);

    setTimeout(function () {
        $(".fluid-wrapper").imgLiquid({fill: true});
	$(".photo-wrapper .page-bg-wrapper").imgLiquid({fill: true});
        $(".overlay-wrapper").imgLiquid({fill: true});
        $(".phototext-wrapper").imgLiquid({fill: true});
        $(".vertical-wrapper .draggable-placeholder").imgLiquid({fill: true});
        $(".photo-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");
	    
	//adding http://, underline styling and new-tab-location to all hyperlinks//
	$(function() {
	    $(".full-book .page-desc a").each(function() {
	    var href = $(this).attr("href");
		//$(this).attr("href", "http://" + href);
		$(this).attr("target", "_blank");
	    });
	    $(".full-book .page-desc a").css("text-decoration", "underline");
	});
	document.title = pages[0].title;
    }, 2000);
      
    addLoggedInMenuForBook();
    </script>

</body>

</html>
