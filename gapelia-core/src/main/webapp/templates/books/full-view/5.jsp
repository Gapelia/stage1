{% extends "books/full-view/base.html" %}

{% block body_css %}preview fv-phototext{% endblock %}
{% block section_id %}phototext-fullview-wrapper{% endblock %}
{% block section_image %}{% endblock %}
{% block main_content_inner %}
			<!--/ <img src="{{ page.media.url }}" id="horizontal-bg" alt=""/> /-->
			<img src="{{ page.media.url }}" id="vertical-bg" alt=""/>

			<div id="story-content">
				<div id="story">
					<span id="page-title" class="page-title-elem">{{ page.title }}</span>
					<span id="geocode" class="page-geotag-elem">{{ page|get_page_location }}</span>

					<div class="page-desc">
						{{ page.description|safe }}
					</div>
				</div>
			</div>
{% endblock %}