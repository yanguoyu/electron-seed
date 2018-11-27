import log from 'electron-log';
const Npm = require('npm-shell');
const path = require('path');
const nodePath = `file://${path.resolve(__dirname, './node/')}`;
const nodeNpm = new Npm(nodePath);

// 启动node
export const startNode = () => {
  log.info(nodePath);
  log.info('start node begin');
  nodeNpm.node(`${nodePath}/start.js`);
  log.info('start node success');
}

export const stopNode = () => {
  log.info('stop node begin');
  nodeNpm.node(`${nodePath}/stop.js`);
  log.info('stop node success');
}
