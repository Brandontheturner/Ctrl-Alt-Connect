const express = require('express')
const router = express.Router()
const passport = require('passport')

const comments = require('../../controllers/comments')

/***********************************
 *  @route  -->  GET api/comments/test
 *  @desc   -->  Tests comments route
 *  @access -->  Public
 */
router.get('/test', comments.test)

/********************************************
 *  @route  -->  GET api/comments/:postId
 *  @desc   -->  Get all comments of a post
 *  @access -->  Public
 */
router.get('/:postId', comments.getAll)

/***********************************************
 *  @route  -->  POST api/comments/:postId
 *  @desc   -->  Add comment to post
 *  @access -->  Private
 */
router.post(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  comments.add
)

/*******************************
 *  @route  -->  POST api/posts
 *  @desc   -->  Edit a comment
 *  @access -->  Private
 */
router.put('/', passport.authenticate('jwt', { session: false }), comments.edit)

/************************************************************
 *  @route  -->  DELETE api/posts/comments/:postId/:commentId
 *  @desc   -->  Remove comment from post
 *  @access -->  Private
 */
router.delete(
  '/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  comments.delete
)

/****************************************
 *  @route  -->  POST api/comments/like/:id
 *  @desc   -->  Like a comment
 *  @access -->  Private
 */
router.post(
  '/like/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  comments.like
)

/****************************************
 *  @route  -->  POST api/comments/like/:id
 *  @desc   -->  Unlike a comment
 *  @access -->  Private
 */
router.post(
  '/unlike/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  comments.unlike
)

module.exports = router
