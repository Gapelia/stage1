<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Folio &middot; Analytics</title>

		<!--/ ANALYTIC VIEW
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

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<%@include file="../../userDetails.jsp" %>
		<script src="/static/scripts/modernizr.custom.js"></script>
		<script src="/static/scripts/jquery-2.1.0.min.js"></script>

		<script src="/static/scripts/nprogress.js"></script>
		<script src="/static/scripts/userNotifications.js"></script>
		<script src="/static/scripts/sorttable.js"></script>

	</head>

	<body class="app analytics">

		<div id="mp-pusher" class="super-wrapper">

			<!--/ site-menu /-->
			<nav id="site-menu" class="mp-menu">
				<div class="mp-level">

					<h2><a href="/featured"></a></h2>

					<ul>
						<li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a></li>
						<li class="not-mobile"><a href="/librarymanager">Libraries</a></li>
						<li class="not-mobile"><a href="/createbook">New Story</a></li>

						<li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a>
							<ul id="draft-menu"></ul>
						</li>

						<li id="gpl-menu-notify">
							<a>Notifications</a><a class="icon" href="#"></a>
							<ul></ul>
						</li>

						<div id="footer-items"><li class="fq"><a href="/read/755">How It Works</a>
				<li class="help"><a href="mailto:team@folio.is">Report a bug</a>
				<li class="logout"><a href="#">Log Out</a></div>
					</ul>

				</div>
			</nav>
			<!--//site-menu /-->
			
			<!--/ main-panel /-->
			<div id="featured-panel">
				<button id="g-menu-toggle" class="notification-time">
					<span id="notification-count"></span>
					<i class="ion-drag"></i>
				</button>
			</div>
			
			<ul id="featured-nav">
				<li id="nav-analytics" class="current"><a>Analytics</a></li>
			</ul>			
			<!--//main-panel /-->
			
				<div id="top-container">
						<div id="last-story">
								<img src=""/>
								<div id="last-story-data">
										<h5>LATEST STORY</h5>
										<h1></h1>
										<div id="story-views-votes">
												<h3 id="story-views">VIEWS: <span></span></h3>
												<h3 id="story-votes">VOTES: <span></span></h3>
										</div>
								</div>
								
						</div>
						
						<div id="network-data">
								<h3 class="data-counters" id="following"><span></span><br>FOLLOWING</h3>
								<h3 class="data-counters" id="followers"><span>543</span><br>FOLLOWERS</h3>
						</div>
				</div>
				

				<table class="sortable" id="analytics-table">
					<thead>
						<tr id="column-headers">
							<th id="header-title">Title</th>
							<th id="hedaer-views">Views</th>
							<th id="hedaer-votes">Votes</th>
							<th id="header-shares">Shares</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
		</div>

		<!--/ scripts /-->
		<script src="/static/scripts/g.money.js"></script>
		<script src="/static/scripts/ajax.js"></script>
		<script src="/static/scripts/classie.js"></script>
		<script src="/static/scripts/mlpushmenu.js"></script>
		
		<script>
			function fillAnalyticsTable(books) {
				$.each(books, function(id,book) {
					var numBooks = 0;
					var numBookShares = getNumBookShares(book.bookId);
					$.each(numBookShares, function(id,value) {
						numBooks += value;
					});

					var row = '<tr class="row" id="'+book.bookId+'">';
					row += '<td class="row-title"><a href="/read/'+book.bookId+'"><img src="'+book.coverPhoto+'">'+book.title+'</a>';
					row += '<td class="row-views">'+getNumBookViews(book.bookId)+'</td>';
					row += '<td class="row-votes">'+getNumBookVotes(book.bookId)+'</td>';
					row += '<td class="row-shares">'+numBooks+'</td>';
					$("#analytics-table").append(row);
				});
			}

			$(document).on("folio.books_loaded",function(){	fillAnalyticsTable(books) });
			
			$(document).on("folio.books_loaded",function(){ 
				getLastPublishedBookId();
				$("#last-story h1").text(lastPublished.title);
				$("#last-story img").attr("src", lastPublished.coverPhoto);
				
				$("#story-views span").text(getNumBookViews(lastPublished.bookId));
				$("#story-votes span").text(getNumBookVotes(lastPublished.bookId));
				
				getFollowingUsers();
				$("#following span").text(friends.length);
				$("#followers span").text(0);
			});

			
			function load() {}; //TODO: remove me (it's here beacause its calles by getUser())

			$(function() {
				
				getUser(); //fires "user_loaded" event		
				getUserCreatedBooksList(); //fires "books_loaded" event
				getNotifications();
				
				// Log Out
				$("#logout").click(function (e) {
					document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
					window.location = "";
				});

                if ($vW > "1919") {
                    $("#last-story img").css("cssText", "height: 275px !important");
                    $("#last-story-data").css("cssText", "width: 600px !important");
                    $("#last-story-data h1").css("cssText", "font-size: 2rem !important");
                    $("#last-story-data h3").css("cssText", "font-size: 1.5rem !important");
                    $("#network-data").css("cssText", "top: 9rem !important");
                    $(".sortable").css("cssText", "top: 44% !important");
                    $("#column-headers th").css("cssText", "font-size: 1.75rem !important");
                    $("#analytics-table").css("cssText", "font-size: 1.5rem !important");
				}
			});
		</script>

	</body>

</html>
