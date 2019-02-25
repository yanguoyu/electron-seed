const eggScript = require('egg-scripts');

module.exports = () => {
  new eggScript.StopCommand(['--title=egg-server-node' , __dirname]).start();
  return 'stop';
}