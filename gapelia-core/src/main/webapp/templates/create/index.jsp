
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
		<link href="/static/css/selectize.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<!--* if lt IE 9 *>
			<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<!* endif *-->

		<script src="/static/scripts/jquery-2.0.3.min.js"></script>
		<script src="/static/scripts/selectize.js"></script>

		<script src="//use.typekit.net/web3vzl.js"></script>
		<script>try{Typekit.load();}catch(e){}</script>

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
        <div id="pages-toggle"><a href="#" title="Add pages">&oplus;</a></div>
        <div id="layout-toggle"><a href="#" title="Layouts">&#9871;</a></div>
        <div id="comments-toggle"><a href="#" title="Comments">&#59160;</a></div>
			</div>

			<div id="finish">
				<div id="settings-button"><a href="#" title="Settings">&#9998;</a></div>
        <div id="publish-toggle"><a href="#" title="Publish"><!--/ &#128213; /-->&#59185;</a></div>
        <div id="close-button"><a href="/me" title="Save and Close">&#10006;</a></div>
			</div>
		</header>

		<!--/ main-content /-->
		<section id="main-content">
			<div id="book-creation-wrapper">
				<div id="pages-scroller">
					<ul>

						<!--/
						<li id="0" class="current-thumb disable-sort">
							<a class="delete-page entypo">&#9749;</a>

							<section>
								<img src="/static/images/space-bb-small.JPG" id="page0Image" alt=""/>
								<span id="page0Title" class="livepreview-thing">0 &middot; Front Cover</span>
							</section>
						</li>
						/-->

						<li id="add-page" class="new-thumb disable-sort">
							<a href="#">+</a>
							<span>Add New Page</span>
						</li>

					</ul>

					<input name="pageSortOrder" type="hidden"/>
				</div>

				<div id="layout-scroller">
					<ul>
						<li id="select-frontcover-layout">
							<img src="/static/images/view-modes/front.png" alt=""/>
							<span>Front Cover</span>
						</li>

						<li id="select-photo-layout">
							<img src="/static/images/view-modes/photo.png" alt=""/>
							<span>Photo</span>
						</li>

						<li id="select-text-layout">
							<img src="/static/images/view-modes/text.png" alt=""/>
							<span>Text</span>
						</li>

						<li id="select-horizontal-layout">
							<img src="/static/images/view-modes/horizontal.png" alt=""/>
							<span>Horizontal</span>
						</li>

						<li id="select-overlay-layout">
							<img src="/static/images/view-modes/overlay.png" alt=""/>
							<span>Overlay</span>
						</li>

						<li id="select-phototext-layout">
							<img src="/static/images/view-modes/phototext.png" alt=""/>
							<span>Photo/Text</span>
						</li>

						<li id="select-vertical-layout">
							<img src="/static/images/view-modes/vertical.png" alt=""/>
							<span>Vertical</span>
						</li>

						<li id="select-video-layout">
							<img src="/static/images/view-modes/video.png" alt=""/>
							<span>Video</span>
						</li>
					</ul>
				</div>

				<div id="publish-scroller">
					<div id="publish-header">
						<button id="publish-book">Publish</button>

						<select id="book-dimension-picker" placeholder="Choose a dimension">
							<option value="">Choose a dimension</option>
							<option value="PULSE">Pulse</option>
							<option value="WOW">Wow</option>
							<option value="LIFE">Life</option>
							<option value="WONDER">Wonder</option>
							<option value="ART">Art</option>
							<option value="FLOW">Flow</option>
						</select>

						<input type="text" id="input-tags" value="photography,exuberance,Iceland"/>

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
					</div>
				</div>

				<div id="create-book">
					<!--/ <div id="create-content" data-role="flip" data-flip-show-pager="false" data-flip-forward-dir="rtol"/> /-->
					<div id="create-content">
						<!--/ New Page /-->
						<section id="test-blank" class="blank-preview-wrapper">
							<div class="blank-preview">
								<article>
									<p contenteditable="false">Your page has been created.<br/><br/>Choose a layout from the <span class="entypo">&#9871;</span> menu to get started!</p>
								</article>
							</div>
						</section>
					</div>
				</div>
			</div>
		</section>
		<!--//main-content /-->

		<!--/ dialog-windows /-->
		<div class="modal-delete-page" style="display: none;">
			<div>
				<h1>Hold up</h1>

				<div class="reveal">
					<p>Are you sure you want to delete this page?</p>

					<a id="confirm-delete">Yes</a>
					<button>No</button>
				</div>
			</div>
		</div>

		<div class="modal-delete-book" style="display: none;">
			<div>
				<h1>Hold up</h1>

				<div class="reveal">
					<p>Are you sure you want to delete this book?</p>

					<button>Yes</button>
					<button>No</button>
				</div>
			</div>
		</div>

		<div class="modal-publish-book" style="display: none;">
			<div>
				<h1>Sweet</h1>

				<div class="reveal">
					<p>Your book has been published!</p>
					<button>Okay</button>
				</div>
			</div>
		</div>

		<div class="stack"></div>
		<div style="-webkit-transform: translateZ(0)"></div>
		<!--//dialog-windows /-->

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

		<script>
			// Horizontal and Vertical layouts
			$(function() { $(".draggable-placeholder").backgroundDraggable(); });
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
		<script src="/static/scripts/vex.js"></script>
		<script src="/static/scripts/vex.dialog.js"></script>

		<script>
			var modal = {};
			modal.className = "vex-theme-wireframe";

			vex.defaultOptions.className = "vex-theme-wireframe";
			vex.dialog.defaultOptions.showCloseButton = false;

			// Modal / Delete Page
			modal.deletePage = function () {

				modal.deletePageClassName = "vex-theme-wireframe";

				for (var i = 0; i > -1; i--) {
					vex.dialog.alert({
						appendLocation: ".stack",
						message: $(".modal-delete-page > div:nth-child(" + (i + 1) + ")").html(),
						className: modal.deletePageClassName,
						buttons: [
							$.extend({}, vex.dialog.buttons.YES, {
								text: "Skip"
							})
						],
						callback: function (value) {
							setTimeout(function () {
								modal.deletePageFn();
							}, 0);
						}
					});
				}

				modal.deletePageFn();

			};

			modal.deletePageFn = function () {

				var $remaining = $('.stack > .vex:not(".vex-closing")');
				var $vW = $(window).width(), $vH = $(window).height();

				$(".stack").show().css({
					"width": $vW + "px",
					"height": $vH + "px"
				});

				$("#g-menu-toggle").css("opacity", "0.3");

				$.each($remaining.removeClass("v0").toArray().reverse(), function (i, item) {
					$(item).addClass("v" + i);
				});

				$('.stack > .v0:not(".vex-closing") input[type="submit"]').focus();

				if ($remaining.length === 0) {
					setTimeout(function () {
						$(".stack").hide();
					}, 600);
				}

				$("#confirm-delete").click(function () {
					$(".page-delete-demo").remove();
					$("body").removeClass("vex-open");
				});

			};

			// Modal / Publish Book
			modal.publishBook = function () {

				modal.publishBookClassName = "vex-theme-wireframe";

				for (var i = 0; i > -1; i--) {
					vex.dialog.alert({
						appendLocation: ".stack",
						message: $(".modal-publish-book > div:nth-child(" + (i + 1) + ")").html(),
						className: modal.publishBookClassName,
						buttons: [
							$.extend({}, vex.dialog.buttons.YES, {
								text: "Skip"
							})
						],
						callback: function (value) {
							setTimeout(function () {
								modal.publishBookFn();
							}, 0);
						}
					});
				}

				modal.publishBookFn();

			};

			modal.publishBookFn = function () {

				var $remaining = $('.stack > .vex:not(".vex-closing")');
				var $vW = $(window).width(), $vH = $(window).height();

				$(".stack").show().css({
					"width": $vW + "px",
					"height": $vH + "px"
				});

				$("#g-menu-toggle").css("opacity", "0.3");

				$.each($remaining.removeClass("v0").toArray().reverse(), function (i, item) {
					$(item).addClass("v" + i);
				});

				$('.stack > .v0:not(".vex-closing") input[type="submit"]').focus();

				if ($remaining.length === 0) {
					setTimeout(function () {
						$(".stack").hide();
					}, 600);
				}

			};

			$(".delete-page").click(function () {
				modal.deletePage();
			});

			$("#publish-book").click(function (e) {
				modal.publishBook();
				e.preventDefault;
			});
		</script>
		<!--//scripts /-->

	</body>

</html>
