(function () {

	var
	Merciful,
	__bind = function (fn, me) {
		return function () { return fn.apply(me, arguments); };
	};

	Merciful = (function () {

		function Merciful(element) {

			this.element = element;
			this.unmerci = __bind(this.unmerci, this);
			this.complete = __bind(this.complete, this);
			this.end = __bind(this.end, this);
			this.start = __bind(this.start, this);
			this.bindEvents();
			this.counter = $(".count .num", this.element);
			this.element.data("merciful", this);

		}

		Merciful.prototype.bindEvents = function () {

			this.element.mouseenter(this.start);
			this.element.mouseleave(this.end);
			this.element.click(this.unmerci);

			$(this.element).on("touchstart", this.element, this.start);
			return $(this.element).on("touchend", this.element, this.end);

		};

		Merciful.prototype.isMerciful = function () {
			return this.element.hasClass("merciful");
		};

		Merciful.prototype.isMercid = function () {
			return this.element.hasClass("complete");
		};

		Merciful.prototype.start = function () {

			if (this.isMerciful() && !this.isMercid()) {
				this.element.trigger("merci:active");
				this.element.addClass("active");

				return this.timer = setTimeout(this.complete, 700);
			}

		};

		Merciful.prototype.end = function () {

			if (this.isMerciful() && !this.isMercid()) {
				this.element.trigger("merci:inactive");
				this.element.removeClass("active");

				if (this.timer !== null) {
					return clearTimeout(this.timer);
				}
			}

		};

		Merciful.prototype.complete = function () {

			this.end();
			this.incrementCount();
			this.element.addClass("complete");
            $.ajax({
            	url: "/api/actions/voteBook",
            	contentType: "application/x-www-form-urlencoded;charset=utf-8",
            	type: "POST",
            	async: false,
            	data: {
            		sessionId: sessionId,
            	    bookId: bookId
            	}
             });
             $.ajax({
             	url: "/api/notifications/createBookNotification",
             	contentType: "application/x-www-form-urlencoded;charset=utf-8",
             	type: "POST",
             	async: false,
             	data: {
             		sessionId: sessionId,
             	    recipient: bookOwner.userId,
             	    sender: user.userId,
             	    referencedBook: bookId
             	}
             });
			return this.element.trigger("merci:added");


		};

		Merciful.prototype.unmerci = function (event) {

			event.preventDefault();

			if (this.isMercid()) {
				this.decrementCount();
				this.element.removeClass("complete");
                $.ajax({
                	url: "/api/actions/removeVoteBook",
                	contentType: "application/x-www-form-urlencoded;charset=utf-8",
                	type: "POST",
                	async: false,
                	data: {
                		sessionId: sessionId,
                	    bookId: bookId
                	}
                 });
				return this.element.trigger("merci:removed");
			}

		};

		Merciful.prototype.setCount = function (count) {
			return this.counter.html(count);
		};

		Merciful.prototype.currentCount = function () {
			return parseInt(this.counter.html());
		};

		Merciful.prototype.incrementCount = function () {
			return this.setCount(this.currentCount() + 1);
		};

		Merciful.prototype.decrementCount = function () {
			return this.setCount(this.currentCount() - 1);
		};

		return Merciful;

	})();

	jQuery(function ($) {
		return $.fn.merciful = function () {
			return this.each(function () { return new Merciful($(this)); });
		};
	});

}).call(this);
