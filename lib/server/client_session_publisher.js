"use strict";


exports = module.exports = dependency.injection(
	require('../shared/client_session_publisher_factory')()
);

var ClientSessionPublisher = exports;


ClientSessionPublisher.prototype.projects = function (projects) {

	this.publish('projects', projects);

};
