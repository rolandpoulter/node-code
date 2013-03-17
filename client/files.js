"use strict";


module.exports = function (app) {
	if (!app.files_dom.clickHandler) {
		app.files_dom.clickHandler = function (e) {
			if (e.target.object) {
				e.target.object.select();
			}
		};

		app.files_dom.doubleClickHandler = function (e) {
			if (e.target.object) {
				e.target.object.open();
			}
		};

		app.files_dom.addEventListener('click', app.files_dom.clickHandler);
		app.files_dom.addEventListener('dblclick', app.files_dom.doubleClickHandler);
	}
};
