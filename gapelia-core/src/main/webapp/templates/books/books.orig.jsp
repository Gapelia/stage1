{% extends 'books/books_base.html' %}

{% block main_content %}
<section id="breadcrumbs">
	<a href="">Home</a> > <a href="" class="current">Books</a>
</section>

<!--/ main-content /-->
<section id="main-content">
	<div id="big-scroller-wrapper">
		<nav>
			<a id="prev-big" class="prev" href="#">&#9664;</a>
			<a id="next-big" class="next" href="#">&#9654;</a>
		</nav>
		<ul id="big-scroller" style="background-image:url(' ');">
			<!--/ dimension book /-->
			{% for book in books %}
			<li class="dimension-book">
				<ul class="edit-delete">
					<li class="edit"><a href="{% url 'book' book.slug %}">Edit</a></li>
					<li class="delete"><a href="JavaScript:confirmDeleteBook('{{book.slug}}')">Delete</a></li>
				</ul>

				<div class="book-info">
					<div class="book-title">{{ book.title }}</div>

					<ul class="lifestyle">
						{% if book.location %}<li>{{ book.get_first_page|get_page_location }}</li>{% endif %}
						{% for tagged_item in book.get_first_page.tagged_items %}
						<li>{{ tagged_item.tag.name|title }}</li>
						{% endfor %}
					</ul>

					<a class="explore-book" href="">Explore</a>
					<div class="photo-credit">Photo by <a href="">{{book.created_by.get_full_name}}</a></div>
				</div>

				<div class="book-cover" style="background:url('{{ book.cover_image.url }}')"></div>
			</li>
			{% endfor %}

			<!--/ new dimension book /-->
			<li class="dimension-book new-book">
				<div class="book-info">
					<div class="add-new-book"><a class="md-trigger" data-modal="modal-1" onclick="showNiftyModals(this)">+</a></div>
				</div>
			</li>
		</ul>
	</div>
</section>

<!--/ bottom-scroller /-->
<section id="small-switcher">
	<a href="JavaScript:showAllBooks(true)" class="selected">Books</a> | <a href="">Collections</a> | <a href="JavaScript:showAllBooks(false)">Drafts</a>
</section>

<div id="small-scroller-wrapper">
	<nav>
		<a id="prev-small" class="prev" href="#">&#9664;</a>
		<a id="next-small" class="next" href="#">&#9654;</a>
	</nav>

	<ul id="small-scroller" class="all-book-list">
		<!--/ user book /-->
		{% for book in books %}
		<li class="user-book{% if book.published %} published-book{%endif%}">
			<img src="{{ book.cover_image.url }}/convert?w=150&amp;h=150" class="cover" alt=""/>

			<div class="book-info">
				<div class="book-title">{{ book.title }}</div>
				<div class="book-author">by {{ book.created_by.get_full_name }}</div>

				<ul class="book-dimensions">
					{% if book.location %}<li>{{ book|get_page_location }}</li>{% endif %}
					{% for tagged_item in book.tagged_items %}
					<li>{{ tagged_item.tag.name }}</li>
					{% endfor %}
				</ul>

				<div class="light-rating">
					<img src="/static/images/rating-light.png" alt=""/>
					<span class="count">60</span>
				</div>

				<div class="love-rating">
					<img src="/static/images/rating-love.png" alt=""/>
					<span class="count">128</span>
				</div>
			</div>
		</li>
		{% endfor %}
	</ul>
</div>
{% endblock %}

{% block scripts %}
{% endblock %}
