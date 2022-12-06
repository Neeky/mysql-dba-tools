let path = require("path")


const { app, BrowserWindow, ipcMain} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
          },
    })
    
    ipcMain.handle('ping', () => 'pong')
    win.loadFile('src/html/index.html')

    // 打开窗口的检查
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    // 不针对 mac 平台做特别的处理
    // app.on('activate', () => {
    //     if (BrowserWindow.getAllWindows().length === 0) { 
    //         createWindow() 
    //     }
    // })
})

app.on('window-all-closed', () => {
    // 不针对 mac 平台做特别的处理
    // 关闭窗口就退出程序
    //if (process.platform !== 'darwin') app.quit()
    
    app.quit()
})