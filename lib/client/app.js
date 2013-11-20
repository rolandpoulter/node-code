"use strict";


require('injendency').noPollute();


dependency.assign('Console', console);

dependency.assign('UI', UI);


dependency.assign('EventEmitter', require('events').EventEmitter);


require('./ui/app_ui');

require('./web_socket_io');


exports = module.exports = dependency.injection(App);


function App (socket_uri, AppUI, WebSocketIO, EventEmitter, Console) {

	this.events = new EventEmitter();

	this.events.on('error', this.onError.bind(this));


	this.ui = new AppUI(this.events);

	this.web_socket_io = new WebSocketIO(socket_uri, this.ui);

}


App.prototype.onError = function () {

	this.Console.error.apply(this.Console, arguments);

	this.web_socket_io.sendClientErrorArguments(arguments);

};
