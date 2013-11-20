"use strict";


exports = module.exports = dependency.register(WebServerRoutes);


function WebServerRoutes (browserify_bundles) {

	this.browserify_bundles = browserify_bundles;

}


WebServerRoutes.prototype.install = function (express_app) {

	express_app.get('/client.js', this.handleClientScriptRequest.bind(this));

	// TODO: use bower component of html5-ui

	express_app.get('/html5-ui.js', this.handleHtml5UiScriptRequest.bind(this));

	express_app.get('/html5-ui.css', this.handleHtml5UiStyleRequest.bind(this));

};


WebServerRoutes.prototype.handleClientScriptRequest = function (request, response) {

	this.browserify_bundles.client.bundle({
		debug: true

	}, this.handleClientScriptBundleResponse.bind(this, response));

};


WebServerRoutes.prototype.handleClientScriptBundleResponse = function (response, error, script) {

	if (error) {
		console.error(error);

		response.send(500, error);
	}

	else {
		response.send(200, script);
	}

};


WebServerRoutes.prototype.handleHtml5UiScriptRequest = function (request, response) {

	response.sendfile('./node_modules/html5-ui/dist/html5-ui-0.0.1.js');

};


WebServerRoutes.prototype.handleHtml5UiStyleRequest = function (request, response) {

	response.sendfile('./node_modules/html5-ui/css/base.css');

};
