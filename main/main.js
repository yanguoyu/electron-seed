import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDevelopment from './enviroment';
import { startNode, stopNode } from './node-run';

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  if(isDevelopment) {
    mainWindow.loadURL('localhost:3000');
  } else {
    mainWindow.loadURL(`file://${path.resolve(__dirname, './render', 'index.html')}`);
    startNode();
  }
  mainWindow.on('closed', async function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
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

