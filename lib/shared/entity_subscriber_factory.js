"use strict";


exports = module.exports = dependency.register(EntitySubscriberFactory);


function EntitySubscriberFactory (Project) {

	EntitySubscriber.Factory = EntitySubscriberFactory


	function EntitySubscriber (owner, entity_name, socket, getEntity, Subscriber, Project) {

		this.owner = owner;

		this.entity_name = entity_name;

		this.socket = socket;


		this.getEntity = getEntity;


		if (Subscriber) this.Subscriber = Subscriber;

		if (Project) this.Project = Project;


		new this.Subscriber(this.entity_name, this.socket).subscribe(
			this,
			this.Subscriber.onMessageGetEntityAndCallMethod
		);

	}


	EntitySubscriber.prototype.Subscriber = require('./socket_subscriber');


	if (Project) {

		EntitySubscriber.prototype.Project = Project;


		EntitySubscriber.getProjectEntity = function (project_name) {

			return this.Project.get(project_name);

		};


		EntitySubscriber.getDirectoryEntity = function (project_name, relative_directory_path) {

			return this.Project.get(project_name).getDirectory(relative_directory_path);

		};


		EntitySubscriber.getFileEntity = function (project_name, relative_file_path) {

			return this.Project.get(project_name).getFile(relative_file_path);

		};

	}


	return EntitySubscriber;

};
