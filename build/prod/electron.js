const Npm = require('npm-shell');
const path = require('path');
const fs = require('fs');
const argv = require('optimist').argv;
const nodeModulesPath = './node_modules';

const npm = new Npm(process.cwd());
// 下载node_modules
if(argv.reInstall || !fs.existsSync(path.resolve(process.cwd(), nodeModulesPath))) {
  npm.install();
}
// 打包拷贝到main
const dstDir = path.resolve(process.cwd(), './app/');
const babelPath = path.resolve(process.cwd(), './.babelrc');
// 删除app
npm.shell('rm',['-rf', dstDir]);
npm.exec('babel', ['main', '-d', 'app', '--config-file', babelPath]);
