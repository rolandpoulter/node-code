"use strict";


exports = module.exports = dependency.register(AppRoutes);


function AppRoutes (app_bundles) {

	this.bundles = app_bundles;

}


AppRoutes.prototype.install = function (express_app) {

	express_app.get('/client.js', this.handleClientScriptRequest.bind(this));

	express_app.get('/html5-ui.js', this.handleHtml5UiScriptRequest.bind(this));

};


AppRoutes.prototype.handleClientScriptRequest = function (request, response) {

	this.bundles.client.bundle({
		debug: true

	}, this.handleClientScriptBundleResponse.bind(this, response));

};


AppRoutes.prototype.handleClientScriptBundleResponse = function (response, error, script) {

	if (error) {
		console.error(error);

		response.send(500, error);
	}

	else {
		response.send(200, script);
	}

};


AppRoutes.prototype.handleHtml5UiScriptRequest = function (request, response) {

	response.sendfile('./node_modules/html5-ui/dist/html5-ui-0.0.1.js');

};

