'use strict';
const eggScript = require('egg-scripts');

module.exports = () => {
  new eggScript.StartCommand([ '--daemon', '--title=egg-server-node', __dirname ]).start();
  return 'start';
};
