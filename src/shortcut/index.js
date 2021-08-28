const {globalShortcut, clipboard, ipcMain} = require('electron')
const path = require('path')
const {exec, spawn} = require('child_process');

global.flask_hwnd = undefined;

export function registerShortcut(win) {
    const configPath = `${path.join(process.cwd(), 'extraFiles', 'setting.yaml')}`
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

            if (global.flaskHWND === undefined) {
                let params = []
                params.push('-c')
                params.push(configPath)
                params.push('flask')
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
    globalShortcut.register('F6', () => {
        win.webContents.send('arrange-inventory')

        ipcMain.once('arrange-inventory', (event, args) => {
            let params = []
            params.push('-c')
            params.push(configPath)
            params.push('arrange-inventory')
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
            if (global.clickLeftButtonHWND === undefined) {
                let params = ['click-left-button']
                global.clickLeftButtonHWND = spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)

            } else {
                global.clickLeftButtonHWND.kill()
                delete global.clickLeftButtonHWND

            }
        })
    })
    globalShortcut.register('F8', () => {
        win.webContents.send('item-rolling')

        ipcMain.once('item-rolling', (event, args) => {

            if (global.itemRollingHWND === undefined) {
                let params = []
                params.push('-c')
                params.push(configPath)
                params.push('item-rolling')
                args.keywords.split(',').forEach(item => {
                    params.push('-k')
                    params.push(item)
                })
                params.push('-m')
                params.push(args.method)
                params.push('-w')
                params.push(args.width)
                params.push('-h')
                params.push(args.height)
                params.push('-o')
                params.push(args.orb)
                global.itemRollingHWND = spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)
                global.itemRollingHWND.on('exit', () => {
                    delete global.itemRollingHWND
                })
            } else {
                global.itemRollingHWND.kill()

                delete global.itemRollingHWND

            }

        })
    })
    globalShortcut.register('F9', () => {
        win.webContents.send('headhunter')

        ipcMain.once('headhunter', (event, args) => {

            if (global.headhunterHWND === undefined) {
                let params = []
                params.push('-c')
                params.push(configPath)
                params.push('headhunter')
                params.push('-w')
                params.push(args.width)
                params.push('-h')
                params.push(args.height)
                console.log(params)
                global.headhunterHWND = spawn(`${path.join(process.cwd(), 'extraFiles', 'robot.exe')}`, params)
                global.headhunterHWND.stderr.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

            } else {
                global.headhunterHWND.kill()
                delete global.headhunterHWND

            }

        })
    })

}

