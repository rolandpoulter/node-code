exports = module.exports = function (context) {

	context.getProjectEntity = function (project_name) {

		return dependency.get('Project').get(project_name);

	};


	context.getDirectoryEntity = function (project_name, relative_directory_path) {

		return exports.getProjectEntity(project_name).getDirectory(relative_directory_path);

	};


	context.getFileEntity = function (project_name, relative_file_path) {

		return exports.getProjectEntity(project_name).getFile(relative_file_path);

	};

};

exports(exports);
