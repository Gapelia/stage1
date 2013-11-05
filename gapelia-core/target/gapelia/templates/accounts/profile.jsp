{% extends "base.html" %}

{% block title %}{{ profile.username }}'s Profile{% endblock title %}

<body {% block body_class %}id="profile-preview"{% endblock body_class %}>
{% block content %}
		<!--/ the action bar
            /-->
        {% ifequal profile user %}
		<header id="action-bar">
		  <ul id="preview-nav">
			<li><a href="{% url 'edit-profile' %}">&larr;</a></li>
			<li>Preview</li>
			<li><a href="#.">Next</a></li>
		  </ul>
		</header>
        {% endifequal %}
        <section id="user-content" style="{% if profile.user_profile.background_image %}background-image:url('{{ profile.user_profile.background_image.url }}'){% endif %};background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;">
		<!--/ the good stuff																																	 /-->
		  <div id="details-left">
			<span id="username-edit">
			  <span class="editable">{{ profile.first_name }} {{ profile.last_name }}</span>
			</span>
			<span id="location-edit">
			  <span class="editable">{% if profile.user_profile.location %}{{ profile.user_profile.location }}{% endif %}</span>
			</span>
			<ul id="social-edit">
			  <li id="facebook-edit">
				<span class="editable"><a href="{{ profile.user_profile.facebook_profile }}" class="link"></a></span>
			  </li>
              
			  <li id="twitter-edit">
				<span class="editable"><a href="{{ profile.user_profile.twitter_profile }}" class="link"></a></span>
			  </li>
			  <li id="tumblr-edit">
				<span class="editable"><a href="{{ profile.user_profile.tumblr_profile }}" class="link"></a></span>
			  </li>
			</ul>
			<span id="book-count">
			  <span class="count">007</span> Books
			</span>
			<span id="gapelian-count">
			  <span class="count">023</span> Gapelians
			</span>
			<span id="user-rating">
			  <img src="/static/images/rating-light.png" alt=""/>
			  <span class="count">72</span>
			</span>
			</div>
			<div id="details-right">
				<div id="lifestyle-title">Lifestyle</div>

				<div id="lifestyle-edit">
					<ul>
                      {% for tag in profile.user_profile.tags.all %}
						<li>{{ tag.name }}</li>
                      {% endfor %}
					</ul>
				</div>

			</div>

		</section>

		<!--/ footer, the end																																	 /-->
{% endblock content %}

{% block scripts %}
{% endblock scripts %}