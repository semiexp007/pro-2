const express = require('express')
const { redirect } = require('../Controllers/RedirectionController')
const { notFound, internalError } = require('../Controllers/ErrorController')
const router = express.Router()

router.get("/", redirect)

router.get("/notFound", notFound)

router.get("/internalError", internalError)

module.exports = { router }