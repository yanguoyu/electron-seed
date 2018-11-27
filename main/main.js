import { app, BrowserWindow } from 'electron';
import path from 'path';
import log from 'electron-log';
import isDevelopment from './enviroment';
import { startNode, stopNode } from './node-run';

let mainWindow
log.transports.file.level = 'silly';
log.warn('enter main.js');

function createWindow () {
  log.info('create window');
  mainWindow = new BrowserWindow({width: 800, height: 600})
  if(isDevelopment) {
    mainWindow.loadURL('localhost:3000');
  } else {
    log.info(`file://${path.resolve(__dirname, './render', 'index.html')}`);
    mainWindow.loadURL(`file://${path.resolve(__dirname, './render', 'index.html')}`);
    startNode();
  }
  mainWindow.on('closed', async function () {
    mainWindow = null
    if(!isDevelopment) {
      stopNode();
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  log.info('window-all-closed');
  if (process.platform !== 'darwin') {
    app.quit()
  }
  if(!isDevelopment) {
    stopNode();
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})  

