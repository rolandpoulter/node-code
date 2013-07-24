"use strict";


module.exports = AppSubscriber;


function AppSubscriber (app, socket, Subscriber) {

	this.app = app;

	this.socket = socket;


	if (Subscriber) this.Subscriber = Subscriber;


	new this.Subscriber('client', this.socket).subscribe(
		this,
		this.Subscriber.onMessageCallMethod
	);

}


ClientSubscriber.prototype.Subscriber = require('../shared/socket_subscriber');


ClientSubscriber.prototype.projects = function (projects) {

	

};
