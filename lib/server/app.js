"use strict";


require('injendency').noPollute();


dependency.assign('Path', require('path'));


require('./app_config');

require('./browserify_bundles');

require('./web_server');

require('./web_socket_io');

require('./session_manager');

require('./nedb_session_store');


exports = module.exports = dependency.injection(App);


function App (
	parameters,
	package_json,
	AppConfig,
	BrowserifyBundles,
	WebServerRoutes,
	WebServer,
	WebSocketIO,
	SessionManager,
	NedbSessionStore,
	Path
) {

	this.parameters = parameters || {};

	this.package_json = package_json || require('../../package_json');


	this.cwd = process.cwd();

	this.dir = this.Path.join(__dirname, '..', '..');

	this.editor_name = package_json.name;

	this.config_dir = '.' + this.editor_name;

	this.relative_config_path = this.Path.join(this.config_dir, 'config.json');


	this.config = new AppConfig(this);

	this.browserify_bundles = new BrowserifyBundles();


	this.web_server = new WebServer(this.config, this.browserify_bundles);

	this.web_socket_io = new WebSocketIO(this.web_server.http_server);


	this.listen();

}


App.prototype.listen = function () {

	this.browserify_bundles.setup(
		this.Path.join(this.dir, 'lib', 'client.js')
	);


	this.web_socket_io.connect();

	this.web_server.configure();


	this.createSessionStoreAndManager();


	this.web_server.listen();

};


App.prototype.createSessionStoreAndManager = function () {

	var session_store_filename =
		this.config.session_store_filename ||
		this.Path.join(this.dir, 'database.nedb');


	this.session_manager = new this.SessionManager(
		this,
		this.config,
		this.web_socket_io.connection,
		session_store_filename
	);

};
