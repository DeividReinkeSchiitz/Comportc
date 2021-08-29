const { app, BrowserWindow, ipcMain } = require('electron')
const Serial = require('comportc').default
const path = require('path')

ipcMain.on("READED", (event, arg)=> {
  const baud = Number(arg?.baud);
  const port = Number(arg.serial?.slice(3,4));
  const isOpened = Serial.Open(port, baud);
  if(isOpened){
    const valueRead = Serial.Read();
    event.reply("READED", valueRead);
  }
})

ipcMain.on("CLOSE_PORT" , ()=>{
  Serial.Close();
})

ipcMain.on("PORT_AVAIABLE", (event, arg) => {
  let avaiablePorts = [];

  for (let index = 0; index <= 255; index++) {
    if(Serial.Open(index, 9600)){
      avaiablePorts.push('COM'+index);
    }
    Serial.Close();
  }

  event.reply("PORT_AVAIABLE", avaiablePorts);
})

ipcMain.on('SEND_TEXT', (event, arg) =>{
  const baud = Number(arg.baud);
  const port = Number(arg.serial?.slice(3,4));
  const text = arg.text;

  if(Serial.Open(port, baud)){
    Serial.Write(text);
    Serial.Close();
  };
})

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 700,
    icon: path.join('image','icon512.png'),
    webPreferences: {
      devTools: true,
      nodeIntegrationInWorker: true,
      nodeIntegration: true,
      contextIsolation: false
    },
    alwaysOnTop: true,
  })

  const fileName = `file://${path.join(__dirname, '../build/index.html')}`
  console.log(fileName);
  win.loadFile(fileName);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
