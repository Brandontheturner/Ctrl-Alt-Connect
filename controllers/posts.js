// Load Input Validation
const valiidatePostInput = require('../validation/post')
const validateCommentInput = require('../validation/comment')
// Load Post / Profile Model
const Post = require('../models/Post')
const Profile = require('../models/Profile')

exports.test = (req, res) => res.json({ msg: 'Posts route/controller working' })

exports.create = (req, res) => {
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

exports.getAll = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostsfount: 'There are currently no posts' })
    )
}

exports.getById = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that id' })
    )
}

exports.delete = (req, res) => {
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
}

exports.like = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Ensure user has not already liked this post
        if (
          post.likes.filter(item => item.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: 'User has already liked this post' })
        }

        post.likes.unshift({ user: req.user.id })
        post.save().then(post => res.json(post))
      })
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that id' })
      )
  })
}

exports.removeLike = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Ensure user has not already liked this post
        if (
          post.likes.filter(item => item.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: 'User has not yet liked this post' })
        }

        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        post.save().then(post => res.json(post))
      })
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that id' })
      )
  })
}

exports.comment = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Post.findById(req.params.postId)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      post.comments.unshift(newComment)
      post.save().then(post => res.json(post))
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that id' })
    )
}

exports.deleteComment = (req, res) => {
  Post.findById(req.params.postId)
    .then(post => {
      // Ensure comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.commentId
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ nocommentfound: 'No comment found with that id' })
      }

      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.commentId)
      post.comments.splice(removeIndex, 1)
      post.save().then(post => res.json(post))
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that id' })
    )
}
