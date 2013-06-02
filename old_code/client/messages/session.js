"use strict";


module.exports = function (app, socket) {
	socket.on('session set', function (session) {
		app.emit('session', session);
	});
};
