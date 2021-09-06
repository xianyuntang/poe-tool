const {ipcRenderer} = require('electron');
window.ipcRenderer = ipcRenderer

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('search-price', (event, params) => {
        let parts = []
        for (const [key, value] of Object.entries(params)) {
            parts.push(`${key}=${value}`)
        }
    })
})