const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const posts = require('../../controllers/posts')

// Load Input Validation
const valiidatePostInput = require('../../validation/post')
const validateCommentInput = require('../../validation/comment')
// Load Post / Profile Model
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

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
  posts.removeLike
)

/***********************************************
 *  @route  -->  POST api/posts/comment/:postId
 *  @desc   -->  Add comment to post
 *  @access -->  Private
 */
router.post(
  '/comment/:postId',
  passport.authenticate('jwt', { session: false }),
  posts.comment
)

/************************************************************
 *  @route  -->  DELETE api/posts/comment/:postId/:commentId
 *  @desc   -->  Remove comment from post
 *  @access -->  Private
 */
router.delete(
  '/comment/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  posts.deleteComment
)

module.exports = router
