import log from 'electron-log';
const Npm = require('npm-shell');
const path = require('path');
const nodePath = `file://${path.resolve(__dirname, '../../node/')}`;
const nodeNpm = new Npm(nodePath);

// 启动node
export const startNode = () => {
  log.info(nodePath);
  log.info('start node begin');
  nodeNpm.run('start');
  log.info('start node success');
}

export const stopNode = () => {
  log.info('stop node begin');
  nodeNpm.run('stop');
  log.info('stop node success');
}
