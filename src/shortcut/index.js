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

            if (global.flask_hwnd === undefined) {
                global.flask_hwnd = {}
                args.checkedKeys.forEach(key => {
                    if (key.checked) {
                        let params = ['flask']
                        params.push('-k')
                        params.push(key.name)
                        spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)
                        global.flask_hwnd[key.name] = setInterval(() =>
                                spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)
                            , key.interval * 1000)
                    }

                })


            } else {
                for(let key in global.flask_hwnd){
                    // eslint-disable-next-line no-prototype-builtins
                    if(global.flask_hwnd.hasOwnProperty(key)){
                        clearInterval(global.flask_hwnd[key])
                    }

                }

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

