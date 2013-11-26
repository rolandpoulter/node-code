exports = module.exports = function (context) {

	context.getProjectEntity = function (entity_cache, project_id) {

		return entity_cache[project_id];

	};


	context.getDirectoryEntity = function (entity_cache, project_id, relative_directory_path) {

		return exports.getProjectEntity(project_id, entity_cache).getDirectory(relative_directory_path);

	};


	context.getFileEntity = function (entity_cache, project_id, relative_file_path) {

		return exports.getProjectEntity(project_id, entity_cache).getFile(relative_file_path);

	};

};

exports(exports);
