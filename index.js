const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const { logInfo } = require('./services/logger');
const { router } = require('./routes/route');


// Middleware: This example middleware just logs the incoming requests
app.use("/", router, (req, res, next) => {
    logInfo(`Request received: ${req.method} ${req.url}`)
    next() // Move to the next middleware or route handler
});

// Start the server
const PORT = process.env.SERVICE_PORT || 3000
app.listen(PORT, () => {
    logInfo(`Server is running on port ${PORT}`)
});
