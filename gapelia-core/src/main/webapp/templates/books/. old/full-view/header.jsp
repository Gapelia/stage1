<header>
			<div id="back">
				<a href="{% url "book" book.slug %}" onclick="if(PAGE_CHANGED) savePageChanges();">&#11013;</a>
			</div>

			<div id="title">
				<span id="book-title">{{ book.title }}</span> by <span id="book-author">{{ book.created_by.get_full_name }}</span>
			</div>

			<div id="finish">
				<a href="#">Publish</a> | <a onclick="savePageChanges(this, false); location.reload();">Save</a>
			</div>
		</header>