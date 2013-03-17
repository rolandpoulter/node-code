"use strict";


module.exports = function (app) {
	app.get('/main.js', function (req, res) {
		app.bundle.bundle({}, function (error, data) {
			if (error) {
				res.send(500, error);
			} else {
				res.send(200, data);
			}
		});
	});
};
