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

function getCaretPosition() {

	var sel, range;

	if (window.getSelection) {
		// IE9 and non-IE
		sel = window.getSelection();

		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			//range.deleteContents();
			return range;
		}
	} else if (document.selection && document.selection.type != "Control") {
		// IE < 9
		return document.selection.createRange();
	}
}

function pasteHtmlAtPosition(pos,html) {
	//console.log($(pos.startContainer.parentElement));
	var container = null;
	if(pos.commonAncestorContainer.nodeName == "P") container = pos.commonAncestorContainer;
	else container = pos.startContainer.parentElement
	$(container).focus().html($(container).html().substring(0,pos.startOffset) + html + $(container).html().substring(pos.startOffset));
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
			anchorInputPlaceholder: "Paste or type a hyperlink...",
			buttons: ["bold", "italic", "underline", "anchor", "header1", "header2", "quote", "indent", "outdent"],
			delay: 0,
			diffLeft: 0,
			diffTop: -10,
			disableReturn: false,
			disableToolbar: false,
			firstHeader: "h3",
			forcePlainText: true,
      cleanPastedHTML: true,
			placeholder: "Type your text",
			secondHeader: "h4",
			targetBlank: false
		},

		init: function (elements, options) {

			this.elements = typeof elements === "string" ? document.querySelectorAll(elements) : elements;
			if (this.elements.length === 0) { return; }

			this.isActive = true;
			this.parentElements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "indent", "outdent"];
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

				"header1": '<li><button class="gapelia-editor-action gapelia-editor-action-header1" data-action="append-' + this.options.firstHeader + '" data-element="' + this.options.firstHeader + '"><h3 style="padding-top: 7px;">A <font size="3">A</font></h3></button></li>',  


				"header2": '<li><button class="gapelia-editor-action gapelia-editor-action-header2" data-action="append-' + this.options.secondHeader + '" data-element="' + this.options.secondHeader + '"><img src="../static/images/line-height.png" alt="line-height" height="45px" width="45px" style="opacity: 0.95; padding-top: 7px;"></button></li>',

				"quote": '<li><button class="gapelia-editor-action gapelia-editor-action-quote" data-action="append-blockquote" data-element="blockquote" style="padding-top: 10px !important;">&ldquo;</button></li>',

				"orderedlist": '<li><button class="gapelia-editor-action gapelia-editor-action-orderedlist" data-action="insertorderedlist" data-element="ol">1.</button></li>',

				"unorderedlist": '<li><button class="gapelia-editor-action gapelia-editor-action-unorderedlist" data-action="insertunorderedlist" data-element="ul">&bull;</button></li>',

				//"pre": '<li><button class="gapelia-editor-action gapelia-editor-action-pre" data-action="append-pre" data-element="pre">abc</button></li>',
			
        "indent": '<li><button class="gapelia-editor-action gapelia-editor-action-indent" data-action="indent" data-element="ul" style="padding: 0 5px 0 5px !important;"><img src="../static/images/indent.png" height="21px" width="21px" style="opacity: 0.95; padding-top: 5px;"></button></li>',
        
        "outdent": '<li><button class="gapelia-editor-action gapelia-editor-action-outdent" data-action="outdent" data-element="ul" style="padding: 0 5px 0 5px !important"><img src="../static/images/outdent.png" height="21px" width="21px" style="opacity: 0.95; padding-top: 5px;"></button></li>'
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
      range, current, parent,
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
        range = selection.getRangeAt(0);
        current = range.commonAncestorContainer;
        parent = current.parentNode;
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

          regex = /((http:\/\/(.*yfrog\..*\/.*|www\.flickr\.com\/photos\/.*|flic\.kr\/.*|twitpic\.com\/.*|www\.twitpic\.com\/.*|twitpic\.com\/photos\/.*|www\.twitpic\.com\/photos\/.*|.*imgur\.com\/.*|twitgoo\.com\/.*|i.*\.photobucket\.com\/albums\/.*|s.*\.photobucket\.com\/albums\/.*|media\.photobucket\.com\/image\/.*|www\.mobypicture\.com\/user\/.*\/view\/.*|moby\.to\/.*|xkcd\.com\/.*|www\.xkcd\.com\/.*|imgs\.xkcd\.com\/.*|www\.asofterworld\.com\/index\.php\?id=.*|www\.asofterworld\.com\/.*\.jpg|asofterworld\.com\/.*\.jpg|www\.qwantz\.com\/index\.php\?comic=.*|23hq\.com\/.*\/photo\/.*|www\.23hq\.com\/.*\/photo\/.*|.*dribbble\.com\/shots\/.*|drbl\.in\/.*|.*\.smugmug\.com\/.*|.*\.smugmug\.com\/.*#.*|picasaweb\.google\.com.*\/.*\/.*#.*|picasaweb\.google\.com.*\/lh\/photo\/.*|picasaweb\.google\.com.*\/.*\/.*|img\.ly\/.*|www\.tinypic\.com\/view\.php.*|tinypic\.com\/view\.php.*|www\.tinypic\.com\/player\.php.*|tinypic\.com\/player\.php.*|www\.tinypic\.com\/r\/.*\/.*|tinypic\.com\/r\/.*\/.*|.*\.tinypic\.com\/.*\.jpg|.*\.tinypic\.com\/.*\.png|meadd\.com\/.*\/.*|meadd\.com\/.*|.*\.deviantart\.com\/art\/.*|.*\.deviantart\.com\/gallery\/.*|.*\.deviantart\.com\/#\/.*|fav\.me\/.*|.*\.deviantart\.com|.*\.deviantart\.com\/gallery|.*\.deviantart\.com\/.*\/.*\.jpg|.*\.deviantart\.com\/.*\/.*\.gif|.*\.deviantart\.net\/.*\/.*\.jpg|.*\.deviantart\.net\/.*\/.*\.gif|www\.fotopedia\.com\/.*\/.*|fotopedia\.com\/.*\/.*|photozou\.jp\/photo\/show\/.*\/.*|photozou\.jp\/photo\/photo_only\/.*\/.*|instagr\.am\/p\/.*|instagram\.com\/p\/.*|skitch\.com\/.*\/.*\/.*|img\.skitch\.com\/.*|www\.questionablecontent\.net\/|questionablecontent\.net\/|www\.questionablecontent\.net\/view\.php.*|questionablecontent\.net\/view\.php.*|questionablecontent\.net\/comics\/.*\.png|www\.questionablecontent\.net\/comics\/.*\.png|twitrpix\.com\/.*|.*\.twitrpix\.com\/.*|www\.someecards\.com\/.*\/.*|someecards\.com\/.*\/.*|some\.ly\/.*|www\.some\.ly\/.*|pikchur\.com\/.*|achewood\.com\/.*|www\.achewood\.com\/.*|achewood\.com\/index\.php.*|www\.achewood\.com\/index\.php.*|www\.whosay\.com\/.*\/content\/.*|www\.whosay\.com\/.*\/photos\/.*|www\.whosay\.com\/.*\/videos\/.*|say\.ly\/.*|ow\.ly\/i\/.*|mlkshk\.com\/p\/.*|lockerz\.com\/s\/.*|pics\.lockerz\.com\/s\/.*|d\.pr\/i\/.*|www\.eyeem\.com\/p\/.*|www\.eyeem\.com\/a\/.*|www\.eyeem\.com\/u\/.*|giphy\.com\/gifs\/.*|gph\.is\/.*|frontback\.me\/p\/.*|www\.fotokritik\.com\/.*\/.*|fotokritik\.com\/.*\/.*|vid\.me\/.*|galeri\.uludagsozluk\.com\/.*|gist\.github\.com\/.*|www\.crunchbase\.com\/.*\/.*|crunchbase\.com\/.*\/.*|www\.slideshare\.net\/.*\/.*|www\.slideshare\.net\/mobile\/.*\/.*|.*\.slideshare\.net\/.*\/.*|slidesha\.re\/.*|scribd\.com\/doc\/.*|www\.scribd\.com\/doc\/.*|scribd\.com\/mobile\/documents\/.*|www\.scribd\.com\/mobile\/documents\/.*|screenr\.com\/.*|polldaddy\.com\/community\/poll\/.*|polldaddy\.com\/poll\/.*|answers\.polldaddy\.com\/poll\/.*|www\.howcast\.com\/videos\/.*|www\.screencast\.com\/.*\/media\/.*|screencast\.com\/.*\/media\/.*|www\.screencast\.com\/t\/.*|screencast\.com\/t\/.*|issuu\.com\/.*\/docs\/.*|www\.kickstarter\.com\/projects\/.*\/.*|www\.scrapblog\.com\/viewer\/viewer\.aspx.*|foursquare\.com\/.*|www\.foursquare\.com\/.*|4sq\.com\/.*|linkedin\.com\/in\/.*|linkedin\.com\/pub\/.*|.*\.linkedin\.com\/in\/.*|.*\.linkedin\.com\/pub\/.*|linkedin\.com\/in\/.*|linkedin\.com\/company\/.*|.*\.linkedin\.com\/company\/.*|www\.sliderocket\.com\/.*|sliderocket\.com\/.*|app\.sliderocket\.com\/.*|portal\.sliderocket\.com\/.*|beta-sliderocket\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|.*\.craigslist\.org\/.*\/.*|my\.opera\.com\/.*\/albums\/show\.dml\?id=.*|my\.opera\.com\/.*\/albums\/showpic\.dml\?album=.*&picture=.*|tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*|www\.polleverywhere\.com\/polls\/.*|www\.polleverywhere\.com\/multiple_choice_polls\/.*|www\.polleverywhere\.com\/free_text_polls\/.*|www\.quantcast\.com\/wd:.*|www\.quantcast\.com\/.*|siteanalytics\.compete\.com\/.*|.*\.status\.net\/notice\/.*|identi\.ca\/notice\/.*|www\.studivz\.net\/Profile\/.*|www\.studivz\.net\/l\/.*|www\.studivz\.net\/Groups\/Overview\/.*|www\.studivz\.net\/Gadgets\/Info\/.*|www\.studivz\.net\/Gadgets\/Install\/.*|www\.studivz\.net\/.*|www\.meinvz\.net\/Profile\/.*|www\.meinvz\.net\/l\/.*|www\.meinvz\.net\/Groups\/Overview\/.*|www\.meinvz\.net\/Gadgets\/Info\/.*|www\.meinvz\.net\/Gadgets\/Install\/.*|www\.meinvz\.net\/.*|www\.schuelervz\.net\/Profile\/.*|www\.schuelervz\.net\/l\/.*|www\.schuelervz\.net\/Groups\/Overview\/.*|www\.schuelervz\.net\/Gadgets\/Info\/.*|www\.schuelervz\.net\/Gadgets\/Install\/.*|www\.schuelervz\.net\/.*|myloc\.me\/.*|pastebin\.com\/.*|pastie\.org\/.*|www\.pastie\.org\/.*|redux\.com\/stream\/item\/.*\/.*|redux\.com\/f\/.*\/.*|www\.redux\.com\/stream\/item\/.*\/.*|www\.redux\.com\/f\/.*\/.*|cl\.ly\/.*|cl\.ly\/.*\/content|speakerdeck\.com\/.*\/.*|www\.kiva\.org\/lend\/.*|www\.timetoast\.com\/timelines\/.*|storify\.com\/.*\/.*|.*meetup\.com\/.*|meetu\.ps\/.*|www\.dailymile\.com\/people\/.*\/entries\/.*|.*\.kinomap\.com\/.*|www\.metacdn\.com\/r\/c\/.*\/.*|www\.metacdn\.com\/r\/m\/.*\/.*|prezi\.com\/.*\/.*|.*\.uservoice\.com\/.*\/suggestions\/.*|formspring\.me\/.*|www\.formspring\.me\/.*|formspring\.me\/.*\/q\/.*|www\.formspring\.me\/.*\/q\/.*|twitlonger\.com\/show\/.*|www\.twitlonger\.com\/show\/.*|tl\.gd\/.*|www\.qwiki\.com\/q\/.*|crocodoc\.com\/.*|.*\.crocodoc\.com\/.*|www\.wikipedia\.org\/wiki\/.*|.*\.wikipedia\.org\/wiki\/.*|www\.wikimedia\.org\/wiki\/File.*|graphicly\.com\/.*\/.*\/.*|360\.io\/.*|www\.behance\.net\/gallery\/.*|behance\.net\/gallery\/.*|www\.jdsupra\.com\/legalnews\/.*|jdsupra\.com\/legalnews\/.*|minilogs\.com\/.*|www\.minilogs\.com\/.*|jsfiddle\.net\/.*|ponga\.com\/.*|list\.ly\/list\/.*|crowdmap\.com\/post\/.*|.*\.crowdmap\.com\/post\/.*|crowdmap\.com\/map\/.*|.*\.crowdmap\.com\/map\/.*|ifttt\.com\/recipes\/.*|weavly\.com\/watch\/.*|www\.weavly\.com\/watch\/.*|tagmotion\.com\/tree\/.*|www\.tagmotion\.com\/tree\/.*|public\.talely\.com\/.*\/.*|polarb\.com\/.*|.*\.polarb\.com\/.*|on\.bubb\.li\/.*|bubb\.li\/.*|.*\.bubb\.li\/.*|embed\.imajize\.com\/.*|giflike\.com\/a\/.*|www\.giflike\.com\/a\/.*|i\.giflike\.com\/.*|rapidengage\.com\/s\/.*|infomous\.com\/node\/.*|stepic\.org\/.*|chirb\.it\/.*|beta\.polstir\.com\/.*\/.*|polstir\.com\/.*\/.*|www\.gettyimages\.com\/detail\/photo\/.*|gty\.im\/.*|isnare\.com\/.*|www\.isnare\.com\/.*|www\.branchtrack\.com\/projects\/.*|.*amazon\..*\/gp\/product\/.*|.*amazon\..*\/.*\/dp\/.*|.*amazon\..*\/dp\/.*|.*amazon\..*\/o\/ASIN\/.*|.*amazon\..*\/gp\/offer-listing\/.*|.*amazon\..*\/.*\/ASIN\/.*|.*amazon\..*\/gp\/product\/images\/.*|.*amazon\..*\/gp\/aw\/d\/.*|www\.amzn\.com\/.*|amzn\.com\/.*|www\.shopstyle\.com\/browse.*|www\.shopstyle\.com\/action\/apiVisitRetailer.*|api\.shopstyle\.com\/action\/apiVisitRetailer.*|www\.shopstyle\.com\/action\/viewLook.*|itunes\.apple\.com\/.*|shoplocket\.com\/products\/.*|etsy\.com\/listing\/.*|www\.etsy\.com\/listing\/.*|fiverr\.com\/.*\/.*|www\.fiverr\.com\/.*\/.*|.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|youtu\.be\/.*|.*\.youtube\.com\/user\/.*|.*\.youtube\.com\/.*#.*\/.*|m\.youtube\.com\/watch.*|m\.youtube\.com\/index.*|.*\.youtube\.com\/profile.*|.*\.youtube\.com\/view_play_list.*|.*\.youtube\.com\/playlist.*|www\.youtube\.com\/embed\/.*|.*twitch\.tv\/.*|.*twitch\.tv\/.*\/b\/.*|www\.ustream\.tv\/recorded\/.*|www\.ustream\.tv\/channel\/.*|www\.ustream\.tv\/.*|ustre\.am\/.*|qik\.com\/video\/.*|qik\.com\/.*|qik\.ly\/.*|.*revision3\.com\/.*|.*\.dailymotion\.com\/video\/.*|.*\.dailymotion\.com\/.*\/video\/.*|collegehumor\.com\/video:.*|collegehumor\.com\/video\/.*|www\.collegehumor\.com\/video:.*|www\.collegehumor\.com\/video\/.*|telly\.com\/.*|www\.telly\.com\/.*|break\.com\/.*\/.*|www\.break\.com\/.*\/.*|vids\.myspace\.com\/index\.cfm\?fuseaction=vids\.individual&videoid.*|www\.myspace\.com\/index\.cfm\?fuseaction=.*&videoid.*|www\.metacafe\.com\/watch\/.*|www\.metacafe\.com\/w\/.*|blip\.tv\/.*\/.*|.*\.blip\.tv\/.*\/.*|video\.google\.com\/videoplay\?.*|.*viddler\.com\/v\/.*|liveleak\.com\/view\?.*|www\.liveleak\.com\/view\?.*|animoto\.com\/play\/.*|dotsub\.com\/view\/.*|www\.overstream\.net\/view\.php\?oid=.*|www\.livestream\.com\/.*|new\.livestream\.com\/.*|www\.worldstarhiphop\.com\/videos\/video.*\.php\?v=.*|worldstarhiphop\.com\/videos\/video.*\.php\?v=.*|bambuser\.com\/v\/.*|bambuser\.com\/channel\/.*|bambuser\.com\/channel\/.*\/broadcast\/.*|www\.schooltube\.com\/video\/.*\/.*|bigthink\.com\/ideas\/.*|bigthink\.com\/series\/.*|sendables\.jibjab\.com\/view\/.*|sendables\.jibjab\.com\/originals\/.*|jibjab\.com\/view\/.*|www\.xtranormal\.com\/watch\/.*|socialcam\.com\/v\/.*|www\.socialcam\.com\/v\/.*|v\.youku\.com\/v_show\/.*|v\.youku\.com\/v_playlist\/.*|www\.snotr\.com\/video\/.*|snotr\.com\/video\/.*|www\.clipfish\.de\/.*\/.*\/video\/.*|www\.myvideo\.de\/watch\/.*|www\.vzaar\.com\/videos\/.*|vzaar\.com\/videos\/.*|www\.vzaar\.tv\/.*|vzaar\.tv\/.*|vzaar\.me\/.*|.*\.vzaar\.me\/.*|coub\.com\/view\/.*|coub\.com\/embed\/.*|www\.streamio\.com\/api\/v1\/.*|streamio\.com\/api\/v1\/.*|vine\.co\/v\/.*|www\.vine\.co\/v\/.*|www\.viddy\.com\/video\/.*|www\.viddy\.com\/.*\/v\/.*|www\.tudou\.com\/programs\/view\/.*|tudou\.com\/programs\/view\/.*|sproutvideo\.com\/videos\/.*|embed\.minoto-video\.com\/.*|iframe\.minoto-video\.com\/.*|play\.minoto-video\.com\/.*|dashboard\.minoto-video\.com\/main\/video\/details\/.*|api\.minoto-video\.com\/publishers\/.*\/videos\/.*|www\.brainshark\.com\/.*\/.*|brainshark\.com\/.*\/.*|23video\.com\/.*|.*\.23video\.com\/.*|goanimate\.com\/videos\/.*|brainsonic\.com\/.*|.*\.brainsonic\.com\/.*|lustich\.de\/videos\/.*|web\.tv\/.*|.*\.web\.tv\/.*|mynet\.com\/video\/.*|www\.mynet\.com\/video\/|izlesene\.com\/video\/.*|www\.izlesene\.com\/video\/|alkislarlayasiyorum\.com\/.*|www\.alkislarlayasiyorum\.com\/.*|59saniye\.com\/.*|www\.59saniye\.com\/.*|zie\.nl\/video\/.*|www\.zie\.nl\/video\/.*|app\.ustudio\.com\/embed\/.*\/.*|bale\.io\/.*|www\.allego\.com\/.*|www\.whitehouse\.gov\/photos-and-video\/video\/.*|www\.whitehouse\.gov\/video\/.*|wh\.gov\/photos-and-video\/video\/.*|wh\.gov\/video\/.*|www\.hulu\.com\/watch.*|www\.hulu\.com\/w\/.*|www\.hulu\.com\/embed\/.*|hulu\.com\/watch.*|hulu\.com\/w\/.*|.*crackle\.com\/c\/.*|www\.funnyordie\.com\/videos\/.*|www\.funnyordie\.com\/m\/.*|funnyordie\.com\/videos\/.*|funnyordie\.com\/m\/.*|www\.vimeo\.com\/groups\/.*\/videos\/.*|www\.vimeo\.com\/.*|vimeo\.com\/groups\/.*\/videos\/.*|vimeo\.com\/.*|vimeo\.com\/m\/#\/.*|player\.vimeo\.com\/.*|www\.ted\.com\/talks\/.*\.html.*|www\.ted\.com\/talks\/lang\/.*\/.*\.html.*|www\.ted\.com\/index\.php\/talks\/.*\.html.*|www\.ted\.com\/index\.php\/talks\/lang\/.*\/.*\.html.*|www\.ted\.com\/talks\/|.*nfb\.ca\/film\/.*|www\.thedailyshow\.com\/watch\/.*|www\.thedailyshow\.com\/full-episodes\/.*|www\.thedailyshow\.com\/collection\/.*\/.*\/.*|yahoo\.com\/movies\/.*|.*\.yahoo\.com\/movies\/.*|www\.colbertnation\.com\/the-colbert-report-collections\/.*|www\.colbertnation\.com\/full-episodes\/.*|www\.colbertnation\.com\/the-colbert-report-videos\/.*|www\.comedycentral\.com\/videos\/index\.jhtml\?.*|www\.theonion\.com\/video\/.*|theonion\.com\/video\/.*|wordpress\.tv\/.*\/.*\/.*\/.*\/|www\.traileraddict\.com\/trailer\/.*|www\.traileraddict\.com\/clip\/.*|www\.traileraddict\.com\/poster\/.*|www\.trailerspy\.com\/trailer\/.*\/.*|www\.trailerspy\.com\/trailer\/.*|www\.trailerspy\.com\/view_video\.php.*|fora\.tv\/.*\/.*\/.*\/.*|www\.spike\.com\/video\/.*|www\.gametrailers\.com\/video.*|gametrailers\.com\/video.*|www\.koldcast\.tv\/video\/.*|www\.koldcast\.tv\/#video:.*|mixergy\.com\/.*|video\.pbs\.org\/video\/.*|www\.zapiks\.com\/.*|www\.trutv\.com\/video\/.*|www\.nzonscreen\.com\/title\/.*|nzonscreen\.com\/title\/.*|app\.wistia\.com\/embed\/medias\/.*|wistia\.com\/.*|.*\.wistia\.com\/.*|.*\.wi\.st\/.*|wi\.st\/.*|confreaks\.net\/videos\/.*|www\.confreaks\.net\/videos\/.*|confreaks\.com\/videos\/.*|www\.confreaks\.com\/videos\/.*|video\.allthingsd\.com\/video\/.*|videos\.nymag\.com\/.*|aniboom\.com\/animation-video\/.*|www\.aniboom\.com\/animation-video\/.*|grindtv\.com\/.*\/video\/.*|www\.grindtv\.com\/.*\/video\/.*|ifood\.tv\/recipe\/.*|ifood\.tv\/video\/.*|ifood\.tv\/channel\/user\/.*|www\.ifood\.tv\/recipe\/.*|www\.ifood\.tv\/video\/.*|www\.ifood\.tv\/channel\/user\/.*|logotv\.com\/video\/.*|www\.logotv\.com\/video\/.*|lonelyplanet\.com\/Clip\.aspx\?.*|www\.lonelyplanet\.com\/Clip\.aspx\?.*|streetfire\.net\/video\/.*\.htm.*|www\.streetfire\.net\/video\/.*\.htm.*|sciencestage\.com\/v\/.*\.html|sciencestage\.com\/a\/.*\.html|www\.sciencestage\.com\/v\/.*\.html|www\.sciencestage\.com\/a\/.*\.html|link\.brightcove\.com\/services\/player\/bcpid.*|bcove\.me\/.*|wirewax\.com\/.*|www\.wirewax\.com\/.*|canalplus\.fr\/.*|www\.canalplus\.fr\/.*|www\.vevo\.com\/watch\/.*|www\.vevo\.com\/video\/.*|pixorial\.com\/watch\/.*|www\.pixorial\.com\/watch\/.*|spreecast\.com\/events\/.*|www\.spreecast\.com\/events\/.*|showme\.com\/sh\/.*|www\.showme\.com\/sh\/.*|.*\.looplogic\.com\/.*|on\.aol\.com\/video\/.*|on\.aol\.com\/playlist\/.*|videodetective\.com\/.*\/.*|www\.videodetective\.com\/.*\/.*|khanacademy\.org\/.*|www\.khanacademy\.org\/.*|.*vidyard\.com\/.*|www\.veoh\.com\/watch\/.*|veoh\.com\/watch\/.*|.*\.univision\.com\/.*\/video\/.*|.*\.vidcaster\.com\/.*|muzu\.tv\/.*|www\.muzu\.tv\/.*|vube\.com\/.*\/.*|www\.vube\.com\/.*\/.*|.*boxofficebuz\.com\/video\/.*|www\.godtube\.com\/featured\/video\/.*|godtube\.com\/featured\/video\/.*|www\.godtube\.com\/watch\/.*|godtube\.com\/watch\/.*|mediamatters\.org\/mmtv\/.*|www\.clikthrough\.com\/theater\/video\/.*|www\.clipsyndicate\.com\/video\/playlist\/.*\/.*|www\.srf\.ch\/player\/tv\/.*\/video\/.*\?id=.*|www\.srf\.ch\/player\/radio\/.*\/audio\/.*\?id=.*|www\.mpora\.com\/videos\/.*|mpora\.com\/videos\/.*|vice\.com\/.*|www\.vice\.com\/.*|videodonor\.com\/video\/.*|api\.lovelive\.tv\/v1\/.*|www\.hurriyettv\.com\/.*|www\.hurriyettv\.com\/.*|video\.uludagsozluk\.com\/.*|espn\.go\.com\/video\/clip.*|espn\.go\.com\/.*\/story.*|abcnews\.com\/.*\/video\/.*|abcnews\.com\/video\/playerIndex.*|abcnews\.go\.com\/.*\/video\/.*|abcnews\.go\.com\/video\/playerIndex.*|washingtonpost\.com\/wp-dyn\/.*\/video\/.*\/.*\/.*\/.*|www\.washingtonpost\.com\/wp-dyn\/.*\/video\/.*\/.*\/.*\/.*|www\.boston\.com\/video.*|boston\.com\/video.*|www\.boston\.com\/.*video.*|boston\.com\/.*video.*|www\.facebook\.com\/photo\.php.*|www\.facebook\.com\/video\/video\.php.*|www\.facebook\.com\/.*\/posts\/.*|fb\.me\/.*|www\.facebook\.com\/.*\/photos\/.*|cnbc\.com\/id\/.*\?.*video.*|www\.cnbc\.com\/id\/.*\?.*video.*|cnbc\.com\/id\/.*\/play\/1\/video\/.*|www\.cnbc\.com\/id\/.*\/play\/1\/video\/.*|cbsnews\.com\/video\/watch\/.*|plus\.google\.com\/.*|www\.google\.com\/profiles\/.*|google\.com\/profiles\/.*|www\.cnn\.com\/video\/.*|edition\.cnn\.com\/video\/.*|money\.cnn\.com\/video\/.*|today\.msnbc\.msn\.com\/id\/.*\/vp\/.*|www\.msnbc\.msn\.com\/id\/.*\/vp\/.*|www\.msnbc\.msn\.com\/id\/.*\/ns\/.*|today\.msnbc\.msn\.com\/id\/.*\/ns\/.*|msnbc\.msn\.com\/.*\/watch\/.*|www\.msnbc\.msn\.com\/.*\/watch\/.*|nbcnews\.com\/.*|www\.nbcnews\.com\/.*|multimedia\.foxsports\.com\/m\/video\/.*\/.*|msn\.foxsports\.com\/video.*|www\.globalpost\.com\/video\/.*|www\.globalpost\.com\/dispatch\/.*|theguardian\.com\/.*\/video\/.*\/.*\/.*\/.*|www\.theguardian\.com\/.*\/video\/.*\/.*\/.*\/.*|guardian\.co\.uk\/.*\/video\/.*\/.*\/.*\/.*|www\.guardian\.co\.uk\/.*\/video\/.*\/.*\/.*\/.*|bravotv\.com\/.*\/.*\/videos\/.*|www\.bravotv\.com\/.*\/.*\/videos\/.*|dsc\.discovery\.com\/videos\/.*|animal\.discovery\.com\/videos\/.*|health\.discovery\.com\/videos\/.*|investigation\.discovery\.com\/videos\/.*|military\.discovery\.com\/videos\/.*|planetgreen\.discovery\.com\/videos\/.*|science\.discovery\.com\/videos\/.*|tlc\.discovery\.com\/videos\/.*|video\.forbes\.com\/fvn\/.*|distrify\.com\/film\/.*|muvi\.es\/.*|video\.foxnews\.com\/v\/.*|video\.foxbusiness\.com\/v\/.*|www\.reuters\.com\/video\/.*|reuters\.com\/video\/.*|live\.huffingtonpost\.com\/r\/segment\/.*\/.*|video\.nytimes\.com\/video\/.*|www\.nytimes\.com\/video\/.*\/.*|nyti\.ms\/.*|www\.vol\.at\/video\/.*|vol\.at\/video\/.*|www\.spiegel\.de\/video\/.*|spiegel\.de\/video\/.*|www\.zeit\.de\/video\/.*|zeit\.de\/video\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|snd\.sc\/.*|open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*|www\.last\.fm\/music\/.*|www\.last\.fm\/music\/+videos\/.*|www\.last\.fm\/music\/+images\/.*|www\.last\.fm\/music\/.*\/_\/.*|www\.last\.fm\/music\/.*\/.*|www\.mixcloud\.com\/.*\/.*\/|www\.radionomy\.com\/.*\/radio\/.*|radionomy\.com\/.*\/radio\/.*|www\.hark\.com\/clips\/.*|www\.rdio\.com\/#\/artist\/.*\/album\/.*|www\.rdio\.com\/artist\/.*\/album\/.*|www\.zero-inch\.com\/.*|.*\.bandcamp\.com\/|.*\.bandcamp\.com\/track\/.*|.*\.bandcamp\.com\/album\/.*|freemusicarchive\.org\/music\/.*|www\.freemusicarchive\.org\/music\/.*|freemusicarchive\.org\/curator\/.*|www\.freemusicarchive\.org\/curator\/.*|www\.npr\.org\/.*\/.*\/.*\/.*\/.*|www\.npr\.org\/.*\/.*\/.*\/.*\/.*\/.*|www\.npr\.org\/.*\/.*\/.*\/.*\/.*\/.*\/.*|www\.npr\.org\/templates\/story\/story\.php.*|huffduffer\.com\/.*\/.*|www\.audioboo\.fm\/boos\/.*|audioboo\.fm\/boos\/.*|boo\.fm\/b.*|www\.xiami\.com\/song\/.*|xiami\.com\/song\/.*|www\.saynow\.com\/playMsg\.html.*|www\.saynow\.com\/playMsg\.html.*|grooveshark\.com\/.*|radioreddit\.com\/songs.*|www\.radioreddit\.com\/songs.*|radioreddit\.com\/\?q=songs.*|www\.radioreddit\.com\/\?q=songs.*|www\.gogoyoko\.com\/song\/.*|hypem\.com\/premiere\/.*|bop\.fm\/s\/.*\/.*|clyp\.it\/.*|www\.dnbradio\.com\/.*|dnbradio\.com\/.*))|(https:\/\/(picasaweb\.google\.com.*\/.*\/.*#.*|picasaweb\.google\.com.*\/lh\/photo\/.*|picasaweb\.google\.com.*\/.*\/.*|skitch\.com\/.*\/.*\/.*|img\.skitch\.com\/.*|vidd\.me\/.*|vid\.me\/.*|gist\.github\.com\/.*|foursquare\.com\/.*|www\.foursquare\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|speakerdeck\.com\/.*\/.*|storify\.com\/.*\/.*|crocodoc\.com\/.*|.*\.crocodoc\.com\/.*|urtak\.com\/u\/.*|urtak\.com\/clr\/.*|ganxy\.com\/.*|www\.ganxy\.com\/.*|sketchfab\.com\/models\/.*|sketchfab\.com\/show\/.*|ifttt\.com\/recipes\/.*|cloudup\.com\/.*|hackpad\.com\/.*|rapidengage\.com\/s\/.*|stepic\.org\/.*|readtapestry\.com\/s\/.*\/|chirb\.it\/.*|medium\.com\/.*|medium\.com\/.*\/.*|www\.branchtrack\.com\/projects\/.*|itunes\.apple\.com\/.*|.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|www\.youtube\.com\/embed\/.*|screen\.yahoo\.com\/.*\/.*|www\.streamio\.com\/api\/v1\/.*|streamio\.com\/api\/v1\/.*|vine\.co\/v\/.*|www\.vine\.co\/v\/.*|mixbit\.com\/v\/.*|www\.brainshark\.com\/.*\/.*|brainshark\.com\/.*\/.*|brainsonic\.com\/.*|.*\.brainsonic\.com\/.*|www\.reelhouse\.org\/.*|reelhouse\.org\/.*|www\.allego\.com\/.*|www\.vimeo\.com\/.*|vimeo\.com\/.*|player\.vimeo\.com\/.*|yahoo\.com\/movies\/.*|.*\.yahoo\.com\/movies\/.*|app\.wistia\.com\/embed\/medias\/.*|wistia\.com\/.*|.*\.wistia\.com\/.*|.*\.wi\.st\/.*|wi\.st\/.*|.*\.looplogic\.com\/.*|khanacademy\.org\/.*|www\.khanacademy\.org\/.*|.*vidyard\.com\/.*|.*\.stream\.co\.jp\/apiservice\/.*|.*\.stream\.ne\.jp\/apiservice\/.*|api\.lovelive\.tv\/v1\/.*|www\.facebook\.com\/photo\.php.*|www\.facebook\.com\/video\/video\.php.*|www\.facebook\.com\/.*\/posts\/.*|fb\.me\/.*|www\.facebook\.com\/.*\/photos\/.*|plus\.google\.com\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|open\.spotify\.com\/.*|play\.spotify\.com\/.*|clyp\.it\/.*)))/i;

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
        
        if (!self.options.forcePlainText && !self.options.cleanPastedHTML) {
          return this;
        }

				if (e.clipboardData && e.clipboardData.getData) {
					e.preventDefault();
          
          if (self.options.cleanPastedHTML && e.clipboardData.getData('text/html')) {
             return self.cleanPaste(e.clipboardData.getData('text/html'));
          }

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

		},
    
     cleanPaste: function (text) {

            /*jslint regexp: true*/
            /*
                jslint does not allow character negation, because the negation
                will not match any unicode characters. In the regexes in this
                block, negation is used specifically to match the end of an html
                tag, and in fact unicode characters *should* be allowed.
            */
            var i, elList, workEl,
                el = this.getSelectionElement(),
                multiline = /<p|<br|<div/.test(text),
                replacements = [

                    // replace two bogus tags that begin pastes from google docs
                    [new RegExp(/<[^>]*docs-internal-guid[^>]*>/gi), ""],
                    [new RegExp(/<\/b>(<br[^>]*>)?$/gi), ""],

                     // un-html spaces and newlines inserted by OS X
                    [new RegExp(/<span class="Apple-converted-space">\s+<\/span>/g), ' '],
                    [new RegExp(/<br class="Apple-interchange-newline">/g), '<br>'],

                    // replace google docs italics+bold with a span to be replaced once the html is inserted
                    [new RegExp(/<span[^>]*(font-style:italic;font-weight:bold|font-weight:bold;font-style:italic)[^>]*>/gi), '<span class="replace-with italic bold">'],

                    // replace google docs italics with a span to be replaced once the html is inserted
                    [new RegExp(/<span[^>]*font-style:italic[^>]*>/gi), '<span class="replace-with italic">'],

                    //[replace google docs bolds with a span to be replaced once the html is inserted
                    [new RegExp(/<span[^>]*font-weight:bold[^>]*>/gi), '<span class="replace-with bold">'],

                     // replace manually entered b/i/a tags with real ones
                    [new RegExp(/&lt;(\/?)(i|b|a)&gt;/gi), '<$1$2>'],

                     // replace manually a tags with real ones, converting smart-quotes from google docs
                    [new RegExp(/&lt;a\s+href=(&quot;|&rdquo;|&ldquo;|Ò|Ó)([^&]+)(&quot;|&rdquo;|&ldquo;|Ò|Ó)&gt;/gi), '<a href="$2">']

                ];
            /*jslint regexp: false*/

            for (i = 0; i < replacements.length; i += 1) {
                text = text.replace(replacements[i][0], replacements[i][1]);
            }

            if (multiline) {

                // double br's aren't converted to p tags, but we want paragraphs.
                elList = text.split('<br><br>');

                this.pasteHTML('<p>' + elList.join('</p><p>') + '</p>');
                document.execCommand('insertText', false, "\n");

                // block element cleanup
                elList = el.querySelectorAll('p,div,br');
                for (i = 0; i < elList.length; i += 1) {

                    workEl = elList[i];

                    switch (workEl.tagName.toLowerCase()) {
                    case 'p':
                    case 'div':
                        this.filterCommonBlocks(workEl);
                        break;
                    case 'br':
                        this.filterLineBreak(workEl);
                        break;
                    }

                }


            } else {

                this.pasteHTML(text);

            }

        },

        pasteHTML: function (html) {
            var elList, workEl, i, fragmentBody, pasteBlock = document.createDocumentFragment();

            pasteBlock.appendChild(document.createElement('body'));

            fragmentBody = pasteBlock.querySelector('body');
            fragmentBody.innerHTML = html;

            this.cleanupSpans(fragmentBody);

            elList = fragmentBody.querySelectorAll('*');
            for (i = 0; i < elList.length; i += 1) {

                workEl = elList[i];

                // delete ugly attributes
                workEl.removeAttribute('class');
                workEl.removeAttribute('style');
                workEl.removeAttribute('dir');

                if (workEl.tagName.toLowerCase() === 'meta') {
                    workEl.parentNode.removeChild(workEl);
                }

            }
            document.execCommand('insertHTML', false, fragmentBody.innerHTML.replace(/&nbsp;/g, ' '));
        },
        isCommonBlock: function (el) {
            return (el && (el.tagName.toLowerCase() === 'p' || el.tagName.toLowerCase() === 'div'));
        },
        filterCommonBlocks: function (el) {
            if (/^\s*$/.test(el.innerText)) {
                el.parentNode.removeChild(el);
            }
        },
        filterLineBreak: function (el) {
            if (this.isCommonBlock(el.previousElementSibling)) {

                // remove stray br's following common block elements
                el.parentNode.removeChild(el);

            } else if (this.isCommonBlock(el.parentNode) && (el.parentNode.firstChild === el || el.parentNode.lastChild === el)) {

                // remove br's just inside open or close tags of a div/p
                el.parentNode.removeChild(el);

            } else if (el.parentNode.childElementCount === 1) {

                // and br's that are the only child of a div/p
                this.removeWithParent(el);

            }

        },

        // remove an element, including its parent, if it is the only element within its parent
        removeWithParent: function (el) {
            if (el && el.parentNode) {
                if (el.parentNode.parentNode && el.parentNode.childElementCount === 1) {
                    el.parentNode.parentNode.removeChild(el.parentNode);
                } else {
                    el.parentNode.removeChild(el.parentNode);
                }
            }
        },

        cleanupSpans: function (container_el) {

            var i,
                el,
                new_el,
                spans = container_el.querySelectorAll('.replace-with');

            for (i = 0; i < spans.length; i += 1) {

                el = spans[i];
                new_el = document.createElement(el.classList.contains('bold') ? 'b' : 'i');

                if (el.classList.contains('bold') && el.classList.contains('italic')) {

                    // add an i tag as well if this has both italics and bold
                    new_el.innerHTML = '<i>' + el.innerHTML + '</i>';

                } else {

                    new_el.innerHTML = el.innerHTML;

                }
                el.parentNode.replaceChild(new_el, el);

            }

            spans = container_el.querySelectorAll('span');
            for (i = 0; i < spans.length; i += 1) {

                el = spans[i];

                // remove empty spans, replace others with their contents
                if (/^\s*$/.test()) {
                    el.parentNode.removeChild(el);
                } else {
                    el.parentNode.replaceChild(document.createTextNode(el.innerText), el);
                }

            }

        }
	};

}(window, document));
