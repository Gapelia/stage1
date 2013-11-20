{% extends "books/full-view/base.html" %}

{% block body_css %}preview fv-integrated-ii{% endblock %}
{% block section_id %}integrated-fullview-wrapper{% endblock %}
{% block section_image %}{{ page.media.url }}{% endblock %}
{% block main_content_inner %}
			<div id="title">
				<span id="book-title" class="page-title-elem">{{ page.title }}</span> by <span id="book-author">{{ first_page.created_by.get_full_name}}</span>
			</div>

			<div class="page-desc">
				{{ page.description|safe }}
			</div>
{% endblock %}