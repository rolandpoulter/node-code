"use strict";


exports = module.exports = dependency.register(objectForEach);


function objectForEach (object, iterator, this_context) {

	Object.keys(object).forEach(function (object_property) {

		iterator.call(this_context, object[object_property], object_property, object);

	});

};
