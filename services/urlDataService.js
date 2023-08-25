const res = require("express/lib/response")
const { info, error } = require('console')
const { logError, logInfo } = require("./logger")

const getDataFromDB = async (hash, db) => {
  try {
    const data = await db.any('select original_url from url_details where hash = $1 limit 1', hash)
    return data.length > 0 ? data[0].original_url : null
  } catch (error) {
    throw error
  }
}

const updateClickData = async (hash, db) => {
  db.tx(t => {
    const updateQuery = t.none('update url_details set click_count = COALESCE(click_count, 0) + 1, last_clicked_date = now() where hash = $1', [hash])
    return t.batch([updateQuery])
  })
    .then(data => {
      logInfo(`click updated for hash ${hash}`)
    })
    .catch(data => {
      logError(`click updated failed for hash ${hash}`)
      throw data
    })
  
}

module.exports = { getDataFromDB, updateClickData }