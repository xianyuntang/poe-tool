const {globalShortcut, clipboard, ipcMain} = require('electron')
const path = require('path')
const {exec, spawn} = require('child_process');

global.flask_hwnd = undefined;

export function registerShortcut(win) {
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
            console.log(global.flaskHWND)
            if (global.flaskHWND === undefined) {
                let params = ['flask']
                for (let i = 0; i < args.checkedKeys.length; i++) {
                    if (args.checkedKeys[i].checked) {
                        params.push('-k')
                        params.push(args.checkedKeys[i].name)
                        params.push('-i')
                        params.push(args.checkedKeys[i].interval)
                    }
                }
                global.flaskHWND = spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)


            } else {

                global.flaskHWND.kill()
                delete global.flaskHWND

            }


        })
    })
    globalShortcut.register('F4', () => {
        win.webContents.send('click-middle-button')

        ipcMain.once('click-middle-button', (event, args) => {
            if (global.ClickMiddleButtonHWND === undefined) {
                let params = ['click-middle-button']
                params.push('-i')
                params.push(args.interval)
                global.ClickMiddleButtonHWND = spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)

            } else {
                global.ClickMiddleButtonHWND.kill()
                delete global.ClickMiddleButtonHWND

            }
        })
    })
    globalShortcut.register('F6', () => {
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
    globalShortcut.register('Shift+F7', () => {
        win.webContents.send('click-left-button')

        ipcMain.once('click-left-button', () => {
            if (global.ClickLeftButtonHWND === undefined) {
                let params = ['click-left-button']
                global.ClickLeftButtonHWND = spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)

            } else {
                global.ClickLeftButtonHWND.kill()
                delete global.ClickLeftButtonHWND

            }
        })
    })
}

