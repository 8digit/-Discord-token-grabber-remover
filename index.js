const Glob = require("glob")
const fs = require("fs")
const Gradient = require("gradient-string")
const local = process.env.LOCALAPPDATA
const installedDiscord = []
const toCheck = []

var content = fs.readdirSync(local)
content.forEach(dirContent => {
    if (dirContent.includes("cord")) installedDiscord.push(`${local}\\${dirContent}`)
})

installedDiscord.forEach(r => {
    Glob.sync(`${r}/app-*/modules/discord_desktop_core-*/discord_desktop_core/index.js`).map(f => toCheck.push(f))
})

toCheck.forEach(r => {
    var fileContent = fs.readFileSync(r, 'utf-8')
    if (fileContent.includes("session")) {
        console.log(Gradient.instagram(`Token Grab Bulundu \n${r.split("/")[5]}\nGrabber'i kaldırıyorum...`))
        fs.writeFileSync(r, "module.exports = require('./core.asar')")
        fs.readFile(r, 'utf-8', (err, data) => {
            if (data.toString() == "module.exports = require('./core.asar')") console.log(Gradient.retro(`Grabber Başarıyla Kaldırıldı \n${r.split("/")[5]}\nŞifreni Değişmeyi Unutma`))
            else console.log(Gradient.fruit(`Grabberi kaldıramıyorum yeniden yükle ${r.split("/")[5]}`))
        })
    } else console.log(Gradient.instagram(`${r.split("/")[5]} Güvenli`))
})
