"use strict";


module.exports = function (app) {
	if (!app.files_dom.clickHandler) {
		app.files_dom.contextmenuHandler = function (e) {
			//console.log(e);
			e.preventDefault();
			e.stopPropagation();
			e.returnValue = false;
		};

		app.files_dom.mousedownHandler = function (e) {
			//console.log(e);
			e.preventDefault();
			e.stopPropagation();
			e.returnValue = false;
		};

		app.files_dom.clickHandler = function (e) {
			if (e.target.js_object) {
				if (e.shiftKey) {
					e.target.js_object.shiftSelect();
				} else if (e.ctrlKey) {
					e.target.js_object.controlSelect();
				} else {
					e.target.js_object.onlySelect();
				}
			}

			e.preventDefault();
			e.stopPropagation();
			e.returnValue = false;
		};

		app.files_dom.doubleClickHandler = function (e) {
			if (e.target.js_object) {
				e.target.js_object.open();
			}

			e.preventDefault();
			e.stopPropagation();
			e.returnValue = false;
		};

		app.files_dom.addEventListener('contextmenu', app.files_dom.contextmenuHandler);
		app.files_dom.addEventListener('mousedown', app.files_dom.mousedownHandler);

		app.files_dom.addEventListener('click', app.files_dom.clickHandler);
		app.files_dom.addEventListener('dblclick', app.files_dom.doubleClickHandler);
	}
};
