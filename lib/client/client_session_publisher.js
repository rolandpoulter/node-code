"use strict";


exports = module.exports = dependency.assign('ClientSessionPublisher',
	require('../shared/client_session_publisher_factory')()
);

var ClientSessionPublisher = exports;


ClientSessionPublisher.prototype.projects = function () {

	this.publish('projects');

};
