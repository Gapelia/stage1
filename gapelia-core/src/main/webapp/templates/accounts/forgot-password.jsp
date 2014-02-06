{% extends "base.html" %}

{% block title %}Forgot Password{% endblock title %}


<body {% block body_class %}class="second"{% endblock body_class %}>
{% block content %}
		<header>
			<a href="/"><h1 id="logo">Gapelia</h1></a>

			<div id="account-links">
				Not on Gapelia?
				<a href="{% url 'signup' %}">Sign Up</a>
			</div>
		</header>

		<!--/ first nav bar 																																	 /-->

		<!--/ the good stuff																																	 /-->

{#		<div class="container">#}
{#			<button id="login-facebook">Login with Facebook</button>#}
{#			<button id="login-google">Login with Google+</button>#}
{##}
{#			<hr/>#}
{##}
{#			<input id="email" placeholder="Email" type="text"/>#}
{#			<input id="password" placeholder="Password" type="password"/>#}
{#		</div>#}
    <!-- <div class="container"> -->
    <!--     <button id="login-facebook">Sign up with Facebook</button> -->
    <!--     <button id="login-google">Sign up with Google+</button> -->

        <!-- <hr/> -->
<div class="container">
        <form  method="post" action="{% url 'forgot-password' %}" method="post">
            {% if errors %}
                <div class="field-errors triangle-right left">
                    {% for key, val in errors.items %}
                        <span>{{ key|title }}: {{ val }}</span><br />
                    {% endfor %}
                </div>
            {% endif %}
          {% csrf_token %}
            <input name="email" id="email" {% if form.data.email %}value="{{ form.data.email }}"{% endif %} placeholder="Email" type="text"/>
            <div id="user-pass">
                <button type="submit" id="submit">Submit</button>
                &nbsp;&nbsp;&nbsp;<a style="color:blue;" href="{% url 'signin' %}"><< Back to login</a>
            </div>

        </form>
    </div>
		<!--/ footer, the end																																	 /-->

		<div id="cta">
			The Art of Storytelling
			<a href="" id="photo-credit">photo by Lacey</a>
		</div>

{% endblock content %}
