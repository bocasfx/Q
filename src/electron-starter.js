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
let mixerWindow;

function initializeMainWindow() {
  
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

function initializeMixerWindow() {
  
  mixerWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  const mixerUrl = process.env.ELECTRON_MIXER_URL;
  mixerWindow.loadURL(mixerUrl);
  electronMenu.setMainMenu(mixerWindow);

  if (process.env.ELECTRON_MIXER_URL) {
    mixerWindow.webContents.openDevTools();
  }

  mixerWindow.on('closed', function() {
    mixerWindow = null;
  });
}

function initialize() {
  initializeMainWindow();
  initializeMixerWindow();
}

app.commandLine.appendSwitch('disable-renderer-backgrounding');

app.on('ready', initialize);

ipcMain.on('quit', () => {
  app.quit();
});

// Send events from main window to mixer window
ipcMain.on('MixerEvents', function(event, action) {
  mixerWindow.webContents.send('MixerEvents', action);
});

// Send events from mixer window to main window
ipcMain.on('MainEvents', function(event, action) {
  mainWindow.webContents.send('MainEvents', action);
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
