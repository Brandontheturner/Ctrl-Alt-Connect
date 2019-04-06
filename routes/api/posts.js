const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Input Validation
const valiidatePostInput = require('../../validation/post')
// Load Post / Profile Model
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

/***********************************
 *  @route  -->  GET api/posts/test
 *  @desc   -->  Tests posts route
 *  @access -->  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Posts test route working' }))

/***********************************
 *  @route  -->  POST api/posts
 *  @desc   -->  Create a post
 *  @access -->  Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = valiidatePostInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    })

    newPost.save().then(post => res.json(post))
  }
)

/***********************************
 *  @route  -->  GET api/posts
 *  @desc   -->  Get all posts
 *  @access -->  Public
 */
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostsfount: 'There are currently no posts' })
    )
})

/***********************************
 *  @route  -->  GET api/posts/:id
 *  @desc   -->  Get post by id
 *  @access -->  Public
 */
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that id' })
    )
})

/*************************************
 *  @route  -->  DELETE api/posts/:id
 *  @desc   -->  Delete post by id
 *  @access -->  Private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => [
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Ensure user is owner of post
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ authorization: 'User is not the owner of this post' })
          }

          post.remove().then(() => res.json({ success: true }))
        })
        .catch(err =>
          res.status(404).json({ nopostfound: 'No post found with that id' })
        )
    })
  ]
)

module.exports = router
