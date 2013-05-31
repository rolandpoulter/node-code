"use strict";


var Project = require('../lib/Project');


exports = module.exports = function (app, socket, session) {};


var parseCookie = require('express/node_modules/cookie').parse;


exports.authorize = function (app, data, accept) {
	var cookies = parseCookie(data.headers.cookie),
      session_id = cookies[app.cookie_key],
      session_store = app.session_store;

  session_store.load(session_id, function (err, session) {
    if (err) return accept(err);
    
    if (!session) {
      session = session_store.createSession({
        sessionID: session_id,
        sessionStore: session_store
      }, {
        cookie: cookies
      });
    }

    data.session = session;

    Project.load_session(app, session, function (err) {
      session.save();

    	if (err) return accept(err);

			accept(null, true);
    });
	});
};
