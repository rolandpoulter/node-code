"use strict";


exports = module.exports = dependency.assign(
	'CamelCaseToUnderscore', camelCaseToUnderscore
);


function camelCaseToUnderscore (name) {

	return name.replace(
		/([^A-Z]?)([A-Z]+)/g,
		camelCaseToUnderscore.delimitWithUnderscores
	).toLowerCase();

};


camelCaseToUnderscore.delimitWithUnderscores = function (m, lowercase, uppercase) {

	if (lowercase) return lowercase + '_' + uppercase;

	else if (uppercase.length > 1) {

		var last = uppercase.length - 1;

		return uppercase.slice(0, last) + '_' + uppercase.charAt(last);

	}

	else return uppercase;

};