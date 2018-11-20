const Npm = require('npm-shell');
const path = require('path');
const fs = require('fs');
const argv = require('optimist').argv;
const nodeModulesPath = './node_modules';

const nodePath = path.resolve(process.cwd(), './node/');
const nodeNpm = new Npm(nodePath);
// 清空非追踪文件
nodeNpm.shell('git', ['clean', '-xfd']);
// 下载node_modules
if(argv.reInstall || !fs.existsSync(path.resolve(nodePath, nodeModulesPath))) {
  nodeNpm.install('--production');
}
// 打包拷贝到main
const buildDir = `${path.resolve(process.cwd(), './node/.')}/.`;
const dstDir = path.resolve(process.cwd(), './app/node/');
// 删除render dist
nodeNpm.shell('rm',['-rf', dstDir]);
// 拷贝render build 到dist
nodeNpm.shell('cp',['-r', buildDir, dstDir]);
