const electron = require('electron');
const path = require('path');

const { contextBridge, ipcRenderer } = electron;

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('electronAPI', {
  // 将函数暴露给web调用，调用ipc.js里的监听函数
  // invoke对应ipcMain.handle
  // send对应ipcMain.on
  openDirectoryDialog: (defaultPath) => ipcRenderer.invoke('openDirectoryDialog', defaultPath),
  saveFile: (filePath, data) => ipcRenderer.invoke('saveFile', filePath, data),
  openDirectory: (directoryPath) => ipcRenderer.send('openDirectory', directoryPath)
})
