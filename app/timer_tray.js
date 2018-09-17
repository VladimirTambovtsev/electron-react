const electron = require('electron');
const { app, Tray, Menu } = electron;

class TimerTray extends Tray {
	constructor(iconPath, mainWindow) {
		super(iconPath)

		this.mainWindow = mainWindow

		this.setToolTip('Timer App')
		this.on('click', this.onClick)
		this.on('right-click', this.onRightClick.bind(this))
	}

	onClick(e, bounds) {
		// set window position
		const { x, y } = bounds
		const { height, width } = this.mainWindow.getBounds()

		if (this.mainWindow.isVisible()) {
			this.mainWindow.hide()
		} else {
			const yPosition = process.platform === 'darwin' ? y + 25 : y - height
			this.mainWindow.setBounds({
				x: x - width / 2 + 30, 
				y: yPosition,
				height, 
				width 
			})
			this.mainWindow.show()
		}
	}

	onRightClick() {
		const menuConfig = Menu.buildFromTemplate([
			{
				label: 'Quit',
				accelerator: process.platform === 'win32' ? 'Ctrl+Q' : 'Command+Q',
				click: () => app.quit()
			}
		])
		this.popUpContextMenu(menuConfig)
	}
}


module.exports = TimerTray