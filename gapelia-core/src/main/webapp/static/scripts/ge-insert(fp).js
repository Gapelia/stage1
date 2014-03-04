!function (a) {

	GapeliaEditor.prototype.serialize = function () {

		var b, c, d, e, f, g, h, i, j = {};

		for (b = 0; b < this.elements.length; b += 1) {
			for (d = "" !== this.elements[b].id ? this.elements[b].id : "element-" + b, e = a(this.elements[b]).clone(), f = a(".gapeliaInsert", e), c = 0; c < f.length; c++) g = a(f[c]), h = a(".gapeliaInsert-placeholder", g).children(), 0 === h.length ? g.remove() : (g.removeAttr("contenteditable"), a("img[draggable]", g).removeAttr("draggable"), g.hasClass("small") && h.addClass("small"), a(".gapeliaInsert-buttons", g).remove(), h.unwrap());

			i = e.html().trim(), j[d] = { value: i };
		}

		return j;

	}, GapeliaEditor.prototype.deactivate = function () {

		var b;

		if (this.isActive) {
			for (this.isActive = !1, void 0 !== this.toolbar && (this.toolbar.style.display = "none"), document.documentElement.removeEventListener("mouseup", this.checkSelectionWrapper), b = 0; b < this.elements.length; b += 1) this.elements[b].removeEventListener("keyup", this.checkSelectionWrapper), this.elements[b].removeEventListener("blur", this.checkSelectionWrapper), this.elements[b].removeAttribute("contentEditable");
			a.fn.gapeliaInsert.insert.$el.gapeliaInsert("disable");
		}

	}, GapeliaEditor.prototype.activate = function () {

		var b;

		if (!this.isActive) {
			for (void 0 !== this.toolbar && (this.toolbar.style.display = "block"), this.isActive = !0, b = 0; b < this.elements.length; b += 1) this.elements[b].setAttribute("contentEditable", !0);
			this.bindSelect(), a.fn.gapeliaInsert.insert.$el.gapeliaInsert("enable");
		}

	}, a.fn.gapeliaInsert = function (b) {

		/*
		return "string" == typeof b && a.fn.gapeliaInsert.insert[b] ? (a.fn.gapeliaInsert.insert[b](), void 0) : (a.fn.gapeliaInsert.settings = a.extend(a.fn.gapeliaInsert.settings, b), this.each(function () {
			a("p", this).bind("dragover drop", function (a) {
				return a.preventDefault(), !1;
			}), a.fn.gapeliaInsert.insert.init(a(this)), a.fn.gapeliaInsert.settings.images === !0 && a.fn.gapeliaInsert.images.init(), a.fn.gapeliaInsert.settings.maps === !0 && a.fn.gapeliaInsert.maps.init();
		}));
		*/

		return "string" == typeof b && a.fn.gapeliaInsert.insert[b] ? (a.fn.gapeliaInsert.insert[b](), void 0) : (a.fn.gapeliaInsert.settings = a.extend(a.fn.gapeliaInsert.settings, b), this.each(function () {

			a("p", this).bind("dragover drop", function (a) { return a.preventDefault(), !1; }),
			a.fn.gapeliaInsert.insert.init(a(this)),
			a.fn.gapeliaInsert.settings.images === !0 && a.fn.gapeliaInsert.images.init(),
			a.fn.gapeliaInsert.settings.maps === !0 && a.fn.gapeliaInsert.maps.init(),
			a.fn.gapeliaInsert.settings.filepicker === !0 && a.fn.gapeliaInsert.filepicker.init();

		}));

	}, a.fn.gapeliaInsert.settings = {
		imagesUploadScript: "/static/scripts/upload.php",
		enabled: !0,
		images: !0,
		maps: !1,
		filepicker: !0
	}, a.fn.gapeliaInsert.insert = {
		init: function (a) {
			this.$el = a, this.setPlaceholders(), this.setEvents();
		},

		deselect: function () {
			document.getSelection().removeAllRanges();
		},

		disable: function () {
			a.fn.gapeliaInsert.settings.enabled = !1, a.fn.gapeliaInsert.insert.$el.find(".gapeliaInsert-buttons").addClass("hide");
		},

		enable: function () {
			a.fn.gapeliaInsert.settings.enabled = !0, a.fn.gapeliaInsert.insert.$el.find(".gapeliaInsert-buttons").removeClass("hide");
		},

		setPlaceholders: function () {

			var
			b = a.fn.gapeliaInsert.insert.$el,
			c = "",
			d = '<a class="gapeliaInsert-action action-images-add">Image</a>',
			// d = '<input class="picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE">',
			e = '<a class="gapeliaInsert-action action-maps-add">Map</a>',
			fp = '<a class="gapeliaInsert-action action-filepicker-add">FilePicker</a>';

			a.fn.gapeliaInsert.settings.images === !0 && a.fn.gapeliaInsert.settings.maps === !0 && a.fn.gapeliaInsert.settings.filepicker === !0 ? c = '<a class="gapeliaInsert-buttonsShow">Insert</a><ul class="gapeliaInsert-buttonsOptions"><li>' + d + "</li><li>" + e + "</li>" + fp + "</ul>" : a.fn.gapeliaInsert.settings.images === !0 ? c = d : a.fn.gapeliaInsert.settings.maps === !0 && (c = e), a.fn.gapeliaInsert.settings.filepicker === !0 && (c = fp), "" !== c && (c = '<div class="gapeliaInsert" contenteditable="false"><div class="gapeliaInsert-buttons"><div class="gapeliaInsert-buttonsIcon">&rarr;</div>' + c + '</div><div class="gapeliaInsert-placeholder"></div></div>', b.is(":empty") && b.html("<p><br></p>"), b.keyup(function () {

				var d = 0;

				b.children("p").each(function () {
					a(this).next().hasClass("gapeliaInsert") === !1 && (a(this).after(c), a(this).next(".gapeliaInsert").attr("id", "gapeliaInsert-" + d)), d++;
				});

			}).keyup());

			/*
			a.fn.gapeliaInsert.settings.images === !0 && a.fn.gapeliaInsert.settings.maps === !0 ? c = '<a class="gapeliaInsert-buttonsShow">Insert</a><ul class="gapeliaInsert-buttonsOptions"><li>' + d + "</li><li>" + e + "</li></ul>" : a.fn.gapeliaInsert.settings.images === !0 ? c = d : a.fn.gapeliaInsert.settings.maps === !0 && (c = e), "" !== c && (c = '<div class="gapeliaInsert" contenteditable="false"><div class="gapeliaInsert-buttons"><div class="gapeliaInsert-buttonsIcon">&rarr;</div>' + c + '</div><div class="gapeliaInsert-placeholder"></div></div>', b.is(":empty") && b.html("<p><br></p>"), b.keyup(function () {

				var d = 0;

				b.children("p").each(function () {
					a(this).next().hasClass("gapeliaInsert") === !1 && (a(this).after(c), a(this).next(".gapeliaInsert").attr("id", "gapeliaInsert-" + d)), d++;
				});

			}).keyup());
			*/

		},

		setEvents: function () {

			var b = this,
			c = a.fn.gapeliaInsert.insert.$el;

			c.on("selectstart", ".gapeliaInsert", function (a) {
				return a.preventDefault(), !1;
			}), c.on("blur", function () {

				var b, c = a(this).clone();

				c.find(".gapeliaInsert").remove(), b = c.html().replace(/^\s+|\s+$/g, ""), ("" === b || "<p><br></p>" === b) && a(this).addClass("gapelia-editor-placeholder");

			}), c.on("click", ".gapeliaInsert-buttons a.gapeliaInsert-buttonsShow", function () {

				var
				c = a(this).siblings(".gapeliaInsert-buttonsOptions"),
				d = a(this).parent().siblings(".gapeliaInsert-placeholder");

				a(this).hasClass("active") ? (a(this).removeClass("active"), c.hide(), a("a", c).show()) : (a(this).addClass("active"), c.show(), a("a", c).each(function () {

					var
					b = a(this).attr("class").split("action-")[1],
					e = b.split("-")[0];

					a(".gapeliaInsert-" + e, d).length > 0 && a("a:not(.action-" + b + ")", c).hide();

				})), b.deselect();

			}), c.on("mouseleave", ".gapeliaInsert", function () {
				a("a.gapeliaInsert-buttonsShow", this).removeClass("active"), a(".gapeliaInsert-buttonsOptions", this).hide();
			}), c.on("click", ".gapeliaInsert-buttons .gapeliaInsert-action", function () {

				var
				b = a(this).attr("class").split("action-")[1].split("-"),
				c = a(this).parents(".gapeliaInsert-buttons").siblings(".gapeliaInsert-placeholder");

				a.fn.gapeliaInsert[b[0]] && a.fn.gapeliaInsert[b[0]][b[1]] && a.fn.gapeliaInsert[b[0]][b[1]](c), a(this).parents(".gapeliaInsert").mouseleave();

			});
		}
	};

}(jQuery),
function (a) {

	a.fn.gapeliaInsert.images = {
		init: function () {
			this.$el = a.fn.gapeliaInsert.insert.$el, this.options = a.extend(this.
				default, a.fn.gapeliaInsert.settings.imagesPlugin), this.setImageEvents(), this.setDragAndDropEvents(), this.preparePreviousImages();
		},

		"default": {
			formatData: function (a) {
				var b = new FormData;
				return b.append("file", a), b;
			}
		},

		preparePreviousImages: function () {
			this.$el.find(".gapeliaInsert-images").each(function () {

				var b = a(this).parent();
				b.html('<div class="gapeliaInsert-placeholder" draggable="true">' + b.html() + "</div>");

			});
		},

		add: function (b) {

			var c, d, e = this;

			return c = a('<input type="file">').click(), c.change(function () {
				d = this.files, e.uploadFiles(b, d);
			}), a.fn.gapeliaInsert.insert.deselect(), c;

			/*
			return c = a('<input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE"></input>').click(), c.change(function () {
				// d = this.files, e.uploadFiles(b, d);
			}), a.fn.gapeliaInsert.insert.deselect(), c;
			*/

		},

		addFilePicker: function (b) {

			var c, fp = this;

			return c = a('<input type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE">').click(), c.change(function () {
				// d = this.files, e.uploadFiles(b, d);
				fp = this.files, e.uploadFiles(b, fp);
			}), a.fn.gapeliaInsert.insert.deselect(), c;

		},

		updateProgressBar: function (b) {

			var c, d = a(".progress:first", this.$el);
			b.lengthComputable && (c = b.loaded / b.total * 100 | 0, d.attr("value", c), d.html(c));

		},

		uploadCompleted: function (b) {

			var c, d = a(".progress:first", this.$el);

			d.attr("value", 100), d.html(100), d.before('<div class="gapeliaInsert-images"><img src="' + b.responseText + '" draggable="true" alt=""></div>'), c = d.siblings("img"), d.remove(), c.load(function () {
				c.parent().mouseleave().mouseenter();
			});

		},

		uploadFiles: function (b, c) {

			for (var d = {
				"image/png": !0,
				"image/jpeg": !0,
				"image/gif": !0
			}, e = this, f = function () {

				var a = new XMLHttpRequest;
				return a.upload.onprogress = e.updateProgressBar, a;

			}, g = 0; g < c.length; g++) {
				var h = c[g];

				d[h.type] === !0 && (b.append('<progress class="progress" min="0" max="100" value="0">0</progress>'), a.ajax({
					type: "post",
					url: a.fn.gapeliaInsert.settings.imagesUploadScript,
					xhr: f,
					cache: !1,
					contentType: !1,
					complete: this.uploadCompleted,
					processData: !1,
					data: this.options.formatData(h)
				}));
			}

		},

		setImageEvents: function () {

			this.$el.on("mouseenter", ".gapeliaInsert-images", function () {

				var b, c, d = a("img", this);

				a.fn.gapeliaInsert.settings.enabled !== !1 && d.length > 0 && (a(this).append('<a class="gapeliaInsert-imageRemove"></a>'), a(this).parent().parent().hasClass("small") ? a(this).append('<a class="gapeliaInsert-imageResizeBigger"></a>') : a(this).append('<a class="gapeliaInsert-imageResizeSmaller"></a>'), b = d.position().top + parseInt(d.css("margin-top"), 10), c = d.position().left + d.width() - 30, a(".gapeliaInsert-imageRemove", this).css({
					right: "auto",
					top: b,
					left: c
				}), a(".gapeliaInsert-imageResizeBigger, .gapeliaInsert-imageResizeSmaller", this).css({
					right: "auto",
					top: b,
					left: c - 31
				}));

			}), this.$el.on("mouseleave", ".gapeliaInsert-images", function () {
				a(".gapeliaInsert-imageRemove, .gapeliaInsert-imageResizeSmaller, .gapeliaInsert-imageResizeBigger", this).remove();
			}), this.$el.on("click", ".gapeliaInsert-imageResizeSmaller", function () {
				a(this).parent().parent().parent().addClass("small"), a(this).parent().mouseleave().mouseleave(), a.fn.gapeliaInsert.insert.deselect();
			}), this.$el.on("click", ".gapeliaInsert-imageResizeBigger", function () {
				a(this).parent().parent().parent().removeClass("small"), a(this).parent().mouseleave().mouseleave(), a.fn.gapeliaInsert.insert.deselect();
			}), this.$el.on("click", ".gapeliaInsert-imageRemove", function () {
				0 === a(this).parent().siblings().length && a(this).parent().parent().parent().removeClass("small"), a(this).parent().remove(), a.fn.gapeliaInsert.insert.deselect();
			});

		},

		setDragAndDropEvents: function () {

			var
			b, c, d = this,
			e = !1,
			f = !1;

			a(document).on("dragover", "body", function () {
				a.fn.gapeliaInsert.settings.enabled !== !1 && a(this).addClass("hover");
			}), a(document).on("dragend", "body", function () {
				a.fn.gapeliaInsert.settings.enabled !== !1 && a(this).removeClass("hover");
			}), this.$el.on("dragover", ".gapeliaInsert", function () {
				a.fn.gapeliaInsert.settings.enabled !== !1 && (a(this).addClass("hover"), a(this).attr("contenteditable", !0));
			}), this.$el.on("dragleave", ".gapeliaInsert", function () {
				a.fn.gapeliaInsert.settings.enabled !== !1 && (a(this).removeClass("hover"), a(this).attr("contenteditable", !1));
			}), this.$el.on("dragstart", ".gapeliaInsert .gapeliaInsert-images img", function () {
				a.fn.gapeliaInsert.settings.enabled !== !1 && (b = a(this).parent().index(), c = a(this).parent().parent().parent().attr("id"));
			}), this.$el.on("dragend", ".gapeliaInsert .gapeliaInsert-images img", function (b) {

				a.fn.gapeliaInsert.settings.enabled !== !1 && e === !0 && (0 === a(b.originalEvent.target.parentNode).siblings().length && a(b.originalEvent.target.parentNode).parent().parent().removeClass("small"), a(b.originalEvent.target.parentNode).mouseleave(), a(b.originalEvent.target.parentNode).remove(), e = !1, f = !1);

			}), this.$el.on("dragover", ".gapeliaInsert .gapeliaInsert-images img", function (b) {
				a.fn.gapeliaInsert.settings.enabled !== !1 && b.preventDefault();
			}), this.$el.on("drop", ".gapeliaInsert .gapeliaInsert-images img", function () {

				var d, e, g;

				if (a.fn.gapeliaInsert.settings.enabled !== !1) {
					if (c !== a(this).parent().parent().parent().attr("id")) return f = !1, b = c = null, void 0;
					d = parseInt(b, 10), e = a(this).parent().parent().find(".gapeliaInsert-images:nth-child(" + (d + 1) + ")"), g = a(this).parent().index(), g > d ? e.insertAfter(a(this).parent()) : d > g && e.insertBefore(a(this).parent()), e.mouseleave(), f = !0, b = null
				}

			}), this.$el.on("drop", ".gapeliaInsert", function (b) {

				var c;

				b.preventDefault(), a.fn.gapeliaInsert.settings.enabled !== !1 && (a(this).removeClass("hover"), a("body").removeClass("hover"), a(this).attr("contenteditable", !1), c = b.originalEvent.dataTransfer.files, c.length > 0 ? d.uploadFiles(a(".gapeliaInsert-placeholder", this), c) : f === !0 ? f = !1 : (a(".gapeliaInsert-placeholder", this).append('<div class="gapeliaInsert-images">' + b.originalEvent.dataTransfer.getData("text/html") + "</div>"), a("meta", this).remove(), e = !0));

			})

		}
	}

}(jQuery),
function (a) {

	a.fn.gapeliaInsert.maps = {
		init: function () {
			this.$el = a.fn.gapeliaInsert.insert.$el
		},

		add: function (b) {
			a.fn.gapeliaInsert.insert.deselect(), b.append('<div class="gapeliaInsert-maps">Map - Coming soon...</div>')
		}
	}
	
	a.fn.gapeliaInsert.filepicker = {
		init: function () {
			this.$el = a.fn.gapeliaInsert.insert.$el
		},

		addFilepicker: function (b) {
			a.fn.gapeliaInsert.insert.deselect(), b.append('<div class="gapeliaInsert-filepicker">FilePicker</div>');
		}
	}

}(jQuery);
