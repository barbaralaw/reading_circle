const express = require('express')
const router = express.Router()
const feedController = require('../controllers/feed') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const multer = require('multer')
const upload = multer({ dest: "public/uploads/" })
const { storage } = require("../middleware/multer");

router.get('/', ensureAuth,  feedController.getFeed)

module.exports = router