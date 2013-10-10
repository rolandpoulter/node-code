"use strict";


require('injendency').noPollute();


dependency.assign('path', require('path'));


require('./app_config');

require('./app_bundles');

require('./app_routes');

require('./app_server');

require('./app_socket_io');

require('./app_session_manager');

require('./nedb_session_store');


exports = module.exports = dependency.injection(App);


function App (
	parameters,
	package_json,
	AppConfig,
	AppBundles,
	AppRoutes,
	AppServer,
	AppSocketIO,
	AppSessionManager,
	NedbSessionStore,
	path
) {

	this.parameters = parameters || {};

	this.package_json = package_json || require('../../package_json');


	this.cwd = process.cwd();

	this.dir = this.path.join(__dirname, '..', '..');

	this.editor_name = package_json.name;

	this.config_dir = '.' + this.editor_name;

	this.relative_config_path = path.join(this.config_dir, 'config.json');


	this.config = new AppConfig(this);

	this.bundle = new AppBundles();

	this.routes = new AppRoutes(this.bundle);

	this.server = new AppServer(this.config, this.routes);

	this.socket_io = new AppSocketIO(this.server);


	this.listen();

}


App.prototype.listen = function () {

	this.bundle.setup(
		this.path.join(this.dir, 'lib', 'client.js')
	);


	this.socket_io.connect();

	this.server.configure();


	this.createSessionAndStore();


	this.server.listen();

};


App.prototype.createSessionAndStore = function () {

	this.session_store = new this.NedbSessionStore({
		filename: this.config.session_store_filename ||
		          this.path.join(this.dir, 'database.nedb')
	});

	this.session_manager = new this.AppSessionManager(
		this,
		this.config,
		this.socket_io.io,
		this.session_store
	);

};
