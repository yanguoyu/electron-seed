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
// 拷贝package.json
const buildDir = `${path.resolve(process.cwd(), './main/package.json')}`;
const packageDir = path.resolve(process.cwd(), './app/package.json');
// 拷贝package.json 到app目录
npm.shell('cp',[buildDir, packageDir]);
// 下载production 依赖node_modules
const electronNpm = new Npm(path.resolve(process.cwd(), './app'));
electronNpm.install();
