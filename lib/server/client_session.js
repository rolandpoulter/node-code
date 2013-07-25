"use strict";


module.exports = ClientSession;


ClientSession.get = function (socket) {

	return ClientSession.cache[socket.id];

};


ClientSession.cache = {};


function ClientSession (
	app,
	socket,
	session,
	publishers,
	subscribers,
	entity_names,
	Project,
	objectForEach
) {

	this.app = app;

	this.socket = socket;

	this.session = session;


	if (publishers) this.publishers = publishers;

	if (subscribers) this.subscribers = subscribers;

	if (entity_names) this.entity_names = entity_names;


	if (Project) this.Project = Project;


	this.publish = new this.publishers.ClientSession(this, this.socket);

	this.subscriber = new this.subscribers.ClientSession(this, this.socket);


	this.enitty_subscribers = {};

	this.entity_names.forEach(this.subscribeEntity.bind(this));


	this.socket.createEntityPublisher = this.createEntityPublisher.bind(this);


	this.loadProjects();

}


ClientSession.prototype.Project = require('./project');

ClientSession.prototype.objectForEach = require('../shared/object_for_each');


var register_names = ['ClientSession', 'Project', 'Directory', 'File'];

ClientSession.prototype.publishers = createRegisterDictionary(register_names, 'publisher');

ClientSession.prototype.subscribers = createRegisterDictionary(register_names, 'subscriber');


ClientSession.prototype.entity_names = ['Project', 'Directory', 'File'];


ClientSession.prototype.subscribeEntity = function (entity_name) {

	var EntitySubscriber = this.subscribers[entity_name];

	this.enitty_subscribers[camelCaseToUnderscore(entity_name)] = new EntitySubscriber(this.socket);

};


ClientSession.prototype.publishProjects = function () {

	this.publish.projects(this.session.projects);

};


ClientSession.prototype.loadProjects = function () {

	if (!this.session.projects) {
		this.session.projects = {};

		new this.Project(this.app.dir, '', {}, this.session.projects);
	}

	else {
		this.objectForEach(this.session.projects, function (project_info, project_path) {

			new this.Project(this.app.dir, project_path, project_info.configuration, this.session.projects);

		});
	}


	var client = this;

	this.objectForEach(this.session.projects, function (project_info, project_path) {

		client.Project.get(project_path).attachClient(client);

	});

};


ClientSession.prototype.getPublisher = function (name) {

	return this.publishers[name];

};


ClientSession.prototype.createEntityPublisher = function (name, entity) {

	if (this.entity_names.indexOf(name) === -1) return;


	var Publisher = this.getPublisher(name);


	return new Publisher(entity, this.socket);

};


function createRegisterDictionary (names, type) {

	var register_dictionary = {};


	names.forEach(function (name) {

		register_dictionary[name] = require('./' + camelCaseToUnderscore(name) + '_' + type);

	});


	return register_dictionary;

};


// TODO: turn this into a helper and cleanup the code that uses this

function camelCaseToUnderscore (name) {

	return name.replace(/([^A-Z]?)([A-Z]+)/g, function (m, lowercase, uppercase) {

  	if (lowercase) return lowercase + '_' + uppercase;

  	else if (uppercase.length > 1) {

  		var last = uppercase.length - 1;

  		return uppercase.slice(0, last) + '_' + uppercase.charAt(last);

  	}

  	else return uppercase;

	}).toLowerCase();

}
