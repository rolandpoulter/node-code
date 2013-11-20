"use strict";


dependency.assign('HTTP', require('http'));

dependency.assign('Express', require('express'));

dependency.assign('Console', console);


require('./web_server_routes');


exports = module.exports = dependency.injection(WebServer);


function WebServer (app_config, browserify_bundles, WebServerRoutes, HTTP, Express, Console) {

	this.config = app_config;

	this.routes = new WebServerRoutes(browserify_bundles);



	this.express_app = Express();

	this.http_server = HTTP.createServer(this.express_app);

}


WebServer.prototype.configure = function () {

	this.config.install(this.express_app);

	this.routes.install(this.express_app);

};


WebServer.prototype.getPort = function () {

	return this.express_app.get('port');

};


WebServer.prototype.listen = function () {

	this.http_server.listen(this.getPort(), this.onListen.bind(this));

};

WebServer.prototype.onListen = function () {

	this.Console.log("\tListening on port " + this.getPort());

};