const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const menuTemplate = require('./menu');
const env = process.env.NODE_ENV || 'development';
const initIpc = require('./ipc');

// hot reload
// if (env === 'development') {
//   require('electron-reloader')(module, {
//     debug: true,
//     watchRenderer: true
//   });
// }

async function createWindow() {
  const win = new BrowserWindow({
    width: 1220,
    // width: 1820,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (env === "development") {
    await win.loadFile('./dist/index.html');
    // await win.loadURL(`http://localhost:5173/water`);
    win.webContents.openDevTools({ mode: 'right' });
  } else {
    await win.loadFile('./dist/index.html');
  }

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  initIpc();
  createWindow();

  // app.on('activate', () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     createWindow();
  //   }
  // });
});

app.on('window-all-closed', () => {
  app.quit();
});
