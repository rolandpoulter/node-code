"use strict";


module.exports = function (app) {
	if (!app.opened_dom.toggleHandler) {
		app.opened_dom.toggleHandler = function (e) {
			if (e.target.className === 'close') {
				e.target.parentNode.js_object.close();

			} else if (e.target.js_object) {
				e.target.js_object.open();
			}
		};

		app.opened_dom.addEventListener('click', app.opened_dom.toggleHandler);
	}
};
