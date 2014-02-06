function GapeliaEditor(elements, options) {

	"use strict";
	return this.init(elements, options);

}

if (typeof module === "object") {
	module.exports = GapeliaEditor;
}

(function (window, document) {

	"use strict";

	function extend(b, a) {

		var prop;

		if (b === undefined) {
			return a;
		}

		for (prop in a) {
			if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop) === false) {
				b[prop] = a[prop];
			}
		}

		return b;

	}

	// http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
	// by Tim Down
	function saveSelection() {

		var
		i,
		len,
		ranges,
		sel = window.getSelection();

		if (sel.getRangeAt && sel.rangeCount) {
			ranges = [];

			for (i = 0, len = sel.rangeCount; i < len; i += 1) {
				ranges.push(sel.getRangeAt(i));
			}

			return ranges;
		}

		return null;

	}

	function restoreSelection(savedSel) {

		var
		i,
		len,
		sel = window.getSelection();

		if (savedSel) {
			sel.removeAllRanges();

			for (i = 0, len = savedSel.length; i < len; i += 1) {
				sel.addRange(savedSel[i]);
			}
		}

	}

	// http://stackoverflow.com/questions/1197401/how-can-i-get-the-element-the-caret-is-in-with-javascript-when-using-contentedi
	// by You
	function getSelectionStart() {

		var
		node = document.getSelection().anchorNode,
		startNode = (node && node.nodeType === 3 ? node.parentNode : node);

		return startNode;

	}

	// http://stackoverflow.com/questions/4176923/html-of-selected-text
	// by Tim Down
	function getSelectionHtml() {

		var
		i,
		html = "",
		sel,
		len,
		container;

		if (window.getSelection !== undefined) {
			sel = window.getSelection();

			if (sel.rangeCount) {
				container = document.createElement("div");

				for (i = 0, len = sel.rangeCount; i < len; i += 1) {
					container.appendChild(sel.getRangeAt(i).cloneContents());
				}

				html = container.innerHTML;
			}
		} else if (document.selection !== undefined) {
			if (document.selection.type === 'Text') {
				html = document.selection.createRange().htmlText;
			}
		}

		return html;

	}

	GapeliaEditor.prototype = {
		defaults: {
			allowMultiParagraphSelection: true,
			anchorInputPlaceholder: "Paste or type a link",
			buttons: ["bold", "italic", "underline", "anchor", "header1", "header2", "quote"],
			buttonLabels: false,
			delay: 0,
			diffLeft: 0,
			diffTop: -10,
			disableReturn: false,
			disableToolbar: false,
			firstHeader: "h3",
			forcePlainText: true,
			placeholder: "Type your text",
			secondHeader: "h4",
			targetBlank: false
		},

		init: function (elements, options) {

			this.elements = typeof elements === "string" ? document.querySelectorAll(elements) : elements;

			if (this.elements.length === 0) {
				return;
			}

			this.isActive = true;
			this.parentElements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre"];
			this.id = document.querySelectorAll(".gapelia-editor-toolbar").length + 1;
			this.options = extend(options, this.defaults);

			return this.initElements().bindSelect().bindPaste().setPlaceholders().bindWindowActions();

		},

		initElements: function () {

			var
			i,
			addToolbar = false;

			for (i = 0; i < this.elements.length; i += 1) {
				this.elements[i].setAttribute("contentEditable", true);

				if (!this.elements[i].getAttribute("data-placeholder")) {
					this.elements[i].setAttribute("data-placeholder", this.options.placeholder);
				}

				this.elements[i].setAttribute("data-gapelia-element", true);
				this.bindParagraphCreation(i).bindReturn(i).bindTab(i);

				if (!this.options.disableToolbar && !this.elements[i].getAttribute("data-disable-toolbar")) {
					addToolbar = true;
				}
			}

			// Init toolbar
			if (addToolbar) {
				this.initToolbar().bindButtons().bindAnchorForm();
			}

			return this;

		},

		serialize: function () {

			var
			i,
			elementid,
			content = {};

			for (i = 0; i < this.elements.length; i += 1) {
				elementid = (this.elements[i].id !== "") ? this.elements[i].id : "element-" + i;

				content[elementid] = {
					value: this.elements[i].innerHTML.trim()
				};
			}

			return content;

		},

		bindParagraphCreation: function (index) {

			var self = this;

			this.elements[index].addEventListener("keyup", function (e) {

				var
				node = getSelectionStart(),
				tagName;

				if (node && node.getAttribute("data-gapelia-element") && node.children.length === 0 && !(self.options.disableReturn || node.getAttribute("data-disable-return"))) {
					document.execCommand("formatBlock", false, "p");
				}

				if (e.which === 13 && !e.shiftKey) {
					node = getSelectionStart();
					tagName = node.tagName.toLowerCase();

					if (!(self.options.disableReturn || this.getAttribute("data-disable-return")) && tagName !== "li") {
						document.execCommand("formatBlock", false, "p");

						if (tagName === "a") {
							document.execCommand("unlink", false, null);
						}
					}
				}

			});

			return this;

		},

		bindReturn: function (index) {

			var self = this;

			this.elements[index].addEventListener("keypress", function (e) {

				if (e.which === 13) {
					if (self.options.disableReturn || this.getAttribute("data-disable-return")) {
						e.preventDefault();
					}
				}

			});

			return this;

		},

		bindTab: function (index) {
			this.elements[index].addEventListener("keydown", function (e) {

				if (e.which === 9) {
					// Override tab only for pre nodes
					var tag = getSelectionStart().tagName.toLowerCase();

					if (tag === "pre") {
						e.preventDefault();
						document.execCommand("insertHtml", null, "    ");
					}
				}

			});
		},

		buttonTemplate: function (btnType) {

			var
			buttonLabels = this.getButtonLabels(this.options.buttonLabels),
			buttonTemplates = {
				'bold': '<li><button class="gapelia-editor-action gapelia-editor-action-bold" data-action="bold" data-element="b">' + buttonLabels.bold + '</button></li>',
				'italic': '<li><button class="gapelia-editor-action gapelia-editor-action-italic" data-action="italic" data-element="i">' + buttonLabels.italic + '</button></li>',
				'underline': '<li><button class="gapelia-editor-action gapelia-editor-action-underline" data-action="underline" data-element="u">' + buttonLabels.underline + '</button></li>',
				'strikethrough': '<li><button class="gapelia-editor-action gapelia-editor-action-strikethrough" data-action="strikethrough" data-element="strike"><strike>A</strike></button></li>',
				'superscript': '<li><button class="gapelia-editor-action gapelia-editor-action-superscript" data-action="superscript" data-element="sup">' + buttonLabels.superscript + '</button></li>',
				'subscript': '<li><button class="gapelia-editor-action gapelia-editor-action-subscript" data-action="subscript" data-element="sub">' + buttonLabels.subscript + '</button></li>',
				'anchor': '<li><button class="gapelia-editor-action gapelia-editor-action-anchor" data-action="anchor" data-element="a">' + buttonLabels.anchor + '</button></li>',
				'header1': '<li><button class="gapelia-editor-action gapelia-editor-action-header1" data-action="append-' + this.options.firstHeader + '" data-element="' + this.options.firstHeader + '">' + buttonLabels.header1 + '</button></li>',
				'header2': '<li><button class="gapelia-editor-action gapelia-editor-action-header2" data-action="append-' + this.options.secondHeader + '" data-element="' + this.options.secondHeader + '">' + buttonLabels.header2 + '</button></li>',
				'quote': '<li><button class="gapelia-editor-action gapelia-editor-action-quote" data-action="append-blockquote" data-element="blockquote">' + buttonLabels.quote + '</button></li>',
				'orderedlist': '<li><button class="gapelia-editor-action gapelia-editor-action-orderedlist" data-action="insertorderedlist" data-element="ol">' + buttonLabels.orderedlist + '</button></li>',
				'unorderedlist': '<li><button class="gapelia-editor-action gapelia-editor-action-unorderedlist" data-action="insertunorderedlist" data-element="ul">' + buttonLabels.unorderedlist + '</button></li>',
				'pre': '<li><button class="gapelia-editor-action gapelia-editor-action-pre" data-action="append-pre" data-element="pre">' + buttonLabels.pre + '</button></li>'
			};

			return buttonTemplates[btnType] || false;

		},

		// TODO: break method
		getButtonLabels: function (buttonLabelType) {

			var
			customButtonLabels,
			attrname,
			buttonLabels = {
				'bold': '<b>B</b>',
				'italic': '<b><i>I<i></b>',
				// 'italic': '<i>I<i>',
				'underline': '<b><u>U</u></b>',
				// 'underline': '<u>U</u>',
				'superscript': '<b>x<sup>1</sup></b>',
				'subscript': '<b>x<sub>1</sup></b>',
				'anchor': '<b>#</b>',
				'header1': '<b>H1</b>',
				'header2': '<b>H2</b>',
				'quote': '<b>&ldquo;</b>',
				'orderedlist': '<b>1.</b>',
				'unorderedlist': '<b>&bull;</b>',
				'pre': '<b>0101</b>'
			};

			if (buttonLabelType === "fontawesome") {
				customButtonLabels = {
					'bold': '<i class="fa fa-bold"></i>',
					'italic': '<i class="fa fa-italic"></i>',
					'underline': '<i class="fa fa-underline"></i>',
					'superscript': '<i class="fa fa-superscript"></i>',
					'subscript': '<i class="fa fa-subscript"></i>',
					'anchor': '<i class="fa fa-link"></i>',
					'quote': '<i class="fa fa-quote-right"></i>',
					'orderedlist': '<i class="fa fa-list-ol"></i>',
					'unorderedlist': '<i class="fa fa-list-ul"></i>',
					'pre': '<i class="fa fa-code fa-lg"></i>'
				};
			} else if (typeof buttonLabelType === "object") {
				customButtonLabels = buttonLabelType;
			}

			if (typeof customButtonLabels === "object") {
				for (attrname in customButtonLabels) {
					if (customButtonLabels.hasOwnProperty(attrname)) {
						buttonLabels[attrname] = customButtonLabels[attrname];
					}
				}
			}

			return buttonLabels;

		},

		// TODO: actionTemplate
		toolbarTemplate: function () {

			var
			btns = this.options.buttons,
			html = '<ul id="gapelia-editor-toolbar-actions" class="gapelia-editor-toolbar-actions clearfix">',
			i,
			tpl;

			for (i = 0; i < btns.length; i += 1) {
				tpl = this.buttonTemplate(btns[i]);
				if (tpl) { html += tpl; }
			}

			html += '</ul>' +
				'<div class="gapelia-editor-toolbar-form-anchor" id="gapelia-editor-toolbar-form-anchor">' +
				'    <input type="text" value="" placeholder="' + this.options.anchorInputPlaceholder + '">' +
				'    <a href="#">&times;</a>' +
				'</div>';

			return html;

		},

		initToolbar: function () {

			if (this.toolbar) { return this; }

			this.toolbar = this.createToolbar();
			this.keepToolbarAlive = false;
			this.anchorForm = this.toolbar.querySelector(".gapelia-editor-toolbar-form-anchor");
			this.anchorInput = this.anchorForm.querySelector("input");
			this.toolbarActions = this.toolbar.querySelector(".gapelia-editor-toolbar-actions");

			return this;

		},

		createToolbar: function () {

			var toolbar = document.createElement("div");
			toolbar.id = "gapelia-editor-toolbar-" + this.id;
			toolbar.className = "gapelia-editor-toolbar";
			toolbar.innerHTML = this.toolbarTemplate();
			document.getElementsByTagName("body")[0].appendChild(toolbar);

			return toolbar;

		},

		bindSelect: function () {

			var
			self = this,
			timer = "",
			i;

			this.checkSelectionWrapper = function (e) {

				clearTimeout(timer);

				timer = setTimeout(function () {
					self.checkSelection();
				}, self.options.delay);

			};

			document.documentElement.addEventListener("mouseup", this.checkSelectionWrapper);

			for (i = 0; i < this.elements.length; i += 1) {
				this.elements[i].addEventListener("keyup", this.checkSelectionWrapper);
				this.elements[i].addEventListener("blur", this.checkSelectionWrapper);
			}

			return this;

		},

		checkSelection: function () {

			var
			i,
			newSelection,
			hasMultiParagraphs,
			selectionHtml,
			selectionElement;

			if (this.keepToolbarAlive !== true && !this.options.disableToolbar) {
				newSelection = window.getSelection();
				selectionHtml = getSelectionHtml();
				selectionHtml = selectionHtml.replace(/<[\S]+><\/[\S]+>/gim, "");

				// Check if selection is between multi paragraph <p>.
				hasMultiParagraphs = selectionHtml.match(/<(p|h[0-6]|blockquote)>([\s\S]*?)<\/(p|h[0-6]|blockquote)>/g);
				hasMultiParagraphs = hasMultiParagraphs ? hasMultiParagraphs.length : 0;

				if (newSelection.toString().trim() === "" || (this.options.allowMultiParagraphSelection === false && hasMultiParagraphs)) {
					this.hideToolbarActions();
				} else {
					selectionElement = this.getSelectionElement();

					if (!selectionElement || selectionElement.getAttribute("data-disable-toolbar")) {
						this.hideToolbarActions();
					} else {
						this.selection = newSelection;
						this.selectionRange = this.selection.getRangeAt(0);

						for (i = 0; i < this.elements.length; i += 1) {
							if (this.elements[i] === selectionElement) {
								this.setToolbarButtonStates().setToolbarPosition().showToolbarActions();
								return;
							}
						}

						this.hideToolbarActions();
					}
				}
			}

			return this;

		},

		getSelectionElement: function () {

			var
			selection = window.getSelection(),
			range = selection.getRangeAt(0),
			current = range.commonAncestorContainer,
			parent = current.parentNode,
			result,
			getMediumElement = function (e) {

				var parent = e;

				try {
					while (!parent.getAttribute("data-gapelia-element")) {
						parent = parent.parentNode;
					}
				} catch (errb) {
					return false;
				}

				return parent;
			};

			// First try on current node
			try {
				if (current.getAttribute("data-gapelia-element")) {
					result = current;
				} else {
					result = getMediumElement(parent);
				}
				// If not search in the parent nodes.
			} catch (err) {
				result = getMediumElement(parent);
			}

			return result;

		},

		setToolbarPosition: function () {

			var
			buttonHeight = 50,
			selection = window.getSelection(),
			range = selection.getRangeAt(0),
			boundary = range.getBoundingClientRect(),
			defaultLeft = (this.options.diffLeft) - (this.toolbar.offsetWidth / 2),
			middleBoundary = (boundary.left + boundary.right) / 2,
			halfOffsetWidth = this.toolbar.offsetWidth / 2;

			if (boundary.top < buttonHeight) {
				this.toolbar.classList.add("gapelia-toolbar-arrow-over");
				this.toolbar.classList.remove("gapelia-toolbar-arrow-under");
				this.toolbar.style.top = buttonHeight + boundary.bottom - this.options.diffTop + window.pageYOffset - this.toolbar.offsetHeight + "px";
			} else {
				this.toolbar.classList.add("gapelia-toolbar-arrow-under");
				this.toolbar.classList.remove("gapelia-toolbar-arrow-over");
				this.toolbar.style.top = boundary.top + this.options.diffTop + window.pageYOffset - this.toolbar.offsetHeight + 'px';
			}

			if (middleBoundary < halfOffsetWidth) {
				this.toolbar.style.left = defaultLeft + halfOffsetWidth + "px";
			} else if ((window.innerWidth - middleBoundary) < halfOffsetWidth) {
				this.toolbar.style.left = window.innerWidth + defaultLeft - halfOffsetWidth + "px";
			} else {
				this.toolbar.style.left = defaultLeft + middleBoundary + "px";
			}

			return this;

		},

		setToolbarButtonStates: function () {

			var
			buttons = this.toolbarActions.querySelectorAll("button"),
			i;

			for (i = 0; i < buttons.length; i += 1) {
				buttons[i].classList.remove("gapelia-editor-button-active");
			}

			this.checkActiveButtons();
			return this;

		},

		checkActiveButtons: function () {

			var parentNode = this.selection.anchorNode;

			if (!parentNode.tagName) {
				parentNode = this.selection.anchorNode.parentNode;
			}

			while (parentNode.tagName !== undefined && this.parentElements.indexOf(parentNode.tagName) === -1) {
				this.activateButton(parentNode.tagName.toLowerCase());
				parentNode = parentNode.parentNode;
			}

		},

		activateButton: function (tag) {

			var el = this.toolbar.querySelector('[data-element="' + tag + '"]');

			if (el !== null && el.className.indexOf("gapelia-editor-button-active") === -1) {
				el.className += " gapelia-editor-button-active";
			}

		},

		bindButtons: function () {

			var
			buttons = this.toolbar.querySelectorAll("button"),
			i,
			self = this,
			triggerAction = function (e) {

				e.preventDefault();
				e.stopPropagation();

				if (self.selection === undefined) {
					self.checkSelection();
				}

				if (this.className.indexOf("gapelia-editor-button-active") > -1) {
					this.classList.remove("gapelia-editor-button-active");
				} else {
					this.className += " gapelia-editor-button-active";
				}

				console.log(this.getAttribute("data-action"));
				self.execAction(this.getAttribute("data-action"), e);

			};

			for (i = 0; i < buttons.length; i += 1) {
				buttons[i].addEventListener("click", triggerAction);
			}

			this.setFirstAndLastItems(buttons);
			return this;

		},

		setFirstAndLastItems: function (buttons) {

			buttons[0].className += " gapelia-editor-button-first";
			buttons[buttons.length - 1].className += " gapelia-editor-button-last";
			return this;

		},

		execAction: function (action, e) {

			if (action.indexOf("append-") > -1) {
				this.execFormatBlock(action.replace("append-", ""));
				this.setToolbarPosition();
				this.setToolbarButtonStates();
			} else if (action === "anchor") {
				this.triggerAnchorAction(e);
			} else {
				document.execCommand(action, false, null);
				this.setToolbarPosition();
			}

		},

		triggerAnchorAction: function () {

			if (this.selection.anchorNode.parentNode.tagName.toLowerCase() === "a") {
				document.execCommand("unlink", false, null);
			} else {
				if (this.anchorForm.style.display === "block") {
					this.showToolbarActions();
				} else {
					this.showAnchorForm();
				}
			}

			return this;

		},

		execFormatBlock: function (el) {

			var selectionData = this.getSelectionData(this.selection.anchorNode);

			// FF handles blockquote differently on formatBlock
			// allowing nesting, we need to use outdent
			// https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla
			if (el === "blockquote" && selectionData.el && selectionData.el.parentNode.tagName.toLowerCase() === "blockquote") {
				return document.execCommand("outdent", false, null);
			}

			if (selectionData.tagName === el) {
				el = "p";
			}

			return document.execCommand("formatBlock", false, el);

		},

		getSelectionData: function (el) {

			var tagName;

			if (el && el.tagName) {
				tagName = el.tagName.toLowerCase();
			}

			while (el && this.parentElements.indexOf(tagName) === -1) {
				el = el.parentNode;

				if (el && el.tagName) {
					tagName = el.tagName.toLowerCase();
				}
			}

			return {
				el: el,
				tagName: tagName
			};

		},

		getFirstChild: function (el) {

			var firstChild = el.firstChild;

			while (firstChild !== null && firstChild.nodeType !== 1) {
				firstChild = firstChild.nextSibling;
			}

			return firstChild;

		},

		bindElementToolbarEvents: function (el) {

			var self = this;

			el.addEventListener("mouseup", function (e) {
				self.checkSelection();
			});

			el.addEventListener("keyup", function (e) {
				self.checkSelection();
			});

		},

		hideToolbarActions: function () {
			this.keepToolbarAlive = false;
			this.toolbar.classList.remove("gapelia-editor-toolbar-active");
		},

		showToolbarActions: function () {

			var
			self = this,
			timer;

			this.anchorForm.style.display = "none";
			this.toolbarActions.style.display = "block";
			this.keepToolbarAlive = false;
			clearTimeout(timer);

			timer = setTimeout(function () {
				if (!self.toolbar.classList.contains("gapelia-editor-toolbar-active")) {
					self.toolbar.classList.add("gapelia-editor-toolbar-active");
				}
			}, 100);

		},

		showAnchorForm: function () {

			this.toolbarActions.style.display = "none";
			this.savedSelection = saveSelection();
			this.anchorForm.style.display = "block";
			this.keepToolbarAlive = true;
			this.anchorInput.focus();
			this.anchorInput.value = "";

		},

		bindAnchorForm: function () {

			var
			linkCancel = this.anchorForm.querySelector("a"),
			self = this;

			this.anchorForm.addEventListener("click", function (e) {
				e.stopPropagation();
			});

			this.anchorInput.addEventListener("keyup", function (e) {
				if (e.keyCode === 13) {
					e.preventDefault();
					self.createLink(this);
				}
			});

			this.anchorInput.addEventListener("blur", function (e) {
				self.keepToolbarAlive = false;
				self.checkSelection();
			});

			linkCancel.addEventListener("click", function (e) {
				e.preventDefault();
				self.showToolbarActions();
				restoreSelection(self.savedSelection);
			});

			return this;

		},

		setTargetBlank: function () {

			var
			el = getSelectionStart(),
			i;

			if (el.tagName.toLowerCase() === "a") {
				el.target = "_blank";
			} else {
				el = el.getElementsByTagName("a");

				for (i = 0; i < el.length; i += 1) {
					el[i].target = "_blank";
				}
			}

		},

		createLink: function (input) {

			restoreSelection(this.savedSelection);
			document.execCommand("createLink", false, input.value);

			if (this.options.targetBlank) {
				this.setTargetBlank();
			}

			this.showToolbarActions();
			input.value = "";

		},

		bindWindowActions: function () {

			var
			timerResize,
			self = this;

			window.addEventListener("resize", function () {

				clearTimeout(timerResize);

				timerResize = setTimeout(function () {
					if (self.toolbar.classList.contains("gapelia-editor-toolbar-active")) {
						self.setToolbarPosition();
					}
				}, 100);

			});

			return this;

		},

		activate: function () {

			var i;

			if (this.isActive) { return; }
			if (this.toolbar !== undefined) { this.toolbar.style.display = "block"; }

			this.isActive = true;

			for (i = 0; i < this.elements.length; i += 1) {
				this.elements[i].setAttribute("contentEditable", true);
			}

			this.bindSelect();

		},

		deactivate: function () {

			var i;

			if (!this.isActive) { return; }
			this.isActive = false;

			if (this.toolbar !== undefined) {
				this.toolbar.style.display = "none";
			}

			document.documentElement.removeEventListener("mouseup", this.checkSelectionWrapper);

			for (i = 0; i < this.elements.length; i += 1) {
				this.elements[i].removeEventListener("keyup", this.checkSelectionWrapper);
				this.elements[i].removeEventListener("blur", this.checkSelectionWrapper);
				this.elements[i].removeAttribute("contentEditable");
			}

		},

		bindPaste: function () {

			if (!this.options.forcePlainText) { return this; }

			var
			i,
			self = this,
			pasteWrapper = function (e) {

				var
				paragraphs,
				html = "",
				p;

				this.classList.remove("gapelia-editor-placeholder");

				if (e.clipboardData && e.clipboardData.getData) {
					e.preventDefault();

					if (!self.options.disableReturn) {
						paragraphs = e.clipboardData.getData("text/plain").split(/[\r\n]/g);

						for (p = 0; p < paragraphs.length; p += 1) {
							if (paragraphs[p] !== "") {
								// html += "<p>" + paragraphs[p] + "</p>";
								// html += paragraphs[p];
								html += paragraphs;
							}
						}

						document.execCommand("insertHTML", false, html);
					} else {
						document.execCommand("insertHTML", false, e.clipboardData.getData("text/plain"));
					}
				}

			};

			for (i = 0; i < this.elements.length; i += 1) {
				this.elements[i].addEventListener("paste", pasteWrapper);
			}

			return this;

		},

		setPlaceholders: function () {

			var
			i,
			activatePlaceholder = function (el) {

				if (el.textContent.replace(/^\s+|\s+$/g, "") === "") {
					el.classList.add("gapelia-editor-placeholder");
				}

			},
			placeholderWrapper = function (e) {

				this.classList.remove("gapelia-editor-placeholder");
				if (e.type !== "keypress") { activatePlaceholder(this); }

			};

			for (i = 0; i < this.elements.length; i += 1) {
				activatePlaceholder(this.elements[i]);
				this.elements[i].addEventListener("blur", placeholderWrapper);
				this.elements[i].addEventListener("keypress", placeholderWrapper);
			}

			return this;

		}

	};

}(window, document));

