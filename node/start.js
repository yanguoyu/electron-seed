const eggScript = require('egg-scripts');

new eggScript.StartCommand([ '--daemon', '--title=egg-server-node' ]).start();