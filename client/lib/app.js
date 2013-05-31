"use strict";


exports = module.exports = App;

function App (
	socket_uri,
	AppUI,
	AppSocketIO,
	EventEmitter,
	console
) {
	this.events = new (EventEmitter || this.EventEmitter)();
	this.console = console || this.console;

	this.subscribe_error_event_handler();

	this.ui = new (AppUI || this.AppUI)(this.events);
	this.io = new (AppSocketIO || this.AppSocketIO)(this.events, socket_uri);
}

App.prototype.AppUI = require('./app_ui');
App.prototype.AppSocketIO = require('./app_socket_io');

App.prototype.EventEmitter = require('events').EventEmitter;
App.prototype.console = console;

App.prototype.on_error = function () {
	this.console.error.apply(this.console, arguments);
};

App.prototype.subscribe_error_event_handler = function () {
	this.events.on('error', this.on_error.bind(this));
};
