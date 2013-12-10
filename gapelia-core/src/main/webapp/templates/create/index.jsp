
<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Create a book | Gapelia</title>

		<!--/
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
				\/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<meta name="author" content="Gapelia"/>
		<meta name="copyright" content="Gapelia"/>
		<meta name="description" content="Better stories, together."/>
		<meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<script src="/static/scripts/jquery-2.0.3.min.js"></script>
		<script src="/static/scripts/selectize.js"></script>

		<!--/
		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try{Typekit.load();}catch(e){}</script>
		/-->

		<script>
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

				$("#book-dimension-picker").selectize();

				$("#library-search").selectize({
					create: true,
					sortField: "text",
					dropdownParent: "body"
				});

			});
		</script>

	</head>

	<body class="book-creation g-body">

		<header>
			<div id="back">
        <a href="#" id="pages-toggle" title="Add pages">Pages</a>
			</div>

			<div id="finish">
				<a href="/preview" target="_blank" id="preview-book" title="Preview">Preview</a>
        <a href="#" id="publish-toggle" title="Publish">Publish</a>
				<a href="/me" id="close-button" title="Save and Close">Save + Close</a>
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

				<input type="text" id="input-tags" value="photography, exuberance, Iceland"/>

				<select id="library-search" class="demo-default" placeholder="Add book to library">
					<option value="">Add book to library</option>
					<option value="1">Architecture</option>
					<option value="2">Biography</option>
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

		<script src="/static/scripts/books.js"></script>
		<script src="/static/scripts/draggable_background.js"></script>
		<script src="/static/scripts/imgLiquid.js"></script>

		<script>
			$(function() {
				$(".draggable-placeholder").backgroundDraggable(); // Horizontal and Vertical layouts
				// $(".photo-preview-wrapper").imgLiquid({ fill: true });
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

				// $("#publish-this .modal h1:before").html("");
				// $("#publish-modal").html("<div class='wrapper'><h1>Sweet</h1><p>Your book has been published!</p><div class='wrapper'><a class='button a' href='#'>Go to book</a><a class='button b' href='#'>Bookshelf</a></div><div class='close-modal'>&times;</div></div>").delay(500).fadeOut(1000);
				$("#publish-modal").html("<div class='wrapper'><h1>Sweet</h1><p>Your book has been published!</p><div class='wrapper'><a class='button a' href='#'>Go to book</a><a class='button b' href='#'>Bookshelf</a></div><div class='close-modal'>&times;</div></div>");
				e.preventDefault();

			});

			// Modal / Delete Page
			/*
			modal.deletePage = function () {

				modal.deletePageFn();

			};

			modal.deletePageFn = function () {

			};

			// Modal / Publish Book
			modal.publishBook = function () {

				modal.publishBookFn();

			};

			modal.publishBookFn = function () {

			};

			$(".delete-page").click(function () {
				modal.deletePage();
			});

			$("#publish-book").click(function (e) {
				modal.publishBook();
				e.preventDefault;
			});
			*/
		</script>
		<!--//scripts /-->

	</body>

</html>