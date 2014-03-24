/*! 
 * gapelia-editor-insert-plugin v0.1.1 - jQuery insert plugin for MediumEditor
 *
 * FilePicker Addon
**/

(function ($) {

	$.fn.gapeliaInsert.filepicker = {

		// FilePicker initial function
		// @return {void}

		init: function () {
			this.$el = $.fn.gapeliaInsert.insert.$el;
		},

		// Add FilePicker to placeholder
		// @param {element} placeholder Placeholder to add FilePicker to
		// @return {void}

		add: function (placeholder) {

			var that = this;
			$.fn.gapeliaInsert.insert.deselect();

			placeholder.append('<div class="gapeliaInsert-filepicker">FilePicker</div>');

		}

	};

}(jQuery));