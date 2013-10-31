
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

		<meta name="author" content="Gapelia"/>
		<meta name="copyright" content="Gapelia"/>
		<meta name="description" content="The stand for the world's greatest stories"/>
		<meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/css/selectize.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<!--* if lt IE 9 *>
			<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<!* endif *-->

		<!--/ scripts/enablers /-->
		<!--/ <script src="/static/scripts/vendor/modernizr-ii.js"></script> /-->
		<!--/ <script src="/static/scripts/modernizr.full.js"></script> /-->
		<!--/ <script src="/static/scripts/prefixfree.js"></script> /-->

		<script src="/static/scripts/jquery-1.10.2.js"></script>
		<script src="/static/scripts/selectize.js"></script>

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
        <div id="publish-toggle"><a href="#" title="Publish">&nbsp;</a></div>
        <div id="close-button"><a href="/me" title="Save and Close">&#10006;</a></div>
			</div>
		</header>

		<!--/ main-content /-->

		<section id="main-content">
			<div id="book-creation-wrapper">
				<div id="pages-scroller">
					<ul>

						<li class="current-thumb disable-sort">
							<a href="#" class="entypo">&#9749;</a>

							<section>
								<img src="static/images/space-bb-small.JPG" id="page-01-thumb" alt=""/>
								<span>01 &middot; Front Cover</span>
							</section>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-02-thumb" alt=""/>
								<span>02 &middot; Beautiful Skyline in Tokyo Bay</span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-03-thumb" alt=""/>
								<span>03 &middot; Underground Passage</span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-04-thumb" alt=""/>
								<span>04 &middot; New Page</span>
							</a>
						</li>

						<li class="new-thumb disable-sort">
							<a href="#">+</a>
							<span>Add New Page</span>
						</li>

						<!--/
						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-05-thumb" alt=""/>
								<span>05 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-06-thumb" alt=""/>
								<span>06 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-07-thumb" alt=""/>
								<span>07 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-08-thumb" alt=""/>
								<span>08 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-09-thumb" alt=""/>
								<span>09 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-10-thumb" alt=""/>
								<span>10 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-11-thumb" alt=""/>
								<span>11 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-12-thumb" alt=""/>
								<span>12 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-13-thumb" alt=""/>
								<span>13 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-14-thumb" alt=""/>
								<span>14 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-15-thumb" alt=""/>
								<span>15 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-16-thumb" alt=""/>
								<span>16 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-17-thumb" alt=""/>
								<span>17 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-18-thumb" alt=""/>
								<span>18 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-19-thumb" alt=""/>
								<span>19 &middot; </span>
							</a>
						</li>

						<li>
							<a href="#" class="entypo">&#9749;</a>

							<a href="">
								<img src="static/images/new-page-thumb.png" id="page-20-thumb" alt=""/>
								<span>20 &middot; </span>
							</a>
						</li>
						/-->

					</ul>

					<input name="pageSortOrder" type="hidden"/>
				</div>

				<div id="layout-scroller">
					<ul>
						<li id="select-frontcover-layout" class="selected-layout">
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
						<button>Publish</button>

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

						<input type="search" name="s" placeholder="Add book to library"/>
					</div>

					<!--/
					<ul id="ccc" class="collected-book-list">
						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>

						<li class="collected-book">
							<img src="/static/images/space-bb-small.JPG" alt=""/>

							<div class="collected-book-details">
								<span class="collected-book-title">Title</span>
								<span class="collected-book-desc">Description</span>
							</div>
						</li>
					</ul>
					/-->
				</div>

				<div id="create-book">
					<div class="text-menu hide">
						<div class="options">
							<span class="no-overflow">
								<span class="ui-inputs">
									<button class="bold">B</button>
									<button class="italic">i</button>
									<button class="header1">h1</button>
									<button class="header2">h2</button>
									<button class="quote">&rdquo;</button>
									<button class="url useicons">&#xe001;</button>
									<input class="url-input" type="text" placeholder="Paste or type a link"/>
								</span>
							</span>
						</div>
					</div>

					<!--/ <div id="create-content" data-role="flip" data-flip-show-pager="false" data-flip-forward-dir="rtol"/> /-->
					<div id="create-content">
						<!--/ New Page /-->
						<section id="test-blank" class="blank-preview-wrapper">
							<div class="button-wrapper">
								<!--/ <button class="photo-picker">Change Photo</button> /-->
								<!--/
								<input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="alert(event.fpfile.url)">
								/-->
							</div>

							<div class="blank-preview">
								<article>

									Your page has been created.<br/><br/>Choose a layout from the <span class="entypo">&#9871;</span> menu to get started!

								</article>
							</div>
						</section>
						<!--//New Page /-->

						<!--/ Front Cover /-->
						<section id="test-frontcover" class="frontcover-preview-wrapper" style="background: url('/static/images/space-bb.jpg'); display: none">
							<div class="button-wrapper">
								<input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="alert(event.fpfile.url)">
							</div>

							<div class="frontcover-preview">
								<article class="cover-info">

									<!--/ <h1 class="page-title-elem" contenteditable="true" placeholder="Write your title here"><span class="placeholder">Write your title here</span></h1> /-->
									<!--/ <input class="page-title-elem" contenteditable="true" placeholder="Write your title here"> /-->
									<h1 class="page-title-elem" contenteditable="true" placeholder="Write your title here"></h1>
									<h5 contenteditable="false"><span>* Author *</span></h5>

									<!--/ <div class="page-desc" contenteditable="true" placeholder="Write your description here."><span class="placeholder">Write your description here.</span></div> /-->
									<!--/ <input class="page-desc" contenteditable="true" placeholder="Write your description here."> /-->
									<div class="page-desc" contenteditable="true" placeholder="Write your description here."></div>

								</article>
							</div>
						</section>
						<!--//Front Cover /-->

						<!--/ Photo /-->
						<section id="test-photo" class="photo-preview-wrapper" style="background: url('/static/images/space-bb.jpg'); display: none;">
							<div class="button-wrapper">
								<!--/ <button class="photo-picker">Change Photo</button> /-->
								<input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="alert(event.fpfile.url)">
							</div>

							<div class="photo-preview">
								<article>

									<h1 class="page-title-elem" contenteditable="true"><span class="placeholder">Write your title here</span></h1>
									<input id="geotag-01" class="page-geotag-elem" placeholder="Select your location"/>

									<div class="page-desc" contenteditable="true"><span class="placeholder">Write your description here.</span></div>

								</article>
							</div>
						</section>
						<!--//Photo /-->

						<!--/ Text /-->
						<section id="test-text" class="text-preview-wrapper" style="display: none;">
							<div class="text-preview">
								<article>

									<h1 class="page-title-elem" contenteditable="true"><span class="placeholder">Write your title here</span></h1>
									<input id="geotag-02" class="page-geotag-elem" placeholder="Select your location"/>

									<div class="page-desc" contenteditable="true">
										<span class="placeholder">Start writing your story here.</span>
									</div>

								</article>
							</div>
						</section>
						<!--//Text /-->

						<!--/ Horizontal /-->
						<section id="test-horizontal" class="horizontal-preview-wrapper" style="display: none;">
							<section class="draggable-placeholder"  style="background: url('/static/images/space-bb.jpg');">
								<div class="button-wrapper">
									<!--/ <button class="photo-picker">Change Photo</button> /-->
									<input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="alert(event.fpfile.url)">
								</div>
							</section>

							<div class="horizontal-preview">
								<article>

									<h1 class="page-title-elem" contenteditable="true"><span class="placeholder">Write your title here</span></h1>
									<input id="geotag-03" class="page-geotag-elem" placeholder="Select your location"/>

									<div class="page-desc" contenteditable="true"><span class="placeholder">Write your description here.</span></div>

								</article>
							</div>
						</section>
						<!--//Horizontal /-->

						<!--/ Overlay /-->
						<section id="test-overlay" class="overlay-preview-wrapper" style="background: url('/static/images/space-bb.jpg'); display: none;">
							<div class="button-wrapper">
								<!--/ <button class="photo-picker">Change Photo</button> /-->
								<input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="alert(event.fpfile.url)">
							</div>

							<div class="overlay-preview">
								<article>

									<div class="page-desc" contenteditable="true"><span class="placeholder">Start writing your story here.</span></div>
									<input id="geotag-04" class="page-geotag-elem" placeholder="Select your location"/>

								</article>
							</div>
						</section>
						<!--//Overlay /-->

						<!--/ Photo/Text /-->
						<section id="test-phototext" class="phototext-preview-wrapper" style="background: url('/static/images/space-bb.jpg'); display: none;">
							<div class="button-wrapper">
								<!--/ <button class="photo-picker">Change Photo</button> /-->
								<input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="alert(event.fpfile.url)">
							</div>

							<div class="phototext-preview">
								<article>

									<h1 class="page-title-elem" contenteditable="true"><span class="placeholder">Write your title here</span></h1>
									<input id="geotag-05" class="page-geotag-elem" placeholder="Select your location"/>

									<div class="page-desc" contenteditable="true"><span class="placeholder">Start writing your story here.</span></div>

								</article>
							</div>
						</section>
						<!--//Photo/Text /-->

						<!--/ Vertical /-->
						<section id="test-vertical" class="vertical-preview-wrapper" style="display: none;">
							<section class="draggable-placeholder"  style="background: url('/static/images/space-bb.jpg');">
								<div class="button-wrapper">
									<!--/ <button class="photo-picker">Change Photo</button> /-->
									<input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="alert(event.fpfile.url)">
								</div>
							</section>

							<div class="vertical-preview">
								<article>

									<h1 class="page-title-elem" contenteditable="true"><span class="placeholder">Write your title here</span></h1>
									<input id="geotag-06" class="page-geotag-elem" placeholder="Select your location"/>

									<div class="page-desc" contenteditable="true"><span class="placeholder">Start writing your story here.</span></div>
									
								</article>
							</div>
						</section>
						<!--//Vertical /-->

						<!--/ Video / -->
						<section id="test-video" class="video-preview-wrapper" style="display: none;">
							<div class="button-wrapper">
								<button class="photo-picker">Change Video</button>
								<!--/ <input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="video/*" data-fp-container="modal" data-fp-services="COMPUTER,URL,VIDEO" onchange="alert(event.fpfile.url)"> /-->
							</div>

							<div class="video-preview">
								<article>

									<h1 class="page-title-elem" contenteditable="true"><span class="placeholder">Write your title here</span></h1>
									<input id="geotag-07" class="page-geotag-elem" placeholder="Select your location"/><!--/ onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';" /-->

									<div class="page-desc" contenteditable="true"><span class="placeholder">Write your description here.</span></div>

								</article>

								<span class="play-video">Play</span>

								<div class="video-player-container">
									<iframe src="http://player.vimeo.com/video/28379417?title=0&amp;byline=0&amp;portrait=0&amp;color=b83564"></iframe>
								</div>
							</div>
						</section>
						<!--//Video / -->

					</div>
				</div>
			</div>
		</section>

		<!--/ scripts /-->
		<script src="/static/scripts/grande.js"></script>
		<script>grande.bind();</script>

		<script src="/static/scripts/filepicker2.js"></script>
		<script src="/static/scripts/books.js"></script>

		<script src="/static/scripts/placeholder.js"></script>

		<script>
			$(function() {

				// Invoke the plugin
				// $("h1").placeholder();

			});
		</script>

		<!--/ Save this for the actual book! (:
		<script src="/static/scripts/flip.js"></script>

		<script>
			$(document).ready(function () {
				$("#create-content").flip({
					forwardDir: "rtol",
					// height: "340px",
					showpager: false,
					loop: false
				});
			});
		</script>
		/-->

		<script src="/static/scripts/draggable_background.js"></script>

		<script>
			// Horizontal and Vertical layouts
			$(function() { $(".draggable-placeholder").backgroundDraggable(); });
		</script>

		<!--/ scripts/layout-scroller /-->
		<script src="/static/scripts/jquery.mousewheel.js"></script>
		<script src="/static/scripts/scrollpanel.js"></script>

		<script>
			$("#pages-scroller").scrollpanel();
			$("#layout-scroller").scrollpanel();

			// $("#publish-scroller").scrollpanel();
		</script>

		<!--/ scripts/page-sorter /-->
		<script src="/static/scripts/sortable.js"></script>

		<script>
			$(function() {
				$("#pages-scroller ul").sortable({ items: ":not(.disable-sort)" }).bind("sortupdate", function() {});
				// $("#pages-scroller").sortable().bind("sortupdate", function(evt, ui) { changePosition(ui); });
			});
		</script>

		<script src="http://maps.google.com/maps/api/js?key=AIzaSyDTyK4a-ZbTbi1LWWOBOowJfL7k4J6OX8Y&amp;libraries=places&amp;sensor=false"></script>

		<script>
			var geotag01 = document.getElementById("geotag-01");
			autocomplete = new google.maps.places.Autocomplete(geotag01);

			var geotag02 = document.getElementById("geotag-02");
			autocomplete = new google.maps.places.Autocomplete(geotag02);

			var geotag03 = document.getElementById("geotag-03");
			autocomplete = new google.maps.places.Autocomplete(geotag03);

			var geotag04 = document.getElementById("geotag-04");
			autocomplete = new google.maps.places.Autocomplete(geotag04);

			var geotag05 = document.getElementById("geotag-05");
			autocomplete = new google.maps.places.Autocomplete(geotag05);

			var geotag06 = document.getElementById("geotag-06");
			autocomplete = new google.maps.places.Autocomplete(geotag06);

			var geotag07 = document.getElementById("geotag-07");
			autocomplete = new google.maps.places.Autocomplete(geotag07);

			var geotag08 = document.getElementById("geotag-08");
			autocomplete = new google.maps.places.Autocomplete(geotag08);

			var geotag09 = document.getElementById("geotag-09");
			autocomplete = new google.maps.places.Autocomplete(geotag09);

			var geotag10 = document.getElementById("geotag-10");
			autocomplete = new google.maps.places.Autocomplete(geotag10);

			var geotag11 = document.getElementById("geotag-11");
			autocomplete = new google.maps.places.Autocomplete(geotag11);

			var geotag12 = document.getElementById("geotag-12");
			autocomplete = new google.maps.places.Autocomplete(geotag12);

			var geotag13 = document.getElementById("geotag-13");
			autocomplete = new google.maps.places.Autocomplete(geotag13);

			var geotag14 = document.getElementById("geotag-14");
			autocomplete = new google.maps.places.Autocomplete(geotag14);

			var geotag15 = document.getElementById("geotag-15");
			autocomplete = new google.maps.places.Autocomplete(geotag15);

			var geotag16 = document.getElementById("geotag-16");
			autocomplete = new google.maps.places.Autocomplete(geotag16);

			var geotag17 = document.getElementById("geotag-17");
			autocomplete = new google.maps.places.Autocomplete(geotag17);

			var geotag18 = document.getElementById("geotag-18");
			autocomplete = new google.maps.places.Autocomplete(geotag18);

			var geotag19 = document.getElementById("geotag-19");
			autocomplete = new google.maps.places.Autocomplete(geotag19);

			var geotag20 = document.getElementById("geotag-20");
			autocomplete = new google.maps.places.Autocomplete(geotag20);
		</script>
		<!--//scripts /-->

	</body>

</html>
