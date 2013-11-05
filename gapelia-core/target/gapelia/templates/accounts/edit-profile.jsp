{% extends "base.html" %}


{% block title %}Edit Profile{% endblock title %}
{% block header_scripts %}
    <style>
        #user-content #name-edit, #user-content #lifestyle-title { font-size: 56px; margin: 0 0 2rem 0; }
    </style>
{% endblock header_scripts %}

{% block content %}
    <!--/ the action bar 																																	 /-->
    <header id="action-bar">
        <a href="#">
            <!--/ <h1>Gapelia</h1> /-->
            <h2>Welcome to Gapelia!<br/>Start by giving your cover page a fresh look.</h2>
        </a>

        <ul>
            <li id="action-next">
                <a href="#." class="top">Next</a>
                <a id = 'preview-url' href="{% url 'user-profile' user.username %}" class="bottom">Preview</a>
            </li>
            {% include "header_profile.html" with enable_upload=True %}
        </ul>
    </header>

    <!--/ the good stuff																																	 /-->

    <section id="user-content" style="{% if user.user_profile.background_image %}background-image:url('{{ user.user_profile.background_image.url }}'){% endif %};background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;">

    <div id="details-left">
        <span id="name-edit">
		    <span class="editable">{{ user.first_name }} {{ user.last_name }}</span>
				<input type="button" value="edit" class="btn-edit"/>
			</span>
			<span id="location-edit">
				<span class="editable">{% if user.user_profile.location %}{{ user.user_profile.location }}{% endif %}</span>
				<input type="button" value="edit" class="btn-edit"/>
			</span>
        <ul id="social-edit">
            <li id="facebook-edit">
                <span class="editable"><a href="{% if user.user_profile.facebook_profile %}{{ user.user_profile.facebook_profile }}{% else %}http://facebook.com{% endif %}"
                                          class="link">{% if user.user_profile.facebook_profile %}{{ user.user_profile.facebook_profile }}{% endif %}</a></span>
                <input type="button" value="edit" class="btn-edit"/>
            </li>

            <li id="twitter-edit">
                <span class="editable"><a href="{% if user.user_profile.twitter_profile %}{{ user.user_profile.twitter_profile }}{% else %}http://twitter.com{% endif %}"
                                          class="link">{% if user.user_profile.twitter_profile %}{{ user.user_profile.twitter_profile }}{% endif %}</a></span>
                <input type="button" value="edit" class="btn-edit"/>
            </li>

            <li id="tumblr-edit">
                <span class="editable"><a href="{% if user.user_profile.tumblr_profile %}{{ user.user_profile.tumblr_profile }}{% else %}http://tumblr.com{% endif %}"
                                          class="link">{% if user.user_profile.tumblr_profile %}{{ user.user_profile.tumblr_profile }}{% endif %}</a></span>
                <input type="button" value="edit" class="btn-edit"/>
            </li>
        </ul>

    </div>

    <div id="details-right">

        <div id="lifestyle-title">Lifestyle</div>

        <div id="lifestyle-edit">
            <form>
                <!--/ <input id="tags_1" type="text" class="tags editable" value="surfing,Hawaii,cupcakes,happiness,sun,AK47s"/> /-->
                <input id="tags_1" type="text" class="tags editable" value=""/>
                <span id="form-description">Add the passions, feelings, and places that best describe your lifestyle.</span>
            </form>
        </div>

        <div id="cover-form">
            <a>
                <span class="editable"></span>
                <input id="cover-upload" type="file" capture="filesystem" name="file" class="file-upload">Choose background picture</input>
            </a>
        </div>

    </div>

{% endblock content %}

{% block scripts %}
    <script src="/static/scripts/editable.js"></script>
    <script src="/static/scripts/jquery.editable.js"></script>
    <script src="/static/scripts/jquery.tagsinput.min.js"></script>
    <script src="/static/scripts/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="/static/scripts/jquery.fileupload.js"></script>
    <script src="/static/scripts/spin.min.js"></script>
    <script>
        {% autoescape off %}
            var tags = {{ tags }};
        {% endautoescape %}
        $("#details-left, #details-right").editables({
            beforeEdit: function(field) {
                field.val(this.text());
            },
            beforeFreeze: function(display) {
                display.text(this.val());
            }
        });
    </script>
    <script src="/static/scripts/profile.js"></script>
{% endblock scripts %}