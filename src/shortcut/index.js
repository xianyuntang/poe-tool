import setting from "/src/setting"
import {keyTap} from "robotjs";

const {globalShortcut, clipboard, ipcMain} = require('electron')
const path = require('path')
const {exec, spawn} = require('child_process');


const robot = require('robotjs')
robot.setMouseDelay(1)
robot.setKeyboardDelay(1)

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
            if (global.flaskHWNDs === undefined) {
                global.flaskHWNDs = []
                console.log(args)
                args.checkedKeys.forEach(item => {
                    let hwnd = setInterval(() => {
                        if (item.checked) {
                            robot.keyTap(item.name)
                            console.log(item)
                        }
                    }, item.interval * 1000)
                    global.flaskHWNDs.push(hwnd)
                })

            } else {
                global.flaskHWNDs.forEach(item => {
                    clearInterval(item)
                })
                global.flaskHWNDs = undefined

            }


        })
    })
    globalShortcut.register('F6', () => {
        win.webContents.send('arrange-inventory')

        ipcMain.once('arrange-inventory', (event, args) => {

            const wRatio = 2560 / args.width
            const hRatio = 1440 / args.height
            for (let i = 0; i < args.checkList.length; i++) {

                let point = JSON.parse(args.checkList[i])
                let xIndex = point[0] - 1
                let yIndex = point[1] - 1
                let xPos = (1730 + xIndex * 70) / wRatio
                let yPos = (815 + yIndex * 70) / hRatio
                robot.moveMouse(xPos, yPos)
                robot.keyToggle('control', 'down')
                robot.mouseClick('left')
                robot.keyToggle('control', 'up')
            }
        })
    })
    globalShortcut.register('Shift+F7', () => {
        win.webContents.send('click-left-button')

        ipcMain.once('click-left-button', () => {
            if (global.clickLeftButtonHWND === undefined) {
                global.clickLeftButtonHWND = setInterval(() => {
                    robot.mouseClick('left')
                }, 10)

            } else {
                clearInterval(global.clickLeftButtonHWND)
                global.clickLeftButtonHWND = undefined

            }
        })
    })
    globalShortcut.register('F8', () => {
        win.webContents.send('item-rolling')

        ipcMain.once('item-rolling', (event, args) => {
            if (global.itemRollingHWND === undefined) {
                global.itemRollingHWND = setInterval(() => {
                    const keywords = args.keywords.split(',')
                    const targetItem = setting.location.currency['目標']
                    const wRatio = 2560 / args.width
                    const hRatio = 1440 / args.height
                    robot.moveMouse(targetItem.x / wRatio, targetItem.y / hRatio)
                    robot.keyTap('c', 'control')
                    const itemDescription = clipboard.readText()
                    if (args.method === 'or') {
                        for (let i = 0; i < keywords.length; i++) {
                            if (itemDescription.includes(keywords[i])) {
                                clearInterval(global.itemRollingHWND)
                                global.itemRollingHWND = undefined
                                return
                            }
                        }
                    } else if (args.method === 'and') {

                        let ok = true
                        for (let i = 0; i < keywords.length; i++) {
                            if (!itemDescription.includes(keywords[i])) {
                                ok = false
                            }
                        }
                        if (ok) {
                            clearInterval(global.itemRollingHWND)
                            global.itemRollingHWND = undefined
                            return
                        }
                    }
                    let orbPoint = setting.location.currency['改造石']
                    if (args.orb === 'alt') {
                        orbPoint = setting.location.currency['改造石']
                    } else if (args.orb === 'chaos') {
                        orbPoint = setting.location.currency['混沌石']

                    } else {
                        clearInterval(global.itemRollingHWND)
                        global.itemRollingHWND = undefined
                        return
                    }

                    robot.moveMouse(orbPoint.x / wRatio, orbPoint.y / hRatio)
                    robot.mouseClick('right')
                    robot.moveMouse(targetItem.x / wRatio, targetItem.y / hRatio)
                    robot.mouseClick('left')


                }, 100)


            } else {
                clearInterval(global.itemRollingHWND)
                global.itemRollingHWND = undefined
                robot.keyToggle('control', 'up')

            }

        })
    })
    globalShortcut.register('F9', () => {
        win.webContents.send('headhunter')

        ipcMain.once('headhunter', (event, args) => {

            if (global.headhunterHWND === undefined) {
                global.headhunterHWND = setInterval(() => {
                    const wRatio = 2560 / args.width
                    const hRatio = 1440 / args.height

                    const targetItem = setting.location.currency['目標']
                    let orbPoint = setting.location.currency['機會石']
                    robot.moveMouse(orbPoint.x / wRatio, orbPoint.y / hRatio)
                    robot.mouseClick('right')
                    robot.moveMouse(targetItem.x / wRatio, targetItem.y / hRatio)
                    robot.mouseClick('left')

                    orbPoint = setting.location.currency['重鑄石']
                    robot.moveMouse(orbPoint.x / wRatio, orbPoint.y / hRatio)
                    robot.mouseClick('right')
                    robot.moveMouse(targetItem.x / wRatio, targetItem.y / hRatio)
                    robot.mouseClick('left')

                }, 100)


            } else {
                clearInterval(global.headhunterHWND)
                delete global.headhunterHWND

            }

        })
    })

}

