const builder = require("electron-builder");
const path = require('path');
const Platform = builder.Platform
const Npm = require('npm-shell');
const fs = require('fs');

//build render
const npm = new Npm(process.cwd());
npm.node('./build/prod/electron.js');
npm.node('./build/prod/node.js');
//build node
npm.node('./build/prod/render.js');
// pack
builder.build({
  targets: Platform.MAC.createTarget(),
  config: {
    directories: {
      buildResources: path.resolve(process.cwd(), './app'),
      output: path.resolve(process.cwd(), './pack')
    }
  }
})
.then(() => {
  console.log('build success');
})
.catch((error) => {
  console.log('build failed', error.toString());
})