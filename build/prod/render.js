const Npm = require('npm-shell');
const path = require('path');
const fs = require('fs');
const argv = require('optimist').argv;
const nodeModulesPath = './node_modules';

const renderPath = path.resolve(process.cwd(), './render/');
const renderNpm = new Npm(renderPath);
if(argv.reInstall || !fs.existsSync(path.resolve(renderPath, nodeModulesPath))) {
  renderNpm.install();
}
const buildDir = `${path.resolve(process.cwd(), './render/build/.')}/.`;
const dstDir = path.resolve(process.cwd(), './app/render/');
// 删除render dist
renderNpm.shell('rm',['-rf', dstDir]);
renderNpm.run('build');
// 拷贝render build 到dist
renderNpm.shell('cp',['-r', buildDir, dstDir]);
