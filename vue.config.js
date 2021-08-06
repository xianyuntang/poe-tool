const path = require('path');

module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            builderOptions: {
                appId: "com.poe-tool.electron.node",
                asar: false,
                productName: "POE小工具",
                win: {
                    icon: path.resolve(__dirname, 'src/assets/icon.png'),
                    requestedExecutionLevel: "highestAvailable"
                },
                extraFiles:[
                    "extraFiles/robot.exe"
                ]

            }
        }
    }
}