const express = require('express')
const router = express.Router()
const aboutController = require('../controllers/about')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const xhr = new XMLHttpRequest()

router.get('/', aboutController.getAbout)

module.exports = router
