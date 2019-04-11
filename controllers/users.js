const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

// Load Input Validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

// Load User model
const User = require('../models/User')

exports.test = (req, res) => res.json({ msg: 'Users test route working' })

exports.register = (req, res) => {
  // Validate request input
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      })

      // Password encryption
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
}

exports.login = (req, res) => {
  // Validate request input
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Find user by email on database
  const email = req.body.email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User email not found'
      return res.status(404).json(errors)
    }

    // Check password using bcrypt compare
    const password = req.body.password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Correct password, create jwt payload containing user data
        const payload = { id: user.id, name: user.name, avatar: user.avatar }
        // Generate jwt token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` })
          }
        )
      } else {
        errors.password = 'Invalid password'
        res.status(400).json(errors)
      }
    })
  })
}

exports.getCurrent = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
}
