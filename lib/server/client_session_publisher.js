"use strict";


module.exports = ClientSessionPublisher;


function ClientSessionPublisher (client, socket, Publisher) {

	this.client = client;

	this.socket = socket;


	if (Publisher) this.Publisher = Publisher;


	this.publish = new this.Publisher('client', this.socket).bindPublish();

}


ClientSessionPublisher.prototype.Publisher = require('../shared/socket_publisher');


ClientSessionPublisher.prototype.projects = function (projects) {

	this.publish('projects', projects);

};