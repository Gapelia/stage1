/**
 * jcircular
 *
 * jQuery Plugin to animate a sequence of external images
 *
 * Copyright (c) 2012 Mike Francis
 * (http://mykyy.com)
 * MIT style license, FREE to use, alter, copy, sell, and especially ENHANCE
 *
 *
**/

$(function () {

	"use strict";

	$.fn.extend({

		carousel: function (options) {

			var defaults = {
				duration: 400,
				delay: 0,
				easing: "swing"
			}, o = $.extend(defaults, options);

			return this.each(function () {

				// var o = options;
				var obj = $(this);

				if (!isNaN(o.delay) && o.delay > 0) {
					var timer = setInterval(function () { carousel_next(); }, o.delay);
				}

				$(".panes:not(:animated)", obj).css({"left" : -$(".pane:first-child", obj).outerWidth(true) });
				$(".pane:first-child", obj).before($(".pane:last-child", obj)).addClass("active");

				$(".carousel-prev", obj).bind("click", this, function (e) {
					e.preventDefault();
					carousel_prev();
				});

				function carousel_prev() {

					var active = $(".active", obj);
					active.removeClass("active");

					var item_width = active.prev().outerWidth(true);
					var left_indent = parseInt($(".panes", obj).css("left"), 10) + item_width;

					$(".panes:not(:animated)", obj).animate({"left" : left_indent}, o.duration, o.easing, function () {

						$(".pane:first-child", obj).before($(".pane:last-child", obj));
						$(".panes", obj).css({"left" : -item_width});
						active.prev().addClass("active");

					});

				}

				$(".carousel-next", obj).bind("click", this, function (e) {
					e.preventDefault();
					carousel_next();
				});

				function carousel_next() {

					var active = $(".active", obj);
					var item_width = active.outerWidth(true);
					active.removeClass("active");

					var left_indent = parseInt($(".panes", obj).css("left"), 10) - item_width;

					$(".panes:not(:animated)", obj).animate({"left" : left_indent}, o.duration, o.easing, function () {

						// $(".pane:last-child", obj).after($(".pane:first-child", obj));
						$(".pane:last-child", obj).after($(obj));
						$(".panes", obj).css({"left" : -item_width});
						active.next().addClass("active");

					});

				}

				$(".carousel-pause", obj).bind("click", this, function (e) {
					e.preventDefault();
					clearInterval(timer);
				});

				$(".carousel-play", obj).bind("click", this, function (e) {
					e.preventDefault();
					timer = setInterval(function () { carousel_next(); }, o.delay);
				});

			});

		}

	});

});