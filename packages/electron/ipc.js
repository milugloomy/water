const { dialog, ipcMain } = require('electron');

module.exports = function initIpc() {

  ipcMain.handle('openDirectoryDialog', function () {
    return dialog.showOpenDialog({
      properties: ['openDirectory'],
      title: '请选择保存目录',
      buttonLabel: '选择'
    }).then(result => {
      if(!result.canceled) {
        return result.filePaths[0];
      }
    });
  });

};
