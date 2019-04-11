const express = require('express')
const router = express.Router()
const passport = require('passport')

const users = require('../../controllers/users')

/***********************************
 *  @route  -->  GET api/users/test
 *  @desc   -->  Tests users route
 *  @access -->  Public
 */
router.get('/test', users.test)

/***************************************
 *  @route  -->  POST api/users/register
 *  @desc   -->  Register a user
 *  @access -->  Public
 */
router.post('/register', users.register)

/***********************************************
 *  @route  -->  GET api/users/login
 *  @desc   -->  Login User / Return JWT Token
 *  @access -->  Public
 */
router.post('/login', users.login)

/**************************************
 *  @route  -->  GET api/users/current
 *  @desc   -->  Return current user
 *  @access -->  Private
 */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  users.getCurrent
)

module.exports = router
