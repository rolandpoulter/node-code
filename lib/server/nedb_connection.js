"use strict";


dependency.assign('Nedb', require('nedb'));

dependency.assign('Path', require('path'));


exports = module.exports = dependency.injection(NedbConnection);


function NedbConnection (app, app_config, callback, Nedb, Path) {

  this.app = app;

  this.config = app_config;



  this.databse_filename =
    app_config.database_filename ||
    Path.join(app.dir, 'database.nedb');


  this.client = new Nedb(this.database_filename);


  this.client.loadDatabase(callback);

}

