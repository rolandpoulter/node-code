"use strict";


var ClientSessionPublisher = require('../shared/client_session_publisher_factory')();

module.exports = ClientSessionPublisher;


ClientSessionPublisher.prototype.projects = function () {

	this.publish('projects');

};
