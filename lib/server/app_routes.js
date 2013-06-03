"use strict";


module.exports = AppRoutes;


function AppRoutes (app_bundles) {

	this.bundles = app_bundles;

}


AppRoutes.prototype.install = function (express_app) {

	express_app.get('/client.js', this.handleClientScriptRequest.bind(this));

};


AppRoutes.prototype.handleClientScriptRequest = function (request, response) {

	this.bundles.client.bundle({}, this.handleClientScriptBundleResponse.bind(this, response));

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
