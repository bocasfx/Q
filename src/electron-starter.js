const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const electronMenu = require('./electron-menu');

const url = require('url');
const path = require('path');
const ipcMain = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function initialize() {
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);
  electronMenu.setMainMenu(mainWindow);

  if (process.env.ELECTRON_START_URL) {
    mainWindow.webContents.openDevTools();

    let webAudioExtension = '/Users/rpalacios/Library/Application\ Support/Google/Chrome/Default/Extensions/cmhomipkklckpomafalojobppmmidlgl/0.1.4_0/';
    BrowserWindow.addDevToolsExtension(webAudioExtension);
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.commandLine.appendSwitch('disable-renderer-backgrounding');

app.on('ready', initialize);

ipcMain.on('quit', () => {
  console.log('quitting...');
  app.quit();
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    initialize();
  }
});
