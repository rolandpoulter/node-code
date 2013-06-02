"use strict";


module.exports = App;


function App (
	parameters,
	package_json,
	AppConfig,
	AppBundles,
	AppRoutes,
	AppServer,
	AppSession,
	AppSocketIO,
	path
) {

	this.parameters = parameters || {};

	this.package_json = package_json || require('../../package_json');


	if (AppConfig) this.AppConfig = AppConfig;

	if (AppBundles) this.AppBundles = AppBundles;

	if (AppRoutes) this.AppRoutes = AppRoutes;

	if (AppServer) this.AppServer = AppServer;

	if (AppSession) this.AppSession = AppSession;

	if (AppSocketIO) this.AppSocketIO = AppSocketIO;


	if (path) this.path = path;


	this.config = new AppConfig();

	this.bundle = new AppBundles();

	this.routes = new AppRoutes(this.bundle);

	this.server = new AppServer(this.config, this.routes);

	this.socket_io = new AppSocketIO(this.server);

	this.session = new AppSession(this.server, this.socket_io);


	this.cwd = process.cwd();

	this.dir = this.path.join(__dirname, '..', '..');

	// this.editor_name = package_json.name;

	// this.config_dir = '.' + this.editor_name;

	// this.relative_config_path = path.join(this.config_dir, 'config.json');


	this.listen();

}


App.prototype.AppConfig = require('./app_config');

App.prototype.AppBundles = require('./app_bundles');

App.prototype.AppRoutes = require('./app_routes');

App.prototype.AppServer = require('./app_server');

App.prototype.AppSession = require('./app_session');

App.prototype.AppSocketIO = require('./app_socket_io');


App.prototype.path = require('path');


App.prototype.listen = function () {
	this.bundle.setup(
		this.path.join(this.dir, 'lib', 'client.js')
	);

	this.server.configure();

	this.server.listen();
};

