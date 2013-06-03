"use strict";


var App = require('./client/app');


var app = new App(window.location);


window.app = app;


window.onload = function () {
	app.ui.render(document.body);
};
