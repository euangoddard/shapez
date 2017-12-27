import * as utils from 'utils';
import * as domReady from 'lib/domReady';

var DIALOGS = ['welcome', 'menu'];

var DIALOG_OPEN_CSS_CLASS = 'dialog-open';

var show_dialog = function (id) {
	var body_classlist = get_body_classlist();
	if (body_classlist.contains(DIALOG_OPEN_CSS_CLASS)) {
		return false;
	}
	var classes = get_css_classes_for_dialog_id(id);
	body_classlist.add.apply(body_classlist, classes);

};

var hide_dialog = function (id) {
	var body_classlist = get_body_classlist();
	var classes = get_css_classes_for_dialog_id(id);
	body_classlist.remove.apply(body_classlist, classes);
};

var get_css_classes_for_dialog_id = function (id) {
	var classes = [
		DIALOG_OPEN_CSS_CLASS,
		id + '-' + DIALOG_OPEN_CSS_CLASS
	];
	return classes;
};

var get_body_classlist = function () {
	return document.body.classList;
};


var check_close_dialog = function (event) {
	if (event.target.tagName === 'BUTTON') {
		var action = event.target.getAttribute('data-action');
		if (action === 'close') {
			hide_dialog(this.id);
		}
	}
};

domReady(() => {
	utils.iter(document.querySelectorAll('.dialog'), function (dialog) {
		dialog.addEventListener('click', check_close_dialog, false);
	});
});


DIALOGS.forEach((dialog_id) => {
	exports['show_' + dialog_id + '_dialog'] = function () {
		show_dialog(dialog_id);
	};
	exports['hide_' + dialog_id + '_dialog'] = function () {
		hide_dialog(dialog_id);
	};
});
