{% extends 'books/books_base.html' %}


		{% block body_css %}parent{% endblock %}

		{% block head_scripts %}
		<!--/ scripts/bg-resizer /-->
		<script src="/static/scripts/bg-resize.js"></script>

		<script>
			$(document).ready(function() {
				$("body").bgResize({
					img: "{% block section_image %}{% endblock %}"
				});
			});
		</script>
		{% endblock %}

		{% block header %}{% include "books/full-view/header.html" %}{% endblock %}

		{% block main_content %}
		<section id={% block section_id %}{% endblock %}>
			{% block main_content_inner %}
			{% endblock %}

			{% with prev_page=page.get_previous_by_position %}
			{% if prev_page %}
			<a href="{% url 'book-full-view' book.slug prev_page.id %}" onclick="if(PAGE_CHANGED) savePageChanges();" class="previous"><span>&#9664;</span></a>
			{% endif %}
			{% endwith %}

			{% with next_page=page.get_next_by_position %}
			{% if next_page %}
			<a href="{% url 'book-full-view' book.slug next_page.id %}" onclick="if(PAGE_CHANGED) savePageChanges();" class="next"><span>&#9654;</span></a>
			{% endif %}
			{% endwith %}
		</section>

		<!--/ page-menu /-->

		<section class="cbp-spmenu cbp-spmenu-horizontal cbp-spmenu-bottom" id="cbp-spmenu-s4">
			<div id="menu-toggle">Page Menu</div>

			<div id="page-scroller-wrapper">
				<nav>
					<a id="prev-small" class="prev" href="#">&#9664;</a>
					<a id="next-small" class="next" href="#">&#9654;</a>
				</nav>

				<ul id="page-scroller">
					{% for p in pages %}
					<li class="page">
						<a href="{% url 'book-full-view' book.slug p.id %}">
							<img for-page="{{ p.id }}" class="cover" alt="" {% if p.media %}{% if p.media.mimetype == "video/embed" %}src="{{STATIC_URL}}images/grey-pixel.png" onload="this.onload=null; this.src=videoFetchThumbnailURL('{{ p.media.url }}')"{% elif "image" in p.media.mimetype %}src="{{ p.media.url }}/convert?w=150&amp;h=150"{% endif %}{% else %}src="{{STATIC_URL}}images/book-text.jpg"{% endif %}/>
						</a>
					</li>
					{% endfor %}
				</ul>
			</div>
		</section>

		{% block create_modal %}
		{% endblock %}

		<div class="draggable-window" unselectable="on">
			{% include "books/tab-editor.html" %}
		</div>
		{% endblock %}

		{% block script_constants %}
		<script>
			var IS_FULL_PAGE_VIEW = true;
			var CURRENT_BOOK_SLUG = "{{ book.slug }}";
			var CURRENT_PAGE_ID = {{ page.id }};
			var LAYOUT_FRONT_COVER = {{ PAGE_LAYOUTS.FRONT_COVER }};
			var LAYOUT_PHOTO = {{ PAGE_LAYOUTS.PHOTO }};
			var LAYOUT_TEXT = {{ PAGE_LAYOUTS.TEXT }};
			var LAYOUT_INTEGRATED_1 = {{ PAGE_LAYOUTS.HORIZONTAL }};
			var LAYOUT_PHOTO_TEXT_1 = {{ PAGE_LAYOUTS.OVERLAY }};
			var LAYOUT_PHOTO_TEXT_2 = {{ PAGE_LAYOUTS.PHOTOTEXT }};
			var LAYOUT_INTEGRATED_2 = {{ PAGE_LAYOUTS.INTEGRATED }};
			var LAYOUT_VIDEO = {{ PAGE_LAYOUTS.VIDEO }};
			var pages_json = {{page | dump_as_array | safe}};
			var CURRENT_PAGE_LAYOUT = {{ page.layout }};
			var CURRENT_PAGE_LICENSE = 0
			var PAGES_CHECKED = [];
		</script>
		{% endblock %}

		{% block scripts %}
		<script src="/static/scripts/books.js"></script>

		<script src="/static/scripts/vendor/handlebars.js"></script>
		<script src="/static/scripts/ventus.js"></script>

		<script>
			$(document).ready(function () {

				var wm = new Ventus.WindowManager();
				window.wm = wm;

				wm.createWindow.fromQuery("#tabs-container", {
					title: "Dream Editor",
					width: 400,
					height: 37,
					x: 50,
					y: 100
				}).open();

			});
		</script>
		{% endblock %}

		{% block slow_scripts %}
		<!--/ scripts/upload /-->
		<script src="/static/scripts/filepicker.js"></script>

		<!--/ scripts/geolocation /-->
		<script src="http://maps.google.com/maps/api/js?key=AIzaSyCMqYZrdDg5sNRysahSHZh6t400-BwJtig&amp;libraries=places&amp;sensor=false"></script>

		<script>
			var bc_input = document.getElementById("bc-geotag");
			var modal_input_01 = document.getElementById("modal-geotag-01");
			var modal_input_02 = document.getElementById("modal-geotag-02");

			new google.maps.places.Autocomplete(bc_input);
			new google.maps.places.Autocomplete(modal_input_01);
			new google.maps.places.Autocomplete(modal_input_02);
		</script>

		<!--/ script/launchyard-code /-->
		<script src="/static/js/app/book.js"></script>
		<script src="/static/js/app/book-edit.js"></script>
		<script src="/static/js/app/utils.js"></script>
		<script src="/static/js/app/video_url_parser.js"></script>
		<script src="/static/js/app/api.js"></script>

		<!--/ scripts/modal /-->
		<script src="/static/scripts/modal/modalEffects.js"></script>

		<script>
			window.polyfilter_scriptpath = "/static/scripts/modal/";
		</script>

		<script src="/static/scripts/modal/cssParser.js"></script>
		<script src="/static/scripts/modal/css-filters-polyfill.js"></script>

		<!--/ scripts/redactor /-->
		<script src="/static/scripts/redactor.js"></script>
		<script src="/static/scripts/fontfamily.js"></script>
		<script src="/static/scripts/fontsize.js"></script>

		<script>
			var buttons = ["fontfamily", "fontcolor", "fontsize", "|", "formatting", "|", "bold", "italic", "deleted", "|", "alignment"];

			$("#text-editor").redactor({
				syncAfterCallback: function(html) {
					$("#live-preview, #default-preview, #photo-preview, #text-preview, #phototext-preview, #integrated-preview").val(html);
				},
				buttons: buttons,
				focus: true,
				plugins: ["fontfamily", "fontsize"],
				buttonsAdd: ["|", "fontfamily", "fontsize"],
				initCallback: function() {
					updatePreviews(this.get());
				},
				changeCallback: function(html) {
					updatePreviews(this.get());
				},
				keyupCallback: function(e) {
					window.PAGE_CHANGED = true;
				}
			});
		</script>

		<!--/ scripts/columnizer /-->
		<script>
			$(document).ready(function() {
				window.livePreviewElem = $(".page-desc");
				window.columnizeElement = $(".columnize p");

				// scripts/live-preview
				var columnize = function() {
					var viewportWidth = $(window).width();
					var viewportHeight = $(window).height();

					var w = viewportWidth - 234;
					var h = viewportHeight - 50;
					var w2 = viewportWidth / 2;
					var $story = columnizeElement;

					$story.width(w).height(h);

					var $numWords = $story.text().split(" ").length;

					if (($numWords >= 1) && ($numWords < 141)) { // one column
						$story.css({
							"column-count": "1",
							"column-width": "30em",
							"padding": "3rem",
							"width": "auto"
						});

						$story.each(function () {
							$(this).css("margin-left", $(window).width() - 1250 / 2 - $(this).width() + "px");
						});
					}

					if (($numWords >= 141) && ($numWords < 230)) { // two columns
						$story.css({
							"column-fill": "auto",
							"column-gap": "30px",
							"column-rule": "1px dotted #e7e7e7",
							"column-width": "16em",
							"padding": "3rem",
							"width": "auto"
						});

						$story.each(function () {
							$(this).css("margin-left", $(window).width() - 100 / 2 - $(this).width() + "px");
						});
					}

					if ($numWords >= 230) { // three columns
						$story.css({
							"column-fill": "auto",
							"column-gap": "30px",
							"column-rule": "1px dotted #e7e7e7",
							"column-width": "16em",
							"padding": "3rem"
						});
					}
				};

				var updatePreviews = function(text) {
					livePreviewElem.html(text);
					columnize();
				}
			});
		</script>
		{% endblock %}
