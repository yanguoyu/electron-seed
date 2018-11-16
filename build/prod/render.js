const Npm = require('npm-shell');
const path = require('path');
const fs = require('fs');
const nodeModulesPath = './node_modules';

// 启动 render
const renderPath = path.resolve(process.cwd(), './render/');
const renderNpm = new Npm(renderPath);
if(!fs.existsSync(path.resolve(renderPath, nodeModulesPath))) {
  renderNpm.install();
}
const buildDir = `${path.resolve(process.cwd(), './render/build/.')}/.`;
const dstDir = path.resolve(process.cwd(), './main/render/');
renderNpm.shell('rm',['-rf', dstDir]);
renderNpm.run('build');
renderNpm.shell('cp',['-r', buildDir, dstDir]);
