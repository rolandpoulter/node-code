"use strict";


module.exports = AppClientCoordinator;


AppClientCoordinator.cache = {};


function AppClientCoordinator (
	app,
	socket,
	session,
	AppPublisherFactories,
	AppSubscriberFactories,
	Project,
	objectForEach
) {

	var id = socket.id;

	if (AppClientCoordinator.cache[id]) {
		AppClientCoordinator.cache[id].session = session;

		return AppClientCoordinator.cache[id];
	}

	AppClientCoordinator.cache[id] = this;


	this.app = app;

	this.socket = socket;

	this.session = session;


	if (AppPublisherFactories) this.AppPublisherFactories = AppPublisherFactories;

	if (AppSubscriberFactories) this.AppSubscriberFactories = AppSubscriberFactories;

	if (Project) this.Project = Project;

	if (objectForEach) this.objectForEach = objectForEach;


	this.publisher_factories = {};

	this.subscribers_factories = {};


	new this.AppPublisherFactories(this.socket, this.publisher_factories);

	new this.AppSubscriberFactories(this.socket, this.subscriber_factories);


	this.loadProjects();

}


AppClientCoordinator.prototype.AppPublisherFactories = require('./app_publisher_factories');

AppClientCoordinator.prototype.AppSubscriberFactories = require('./app_subscriber_factories');

AppClientCoordinator.prototype.Project = require('./project');

AppClientCoordinator.prototype.objectForEach = require('../shared/object_for_each');


AppClientCoordinator.prototype.loadProjects = function () {

	if (!this.session.projects) {
		this.session.projects = {};

		new this.Project(this.app.dir, '', this.session.projects, {});
	}

	else {
		// TODO: revive projects list
	}


	var client = this;

	this.objectForEach(this.session.projects, function (project, name) {

		client.Project.get(name).attachClient(client)

	});

};


AppClientCoordinator.prototype.getPublisherFactory = function (name) {

	return this.publisher_factories[name];

};
