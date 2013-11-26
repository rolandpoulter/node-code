"use strict";


dependency.assign('JSON', JSON);

dependency.assign('Nedb', require('nedb'));


exports = module.exports = dependency.injection(NedbSessionStore);


function NedbSessionStore (nedb_database_client, Nedb, JSON) {

  this.db = nedb_database_client;

}


NedbSessionStore.prototype.__proto__ = require('express').session.Store.prototype;


NedbSessionStore.prototype.get = function (session_id, callback) {

  console.log('get session: ', session_id);

  this.db.findOne(
    {session_id: session_id},
    this.getCallback.bind(this, callback)
  );

};

NedbSessionStore.prototype.getCallback = function (callback, error, session) {

  if (error) return callback(error);

  if (!session) return callback(null, null);


  var session_data = this.JSON.parse(session.data);

  return callback(null, session_data);

};


NedbSessionStore.prototype.set = function (session_id, session_data, callback) {

  session_data = this.JSON.stringify(session_data);

  this.db.update(
    {session_id: session_id},
    {session_id: session_id, data: session_data},
    {multi: false, upsert: true}, 
    callback
  );

};


NedbSessionStore.prototype.destroy = function (session_id, callback) {

  this.db.remove({session_id: session_id}, {multi: false}, callback);

};
