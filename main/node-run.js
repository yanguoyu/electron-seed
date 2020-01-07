import log from 'electron-log';
import shell from "shelljs";
import { app } from 'electron';
import npm from 'npm';
import { join } from "path";

const path = require('path');
const nodePath = path.resolve(__dirname, './node');
const { fork } = require('child_process');
let nodeProcess;
shell.config.fatal = true;

let state = false;
const RUNTIME_TEST_DIRECTORY = "node";
const nodeBinPath = 'node/bin/www';
export const getNodeState = () => state;

// 启动node
export const startNode = (path) => {
  log.info(nodePath);
  log.info('start node begin');
  const DEST_DIR = app.getPath('userData');
  shell.mkdir( "-p" , DEST_DIR );
  shell.chmod( "-R", "+w", DEST_DIR );
  log.info('src path: ', nodePath);
  log.info('dest path: ', DEST_DIR);
  shell.cp( "-R" , nodePath, DEST_DIR );
  npm.load({
    loaded: false,
    progress: false,
    "ignore-scripts": true,
    "no-audit": true
  }, ( err ) => {
    if ( err ) {
      log.error( `Main process: NPM(1): ${err}` );
      return;
    }

    npm.commands.install( join(app.getPath('userData'), RUNTIME_TEST_DIRECTORY ), [], ( err, data ) => {
      if ( err ) {
        log.error( `Main process: NPM(2): ${err}` );
      }
      log.info("install success");
      nodeProcess = fork(join(app.getPath('userData'), nodeBinPath), {
        cwd: process.cwd(),
        stdio: 'pipe'
      })
    });
    npm.on("error", msg => {
      log.error( `Main process: NPM(3): ${msg}` );
    });

  });
  log.info(shell.pwd());
  log.info('start node success');
}

export const stopNode = async () => {
  log.info(nodePath);
  log.info('stop node begin');
  nodeProcess.kill('SIGINT');
  log.info('stop node success');
}
