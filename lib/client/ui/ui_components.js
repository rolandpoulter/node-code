"use strict";


var Components = require('ecs').Components;


exports = module.exports = dependency.register(UIComponents);


function UIComponents (components) {

	Components.call(this, components);

}


UIComponents.prototype = Object.create(Components.prototype, {
	constructor: {value: UIComponents}
});
