const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const xhr = new XMLHttpRequest()

router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.post('/teacherSignup', authController.getTeacherSignup)
router.post('/teacherSignup', authController.postTeacherSignup)

module.exports = router
