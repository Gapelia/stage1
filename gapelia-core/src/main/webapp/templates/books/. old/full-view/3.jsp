{% extends "books/full-view/base.html" %}

{% block body_css %}preview fv-horizontal{% endblock %}
{% block section_id %}horizontal-fullview-wrapper{% endblock %}
{% block section_image %}{{ page.media.url }}{% endblock %}
{% block main_content_inner %}
			<div id="information">
				<h1 class="page-title-elem">{{ page.title }}</h1>
				<h5 class="page-geotag-elem">{{ page|get_page_location }}</h5>

				<div class="page-desc">{{ page.description|safe }}</div>
			</div>
{% endblock %}