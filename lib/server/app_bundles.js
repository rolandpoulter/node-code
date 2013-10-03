"use strict";


dependency.assign('browserify', require('browserify'));


exports = module.exports = dependency.injection(AppBundles);


function AppBundles (browserify) {}


AppBundles.prototype.setup = function (client_entry_path) {

	this.client = this.browserify([client_entry_path]);

}