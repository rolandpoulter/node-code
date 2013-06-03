"use strict";


module.exports = AppServer;


function AppServer (app_config, app_routes, http, express, console) {

	this.config = app_config;

	this.routes = app_routes;


	if (http) this.http = http;

	if (express) this.express = express;

	if (console) this.console = console;


	this.express_app = this.express();

	this.http_server = this.http.createServer(this.express_app);

}


AppServer.prototype.http = require('http');

AppServer.prototype.express = require('express');

AppServer.prototype.console = console;


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