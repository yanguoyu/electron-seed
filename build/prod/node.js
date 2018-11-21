const Npm = require('npm-shell');
const path = require('path');

const nodePath = path.resolve(process.cwd(), './node/');
const nodeNpm = new Npm(nodePath);
// 清空非追踪文件
nodeNpm.shell('git', ['clean', '-xfd']);
// 下载production 依赖node_modules
nodeNpm.install('--production');
// 打包拷贝到main
const buildDir = `${path.resolve(process.cwd(), './node/.')}/.`;
const dstDir = path.resolve(process.cwd(), './app/node/');
// 删除render dist
nodeNpm.shell('rm',['-rf', dstDir]);
// 拷贝render build 到dist
nodeNpm.shell('cp',['-r', buildDir, dstDir]);
