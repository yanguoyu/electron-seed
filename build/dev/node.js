const Npm = require('npm-shell');
const path = require('path');
const fs = require('fs');
const nodeModulesPath = './node_modules';

// 启动node
const nodePath = path.resolve(process.cwd(), './node/');
const nodeNpm = new Npm(nodePath);
if(!fs.existsSync(path.resolve(nodePath, nodeModulesPath))) {
  nodeNpm.install();
}
console.log(nodeNpm.run('start'));

