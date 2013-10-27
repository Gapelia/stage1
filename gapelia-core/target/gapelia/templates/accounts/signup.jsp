{% extends "base.html" %}

{% block title %}Signup{% endblock title %}

<body {% block body_class %}class="third"{% endblock body_class %}>
{% block content %}
    <header>
			<a href="/"><h1 id="logo">Gapelia</h1></a>

			<div id="account-links">
				Already on Gapelia?
				<a href="{% url 'signin' %}">Log In</a>
			</div>
		</header>

		<!--/ first nav bar 																																	 /-->

		<!--/ the good stuff																																	 /-->

		<div class="container">
		  <a href="{% url 'facebook-auth' %}"><button id="login-facebook">Sign up with Facebook</button></a>
		  <a href="{% url 'google-auth' %}"><button id="login-google">Sign up with Google+</button></a>

			<hr/>

            <form id="signup" action="{% url 'signup' %}" method="post">
                {% if errors %}
                    <div class="field-errors triangle-right left">
                        {% for key, val in errors.items %}
                            <span>{{ key|title }}: {{ val }}</span><br />
                        {% endfor %}
                    </div>
                {% endif %}
			  <input name="email" id="email" {% if form.data.email %}value="{{ form.data.email }}"{% endif %} placeholder="Email" type="text"/>
			  <div id="user-pass">
                {% csrf_token %}
				<input name="username" id="username" {% if form.data.username %}value="{{ form.data.username }}"{% endif %} placeholder="Name" type="text"/>
				<input name="password" id="password" placeholder="Password" type="password"/>
                  <button type="submit" id="submit">Submit</button>
{#                <input name="submit" class="submitButton" type="submit" />#}
			  </div>

            </form>
		</div>

		<!--/ footer, the end																																	 /-->

		<div id="cta">
			The Art of Storytelling
			<a href="" id="photo-credit">photo by Lacey</a>
		</div>

{% endblock content %}
