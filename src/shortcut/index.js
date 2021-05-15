const {globalShortcut, clipboard, ipcMain} = require('electron')
const path = require('path')
const {exec, spawn} = require('child_process');

global.flask_hwnd = undefined;

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
            console.log(global.flask_hwnd)
            if (global.flask_hwnd === undefined) {
                global.flask_hwnd = {}
                let params = ['flask']
                for(let i = 0 ; i< args.checkedKeys.length;i++){
                    if (args.checkedKeys[i].checked) {
                        params.push('-k')
                        params.push(args.checkedKeys[i].name)
                        params.push('-i')
                        params.push(args.checkedKeys[i].interval)
                    }
                }
                global.flask_hwnd = spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)


            } else {

                global.flask_hwnd.kill()
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

