/*! jQuery.scrollpanel 0.1 - //larsjung.de/scrollpanel - MIT License */

(function (a) {

	"use strict";

	var b = a(window), c = "scrollpanel", d = {
		prefix: "sp-"
	}, e = function (b, c) {

		var e = this;
		e.$el = a(b), e.settings = a.extend({}, d, c);

		var f = e.settings.prefix;
		e.mouseOffsetX = 0, e.updateId = 0, e.scrollProxy = a.proxy(e.scroll, e), (!e.$el.css("position") || e.$el.css("position") === "static") && e.$el.css("position", "relative"), e.$scrollbar = a('<div class="' + f + 'scrollbar"/>'), e.$thumb = a('<div class="' + f + 'thumb"/>').appendTo(e.$scrollbar), e.$el.addClass(f + "host").wrapInner('<div class="' + f + 'viewport"><div class="' + f + 'container"/></div>').append(e.$scrollbar), e.$viewport = e.$el.find("> ." + f + "viewport"), e.$container = e.$viewport.find("> ." + f + "container"), e.$el.on("mousewheel", function (a, b, c, d) {
			e.$viewport.scrollLeft(e.$viewport.scrollLeft() - 50 * d), e.update(), a.preventDefault(), a.stopPropagation();
		}).on("scroll", function () {
			e.update();
		}), e.$viewport.css({
			paddingBottom: e.$scrollbar.outerWidth(!0),
			width: e.$el.width(),
			overflow: "hidden"
		}), e.$container.css({
			overflow: "hidden"
		}), e.$scrollbar.css({
			position: "absolute",
			bottom: 0,
			left: 0,
			overflow: "hidden"
		}).on("mousedown", function (a) {
			e.mouseOffsetX = e.$thumb.outerWidth() / 2, e.onMousedown(a);
		}).each(function () {
			e.onselectstart = function () {
				return !1;
			};
		}), e.$thumb.css({
			position: "absolute",
			left: 0,
			width: "100%"
		}).on("mousedown", function (a) {
			e.mouseOffsetX = a.pageY - e.$thumb.offset().left, e.onMousedown(a);
		}), e.update();

	};

	a.extend(e.prototype, {
		update: function (a) {

			var b = this;
			b.updateId && !a ? (clearInterval(b.updateId), b.updateId = 0) : !b.updateId && a && (b.updateId = setInterval(function () {
				b.update(!0);
			}, 50)), b.$viewport.css("width", b.$el.width());

			var c = b.$el.width(), d = b.$container.outerWidth(), e = b.$viewport.scrollLeft(), f = e / d, g = Math.min(c / d, 1), w = b.$scrollbar.width();

			g < 1 ? (b.$scrollbar.css({
				width: b.$el.innerWidth() + w - b.$scrollbar.outerWidth(!0)
			}).fadeIn(50), b.$thumb.css({
				bottom: w * f,
				width: w * g
			})) : b.$scrollbar.fadeOut(50);

		},
		scroll: function (a) {

			var b = this, c = (a.pageY - b.$scrollbar.offset().left - b.mouseOffsetX) / b.$scrollbar.width();
			b.$viewport.scrollLeft(b.$container.outerWidth() * c), b.update(), a.preventDefault(), a.stopPropagation();

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
