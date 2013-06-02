"use strict";


var express = require('express'),
    path = require('path');


module.exports = function (app) {
	try {
		app.config_json = Object.create(require(path.join(app.cwd, app.relative_config_path)));
	} catch (err) {
		app.config_json = {};
	}

	app.cookie_secret = app.config_json.cookie_secret || 'gaius baltar is careless';
	app.cookie_key = app.config_json.cookie_key || app.editor_name + '.sid';

	app.configure(function(){
		app.set('port', process.env.PORT || app.config_json.port || 3000);

		app.use(express.logger('dev'));

		app.use(express.cookieParser());

		app.session_store = new express.session.MemoryStore();

    app.use(express.session({
    	store: app.session_store,
    	secret: app.cookie_secret,
    	key: app.cookie_key
    }));

		app.use(express.compress());
	
		app.use(express.static(path.join(__dirname, '..', 'public')));
		app.use('/bower_components', express.static(path.join(__dirname, '..', 'components')));
	});

	app.configure('development', function(){
		app.use(express.errorHandler());
	});
};
