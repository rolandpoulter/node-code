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


	this.subscribeErrorEventHandler();


	this.ui = new (AppUI || this.AppUI)(this.events);

	this.io = new (AppSocketIO || this.AppSocketIO)(this.events, socket_uri, this.ui);

}


App.prototype.AppUI = require('./app_ui');

App.prototype.AppSocketIO = require('./app_socket_io');


App.prototype.EventEmitter = require('events').EventEmitter;

App.prototype.console = console;


App.prototype.subscribeErrorEventHandler = function () {

	this.events.on('error', this.onError.bind(this));

};

App.prototype.onError = function () {

	this.console.error.apply(this.console, arguments);

	this.io.socket.emit('client error', arguments);

};
