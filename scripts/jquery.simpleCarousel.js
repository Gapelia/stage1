/*
 *  Project: jQuery Simple Carousel version 1.0.2
 *  Author: Ruan Mer - http://ruanmer.com
 *  GitHub: https://github.com/ruanmer/Simple-Carousel
**/

;(function ($, window, document, undefined) {

	var defaults = {
		vertical: false,
		size: 5,
		scroll: 1,      		
		speed: 500,
		prev: ".carousel-prev",
		next: ".carousel-next"
	};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = "simpleCarousel";

		this.container = null;
		this.parent = null;
		this.list = null;
		this.children = null;
		this.firstChildren = null;
		this.buttonPrev = null;
		this.buttonNext = null;        

		var orientationClassName = "";

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			// vars
			orientationClassName = this.options.vertical ? "vertical" : "horizontal";

			// wrap element
			this.element.wrap('<div class="carousel carousel-'+orientationClassName+'"><div class="carousel-wrapper"></div></div>')

			// set elements
			this.container = this.element.parent().parent();
			this.parent = this.element.parent();
			this.list = this.element;
			this.children = this.element.children();
			this.firstChildren = this.element.children(":first");

			// set math
			this.childrenWidth   = parseInt(this.firstChildren.outerWidth(true), 10);
			this.childrenHeight  = parseInt(this.firstChildren.outerHeight(true), 10);
			this.parentWidth     = this.options.vertical ? this.childrenWidth : (this.childrenWidth * this.options.size);
			this.parentHeight    = this.options.vertical ? (this.childrenHeight * this.options.size) : this.childrenHeight;
			this.listWidth       = this.childrenWidth * this.children.length;
			this.listHeight      = this.childrenHeight * this.children.length;

			// css
			this.parent.css({ "position": "relative", "overflow": "hidden", "width": this.parentWidth, "height": this.parentHeight });	
			this.list.css({ "position": "absolute", "top": "0px", "left": "0px", "z-index": 10 });
			this.list.css(this.options.vertical ? { height: this.listHeight } : { width: this.listWidth });
			this.children.css({ "float": "left" });

			// rebuild class & id
			this.container.attr("id", this.element.attr("id"));
			this.container.addClass( this.element.attr("class"));
			this.list.removeAttr("id").removeAttr("class");

			// display buttons
			if(this.options.size <= this.children.length) { this.buttons(); }
		},

		buttons: function() {
			// vars
			var self = this;
			var moveToValue = 0;
			var maxMoveToValue = this.options.vertical ? (this.listHeight - (this.childrenHeight * this.options.size)) : (this.listWidth - (this.childrenWidth * this.options.size));

			// display default buttons
			if(this._defaults.prev == this.options.prev && this._defaults.next == this.options.next) {
				this.container.prepend('<a href="#" class="carousel-prev carousel-prev-'+orientationClassName+'"><</a> <a href="#" class="carousel-next carousel-next-'+orientationClassName+'">></a>');
			}

			// set buttons
			this.buttonPrev = this._defaults.prev == this.options.prev ? this.container.find(this.options.prev) : $(this.options.prev);
			this.buttonNext = this._defaults.next == this.options.next ? this.container.find(this.options.next) : $(this.options.next);

			// function button state
			var buttonState = function(p, n) {
				self.buttonPrev[p && moveToValue == 0 ? "addClass" : "removeClass" ]("carousel-prev-disabled");
				self.buttonNext[n && moveToValue == maxMoveToValue ? "addClass" : "removeClass" ]("carousel-next-disabled");
			};

			// state class on first-child
			buttonState(true, true);

			// function button action
			var funcButtonAction = function(e) {
				e.preventDefault();

				if (moveToValue == 0 && e.data.p || moveToValue == maxMoveToValue && e.data.n) {
					return false; // leave function
				}

				else {
					// set moveToValue
					moveToValue = moveToValue + (((self.options.vertical ? self.childrenHeight : self.childrenWidth) * self.options.scroll) * e.data.v);
					moveToValue = Math.min(maxMoveToValue, Math.max(moveToValue, 0));

					// animate
					self.list.animate((self.options.vertical) ? { top : moveToValue*-1 } : { left : moveToValue*-1 } , self.options.speed);

					// state class
					buttonState(e.data.p, e.data.n);
				}
			};

			// button prev
			this.buttonPrev.bind("click", {v: -1, p: true, n: false}, funcButtonAction);

			// button next
			this.buttonNext.bind("click", {v: 1, p: false, n: true}, funcButtonAction);
		}
	};

	$.fn.simpleCarousel = function (options) {
		return this.each(function() {
			if (!$.data(this, "plugin_simpleCarousel")) {
				$.data(this, "plugin_simpleCarousel", new Plugin( $(this), options));
			}
		});
	}

})(jQuery, window, document);
