<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia &middot; Book Editor</title>

		<!--/ AWESOME BOOK CREATOR, YA KNOW YOU LIKE IT!
			 ______   ______   ______  ______   __       __   ______
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\
				\/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/

				01000111011000010111000001100101011011000110100101100001

		/-->

		<meta name="author" content="Gapelia"/>
		<meta name="description" content="Better stories, together."/>
		<meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="http://use.typekit.net/web3vzl.js"></script>
		<script>try { Typekit.load(); } catch (e) {}</script>

		<script src="/static/scripts/jquery-2.1.0.min.js"></script>
		<script src="/static/scripts/selectize.js"></script>
		<script src="/static/scripts/ajax.js"></script>

	</head>

	<body class="book-creation g-body">

		<header>
			<div id="back">
				<a class="button brand-ii" href="#" id="pages-toggle" title="Add and manage pages in your book">Pages</a>
			</div>

			<div id="finish">
				<a class="button a brand-ii" href="/preview" target="_blank" id="preview-book" title="Preview your book">Read It</a>
				<a class="button middle-button brand-ii" href="#" id="publish-toggle" title="Publish your book">Publish</a>
				<a class="button b brand-ii" id="close-button" title="Save changes and quit">Save + Close</a>
			</div>
		</header>

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
				<h1>The book title goes here</h1>

				<div class="add-description" contenteditable="true"></div>
				<input type="text" id="input-tags" placeholder="Type up to three tags" value=""/>

				<script>
					$("#input-tags").selectize({
						delimiter: ",",
						maxItems: 3,
						persist: false,
						create: function (input) {
							return {
								value: input,
								text: input
							}
						}
					});
				</script>

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
				$(function () { getUser(); });

            	function load() {
                        loadBookEditor();
            	 }
            	 $("#add-page").click(function (e) {

                 		if (pagesCreated > 20) {
                 			alert("Your book is too big please remove a page!\n");
                 			return;
                 		}

                 		pagesCreated++;

                 		$(this).before($("<li id=\"" + pagesCreated + "\"draggable='true'></li>").html("<div class=\"delete-page\"><i class=\"ion-trash-a\"></i></div><a class=\"edit-page\"><i class=\"ion-gear-b\"></i></a><section><img src=\"/static/images/whiteBG.jpg\" id='page" + (pagesCreated) + "Image' alt=\"\"/><div id='page" + (pagesCreated) + "Title'><span class=\"page-thumb-number\">" + (pagesCreated) + "</span> &middot; <span class=\"page-thumb-title\">New Page</span></div></section>"));

                 		title = $(".page-title-elem").html();
                 		text = $(".page-desc").html();
                 		imageURL = $(".page-bg").attr("src");
                 		attribution = $(".image-attribution").html();

                 		// save to previous page
                 		if (pagesCreated == 0) {
                 			pages.page[0] = {
                 				"pageNumber": pagesCreated,
                 				"templateId": 0,
                 				"title": null,
                 				"text": null,
                 				"image": "/static/images/whiteBG.jpg",
                 				"video": "null",
                 				"attribution": null
                 			};

                 			templateId = 0;
                 			createPage();
                 			fluidLayout();
                 		} else {
                 			pages.page[currentPage].templateId = templateId;
                 			pages.page[currentPage].title = title;
                 			pages.page[currentPage].text = text;
                 			pages.page[currentPage].image = imageURL;
                 			pages.page[currentPage].video = videoURL;
                 			pages.page[currentPage].attribution = attribution;
                 			createPage();
                 			currentPage = pagesCreated;
                 			templateId = 0;
                 			title = null;
                 			text = null;
                 			imageURL = null;
                 			videoURL = null;
                 			attribution = null;
                 			fluidLayout();
                 		}

                 		// Page Sorter
                 		$("#pages-scroller ul").sortable({
                 			items: ":not(.disable-sort)"
                 		}).bind("sortupdate", function () {});

                 		e.preventDefault();

                 	});
			Spinner({ radius: 40, length: 10 }).spin(document.getElementById("book-creation-wrapper"));

			$("#publish-this").on("click", function (e) {

				$("#publish-modal").html("<div class='wrapper'><p>Your story has been published!</p><div class='wrapper'><a class='published' href='/Me'>Read it from profile</a></div>");
				e.preventDefault();

			});
		</script>
		<!--//scripts /-->

	</body>

</html>
