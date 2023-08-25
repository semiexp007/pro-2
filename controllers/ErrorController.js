// map to "/notFound"
const notFound = async (req, res) => {
    res.status(404).sendFile(__dirname + '/pages/notfound.html')
}

// map to "/internalError"
const internalError = async (req, res) => {
    res.status(500).sendFile(__dirname + '/pages/internalError.html')
}

module.exports = { notFound, internalError }