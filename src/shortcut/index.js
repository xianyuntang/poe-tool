const {globalShortcut, clipboard, ipcMain} = require('electron')
const path = require('path')
const {exec, spawn} = require('child_process');

export function registerShortcut(win) {
    globalShortcut.register(`F1`, () => {

        win.loadURL('http://localhost:8080/')

    })
    globalShortcut.register('F2', () => {
        exec(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')} copy`, () => {
            const itemInfo = clipboard.readText()
            const itemInfoArray = itemInfo.split('\r\n')
            const params = {
                name: itemInfoArray[2],
                league: 'Warbands',
                status: '1',
            }
            win.webContents.send('search-price', params)
        })

    })
    globalShortcut.register('F3', () => {
        win.webContents.send('flask')
        ipcMain.once('flask', (event, args) => {
            let params = ['flask']
            args.checkedKeys.forEach(item => {
                params.push('-k')
                params.push(item)
            })
            if (global.flask_hwnd === undefined) {
                spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)
                global.flask_hwnd = setInterval(() =>
                        spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)
                    , args.interval * 1000)
            } else {
                clearInterval(global.flask_hwnd)
                delete global.flask_hwnd

            }


        })
    })
    globalShortcut.register('F5', () => {
        win.webContents.send('arrange-inventory')

        ipcMain.once('arrange-inventory', (event, args) => {
            let params = ['arrange-inventory']
            params.push('-w')
            params.push(args.width)
            params.push('-h')
            params.push(args.height)
            spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)


        })
    })
}

