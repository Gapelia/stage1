<header id="action-bar">
	<a href="/"><h1>Gapelia</h1></a>

	<ul>
		<li id="action-create" class="active"><a data-modal="modal-1" onclick="showNiftyModals(this)">Create book<span>Create book</span></a></li>
		<li id="action-gapelians"><a href="#" class="tooltip">Gapelians<span>Gapelians</span></a></li>
		<li id="action-books"><a href="{% url 'books' %}" class="tooltip">Books<span>Books</span></a></li>
		<li id="action-dimensions"><a href="#" class="tooltip">Dimensions<span>Dimensions</span></a></li>
		{% include 'header_profile.html' %}
	</ul>
</header>