function GapeliaEditor(elements, options) {
	"use strict";
	return this.init(elements, options);
}

if (typeof module === "object") {
	module.exports = GapeliaEditor;
}

//
function pasteHtmlAtCaret(html) {

	var sel, range;

	if (window.getSelection) {
		// IE9 and non-IE
		sel = window.getSelection();

		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();

			// Range.createContextualFragment() would be useful here but is non-standard
			// and not supported in all browsers (IE9, for one)
			var el = document.createElement("div");
			el.innerHTML = html;

			var frag = document.createDocumentFragment(), node, lastNode;

			while ((node = el.firstChild)) {
				lastNode = frag.appendChild(node);
			}

			range.insertNode(frag);

			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);

				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if (document.selection && document.selection.type != "Control") {
		// IE < 9
		document.selection.createRange().pasteHTML(html);
	}

}
//

(function (window, document) {

	"use strict";

	function extend(b, a) {

		var prop;

		if (b === undefined) { return a; }

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

		var i,
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

		var i,
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

		var i,
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
			if (document.selection.type === "Text") {
				html = document.selection.createRange().htmlText;
			}
		}

		return html;

	}

	GapeliaEditor.prototype = {
		defaults: {
			allowMultiParagraphSelection: true,
			anchorInputPlaceholder: "Paste or type a link without www or http://",
			buttons: ["bold", "italic", "underline", "anchor", "header1", "header2", "quote", "orderedlist", "pre"],
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
			if (this.elements.length === 0) { return; }

			this.isActive = true;
			this.parentElements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "orderedlist", "pre"];
			this.id = document.querySelectorAll(".gapelia-editor-toolbar").length + 1;
			this.options = extend(options, this.defaults);

			return this.initElements().bindSelect().bindPaste().setPlaceholders().bindWindowActions();

		},

		initElements: function () {

			var i, addToolbar = false;

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

			var i,
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

			/*
			this.elements[index].addEventListener("keyup", function (e) {

				var
				node = getSelectionStart(),
				tagName;

				// var someHtmlString = "<script>alert('hi!');</script>";
				// var escaped = $("div.someClass").text(someHtmlString).html();

				var htmlISH = "<input class=\"inline-image-insert\" type=\"filepicker\" data-fp-apikey=\"ABFuSiQFbQRylrWy9nCs7z\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-services=\"COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE\" onchange=\"url=event.fpfile.url; console.log(url); pasteHtmlAtCaret('<div class=inserted-img><img></div>'); $('.inserted-img img').attr('src', url);\">";

				// $('.inserted-img').before('</p>'); $('.inserted-img').after('<p>');

				if (node && node.getAttribute("data-gapelia-element") && node.children.length === 0 && !(self.options.disableReturn || node.getAttribute("data-disable-return"))) {
					document.execCommand("formatBlock", false, "p");

					$(".page-desc p").each(function () {
						// $(this).before(htmlISH);
						$(".page-desc").before(htmlISH);
					});

					var element2 = $(".inline-image-insert");

					element2 = element2[0];
					element2.type = "filepicker";
					filepicker.constructWidget(element2);

					$("button.inline-image-insert").html("Add inline photo");
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
			*/

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
				if (e.which === 13 && !e.shiftKey) {
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

			var buttonTemplates = {
				"bold": '<li><button class="gapelia-editor-action gapelia-editor-action-bold" data-action="bold" data-element="b">B</button></li>',

				"italic": '<li><button class="gapelia-editor-action gapelia-editor-action-italic" data-action="italic" data-element="i">I</button></li>',

				"underline": '<li><button class="gapelia-editor-action gapelia-editor-action-underline" data-action="underline" data-element="u">U</button></li>',

				"superscript": '<li><button class="gapelia-editor-action gapelia-editor-action-superscript" data-action="superscript" data-element="sup">x<sup>1</sup></button></li>',

				"subscript": '<li><button class="gapelia-editor-action gapelia-editor-action-subscript" data-action="subscript" data-element="sub">x<sub>1</sup></button></li>',

				"anchor": '<li><button class="gapelia-editor-action gapelia-editor-action-anchor" data-action="anchor" data-element="a">< # ></button></li>',

				"header1": '<li><button class="gapelia-editor-action gapelia-editor-action-header1" data-action="append-' + this.options.firstHeader + '" data-element="' + this.options.firstHeader + '"><h3 style="padding-top: 7px;">A</h3>/button></li>',

				"header2": '<li><button class="gapelia-editor-action gapelia-editor-action-header2" data-action="append-' + this.options.secondHeader + '" data-element="' + this.options.secondHeader + '"><h5>A</h5></button></li>',

				"quote": '<li><button class="gapelia-editor-action gapelia-editor-action-quote" data-action="append-blockquote" data-element="blockquote" style="padding-top: 10px !important;">&ldquo;</button></li>',

				"orderedlist": '<li><button class="gapelia-editor-action gapelia-editor-action-orderedlist" data-action="insertorderedlist" data-element="ol">1.</button></li>',

				"unorderedlist": '<li><button class="gapelia-editor-action gapelia-editor-action-unorderedlist" data-action="insertunorderedlist" data-element="ul">&bull;</button></li>',

				"pre": '<li><button class="gapelia-editor-action gapelia-editor-action-pre" data-action="append-pre" data-element="pre">abc</button></li>'
			};

			return buttonTemplates[btnType] || false;

		},
    

		// TODO: actionTemplate
		toolbarTemplate: function () {

			var
			btns = this.options.buttons,
			html = '<ul id="gapelia-editor-toolbar-actions" class="gapelia-editor-toolbar-actions clearfix">',
			i, tpl;

			for (i = 0; i < btns.length; i += 1) {
				tpl = this.buttonTemplate(btns[i]);
				if (tpl) { html += tpl; }
			}

			html += '</ul>' +
				'<div class="gapelia-editor-toolbar-form-anchor" id="gapelia-editor-toolbar-form-anchor">' +
				'<input type="text" value="" placeholder="' + this.options.anchorInputPlaceholder + '">' +
				'<a href="#">&#xf2bb;</a>' +
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

				setTimeout(function () {
					self.checkSelection(e);
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

			var i,
			newSelection,
			hasMultiParagraphs,
			selectionHtml,
			selectionElement;

			if (this.keepToolbarAlive !== true && !this.options.disableToolbar) {
				newSelection = window.getSelection();
				selectionHtml = getSelectionHtml();
				selectionHtml = selectionHtml.replace(/<[\S]+><\/[\S]+>/gim, "");

				// Check if selection is between multi paragraph <p>
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
			getGapeliaElement = function (e) {

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
					result = getGapeliaElement(parent);
				}
				// If not search in the parent nodes
			} catch (err) {
				result = getGapeliaElement(parent);
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
				this.toolbar.style.top = boundary.top + this.options.diffTop + window.pageYOffset - this.toolbar.offsetHeight + "px";
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

			var buttons = this.toolbarActions.querySelectorAll("button"), i;

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

			var buttons = this.toolbar.querySelectorAll("button"),
			i, self = this,
			triggerAction = function (e) {

				e.preventDefault();
				e.stopPropagation();

				if (self.selection === undefined) {
					self.checkSelection(e);
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
      
      $(".page-desc p").css("cssText", "margin-bottom: 1.5rem !important"); //this fixes bug where blockquotes removes margins for Ps//

			var selectionData = this.getSelectionData(this.selection.anchorNode);

			// FF handles blockquote differently on formatBlock
			// allowing nesting, we need to use outdent
			// https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla
			if (el === "blockquote" && selectionData.el && selectionData.el.parentNode.tagName.toLowerCase() === "blockquote") {
				return document.execCommand("outdent", false, null);
			}

			if (selectionData.tagName === el) { el = "p"; }

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
				self.checkSelection(e);
			});

			el.addEventListener("keyup", function (e) {
				self.checkSelection(e);
			});

		},

		hideToolbarActions: function () {

			this.keepToolbarAlive = false;
			this.toolbar.classList.remove("gapelia-editor-toolbar-active");

		},

		showToolbarActions: function () {

			var self = this, timer;

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

			var linkCancel = this.anchorForm.querySelector("a"), self = this;

			this.anchorForm.addEventListener("click", function (e) {
				e.stopPropagation();
			});

			this.anchorInput.addEventListener("keyup", function (e) {

				if (e.keyCode === 13) {
					e.preventDefault();
					self.createLink(this);

					// Embedly
					var regex;

					regex = /((http:\/\/(www\.flickr\.com\/photos\/.*|flic\.kr\/.*|instagr\.am\/p\/.*|instagram\.com\/p\/.*|gist\.github\.com\/.*|www\.kickstarter\.com\/projects\/.*\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*|cl\.ly\/.*|cl\.ly\/.*\/content|.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|youtu\.be\/.*|.*\.youtube\.com\/user\/.*|.*\.youtube\.com\/.*#.*\/.*|m\.youtube\.com\/watch.*|m\.youtube\.com\/index.*|.*\.youtube\.com\/profile.*|.*\.youtube\.com\/view_play_list.*|.*\.youtube\.com\/playlist.*|.*twitch\.tv\/.*|.*justin\.tv\/.*\/b\/.*|.*justin\.tv\/.*\/w\/.*|.*twitch\.tv\/.*|.*twitch\.tv\/.*\/b\/.*|www\.ustream\.tv\/recorded\/.*|www\.ustream\.tv\/channel\/.*|www\.ustream\.tv\/.*|ustre\.am\/.*|.*revision3\.com\/.*|www\.vimeo\.com\/groups\/.*\/videos\/.*|www\.vimeo\.com\/.*|vimeo\.com\/groups\/.*\/videos\/.*|vimeo\.com\/.*|vimeo\.com\/m\/#\/.*|player\.vimeo\.com\/.*|www\.facebook\.com\/photo\.php.*|www\.facebook\.com\/video\/video\.php.*|www\.facebook\.com\/.*\/posts\/.*|fb\.me\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|snd\.sc\/.*|open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*|www\.last\.fm\/music\/.*|www\.last\.fm\/music\/+videos\/.*|www\.last\.fm\/music\/+images\/.*|www\.last\.fm\/music\/.*\/_\/.*|www\.last\.fm\/music\/.*\/.*|www\.mixcloud\.com\/.*\/.*\/|www\.rdio\.com\/#\/artist\/.*\/album\/.*|www\.rdio\.com\/artist\/.*\/album\/.*|.*\.bandcamp\.com\/|.*\.bandcamp\.com\/track\/.*|.*\.bandcamp\.com\/album\/.*|grooveshark\.com\/.*))|(https:\/\/(gist\.github\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|www\.vimeo\.com\/.*|vimeo\.com\/.*|player\.vimeo\.com\/.*|www\.facebook\.com\/photo\.php.*|www\.facebook\.com\/video\/video\.php.*|www\.facebook\.com\/.*\/posts\/.*|fb\.me\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|open\.spotify\.com\/.*|play\.spotify\.com\/.*)))/i;

					$("a").embedly({
						urlRe: regex,
						method: "after"
					});
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

			var el = getSelectionStart(), i;

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

			var timerResize, self = this;

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

			var i, self = this,
			pasteWrapper = function (e) {

				var paragraphs, html = "", p;

				this.classList.remove("gapelia-editor-placeholder");

				if (e.clipboardData && e.clipboardData.getData) {
					e.preventDefault();

					if (!self.options.disableReturn) {
						paragraphs = e.clipboardData.getData("text/plain").split(/[\r\n]/g);

						for (p = 0; p < paragraphs.length; p += 1) {
							if (paragraphs[p] !== "") {
								html += "<p>" + paragraphs[p] + "</p>";
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

			var i,

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
