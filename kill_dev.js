"use strict";


var fs = require('fs');


var pid_file = __dirname + '/development.pid',
    server_pid;


if (fs.existsSync(pid_file)) {

  server_pid = fs.readFileSync(pid_file);

  if (server_pid) {

    server_pid = server_pid.toString().split('\n');

  }

}


if (server_pid) {

  try {

    process.kill(server_pid[0], 'SIGTERM');

    process.kill(server_pid[1], 'SIGTERM');


    fs.writeFileSync(pid_file, '');

    fs.unlinkSync(pid_file);


  } catch (error) {

  	console.error(error && error.stack || error);

  }

}
