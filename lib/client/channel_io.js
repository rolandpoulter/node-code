"use strict";


var ChannelIO = exports = module.exports = require('../shared/channel_io');


ChannelIO.setDefaults({
	publishers: {
		Session:   require('./session_publisher'),
		Directory: require('./entity/directory_publisher'),
		Project:   require('./entity/project_publisher'),
		File:      require('./entity/file_publisher')
	},

	subscribers: {
		Session:   require('./session_subscriber'),
		Directory: require('./entity/directory_subscriber'),
		Project:   require('./entity/project_subscriber'),
		File:      require('./entity/file_subscriber')
	},

	entity_channel_names: ['Project', 'Directory', 'File']
});
