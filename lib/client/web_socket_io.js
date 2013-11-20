"use strict";


dependency.assign('SocketIO', window.io);


require('./channel_io');

require('./session');


exports = module.exports = dependency.injection(WebSocketIO);


function WebSocketIO (socket_uri, app_ui, ChannelIO, Session, SocketIO) {

	this.app_ui = app_ui;

	this.messenger = SocketIO.connect(socket_uri);


	this.channel_io = new ChannelIO(this.messenger);

	this.session = new Session(this.channel_io, this.app_ui);

}


WebSocketIO.prototype.sendClientErrorArguments = function (args) {

	this.messenger.emit('client error', args);

};
