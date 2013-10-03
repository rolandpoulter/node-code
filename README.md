# Editor

open source, cross platform, runs in a browser, as good as vim/emacs/sublime/cloud9


# Prerequisits

* http://nodejs.org/


# Install

* "npm install gaius -g"
* "gauis run ~/myproject ~/myotherproject"
* open http://localhost:3617


# TODO - high priority (first release)

* √ save file
* √ watch files for changes
* √ detect language by file type
* √ improve pub/sub architecture on server
* √ improve pub/sub architecture on client
* √ fix session bug
* √ better dependency management
* context menus
* create/remove/copy/move files/folders
* select multiple files/folders
* dialogs
* configure default projects
* configure editor settings
* show loading states (spinners)
* highlight directory changes
* tab navigation
* quick view file
* add/remove project
* fix window.Project hack in client/project
* remove old code
* create easy install script
* create gaius github account/project
* create binary executable
* create marketing website and host on github
* migrate todos to github page
* RELEASE as Gaius (Baltar)

# TODO - low priority (future release)

* add theme manager
* support windows
* create stand alone desktop app/server for ubuntu/mac/windows
* add support for links/aliases
* detect binary files
* ignore files/folders
* remove project directory lists from session
* find/replace in folder (secure)
* plugins (with manager)
* make file tree a plugin
* make tabs list a plugin
* make ace editor a plugin
* https support
* add http/https authentication
* give plugins shell access
* warn of insecure plugins
* add terminal plugin (tty.js)
* add layout manager (with split views)
* add autocomplete plugin
* add fuzzy finder plugin
* add npm helper plugin
* add javascript debugger plugin
* add javascript lint/hint plugin
* add javascript text coverage plugin
* add webpage preview plugin
* add git plugin
* add vim bindings plugin
* add emacs bindings plugin
* add help plugin
* add html5 file api plugin
* add markdown preview plugin


# TODO - dream features (proprietary release)

* add 3d editor plugin (lite blender, three.js)
* add 2d editor plugin (lite photoshop)
* add animation editor plugin
* add graph editor plugin
* add game editor plugin
* create game with platform
* user authentication integration
* add collaboration plugin


# Bugs

* server loses track of projects list and can't call project.directory.getInfo
* sessions don't appear to be stored correctly