//////////////////////////////////////////////////// Gapelia Inline Image Insertion

// https://github.com/orthes/medium-editor-images-plugin
/*
!function (a) {

	GapeliaEditor.prototype.serialize = function () {

		var b, c, d, e, f, g, h, i, j = {};

		for (b = 0; b < this.elements.length; b += 1) {
			for (d = "" !== this.elements[b].id ? this.elements[b].id : "element-" + b, e = a(this.elements[b]).clone(), f = a(".gapeliaInsert", e), c = 0; c < f.length; c++) g = a(f[c]), h = a(".gapeliaInsert-placeholder", g).children(), 0 === h.length ? g.remove() : (g.removeAttr("contenteditable"), a("img[draggable]", g).removeAttr("draggable"), g.hasClass("small") && h.addClass("small"), a(".gapeliaInsert-buttons", g).remove(), h.unwrap());

			i = e.html().trim(), j[d] = {
				value: i
			};
		}

		return j;

	}, a.fn.gapeliaInsert = function (b) {
		return a.fn.gapeliaInsert.settings = a.extend(a.fn.gapeliaInsert.settings, b), this.each(function () {

			a("p", this).bind("dragover drop", function (a) { return a.preventDefault(), !1; }),

			a.fn.gapeliaInsert.insert.init(a(this)), a.fn.gapeliaInsert.settings.images === !0 && a.fn.gapeliaInsert.images.init(), a.fn.gapeliaInsert.settings.maps === !0 && a.fn.gapeliaInsert.maps.init();

		});
	},

	a.fn.gapeliaInsert.settings = {
		// imagesUploadScript: "/static/scripts/upload.php",
		images: !0,
		maps: !1
	},

	a.fn.gapeliaInsert.insert = {
		init: function (a) { this.$el = a, this.setPlaceholders(); },
		deselect: function () { document.getSelection().removeAllRanges(); },

		setPlaceholders: function () {

			var
			b = this,
			c = a.fn.gapeliaInsert.insert.$el,
			d = "",
			e = '<a class="gapeliaInsert-action action-images-add">Image</a>',
			f = '<a class="gapeliaInsert-action action-maps-add">Map</a>';

			// a.fn.gapeliaInsert.settings.images === !0 && a.fn.gapeliaInsert.settings.maps === !0 ? d = '<a class="gapeliaInsert-buttonsShow">Insert</a><ul class="gapeliaInsert-buttonsOptions"><li>' + e + "</li><li>" + f + "</li></ul>" : a.fn.gapeliaInsert.settings.images === !0 ? d = e : a.fn.gapeliaInsert.settings.maps === !0 && (d = f), "" !== d && (d = '<div class="gapeliaInsert" contenteditable="false"><div class="gapeliaInsert-buttons"><div class="gapeliaInsert-buttonsIcon">&rarr;</div>' + d + '</div><div class="gapeliaInsert-placeholder"></div></div>', c.is(":empty") && c.html("<p><br></p>"), c.keyup(function () {

			a.fn.gapeliaInsert.settings.images === !0 && a.fn.gapeliaInsert.settings.maps === !0 ? d = '<a class="gapeliaInsert-buttonsShow">Insert</a><ul class="gapeliaInsert-buttonsOptions"><li>' + e + "</li><li>" + f + "</li></ul>" : a.fn.gapeliaInsert.settings.images === !0 ? d = e : a.fn.gapeliaInsert.settings.maps === !0 && (d = f), "" !== d && (d = '<div class="gapeliaInsert" contenteditable="false"><div class="gapeliaInsert-buttons"><div class="gapeliaInsert-buttonsIcon">&rarr;</div>' + d + '</div><div class="gapeliaInsert-placeholder"></div></div>', c.is(":empty") && c.html(""), c.keyup(function () {

				var b = 0;

				c.children("p").each(function () {
					a(this).next().hasClass("gapeliaInsert") === !1 && (a(this).after(d), a(this).next(".gapeliaInsert").attr("id", "gapeliaInsert-" + b)), b++;
				});

			}).keyup(), c.on("selectstart", ".gapeliaInsert", function (a) {
				return a.preventDefault(), !1;
			}), c.on("blur", function () {

				var b, c = a(this).clone();
				// c.find(".gapeliaInsert").remove(), b = c.html().replace(/^\s+|\s+$/g, ""), ("" === b || "<p><br></p>" === b) && a(this).addClass("gapelia-editor-placeholder");
				c.find(".gapeliaInsert").remove(), b = c.html().replace(/^\s+|\s+$/g, ""), ("" === b || "" === b) && a(this).addClass("gapelia-editor-placeholder");

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

			}));

		}
	};

}(jQuery),

function (a) {

	a.fn.gapeliaInsert.images = {
		init: function () {
			this.$el = a.fn.gapeliaInsert.insert.$el, this.options = a.extend(this.
				default, a.fn.gapeliaInsert.settings.imagesPlugin), this.setImageEvents(), this.setDragAndDropEvents();
		},

		"default": {
			formatData: function (a) {
				var b = new FormData;
				return b.append("file", a), b;
			}
		},

		add: function (b) {

			var c, d, e = this;

			return c = a('<input type="file">').click(), c.change(function () {
				d = this.files, e.uploadFiles(b, d);
			}), a.fn.gapeliaInsert.insert.deselect(), c;

		},

		updateProgressBar: function (b) {

			var c, d = a(".progress:first", this.$el);
			b.lengthComputable && (c = b.loaded / b.total * 100 | 0, d.attr("value", c), d.html(c));

		},

		uploadCompleted: function (b) {

			var c, d = a(".progress:first", this.$el);

			d.attr("value", 100), d.html(100), d.before('<span class="gapeliaInsert-images"><img src="' + b.responseText + '" draggable="true" alt=""></span>'), c = d.siblings("img"), d.remove(), c.load(function () {
				c.parent().mouseleave().mouseenter();
			});

		},

		uploadFiles: function (b, c) {

			for (var d = {
				"image/png": !0,
				"image/jpeg": !0,
				"image/gif": !0
			},

			e = this, f = function () {

				var a = new XMLHttpRequest;
				return a.upload.onprogress = e.updateProgressBar, a;

			}, g = 0; g < c.length; g++) {
				var h = c[g];

				d[h.type] === !0 && (b.append('<progress class="progress" min="0" max="100" value="0">0</progress>'), a.ajax({
					type: "post",
					// url: a.fn.gapeliaInsert.settings.imagesUploadScript,
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

				d.length > 0 && (a(this).append('<a class="gapeliaInsert-imageRemove"></a>'), a(this).parent().parent().hasClass("small") ? a(this).append('<a class="gapeliaInsert-imageResizeBigger"></a>') : a(this).append('<a class="gapeliaInsert-imageResizeSmaller"></a>'), b = d.position().top + parseInt(d.css("margin-top"), 10), c = d.position().left + d.width() - 30, a(".gapeliaInsert-imageRemove", this).css({
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
				a(this).addClass("hover");
			}), a(document).on("dragend", "body", function () {
				a(this).removeClass("hover");
			}), this.$el.on("dragover", ".gapeliaInsert", function () {
				a(this).addClass("hover"), a(this).attr("contenteditable", !0);
			}), this.$el.on("dragleave", ".gapeliaInsert", function () {
				a(this).removeClass("hover"), a(this).attr("contenteditable", !1);
			}), this.$el.on("dragstart", ".gapeliaInsert .gapeliaInsert-images img", function () {
				b = a(this).parent().index(), c = a(this).parent().parent().parent().attr("id");
			}), this.$el.on("dragend", ".gapeliaInsert .gapeliaInsert-images img", function (b) {

				e === !0 && (0 === a(b.originalEvent.target.parentNode).siblings().length && a(b.originalEvent.target.parentNode).parent().parent().removeClass("small"), a(b.originalEvent.target.parentNode).mouseleave(), a(b.originalEvent.target.parentNode).remove(), e = !1, f = !1);

			}), this.$el.on("dragover", ".gapeliaInsert .gapeliaInsert-images img", function (a) {
				a.preventDefault();
			}), this.$el.on("drop", ".gapeliaInsert .gapeliaInsert-images img", function () {

				var d, e, g;
				return c !== a(this).parent().parent().parent().attr("id") ? (f = !1, b = c = null, void 0) : (d = parseInt(b, 10), e = a(this).parent().parent().find(".gapeliaInsert-images:nth-child(" + (d + 1) + ")"), g = a(this).parent().index(), g > d ? e.insertAfter(a(this).parent()) : d > g && e.insertBefore(a(this).parent()), e.mouseleave(), f = !0, b = null, void 0);

			}), this.$el.on("drop", ".gapeliaInsert", function (b) {

				var c;
				b.preventDefault(), a(this).removeClass("hover"), a("body").removeClass("hover"), a(this).attr("contenteditable", !1), c = b.originalEvent.dataTransfer.files, c.length > 0 ? d.uploadFiles(a(".gapeliaInsert-placeholder", this), c) : f === !0 ? f = !1 : (a(".gapeliaInsert-placeholder", this).append('<span class="gapeliaInsert-images">' + b.originalEvent.dataTransfer.getData("text/html") + "</span>"), a("meta", this).remove(), e = !0);

			});

		}
	};

}(jQuery),

function (a) {

	a.fn.gapeliaInsert.maps = {
		init: function () { this.$el = a.fn.gapeliaInsert.insert.$el; },
		add: function (b) { a.fn.gapeliaInsert.insert.deselect(), b.append('<div class="gapeliaInsert-maps">Map - Coming soon...</div>'); }
	};

}(jQuery);
*/