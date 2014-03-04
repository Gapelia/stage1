{% extends "base.html" %}

{% block title %}Reset Password{% endblock title %}

{% block content %}
	<body class="second">

		<header>
			<a href="/"><h1 id="logo">Gapelia</h1></a>

			<div id="account-links">
				Not on Gapelia?
				<a href="{% url 'signup' %}">Sign Up</a>
			</div>
		</header>

		<!--/ first nav bar 																																	 /-->

		<!--/ the good stuff																																	 /-->

		<div class="container">
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

        <form  method="post" action="{% url 'reset-password' uidb36 token %}">
            {% if errors %}
                <div class="field-errors triangle-right left">
                    {% for key, val in errors.items %}
                        <span>{{ key|title }}: {{ val }}</span><br />
                    {% endfor %}
                </div>
            {% endif %}
          {% csrf_token %}
            <input name="new_password1" id="password" placeholder="New Password" type="password"/>
            <input name="new_password2" id="password" placeholder="New Password(Again)" type="password"/>
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
