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
    subject: req.body.subject,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })

  newPost.save().then(post => res.json(post))
}

exports.edit = (req, res) => {
  const { errors, isValid } = valiidatePostInput(req.body)

  Post.findById(req.params.id).then(post => {
    if (!post) {
      errors.post = 'Post not found'
      return res.status(404).json(errors)
    }
    if (!isValid) {
      return res.status(400).json(errors)
    }

    post.text = req.body.text
    post.subject = req.body.subject
    post
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err))
  })
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

exports.unlike = (req, res) => {
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
