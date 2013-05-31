"use strict";


var App = require('./lib/app');


var app = new App(window.location);


window.app = app;


window.onload = function () {
	app.ui.render(document.body);
};
