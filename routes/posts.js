const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const upload = require("../middleware/multer");

router.get('/', ensureAuth, postsController.getProfile)

router.post('/createPost',upload.single("file"), postsController.createPost)

// router.put('/markComplete', postsController.markComplete)

// router.put('/markIncomplete', postsController.markIncomplete)

router.delete('/:id', postsController.deletePost)

module.exports = router