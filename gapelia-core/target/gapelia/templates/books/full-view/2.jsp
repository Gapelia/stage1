{% extends "books/full-view/base.html" %}

{% block body_css %}preview fv-text{% endblock %}
{% block section_id %}text-fullview-wrapper{% endblock %}
{% block section_image %}{% endblock %}
{% block main_content_inner %}
			<div id="story-content">
				<div id="story">

					<h1 class="page-title-elem">{{ page.title }}</h1>
					<h5 class="page-geotag-elem">{{ page|get_page_location }}</h5>

					<div class="page-desc">
						{{ page.description|safe }}
					</div>

				</div>
			</div>
{% endblock %}