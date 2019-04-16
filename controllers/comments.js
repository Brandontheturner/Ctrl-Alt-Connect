// Load Input Validation
const validateCommentInput = require('../validation/comment')
// Load Comment / Profile Model
const Post = require('../models/Post')
const Profile = require('../models/Profile')

exports.test = (req, res) =>
  res.json({ msg: 'Comments route/controller working' })

exports.getAll = (req, res) => {
  Post.findById(req.params.postId)
    .then(post => res.json(post.comments))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that id' })
    )
}

exports.add = (req, res) => {
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

exports.edit = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body)

  Post.findById(req.body.postId).then(post => {
    if (!post) {
      errors.post = 'Post not found'
      return res.status(404).json(errors)
    }
    if (!isValid) {
      return res.status(400).json(errors)
    }

    let index = post.comments.findIndex(
      comment => comment._id.toString() === req.body.commentId
    )

    post.comments[index].text = req.body.text

    post
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err))
  })
}

exports.delete = (req, res) => {
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

exports.like = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.postId)
      .then(post => {
        // Find the comment
        let comment = post.comments.find(comment => {
          return comment._id.toString() === req.params.commentId
        })
        // Ensure user has not already liked this comment
        if (
          comment.likes.filter(item => item.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: 'User has already liked this comment' })
        }

        comment.likes.unshift({ user: req.user.id })
        post.save().then(post => res.json(post))
      })
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that id' })
      )
  })
}

exports.unlike = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.postId)
      .then(post => {
        // Find the comment
        let comment = post.comments.find(comment => {
          return comment._id.toString() === req.params.commentId
        })
        // Ensure user has liked this comment
        if (
          comment.likes.filter(item => item.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: 'User has not yet liked this comment' })
        }

        const removeIndex = comment.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id)
        comment.likes.splice(removeIndex, 1)
        post.save().then(post => res.json(post))
      })
      .catch(err =>
        res
          .status(404)
          .json({ nocommentfound: 'No comment found with that id' })
      )
  })
}
