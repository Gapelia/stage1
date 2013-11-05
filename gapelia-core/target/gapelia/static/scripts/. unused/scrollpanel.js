/*! jQuery.scrollpanel 0.1 - //larsjung.de/scrollpanel - MIT License */

(function (a) {

	"use strict";

	var b = a(window), c = "scrollpanel", d = {
		prefix: "sp-"
	}, e = function (b, c) {

		var e = this;
		e.$el = a(b), e.settings = a.extend({}, d, c);

		var f = e.settings.prefix;
		e.mouseOffsetY = 0, e.updateId = 0, e.scrollProxy = a.proxy(e.scroll, e), (!e.$el.css("position") || e.$el.css("position") === "static") && e.$el.css("position", "relative"), e.$scrollbar = a('<div class="' + f + 'scrollbar"/>'), e.$thumb = a('<div class="' + f + 'thumb"/>').appendTo(e.$scrollbar), e.$el.addClass(f + "host").wrapInner('<div class="' + f + 'viewport"><div class="' + f + 'container"/></div>').append(e.$scrollbar), e.$viewport = e.$el.find("> ." + f + "viewport"), e.$container = e.$viewport.find("> ." + f + "container"), e.$el.on("mousewheel", function (a, b, c, d) {
			e.$viewport.scrollTop(e.$viewport.scrollTop() - 50 * d), e.update(), a.preventDefault(), a.stopPropagation();
		}).on("scroll", function () {
			e.update();
		}), e.$viewport.css({
			paddingRight: e.$scrollbar.outerWidth(!0),
			height: e.$el.height(),
			overflow: "hidden"
		}), e.$container.css({
			overflow: "hidden"
		}), e.$scrollbar.css({
			position: "absolute",
			top: 0,
			right: 0,
			overflow: "hidden"
		}).on("mousedown", function (a) {
			e.mouseOffsetY = e.$thumb.outerHeight() / 2, e.onMousedown(a);
		}).each(function () {
			e.onselectstart = function () {
				return !1;
			};
		}), e.$thumb.css({
			position: "absolute",
			left: 0,
			width: "100%"
		}).on("mousedown", function (a) {
			e.mouseOffsetY = a.pageY - e.$thumb.offset().top, e.onMousedown(a);
		}), e.update();

	};

	a.extend(e.prototype, {
		update: function (a) {

			var b = this;
			b.updateId && !a ? (clearInterval(b.updateId), b.updateId = 0) : !b.updateId && a && (b.updateId = setInterval(function () {
				b.update(!0);
			}, 50)), b.$viewport.css("height", b.$el.height());

			var c = b.$el.height(), d = b.$container.outerHeight(), e = b.$viewport.scrollTop(), f = e / d, g = Math.min(c / d, 1), h = b.$scrollbar.height();

			g < 1 ? (b.$scrollbar.css({
				height: b.$el.innerHeight() + h - b.$scrollbar.outerHeight(!0)
			}).fadeIn(50), b.$thumb.css({
				top: h * f,
				height: h * g
			})) : b.$scrollbar.fadeOut(50);

		},
		scroll: function (a) {

			var b = this, c = (a.pageY - b.$scrollbar.offset().top - b.mouseOffsetY) / b.$scrollbar.height();
			b.$viewport.scrollTop(b.$container.outerHeight() * c), b.update(), a.preventDefault(), a.stopPropagation();

		},
		onMousedown: function (a) {

			var c = this;
			c.scroll(a), c.$scrollbar.addClass("active"), b.on("mousemove", c.scrollProxy).one("mouseup", function (a) {
				c.$scrollbar.removeClass("active"), b.off("mousemove", c.scrollProxy), c.scroll(a);
			});

		}
	}), a.fn[c] = function (b, d) {

		return this.each(function () {

			var f = a(this), g = f.data(c);
			g || (g = new e(this, b), g.update(), f.data(c, g)), b === "update" && g.update(d);

		});

	};

})(jQuery);