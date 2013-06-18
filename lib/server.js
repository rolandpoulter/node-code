"use strict";


var App = require('./server/app');

var package_json = require('../package.json');


var parameters = require('commander');

parameters.version(package_json.version);

parameters.parse(process.argv);


process.on('uncaughtException', handleError);


function handleError (error) {

  console.error(error && error.stack || error);

  process.exit(1);

}

module.exports = function () {

  try {

    return main.apply(null, arguments);

  } catch (error) {

    handleError(error);

  }

};

if (require.main === module) {
  module.exports = module.exports();
}


function main () {

	return new App(parameters, package_json);

}
