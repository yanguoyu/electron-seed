const builder = require("electron-builder");
const path = require('path');
const Platform = builder.Platform
const Npm = require('npm-shell');

const npm = new Npm(process.cwd());

const packPath = path.resolve(process.cwd(), './pack/');
// 删除render dist
npm.shell('rm',['-rf', packPath]);
//build electron
npm.node('./build/prod/electron.js');
//build node
npm.node('./build/prod/node.js');
//build render
npm.node('./build/prod/render.js');
// pack
builder.build({
  targets: Platform.MAC.createTarget(),
  config: {
    productName: 'electron-seed',
    asar: false,
    directories: {
      // buildResources: path.resolve(process.cwd(), './app'),
      output: path.resolve(process.cwd(), './pack'),
      app: path.resolve(process.cwd(), './app'),
    },
  }
})
.then(() => {
  console.log('build success');
})
.catch((error) => {
  console.log('build failed', error.toString());
})