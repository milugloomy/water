const { dialog, ipcMain, shell } = require('electron');
const fs = require('fs');

module.exports = function initIpc() {
  // web调用electron方法（单向） ipcMain.on ipcRenderer.send
  // web调用electron方法  ipcMain.handle  ipcRenderer.invoke
  ipcMain.handle('openDirectoryDialog', function (event, defaultPath) {
    return dialog.showOpenDialog({
      defaultPath,
      properties: ['openDirectory'],
      title: '请选择保存目录',
      buttonLabel: '选择'
    }).then(result => {
      if (!result.canceled) {
        return result.filePaths[0];
      }
    });
  });

  ipcMain.handle('saveFile', function (event, filePath, data) {
    let base64Data = data.replace(/^data:image\/\w+;base64,/, '');
    let dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(filePath, dataBuffer, function (err) {
      return Promise.reject(err);
    });
    return Promise.resolve();
  });

  ipcMain.on('openDirectory', function (event, directoryPath) {
    shell.showItemInFolder(directoryPath);
  });
};
