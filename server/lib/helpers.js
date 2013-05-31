"use strict";


var path = require('path');


exports.cached_path_entity = function (entity, path_location, relative_path, cache) {
	entity.path_location = path_location;
	entity.relative_path = relative_path;
	entity.absolute_path = path.join(path_location, relative_path);
	entity.base_name = path.basename(entity.absolute_path);

	if (cache[entity.absolute_path]) {
		return cache[entity.absolute_path];
	}

	return cache[entity.absolute_path] = this;
};


exports.entity_message_handler = function (socket, session, get_entity_method) {
	var slice = Array.prototype.slice;

	function entity_message_handler_binder (procedure, relative_project_path, relative_entity_path) {
		var emit_message = this,
		    project = session.projects[relative_project_path],
		    entity = project,
		    args = slice.call(arguments, 2);

		console.log(project, project[get_entity_method]);

		if (get_entity_method) {
		 entity = project[get_entity_method](relative_entity_path)
		}

		procedure.call(project, entity, args, function () {
			var final_args = slice.call(arguments);

			socket.emit.apply(socket,
				[ emit_message,
					relative_project_path,
					relative_entity_path
				].concat(final_args)
			);
		});
	}

	entity_message_handler_binder.api = function (method_object, before_invoke, before_respond) {
		Object.keys(method_object).forEach(function (method) {
			var method_info = method_object[method];

			socket.on(method_info.on, entity_message_handler_binder.bind(method_info.emit, function (entity, args, respond) {
				var project = this;

				if (method_info.before_invoke) {
					method_info.before_invoke.call(project, entity);
				}

				entity[method].apply(entity, [socket, session].concat(args).concat([function () {
					if (method_info.before_respond) {
						method_info.before_respond.call(project, entity);
					}

					respond.apply(this, arguments);
				}]));
			}));
		});
	}

	return entity_message_handler_binder;
};
