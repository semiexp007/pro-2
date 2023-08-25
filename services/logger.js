const moment = require('moment')

const logInfo = (log) => {
    console.info(`${moment().format('DD/MM/YYYY h:mm:ss')} [INFO] : ${log}`)
}
 
const logError = (log) => {
    console.error(`${moment().format('DD/MM/YYYY h:mm:ss')} [ERROR] : ${log}`)
 }

module.exports = { logInfo, logError }