const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const menuTemplate = require('./menu');
const env = process.env.NODE_ENV || 'development';

// hot reload
if (env === 'development') {
  require('electron-reloader')(module, {
    debug: true,
    watchRenderer: true
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
  win.webContents.openDevTools({ mode: 'right' });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
