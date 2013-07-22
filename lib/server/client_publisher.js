"use strict";


module.exports = ClientPublisher;


function ClientPublisher (socket, Publisher) {

	this.socket = socket;


	if (Publisher) this.Publisher = Publisher;


	this.publisher = new this.Publisher('client', this.socket);

}


ClientPublisher.prototype.Publisher = require('./socket_publisher');


ClientPublisher.prototype.projects = function (projects) {

	this.publisher.publish('projects', projects);

};