"use strict";


dependency.assign('Path', require('path'));

dependency.assign('Express', require('express'));


exports = module.exports = dependency.injection(AppConfig);


function AppConfig (app, Express, Path) {

	this.app = app;


	this.data = {};


	this.fetchData();

}


AppConfig.prototype.fetchData = function () {

	try {
		this.data = Object.create(require(this.Path.join(this.app.cwd, this.app.relative_config_path)));
	}

	catch (error) {}


	this.cookie_secret = this.data.cookie_secret || 'gaius baltar is careless';

	this.cookie_key = this.data.cookie_key || this.app.editor_name + '.sid';

};


AppConfig.prototype.install = function (express_app) {

	express_app.configure(this.configureAllEnvironments.bind(this, express_app));

	express_app.configure('development', this.configureDevelopmentEnvironement.bind(this, express_app));

};


AppConfig.prototype.configureAllEnvironments = function (express_app) {

	express_app.set('port', process.env.PORT || this.data.port || 3000);

	express_app.use(this.Express.logger('dev'));

	express_app.use(this.Express.cookieParser());

	express_app.use(this.Express.session({
		store: this.app.session_store,
		secret: this.cookie_secret,
		key: this.cookie_key
	}));

	express_app.use(this.Express.compress());

	express_app.use(this.Express.static(this.Path.join(__dirname, '..', '..', 'public')));

	express_app.use('/bower_components', this.Express.static(this.Path.join(__dirname, '..', '..', 'components')));

};

AppConfig.prototype.configureDevelopmentEnvironement = function (express_app) {

	express_app.use(this.Express.errorHandler());

};
