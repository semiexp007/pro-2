const { db } = require('../services/db/connector')
const { getDataFromDB, updateClickData } = require('../services/urlDataService')
const { logInfo, logError } = require('../services/logger')

// map to "/"
const redirect = async (req, res) => {
    try {
        // UUID for the URL
        const uniqueId = req.query.u;

        // get original pointing URL
        originalUrl = await getDataFromDB(uniqueId, db)

        // If not found then go to not found page
        if(!originalUrl) {
            logError(`Redirection URL not found for hash ${uniqueId}`)
            res.redirect('/notfound');
        } else {
            // updated DB with click information
            updateResult = updateClickData(uniqueId, db)
            // redirect to original URL
            logInfo(`redirecting to ${originalUrl} for hash ${uniqueId}`)
            res.redirect(originalUrl)
        }

    } catch (error) {
        console.log(error)
        logError(error)
        res.redirect('/internalError')
    }
}

module.exports = { redirect }