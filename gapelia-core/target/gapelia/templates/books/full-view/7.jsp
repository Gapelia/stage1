{% extends "books/full-view/base.html" %}

{% block body_css %}preview fv-video{% endblock %}
{% block section_id %}video-fullview-wrapper{% endblock %}
{% block section_image %}{% endblock %}
{% block main_content_inner %}
			<div id="video-player-container"></div>

			<div id="information">
				<span id="page-title" class="page-title-elem">{{ page.title }}</span>
				<span id="geocode" class="page-geotag-elem">{{ page|get_page_location }}</span>

				<div class="page-desc">
					{{ page.description|safe }}
				</div>
			</div>
{% endblock %}