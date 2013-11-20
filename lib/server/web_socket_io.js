"use strict";


dependency.assign('SocketIO', require('socket.io'));


require('./channel_io');


exports = module.exports = dependency.injection(WebSocketIO);


function WebSocketIO (http_server, SocketIO) {

	this.http_server = http_server;

}


WebSocketIO.prototype.connect = function () {

	this.connection = this.SocketIO.listen(this.http_server);

};
