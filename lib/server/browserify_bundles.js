"use strict";


dependency.assign('Browserify', require('browserify'));


exports = module.exports = dependency.injection(BrowserifyBundles);


function BrowserifyBundles (Browserify) {}


BrowserifyBundles.prototype.setup = function (client_entry_path) {

	this.client = this.Browserify([client_entry_path]);

};
