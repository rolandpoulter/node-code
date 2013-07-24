"use strict";


module.exports = AppPublisher;


function AppPublisher (app, socket, Publisher) {

	this.app = app;

	this.socket = socket;


	if (Publisher) this.Publisher = Publisher;


	this.publish = new this.Publisher('client', this.socket).bindPublish();

}


AppPublisher.prototype.Publisher = require('../shared/socket_publisher');


AppPublisher.prototype.projects = function () {

	this.publish('projects');

};