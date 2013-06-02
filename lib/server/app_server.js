"use strict";


module.exports = AppServer;


function AppServer (app_bundle, http, express, console) {

	this.app_bundle = app_bundle;


	if (http) this.http = http;

	if (express) this.express = express;

	if (console) this.console = console;


	this.express_app = this.express();

	this.http_server = this.http.createServer(this.express_app);

}


AppServer.prototype.http = require('http');

AppServer.prototype.express = require('express');

AppServer.prototype.console = console;


AppServer.configure = function () {

};


AppServer.getPort = function () {

	return this.express_app.get('port');

};


AppServer.listen = function () {

	this.http_server.listen(this.getPort(), this.onListen.bind(this));

};

AppServer.onListen = function () {

	this.console.log("\tListening on port " + this.getPort());

};