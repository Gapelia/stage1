<%@include file="../../auth.jsp" %>
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

		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try { Typekit.load(); } catch(e) {}</script>

		<script src="/static/scripts/jquery-2.0.3.min.js"></script>
		<script src="/static/scripts/selectize.js"></script>
		<script>
                <% String id = session.getId(); %>
                sessionId = '<%= id %>';
        </script>
	</head>

	<body class="book-creation g-body">

		<header>
			<div id="back">
        <a class="button transparent" href="#" id="pages-toggle" title="Add and manage pages in your book">Pages</a>
			</div>

			<div id="finish">
				<a class="button a transparent" href="/preview" target="_blank" id="preview-book" title="Preview your book">Read It</a>
        <a class="button middle-button transparent" href="#" id="publish-toggle" title="Publish your book">Publish</a>
				<a class="button b transparent" href="/me" id="close-button" title="Save changes and quit">Save + Close</a>
			</div>
		</header>

		<!--/ scrollers /-->

		<div id="pages-scroller" class="menu">
			<ul>
				<li id="0" draggable='true'>
					<div class="delete-page">Delete</div>
					<a class="edit-page">Edit</a>

					<section>
						<img src="/static/images/blankBG.jpg" id='page0Image'>
						<span id='page0Title'>0 &middot; New Page</span>
					</section>
				</li>

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

				<!--/ <img src="/static/images/loader.gif" id="imgLoader" alt=""/> /-->
				<div id="notify-saving">Saving...</div>

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

				<input type="text" id="input-tags" placeholder="Type up to three tags" value=""/>

				<script>
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
				</script>

				<select id="library-search" placeholder="Add book to library"></select>

				<script>
					$("#library-search").selectize({
						options: [
							{ name: "Architecture", value: "architecture" },
							{ name: "Biography", value: "biography" },
							{ name: "Cinema", value: "cinema" },
							{ name: "Cuisine", value: "cuisine" },
							{ name: "Era", value: "era" },
							{ name: "The Far East", value: "thefareast" },
							{ name: "Fashionista", value: "fashionista" },
							{ name: "Future", value: "future" },
							{ name: "Gapelians", value: "gapelians" },
							{ name: "Historian", value: "historian" },
							{ name: "Into the Wild", value: "intothewild" },
							{ name: "Japanimation", value: "japanimation" },
							{ name: "Land of Kawaii", value: "landofkawaii" },
							{ name: "Manifesto", value: "manifesto" },
							{ name: "Modernism", value: "modernism" },
							{ name: "Mother Gaea", value: "mothergaea" },
							{ name: "Museum", value: "museum" },
							{ name: "On the Road", value: "ontheroad" },
							{ name: "Products of Tomorrow", value: "productsoftomorrow" },
							{ name: "Subculture", value: "subculture" }
						],
						labelField: "name",
						searchField: ["name"]
					});
				</script>

				<div class="wrapper">
					<a class="button green" id="publish-this" href="#">Publish</a>
				</div>

				<div class="close-modal">&times;</div>
			</div>
		</section>

		<!--/ scripts /-->
		<!--/
		<script src="/static/scripts/grande.js"></script>

		<script>
			grande.bind(document.querySelectorAll(".page-title-elem"));
			grande.bind(document.querySelectorAll(".page-desc"));
		</script>
		/-->

		<script src="/static/scripts/filepicker2.js"></script>
		<!--/ <script src="http://maps.google.com/maps/api/js?key=AIzaSyDTyK4a-ZbTbi1LWWOBOowJfL7k4J6OX8Y&amp;libraries=places&amp;sensor=false"></script> /-->
		
		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/scrollpanel.js"></script>

		<script>
			$("#pages-scroller").scrollpanel();
			$("#layout-scroller").scrollpanel();

			// $("#publish-scroller").scrollpanel();
		</script>

		<script src="/static/scripts/imgLiquid.js"></script>
		<!--/ <script src="/static/scripts/medium.js"></script> /-->
		<script src="/static/scripts/gapelia-editor.js"></script>
		<script src="/static/scripts/editor.js"></script>
		<script src="/static/scripts/spin.js"></script>
		<script src="/static/scripts/draggable_background.js"></script>

		<script>
			Spinner({radius: 40, length: 10}).spin(document.getElementById("book-creation-wrapper"));

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