const path = require('path')
const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron
const TimerTray = require('./app/timer_tray')

let mainWindow
let tray

app.on('ready', () => {
	app.dock.hide()
	mainWindow = new BrowserWindow({
 		height: 320,
 		width: 220,
 		frame: false,
 		resizable: false,
 		show: false,
 		webPreferences: { backgroundThrottling: false }
	})
	mainWindow.loadURL(`file://${__dirname}/src/index.html`)
	mainWindow.on('blur', () => {
		mainWindow.hide()
	})

	// make icon in the corner of system
	const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
	const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
	// set window position
	tray = new TimerTray(iconPath, mainWindow)
})

ipcMain.on('update-timer', (e, timeLeft) => {
	tray.setTitle(timeLeft)
})
