<!DOCTYPE html>
<html lang="en">

	<head>

		<meta charset="utf-8"/>
		<title>Gapelia</title>

		<meta name="description" content=""/>
		<meta name="keywords" content=""/>
		<meta name="author" content="Gapelia"/>

		<link href="/static/css/style.css" rel="stylesheet"/>
		<link href="/static/images/favicon.png" rel="shortcut icon"/>

		<!--/ <link href="/static/scripts/osmplayer/jquery-ui.css" rel="stylesheet"/>					/-->
		<!--/ <link href="/static/scripts/osmplayer/osmplayer_default.css" rel="stylesheet"/>	/-->

		<!--[if lt IE 9]>
			<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->

		<!--/ scripts/enablers /-->
		<!--/ <script src="/static/scripts/vendor/modernizr-ii.js"></script> /-->
		<script src="/static/scripts/modernizr.min.js"></script>
		<script src="/static/scripts/jquery-1.10.2.js"></script>
		{% block head_scripts %}{% endblock %}
	</head>

	<body class="{% block body_css %}{% endblock %}">

		{% block header %}
		{% include "books/header.html" %}
		{% endblock %}

		<!--/ main-content /-->
		{% block main_content %}
		{% endblock %}

		<!--/ modals /-->
		{% block create_modal %}
		{% include "create_book_modal.html" %}
		{% endblock %}

		<div class="md-modal md-effect-1" id="modal-upload">
			<div class="md-content">
				<iframe class="modal-row" id="filepicker-iframe-02"></iframe>

				<div class="modal-row next-modal">
					<a class="md-close md-trigger">Next</a>
				</div>
			</div>
		</div>

		<!--/ modal/delete-page /-->

		<div class="md-modal md-effect-1" id="delete-modal">
			<div class="md-content">
				<h3>Delete Confirmation</h3>

				<div>
					<p>Are you sure you want to delete this page?</p>

					<button onclick="deletePage()">Yes</button>
					<button onclick="$('[id*=modal]').removeClass('md-show')">Cancel</button>
				</div>
			</div>
		</div>

		<!--/ modal/delete-book /-->

		<div class="md-modal md-effect-1" id="delete-book-modal">
			<div class="md-content">
				<h3>Delete Confirmation</h3>

				<div>
					<p>Are you sure you want to delete this book?</p>

					<button onclick="deleteBook()">Yes</button>
					<button onclick="$('[id*=modal]').removeClass('md-show')">Cancel</button>
				</div>
			</div>
		</div>

		<!--/ modal/publish /-->

		<div class="md-modal md-effect-10" id="publish-book-modal">
			<div class="md-content">
				<h3>Success!</h3>

				<div>
					<p>Your brilliant book has been published.</p>
					<button onclick="$('[id*=modal]').removeClass('md-show')">Okay</button>
				</div>
			</div>
		</div>

		<!--/ modal/save /-->

		<div class="md-modal md-effect-10" id="save-book-modal">
			<div class="md-content">
				<h3>Success!</h3>

				<div>
					<p>Your sweet progress has been saved.</p>
					<button onclick="$('[id*=modal]').removeClass('md-show')">Okay</button>
				</div>
			</div>
		</div>

		<div class="md-overlay"></div>

		<!--/ scripts /-->
		<script src="/static/scripts/squishy.js"></script>
		<script src="/static/scripts/gapelia.js"></script>

		{% block script_constants %}
		{% endblock %}

		<!--/ scripts/carousel /-->
		<script src="/static/scripts/carousel/carouFredSel.js"></script>
		<script src="/static/scripts/carousel/ba-throttle-debounce.js"></script>
		<script src="/static/scripts/carousel/mousewheel.js"></script>
		<script src="/static/scripts/carousel/touchSwipe.js"></script>
		<script src="/static/scripts/carousel/transit.js"></script>

		<!--/ scripts/video-player /-->
		<!--/
		<script src="/static/scripts/jquery-ui-1.10.3.custom.min.js"></script>
		<script src="/static/scripts/osmplayer/osmplayer.compressed.js"></script>
		<script src="/static/scripts/osmplayer/osmplayer.default.js"></script>
		/-->

		<!--/ scripts/tab-switcher /-->
		<script src="/static/scripts/modal/classie.js"></script>
		<script src="/static/scripts/cbpContentSlider.js"></script>

		<script>
			$(document).ready(function() {
				$("#tabs-container").cbpContentSlider();
			});
		</script>

		<!--/ scripts/page-menu /-->
		<script>
			var menuBottom = document.getElementById("cbp-spmenu-s4"), showBottom = document.getElementById("menu-toggle"), body = document.body;

			showBottom.onclick = function() {
				classie.toggle(this, "active");
				classie.toggle(menuBottom, "cbp-spmenu-open");
			};
		</script>

		<!--/ scripts/sortable-pages /-->
		<script src="/static/scripts/sortable.js"></script>

		<script>
			$(function() {
				// $("#page-scroller").sortable();

				$("#page-scroller").sortable().bind("sortupdate", function(e, ui) {
					changePosition(ui);
					forcePlaceholderSize: true;
				});
			});
		</script>

		{% block scripts %}
		{% endblock %}

		<!--/ scripts/character-limiter /-->
		<script src="/static/scripts/simplyCountable.js"></script>
		
		<script>
			$(".modal-description").simplyCountable({
				counter: ".modal-counter",
				maxCount: 300
			});
		</script>

		{% block slow_scripts %}
		{% endblock %}

	</body>

</html>
