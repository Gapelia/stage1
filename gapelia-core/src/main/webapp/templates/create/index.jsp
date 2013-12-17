
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

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="/static/scripts/jquery-2.0.3.min.js"></script>
		<script src="/static/scripts/selectize.js"></script>

		<script>
			$(document).ready(function () {

				/*
				sId = "1234567",
				$.ajax({
					url: "http://localhost:8080/api/book/createBook",
					contentType: "application/x-www-form-urlencoded;charset=utf-8",
					type: "POST",
					data: {
						sessionId: sId,
					},
					success: function (data) {
						bookId = data.bookId;
						console.log("Succes Creating your book");
					},
					error: function (q, status, err) {
						if (status == "timeout") {
							alert("Request timed out");
						} else {
							alert("Some issue happened with your request: " + err);
						}
					}
				});
				*/

			});

			$(function() {

				$("#input-tags").selectize({
					delimiter: ",",
					maxItems: 3,
					persist: false,
					create: function(input) {
						return {
							value: input,
							text: input
						}
					}
				});

				$("#library-search").selectize({
					valueField: "title",
					labelField: "title",
					searchField: "title",
					options: [],
					create: false,
					render: {
						option: function (item, escape) {

							return "<div>" +
								"<span class='title'>" +
								"<span class='name'>" + escape(item.title) + "</span>" +
								"</span>" +
								"<div class='description'>" + escape(item.synopsis || "No synopsis available at this time.") + "</div>" +
								"</div>";

						}
					},

					load: function (query, callback) {

						if (!query.length) return callback();

						$.ajax({
							url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
							type: "GET",
							dataType: "jsonp",
							data: {
								q: query,
								page_limit: 10,
								apikey: "3qqmdwbuswut94jv4eua3j85"
							},
							error: function () {
								callback();
							},
							success: function (res) {
								callback(res.movies);
							}
						});

					}
				});

			});
		</script>

	</head>

	<body class="book-creation g-body">

		<header>
			<div id="back">
        <a class="button transparent" href="#" id="pages-toggle" title="Add pages">Pages</a>
			</div>

			<div id="finish">
				<a class="button a transparent" href="/preview" target="_blank" id="preview-book" title="Preview">Preview</a>
        <a class="button middle-button transparent" href="#" id="publish-toggle" title="Publish">Publish</a>
				<a class="button b transparent" href="/me" id="close-button" title="Save and Close">Save + Close</a>
			</div>
		</header>

		<!--/ scrollers /-->

		<div id="pages-scroller" class="menu">
			<ul>
				<li id="add-page" class="new-thumb disable-sort">
					<a href="#">+</a>
					<span>Add New Page</span>
				</li>
			</ul>

			<input name="pageSortOrder" type="hidden"/>
		</div>

		<div id="layout-scroller" class="menu">
			<h5><a href="#" id="back-to-pages">Back</a></h5>

			<ul>
				<li id="select-frontcover-layout">
					<!--/ <img src="/static/images/view-modes/front.png" alt=""/> /-->
					<div id="frontcover-layout">Front Cover Layout</div>
					<span>Front Cover</span>
				</li>

				<li id="select-photo-layout">
					<!--/ <img src="/static/images/view-modes/photo.png" alt=""/> /-->
					<div id="photo-layout">Photo Layout</div>
					<span>Photo</span>
				</li>

				<li id="select-text-layout">
					<!--/ <img src="/static/images/view-modes/text.png" alt=""/> /-->
					<div id="text-layout">Text Layout</div>
					<span>Text</span>
				</li>

				<li id="select-horizontal-layout">
					<!--/ <img src="/static/images/view-modes/horizontal.png" alt=""/> /-->
					<div id="horizontal-layout">Horizontal Layout</div>
					<span>Horizontal</span>
				</li>

				<li id="select-overlay-layout">
					<!--/ <img src="/static/images/view-modes/overlay.png" alt=""/> /-->
					<div id="overlay-layout">Overlay Layout</div>
					<span>Overlay</span>
				</li>

				<li id="select-phototext-layout">
					<!--/ <img src="/static/images/view-modes/phototext.png" alt=""/> /-->
					<div id="phototext-layout">Photo/Text Layout</div>
					<span>Photo/Text</span>
				</li>

				<li id="select-vertical-layout">
					<!--/ <img src="/static/images/view-modes/vertical.png" alt=""/> /-->
					<div id="vertical-layout">Vertical Layout</div>
					<span>Vertical</span>
				</li>

				<li id="select-video-layout">
					<!--/ <img src="/static/images/view-modes/video.png" alt=""/> /-->
					<div id="video-layout">Video Layout</div>
					<span>Video</span>
				</li>
			</ul>
		</div>

		<!--/ main-content /-->
		<section id="main-content">
			<div id="book-creation-wrapper">

				<div id="create-book">
					<div id="create-content">

						<section id="test-blank" class="blank-preview-wrapper">
							<img class="page-bg" src="/static/images/blankBG.jpg"/>

							<div class="blank-preview">
								<article>
									<p contenteditable="false">Your page has been created.<br/><br/>Choose a layout from the Pages menu to get started!</p>
								</article>
							</div>
						</section>

					</div>
				</div>

			</div>
		</section>
		<!--//main-content /-->

		<section id="publish-modal" class="modal" style="display: none;">
			<div class="wrapper">
				<h1>*BOOK TITLE*</h1>

				<input type="text" id="input-tags" value="input, tags, here"/>

				<select id="library-search" placeholder="Add book to library"></select>

				<!--/
				<select id="library-search" class="demo-default" placeholder="Add book to library">
					<option value="">Add book to library</option>

					<option value="1">
						Architecture<br/>
						<div>Architecture is both the process and product of planning, designing, and construction, usually of buildings and other physical structures.</div>
					</option>

					<option value="2">
						Biography<br/>
						<div>A biography or simply bio is a detailed description or account of a person's life. It entails more than basic facts.</div>
					</option>

					<option value="3">Cinema</option>

					<option value="4">Cuisine</option>

					<option value="5">Era</option>

					<option value="6">The Far East</option>

					<option value="7">Fashionista</option>

					<option value="8">Future</option>

					<option value="9">Gapelians</option>

					<option value="10">Historian</option>

					<option value="11">Into the Wild</option>

					<option value="12">Japanimation</option>

					<option value="13">Land of Kawaii</option>

					<option value="14">Manifesto</option>

					<option value="15">Modernism</option>

					<option value="16">Mother Gaea</option>

					<option value="17">Museum</option>

					<option value="18">On the Road</option>

					<option value="19">Products of Tomorrow</option>

					<option value="20">Subculture</option>
				</select>
				/-->

				<div class="wrapper">
					<a class="button green" id="publish-this" href="#">Publish</a>
				</div>

				<div class="close-modal">&times;</div>
			</div>
		</section>

		<!--/ scripts /-->
		<script src="/static/scripts/grande.js"></script>

		<script>
			grande.bind(document.querySelectorAll(".page-title-elem"));
			grande.bind(document.querySelectorAll(".page-desc"));
		</script>

		<script src="/static/scripts/filepicker2.js"></script>
		<script src="http://maps.google.com/maps/api/js?key=AIzaSyDTyK4a-ZbTbi1LWWOBOowJfL7k4J6OX8Y&amp;libraries=places&amp;sensor=false"></script>
		
		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/scrollpanel.js"></script>

		<script>
			$("#pages-scroller").scrollpanel();
			$("#layout-scroller").scrollpanel();

			// $("#publish-scroller").scrollpanel();
		</script>

		<script src="/static/scripts/imgLiquid.js"></script>
		<script src="/static/scripts/editor.js"></script>
		<script src="/static/scripts/draggable_background.js"></script>

		<script>
			$(function() {
				$(".draggable-placeholder").backgroundDraggable(); // Horizontal and Vertical layouts
				// $(".frontcover-preview-wrapper, .photo-preview-wrapper, .horizontal-preview-wrapper, .overlay-preview-wrapper, .phototext-preview-wrapper, .vertical-preview-wrapper").imgLiquid({ fill: true });
			});
		</script>

		<!--/ scripts/page-sorter /-->
		<script src="/static/scripts/sortable.js"></script>

		<script>
			$(function() {
				$("#pages-scroller ul").sortable({ items: ":not(.disable-sort)" }).bind("sortupdate", function() {});
				// $("#pages-scroller").sortable().bind("sortupdate", function(evt, ui) { changePosition(ui); });
			});
		</script>

		<!--/ scripts/dialog /-->
		<script>
			$("#publish-this").on("click", function(e) {

				$("#publish-modal").html("<div class='wrapper'><h1>Sweet</h1><p>Your book has been published!</p><div class='wrapper'><a class='button a' href='#'>Go to book</a><a class='button b' href='#'>Bookshelf</a></div><div class='close-modal'>&times;</div></div>");
				e.preventDefault();

			});
		</script>
		<!--//scripts /-->

	</body>

</html>