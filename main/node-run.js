const Npm = require('npm-shell');
const path = require('path');
const nodePath = path.resolve(process.cwd(), './node/');
const nodeNpm = new Npm(nodePath);

// 启动node
export const startNode = () => {
  nodeNpm.run('start');
}

export const stopNode = () => {
  nodeNpm.run('stop');
}
