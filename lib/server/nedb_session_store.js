"use strict";


module.exports = NedbSessionStore;


function NedbSessionStore (options, callback, Nedb, JSON) {

  if (Nedb) this.Nedb = Nedb;

  if (JSON) this.JSON = JSON;


  options = options || {};

  callback = callback || function () {};


  this.filename = options.filename;


  this.db = new this.Nedb(options.filename);

  this.db.loadDatabase(callback);

}


NedbSessionStore.prototype.__proto__ = require('express').session.Store.prototype;


NedbSessionStore.prototype.Nedb = require('nedb');

NedbSessionStore.prototype.JSON = JSON;


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
