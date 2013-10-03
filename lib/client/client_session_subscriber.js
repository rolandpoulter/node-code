"use strict";


exports = module.exports = dependency.assign('ClientSessionSubscriber',
	require('../shared/client_session_subscriber_factory')()
);

var ClientSessionSubscriber = exports;


ClientSessionSubscriber.prototype.projects = function (projects) {

	this.client_session.updateProjects(projects);

};
