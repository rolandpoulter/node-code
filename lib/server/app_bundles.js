"use strict";


module.exports = AppBundle;


function AppBundle (browserify) {

	if (browserify) this.browserify = browserify;

}


AppBundle.prototype.browserify = require('browserify');


AppBundle.prototype.setup = function (client_entry_path) {

	this.client = this.browserify([client_entry_path]);

}