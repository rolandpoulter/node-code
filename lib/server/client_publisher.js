"use strict";


module.exports = ClientPublisher;


function ClientPublisher (client, socket, Publisher) {

	this.client = client;

	this.socket = socket;


	if (Publisher) this.Publisher = Publisher;


	this.publish = new this.Publisher('client', this.socket).bindPublish();

}


ClientPublisher.prototype.Publisher = require('./socket_publisher');


ClientPublisher.prototype.projects = function (projects) {

	this.publish('projects', projects);

};