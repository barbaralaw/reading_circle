const passport = require('passport')
const validator = require('validator')
const generateUniqueId = require('generate-unique-id')
const User = require('../models/User')

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/post')
    }
    res.render('login', {
      title: 'Login'
    })
  }

  // ***** How to switch to a username login? *****
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/post')
      })
    })(req, res, next)
  }

  exports.logout = (req, res) => {
    req.logout()
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }

  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/post')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }

  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    const teacher = new Teacher({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstNameTeacher,
      lastName: req.body.lastNameTeacher,
      teacherName: req.body.officialName,
      classroomId: generateUniqueId({ length: 10, excludeSymbols: ['L','l','I','O','0','1']}),
    })

    const user = new User({
      userName: req.body.userName,
      firstNameParent: req.body.firstNameParent,
      lastNameParent: req.body.lastNameParent,
      email: req.body.email,
      password: req.body.password,
      firstNameChild: req.body.firstNameChild,
      bookCount: 0,
      pagesCount: 0,
      wordCount: 0,
      imageCount: 0
    })

    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/post')
        })
      })
    })
  }
