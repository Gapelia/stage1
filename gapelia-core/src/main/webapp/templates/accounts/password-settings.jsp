{% extends "base.html" %}
{% block title %}Password Settings{% endblock title %}
{% block content %}
    {% include 'book/header.html' %}
		<section id="breadcrumbs">
			<a href="">Home</a> > <a href={% url 'user-profile' user.username %}>{{ user.first_name }} {{ user.last_name }}</a> > <a href="" class="current">Settings</a>
		</section>

		<!--/ the good stuff																																	 /-->

		<section id="main-content">

			<div id="settings-wrapper">

				<aside id="settings-sidebar">
				  <ul>
					<li><a href="{% url 'profile-settings' %}">General</a></li>
					<li class="active"><a href="{% url 'password-settings' %}">Password</a></li>
					</ul>
				</aside>

				<div id="settings-content">
					<h3>Change Password</h3>
                    <form  method="post" action="{% url 'password-settings' %}">
                      {% if form.errors %}
                      <div class="field-errors triangle-right left">
                        {% for field in form %}
                        {% if field.errors %}<span>{{ field.label }}: {{ field.errors.0 }}</span><br />{% endif %}
                        {% endfor %}
                      </div>
                      {% endif %}

                      {% csrf_token %}
					<div class="setting-row">
						<div class="setting-name">New Password</div>
						<div class="user-setting"><input name="new_password1" type="password" id="pass"/></div>
						<div class="comment">New password, at least 6 characters</div>
					</div>

					<div class="setting-row">
						<div class="setting-name">Confirm Password</div>
						<div class="user-setting"><input name="new_password2" type="password" id="confirmpass"/></div>
						<div class="comment">Confirm your new password</div>
					</div>

					<button class="btn-save">Change Password</button>
                    </form>
				</div>

			</div>

			<!--/ book creation modals																													 /-->
			<!--/ modal 01																																			 /-->

			<div id="create-modal-01" class="reveal-modal xlarge">
				<div class="modal-row modal-header">
					<span class="active">1. Create discovery book</span>
					<span>2. Upload Content</span>
					<span>3. Save &amp; Publish</span>
				</div>

				<div class="modal-row">
					<div class="modal-title">Title*</div>
					<input class="modal-input" type="text"/>
				</div>

				<div class="modal-row">
					<div class="modal-title">Add description
						<span id="modal-counter"></span><span>characters left</span>
					</div>

					<textarea id="modal-description" class="modal-input" cols="50" rows="4"></textarea>
				</div>

				<div class="modal-row">
					<div class="modal-title">Choose Dimension*</div>
					<input class="modal-input" type="text"/>
				</div>

				<div class="modal-row">
					<div class="modal-title">Add a Geotag</div>
					<input class="modal-input" type="text"/>
				</div>

				<div class="modal-row">
					<div class="modal-title">Add a Passion</div>
					<input class="modal-input" type="text"/>
				</div>

				<div class="modal-row">
					<div class="modal-title">Add a Feeling</div>
					<input class="modal-input" type="text"/>
				</div>

				<div class="modal-row next-modal">
					<a href="#" class="close-reveal-modal" data-reveal-id="create-modal-02" data-animation="fade">Next</a>
				</div>
			</div>

			<!--/ modal 02																																			 /-->

			<div id="create-modal-02" class="reveal-modal xlarge">
				<div class="modal-row modal-header">
					<span>1. Create discovery book</span>
					<span class="active">2. Upload Content</span>
					<span>3. Save &amp; Publish</span>
				</div>

				<div class="modal-row" id="filepicker-iframe">
					<iframe src="https://www.filepicker.io/dialog/open/?key=AI64IEXbTBOTCMcUXllQHz&id=1372359022211&referrer=localhost&iframe=false&version=v1&multi=true&m=image/*#/computer/"></iframe>
				</div>

				<div class="modal-row next-modal">
					<a href="book-creation.html">Next</a>
				</div>
			</div>

		</section>

		<!--/ footer, the end																																	 /-->

{% endblock content %}

{% block scripts %}
<script src="/static/scripts/carouFredSel.js"></script>
<script src="/static/scripts/ba-throttle-debounce.js"></script>
<script src="/static/scripts/mousewheel.js"></script>
<script src="/static/scripts/touchSwipe.js"></script>
<script src="/static/scripts/transit.js"></script>
<script src="/static/scripts/squishy.js"></script>
<script src="/static/scripts/gapelia.js"></script>

		<!--/ <script src="//api.filepicker.io/v1/filepicker.js"></script> /-->
		<script src="/static/scripts/filepicker.js"></script>

		<script src="/static/scripts/simplyCountable.js"></script>

		<script>
			$(document).ready(function() {
				$("#modal-description").simplyCountable({
					counter: "#modal-counter",
					maxCount: 300
				});
			});
		</script>
{% endblock scripts %}