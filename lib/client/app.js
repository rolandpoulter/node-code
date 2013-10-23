"use strict";


require('injendency').noPollute();


dependency.assign('console', console);

dependency.assign('UI', UI);


dependency.assign('EventEmitter', require('events').EventEmitter);


require('./app_socket_io');

require('./ui/app_ui');


exports = module.exports = dependency.injection(App);


function App (socket_uri, AppSocketIO, AppUI, console, EventEmitter) {

	this.events = new EventEmitter();


	this.subscribeErrorEventHandler();


	this.ui = new AppUI(this.events);

	this.io = new AppSocketIO(socket_uri, this.ui);

}


App.prototype.subscribeErrorEventHandler = function () {

	this.events.on('error', this.onError.bind(this));

};

App.prototype.onError = function () {

	this.console.error.apply(this.console, arguments);

	this.io.socket.emit('client error', arguments);

};
