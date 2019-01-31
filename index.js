const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow; //says here is the mainWindow it exists and allow us to use it outside of its normal scope which is in the app.on

// this is the syntax for waiting for the app to start up.
// app.on <- thing we are listening to
//('ready',) <- String name for event we are listening for
// ()=> {} function to run when the even occurs.
app.on('ready', () => {
  console.log('App is now ready to start receiving events.');

  mainWindow = new BrowserWindow({});
  //`file://` <-- specifies to use file protocol instead of http
  //${__dirname} <-- says look at current working directory
  // /index.html is the file we are trying to find in the working directory.
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event,  path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});

//electron cli
