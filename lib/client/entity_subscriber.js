"use strict";


exports = module.exports = dependency.assign('EntitySubscriber',
	require('../shared/entity_subscriber_factory')(require('./project'))
);
