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
	</body>

	<!--/ scripts /-->
	<script defer src="http://www.readrboard.com/static/engage.js"></script>

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
		console.log("readrboard.hashed_nodes");
		console.log( readrboard.getLastEvent() );
		var hash = GetURLParameter("commentLocation");
		if(hash) $("body").animate({ scrollTop: $("p[rdr-hash='"+hash+"']").offset().top-100 }, 1000);
		//$("p[rdr-hash='"+hash+"']").css({"background-color":"#59B3A6"});
	},false);

	document.addEventListener("readrboard.reaction",function(){
		console.log("readrboard.reaction");
		console.log( readrboard.getLastEvent() );
	},false);

	document.addEventListener("readrboard.comment",function() {
		console.log(readrboard.getLastEvent().supplementary.hash);
		createNotification(current.bookId, 0, "comment", readrboard.getLastEvent().supplementary.hash, readrboard.getLastEvent().value);
	} ,false);

	//end readerboard block
	
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

		setTimeout(function() { $("#collection-pop").fadeOut("slow") }, 2500);
	});

	// Click Edit Work
	$("#the-book #edit-shortcut .edit-book").click(function (e) {
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

	//menu css overflow fix//
	$("#g-menu-toggle").click(function() {
		$(".full-book").css("overflow-y", "hidden");
	});

	$("#mp-pusher").click(function() {
		$(".full-book").css("overflow-y", "scroll");
	});

	// Dropdown menu for mobile
	if ($vW < "1025") {

		$(".bookmark-list-wrapper").remove();

		$("#featured-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Folio</a><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-featured"><a href="/me">Me</a></li><li id="nav-featured"><a href="/libraryManager">Libraries</a></li><li id="nav-featured"><a href="/accounts">Account Settings</a></li><li id="gpl-menu-notify"><a>Notifications</a><a class="icon" style="margin-left: 10px; font-weight: 700;" href="#"></a><ul style="display: none; margin-top: 10px;"></ul></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');

		$("#g-menu-toggle").click(function (e) {
			$("#featured-nav").toggle();
			$("#featured-panel").css("cssText", "z-index: 1000 !important;");
			$("#g-menu-toggle").css("cssText", "z-index: 1000 !important;");
		});
	}

	if ($vW > "1919") {
		$(".notification-time #notification-count").css("cssText", "margin-right: 1.5rem !important");
	}

	function GetURLParameter(sParam) {
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++)
		{
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) return sParameterName[1];
		}
	}

	function addRespondToButton() {
		var $button = $('<hr style="margin-top: -1rem;"><div id="response-button"><button type="button" id="respondToButton">Respond</button></div>');
		$("#fin-next").append($button);
		$("#respondToButton").click(function() {
			window.location.href = "/respondTo/"+bookId;
		});
	}
	
	function showResponses(responses) {
		var $responses = $("<ul>", {id: "responses_list"});
		var $delete_button = $("<button>", {class: "delete-symbol", html: "&#9003;"});
		var $responses_header = $("<h5>Related stories:</h5>");
		
		$.each(responses, function(index, value) {
			getUserFromBookId(value.id);
			var $lines = $("<li>", {class: "response"});
			$responses.append(
				$responses_header.append(
					$lines.append(
						$("<a>", {href: "/read/"+value.id, html: value.title+"<a id=\"response-author\" href=\"/"+bookOwner.displayName+"\">"+bookOwner.name, class: "response_link"})
					)	
				)
			);
			
			var bookOwnerId = bookOwner.userId;
			getUserFromBookId(value.id);
			responseUser = bookOwner.userId;
			console.log("bookOwner: "+bookOwnerId);
			console.log("responseOwner: "+responseUser);
			
			if (user.userId == bookOwnerId || user.userId == responseUser) {
				$delete_button.clone().appendTo($lines).click(function() {
					
					$(".delete-symbol").closest($lines).append("<p>Delete this response?<button id=\"confirm-response-deletion\">Yes</button><button id=\"cancel-response-deletion\">NO</button></p>");
								
					$("#confirm-response-deletion").click(function(){
						$(this).closest(".response").remove();
						deleteResponse(bookId, value.id)	
					});
					
					$("#cancel-response-deletion").click(function(){
						$(this).closest("p").remove();
					});
				});
			}
			
		});
		$("#fin-next").append($responses);
	}

	$(document).ready(function() {
		loadDelete();
		getResponsesByBookId(bookId);
		
		//window.READRBOARDCOM.actions.reInit();

		//only show edit option if owner of book//
		if (typeof user == "undefined") {
			$("#the-book #edit-shortcut").remove();
			$(".submission-dropdown").remove();
		} 
		else {
			getCreatedLibrariesForBook();
			var author = bookOwner.name;
			var reader = user.name;

			if (author == reader) $("#the-book #edit-shortcut").show();
			else $("#the-book #edit-shortcut").remove();
		}		

		$(".fluid-wrapper").imgLiquid({ fill: true });
		$(".photo-wrapper .page-bg-wrapper").imgLiquid({ fill: true });
		$(".overlay-wrapper").imgLiquid({ fill: true });
		$(".phototext-wrapper").imgLiquid({ fill: true });
		$(".vertical-wrapper .draggable-placeholder").imgLiquid({ fill: true });
		$(".photo-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");
	});

	setTimeout(function () {
		showResponseInfo(location.pathname.split("/"));
		$(".photo-wrapper .page-bg-wrapper").imgLiquid({ fill: true });
		$(".overlay-wrapper").imgLiquid({ fill: true });
		$(".phototext-wrapper").imgLiquid({ fill: true });
		$(".vertical-wrapper .draggable-placeholder").imgLiquid({ fill: true });
		$(".photo-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");
		
		//only using this method inside of books because of some weird click overwrites//
		$(".vote-notification a").click(function(){
			window.location.href = "/"+userFrom.displayName;	
		});
		
		$(".comment-notification a").click(function(){
			window.location.href = "/read/"+notification.referencedBookId+"?commentLocation="+hash;
		});
		
		//code to make draft deletion work here...for some reason it wasnt working from ajax.js//
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
		addRespondToButton();
		document.title = pages[0].title;
	}, 2000);

	addLoggedInMenuForBook();
</script>
</html>