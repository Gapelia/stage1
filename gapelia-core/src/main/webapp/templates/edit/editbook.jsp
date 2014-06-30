<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Folio &middot; Edit story</title>

		<!--/ AWESOME BOOK CREATOR, YA KNOW YOU LIKE IT!
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

		<script src="/static/scripts/jquery-2.1.0.min.js"></script>
		<script src="/static/scripts/ajax.js"></script>

	</head>

	<body class="book-creation g-body">


		<header>
			<div id="back">
				<a class="button brand-iii" href="#" id="pages-toggle" title="Add and manage pages in your book">Pages</a>
				<ul id="revision-toggle">
					<li id="revisions">
					    <a class=revision-dropdown href="#">Revisions</a>
						<ul style="display: none;">
							<li style="font-weight: 500; margin-bottom: 10px;">Past versions sorted by day</li>
						</ul>
					</li>
				</ul>
				<a id ="save-drafts" class="button brand-iii" href="#" style="margin-left: 6.25rem !important; padding-top: 7px !important;">Share Draft</a>
			</div>
			
			</div>

			<div id="finish">
				<a class="button a brand-iii" href="/preview" target="_blank" id="preview-book" title="Preview your book">Read It</a>
				<a class="button middle-button brand-iii" href="#" id="publish-toggle" title="Publish your book">Publish</a>
				<a class="button b brand-iii" id="close-button" title="Save changes and quit">Save + Close</a>
			</div>
		</header>
		
		<div id="draft-tutorial" style="display: none;">
			<p class="draft-tutorial-text" style="opacity: 0.7;">TIP: your work has been saved as a Draft, but is not public yet.</br>You can access your drafts later on the side menu.</br><a id="leave-editor" href="/">Ok, I get it</a><a id="close-draft-tutorial" style="font-size: 1rem; font-weight: 100; top: 1.8rem; right: 10rem; position: absolute;">Back to editor</a></p>
			<img src="/static/images/draft-tutorial.jpg" style="height: 300px; width: 600px;"></img>
		</div>
		
		<div id="share-draft-overlay" style="display: none;"><button>&#215;</button><h3>Share this link and seek feedback from peers and colleagues</h3><a target="blank" href="#">Go to Link</a></div>

		<!--/ scrollers /-->

		<div id="pages-scroller" class="menu">
			<ul id="page-menu">

			</ul>

			<input name="pageSortOrder" type="hidden"/>
		</div>

		<div id="layout-scroller" class="menu">
			<h5><a href="#" id="back-to-pages">Back</a></h5>

			<ul>
				<li id="select-fluid-layout">
					<div id="fluid-layout">Fluid Layout</div>
					<span>Fluid</span>
				</li>

				<li id="select-photo-layout">
					<div id="photo-layout">Photo Layout</div>
					<span>Photo</span>
				</li>

				<li id="select-overlay-layout">
					<div id="overlay-layout">Overlay Layout</div>
					<span>Overlay</span>
				</li>

				<li id="select-phototext-layout">
					<div id="phototext-layout">Photo/Text Layout</div>
					<span>Photo/Text</span>
				</li>

				<li id="select-vertical-layout">
					<div id="vertical-layout">Vertical Layout</div>
					<span>Vertical</span>
				</li>

				<li id="select-video-layout">
					<div id="video-layout">Video Layout</div>
					<span>Video</span>
				</li>
			</ul>
		</div>

		<!--/ main-content /-->
		<section id="main-content">
			<div id="book-creation-wrapper">

				<div id="notify-saving">Saving...</div>

				<div id="create-book">
					<div id="create-content">
					</div>
				</div>

			</div>
		</section>
		<!--//main-content /-->

		<section id="publish-modal" class="modal">
			<div class="wrapper">
				<h1 id="publish-book-title"></h1>

				<div class="add-description" contenteditable="true"></div>

				<div class="wrapper">
					<a class="button branded" id="publish-this" href="#">Publish</a>
				</div>

				<div class="close-modal">&times;</div>
			</div>
		</section>

		<!--/ scripts /-->
		<script src="/static/scripts/filepicker2.js"></script>
		<!--/ <script src="http://maps.google.com/maps/api/js?key=AIzaSyDTyK4a-ZbTbi1LWWOBOowJfL7k4J6OX8Y&amp;libraries=places&amp;sensor=false"></script> /-->

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/scrollpanel.js"></script>

		<script>
			$("#pages-scroller").scrollpanel();
			$("#layout-scroller").scrollpanel();
		</script>

		<script src="/static/scripts/adaptiveBG.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/vimeothumb.js"></script>
		<script src="/static/scripts/embedly.js"></script>
		<script src="/static/scripts/sortable.js"></script>
		<script src="/static/scripts/editor.js"></script>
		<script src="/static/scripts/gapelia-editor.js"></script>
		<script src="/static/scripts/spin.js"></script>
		<!--/ <script src="/static/scripts/draggable_background.js"></script> /-->

		<script>
		// $("img").VimeoThumb();
		
		$(function () {
			getUser();
		});
            	function load() { loadBookEditor(); getRevisions();
		
			//share draft code//
			if ($vW > "1024") {
				$("#share-draft-overlay").append("<p>folio.is/revision/" + bookId + "</p>");
				$("#share-draft-overlay a").attr("href", "http://folio.is/revision/" + bookId);
				
				$("#share-draft-overlay button").click(function(){
					$("#share-draft-overlay").css("display", "none");
				})
			} 
		}
		 
		Spinner({ radius: 40, length: 10 }).spin(document.getElementById("book-creation-wrapper"));
		
		
		
		//display and hide revisions//
		$(document).on("click", "#revisions .revision-dropdown", function (e) {
				if ($("#revisions ul li").css("display") != "block") {
					$("#revisions ul li").css("display", "block");
					$("#revision-toggle ul").css("box-shadow", "2px 2px 2px rgba(0, 0, 0, 0.36");
				} /*else {
					$("#revisions ul li").css("display", "none");
					$("#revision-toggle ul").css("box-shadow", "none");
				}*/
			});
			
		$("#back").mouseleave(function () {
				$("#revision-toggle ul").css("display", "none");
			});
			
		$("#revision-toggle").click(function () {
				$("#revision-toggle ul").css("display", "block");
		});
		
		//drafts//
		$("#save-drafts").click(function() {
			$("#share-draft-overlay").css("display", "block");
		})
		
		//show,hide draft share button when pages open//
		$("#pages-toggle").click(function(){
			$("#save-drafts").hide();
		})
		
		$("#pages-scroller").mouseleave(function(){
			$("#save-drafts").show();
		})
		

		$("#publish-this").on("click", function (e) {
				
		lastPublishedBook = getLastPublishedBookId();
		getUserFromBookId(lastPublishedBook.bookId);
		firstTitle=pages.page[0].title;

			$("#publish-modal").html("<div class=\"wrapper-ii\"><p><a class=\"published-ii\" href=\"/read/" + lastPublishedBook.bookId + "\">" + firstTitle + "</a></p></div>");
				
			e.preventDefault();
				
			currentWebsite = document.URL;
			lastPublishedBook = getLastPublishedBookId();
			getUserFromBookId(lastPublishedBook.bookId)
				
			facebookShare = 'http://www.facebook.com/sharer/sharer.php?u=folio.is/read/' + lastPublishedBook.bookId;
			twitterShare = "http://twitter.com/share?text="+lastPublishedBook.title+" by "+ bookOwner.fullName;"&url=http://folio.is/read" + lastPublishedBook.bookId;
			emailShare = 'mailto:?subject=Recommended%20Read%20on%20Folio&amp;body='+ lastPublishedBook.title + " by " + bookOwner.fullName + "   " +  "folio.is/read/" + lastPublishedBook.bookId;
								
			$("#publish-modal").append("<div id=\"book-share\"><ul class=\"share-book\"><li><a href=\"javascript:window.open(facebookShare,'','width=555,height=368');void(0)\"><i class=\"ion-social-facebook\"></i></a></li><li><a href=\"javascript:window.open(twitterShare,'','width=550,height=257');void(0)\"><i class=\"ion-social-twitter\"></i></a></li><li><a href=\""+emailShare+"\"><i class=\"ion-email\"></i></a></li></ul></div>");
			$("#publish-modal").append("<div id=\"lib-submission\">Submit to a <a class='published' href='/libraryManager'>curated library</a> or start editing <a class='published-i' href='/createlibrary'>your own.</a></div>");
			$("#publish-modal").append("<div id=\"lib-tutorial\" style=\"bottom: 1rem; right: 1rem; position: absolute\">Want to learn more about libraries? <a class='published' href='http://folio.is/read/756'>Read this</a></div>");
		});
		</script>
		<!--//scripts /-->

	</body>

</html>
