{% extends "books/full-view/base.html" %}

{% block body_css %}preview fv-frontcover{% endblock %}
{% block section_id %}frontcover-fullview-wrapper{% endblock %}
{% block section_image %}{{ page.media.url }}{% endblock %}
{% block main_content_inner %}
			<div id="story-content">
				<div id="story-wrapper">
					<div id="story">

						<h1 class="page-title-elem">{{ page.title }}</h1>

						<h5 id="lifestyle">
							<span class="page-geotag-elem">{{ first_page|get_page_location }}</span>
							{% for tagged_item in page.tagged_items %}
							<span>{{ tagged_item.tag.name|title }}</span>
							{% endfor %}
						</h5>

						<div class="page-desc">
							{{ first_page.description|safe }}
						</div>

					</div>
				</div>
			</div>
{% endblock %}