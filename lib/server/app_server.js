"use strict";


dependency.assign('http', require('http'));

dependency.assign('express', require('express'));

dependency.assign('console', console);


exports = module.exports = dependency.injection(AppServer);


function AppServer (app_config, app_routes, http, express, console) {

	this.config = app_config;

	this.routes = app_routes;


	this.express_app = express();

	this.http_server = http.createServer(this.express_app);

}


AppServer.prototype.configure = function () {

	this.config.install(this.express_app);

	this.routes.install(this.express_app);

};


AppServer.prototype.getPort = function () {

	return this.express_app.get('port');

};


AppServer.prototype.listen = function () {

	this.http_server.listen(this.getPort(), this.onListen.bind(this));

};

AppServer.prototype.onListen = function () {

	this.console.log("\tListening on port " + this.getPort());

};