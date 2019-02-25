import log from 'electron-log';
import Npm from './npm-shell';
const path = require('path');
const nodePath = path.resolve(__dirname, './node/');
const nodeNpm = new Npm(nodePath);

let state = false;

export const getNodeState = () => state;

// 启动node
export const startNode = () => {
  log.info(nodePath);
  log.info('start node begin');
  const startPath = path.resolve(nodePath, './start.js');
  log.info(startPath);
  const start = require(startPath);
  log.info(JSON.stringify(start()));
  state = true;
  log.info('start node success');
}

export const stopNode = async () => {
  log.info('stop node begin');
  const stopPath = path.resolve(nodePath, './stop.js');
  log.info(stopPath);
  const stop = require(stopPath);
  const res = await stop();
  state = false;
  log.info(JSON.stringify(res));
  log.info('stop node success');
}
