<div style="font-family:Arial, Arial, Helvetica, sans-serif; font-size:15px; padding:30px 0 0 20px;">
{% load i18n %}{% autoescape off %}
{% trans "You're receiving this e-mail because you requested a password reset" %} <br />
{% blocktrans %}for your user account at Gapelia{% endblocktrans %}. <br /><br />

{% trans "Please go to the following page and choose a new password:" %} <br /><br />
{% block reset_link %}
<a href="{{ url }}">{{ url }}</a>
{% endblock %} <br /><br />

{% blocktrans %}The Gapelia team<br />
<a href="http://gapelia.com">www.gapelia.com</a>{% endblocktrans %} <br /><br />
{% endautoescape %}
</div>
