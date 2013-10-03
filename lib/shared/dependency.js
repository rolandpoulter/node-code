(global || window || this).dependency = dependency(exports || {}, global || window || this);


function dependency (exports, namespace) {

	"use strict";


	exports.create = dependency;

	exports.namespace = namespace || {};

	exports.register = register;

	exports.unassign = unassign;

	exports.assign = assign;

	exports.get = get;

	exports.find = find;

	exports.freeze = freeze;

	exports.inject = inject;

	exports.injection = injection;

	exports.wrap = wrap;

	exports.arguments_names = arguments_names;


	return exports;


	function register (named_object, namespace) {

		return assign(named_object.name, named_object, namespace);

	}


	function unassign (name, namespace) {

		namespace = namespace || exports.namespace;


		namespace[name] = undefined;

	}


	function assign (name, value, namespace) {

		namespace = namespace || exports.namespace;


		return namespace[name] = value;

	}


	function get (name, namespace) {

		return (namespace || exports.namespace)[name];

	}


	function find (names, namespace, context, args) {

		namespace = namespace || exports.namespace;

		args = Array.prototype.slice.call(args || [], 0);


		names.forEach(function (name, index) {

			if (namespace[name] !== undefined) {
				if (context && context[name] === undefined) {
					context[name] = namespace[name];
				}

				if (args && args[index] === undefined) {
					args[index] = namespace[name];
				}
			}

		});


		return args;

	}


	function freeze (namespace) {

		Object.freeze(namespace || exports.namespace);

	}


	function inject (callable, namespace, context, args) {

		namespace = namespace || exports.namespace;

		if (context === undefined && callable.name) {
			context = Object.create(callable.prototype);
		}

		
		var names = arguments_names(callable);

		args = exports.find(names, namespace, context, args);


		return callable.apply(context, args);

	}


	function injection (callable, namespace) {

		var wrapper = wrap(callable, namespace);


		if (callable.name) assign(callable.name, wrapper, namespace);


		return wrapper;

	}


	function wrap (callable, namespace) {

		namespace = namespace || exports.namespace;


		var wrapper = eval(
			'(function ' + callable.name + ' () {\n' +
			'\treturn inject(callable, namespace, this, arguments);\n' +
			'})'
		);


		wrapper.prototype = Object.create(callable.prototype, {
			constructor: {value: wrapper}
		});


		Object.defineProperty(wrapper, 'original', {value: callable});


		return wrapper;

	}

}


function arguments_names (callable) {

	"use strict";


	var source = callable.toString(),

	    first_left_parentheses = source.indexOf('('),
	    first_right_parentheses = source.indexOf(')'),

	    names = source.substring(first_left_parentheses + 1, first_right_parentheses);


	names = names.replace(/\/\*(.|[\r\n])*?\*\//g, '');
	names = names.replace(/\/\/[^\n\r]*[\n\r]/g, '');
	names = names.replace(/[\s\r\n]*/g, '');

	return names.split(',');

}
