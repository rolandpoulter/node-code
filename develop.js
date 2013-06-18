"use strict";


var child_process = require('child_process'),
    gaze = require('gaze'),
    path = require('path'),
    fs = require('fs');


var pid_file = __dirname + '/development.pid',
    server_pid;


if (fs.existsSync(pid_file)) {

  server_pid = fs.readFileSync(pid_file);

  if (server_pid) {

    server_pid = server_pid.toString().split('\n')[0];

  }

}

if (server_pid) {

  try {

    process.kill(server_pid, 0);

    process.exit(1);

  } catch (error) {

    if (error && error.code === 'ESRCH') start_server();

    else process.exit(1);

  }

} else {

  start_server();

}


function start_server () {

  var dont_restart,
      server;


  restart();

  process.on('exit', removePidFile);


  killServerOn('SIGHUP', 'SIGHUP');

  killServerOn('SIGINT', 'SIGHUP');

  killServerOn('SIGTERM', 'SIGHUP');


  function restart () {

    if (dont_restart) return;


    dont_restart = false;

    server = child_process.fork(__dirname + '/lib/server.js', process.argv)


    fs.writeFileSync(pid_file, server.pid + '\n' + process.pid);


    server.on('exit', function () {

      if (!dont_restart) restart();

    });

  }


  function killServerOn (event, signal) {

    process.on(event, function () {

      dont_restart = true;


      server.kill(signal);

      removePidFile();


      process.exit(0);

    });

  }


  function removePidFile () {

    fs.writeFileSync(pid_file, '');

    fs.unlinkSync(pid_file);

  }


  var dirs = [];

  dirs.push(__dirname + '/lib/**/*.js');


  gaze(dirs, {interval: 5000, debounceDelay: 2000}, function () {

    this.on('all', restartOnUpdate);

  });


  function restartOnUpdate () {

    console.log('\n[RESTARTING SERVER]\n');

    dont_restart = false;


    server.kill();

  }
  
}
