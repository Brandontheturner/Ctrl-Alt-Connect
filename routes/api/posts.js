const express = require('express')
const router = express.Router()
const passport = require('passport')

const posts = require('../../controllers/posts')

/***********************************
 *  @route  -->  GET api/posts/test
 *  @desc   -->  Tests posts route
 *  @access -->  Public
 */
router.get('/test', posts.test)

/*******************************
 *  @route  -->  POST api/posts
 *  @desc   -->  Create a post
 *  @access -->  Private
 */
router.post('/', passport.authenticate('jwt', { session: false }), posts.create)

/*******************************
 *  @route  -->  POST api/posts
 *  @desc   -->  Edit a post
 *  @access -->  Private
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), posts.edit)

/***********************************
 *  @route  -->  GET api/posts
 *  @desc   -->  Get all posts
 *  @access -->  Public
 */
router.get('/', posts.getAll)

/***********************************
 *  @route  -->  GET api/posts/:id
 *  @desc   -->  Get post by id
 *  @access -->  Public
 */
router.get('/:id', posts.getById)

/*************************************
 *  @route  -->  DELETE api/posts/:id
 *  @desc   -->  Delete post by id
 *  @access -->  Private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  posts.delete
)

/****************************************
 *  @route  -->  POST api/posts/like/:id
 *  @desc   -->  Like a post
 *  @access -->  Private
 */
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  posts.like
)

/******************************************
 *  @route  -->  POST api/posts/unlike/:id
 *  @desc   -->  Remove a like
 *  @access -->  Private
 */
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  posts.unlike
)

module.exports = router
