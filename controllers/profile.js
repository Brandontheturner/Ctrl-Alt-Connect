// Load Input Validation
const validateProfileInput = require('../validation/profile')
const validateExperienceInput = require('../validation/experience')
const validateEducationInput = require('../validation/education')
// Load Profile / User Models
const Profile = require('../models/Profile')
const User = require('../models/User')

exports.test = (req, res) => res.json({ msg: 'Profile test route working' })

exports.get = (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar']) // populate user data when fetching profile
    .then(profile => {
      if (!profile) {
        errors.profile = 'There is no profile associated with this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
}

exports.getAll = (req, res) => {
  const errors = {}
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.profile = 'There are currently no profiles'
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err =>
      res.status(404).json({ profile: 'There are currently no profiles' })
    )
}

exports.getByHandle = (req, res) => {
  const errors = {}
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar']) // populate user data when fetching profile
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'This user does not have a profile'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
}

exports.getById = (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.params.userId })
    .populate('user', ['name', 'avatar']) // populate user data when fetching profile
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'This user does not have a profile'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err =>
      res.status(404).json({ profile: 'That is not a valid user id' })
    )
}

exports.createOrUpdate = (req, res) => {
  // Validate request input
  const { errors, isValid } = validateProfileInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Extract data from request
  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.status) profileFields.status = req.body.status
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername

  // Split Skills CSV into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',')
  }

  // Social Object
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile))
    } else {
      // Create, so check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists'
          res.status(400).json(errors)
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile))
      })
    }
  })
}

exports.addExperience = (req, res) => {
  // Validate request input
  const { errors, isValid } = validateExperienceInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExperience = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      description: req.body.description,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current
    }

    // Add new experience to profile's experience array
    profile.experience.unshift(newExperience)
    profile.save().then(profile => res.json(profile))
  })
}

exports.addEducation = (req, res) => {
  // Validate request input
  const { errors, isValid } = validateEducationInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEducation = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      description: req.body.description,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current
    }

    // Add new experience to profile's experience array
    profile.education.unshift(newEducation)
    profile.save().then(profile => res.json(profile))
  })
}

exports.deleteExperience = (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Remove specified experience item from array
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.expId)
      if (removeIndex > -1) {
        profile.experience.splice(removeIndex, 1)
        profile.save().then(profile => res.json(profile))
      } else {
        errors.experience = 'Invalid experience id'
        res.status(404).json(errors)
      }
    })
    .catch(err => res.status(404).json(err))
}

exports.deleteEducation = (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Remove specified education item from array
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.eduId)
      console.log(removeIndex)
      if (removeIndex > -1) {
        profile.education.splice(removeIndex, 1)
        profile.save().then(profile => res.json(profile))
      } else {
        errors.education = 'Invalid education id'
        res.status(404).json(errors)
      }
    })
    .catch(err => res.status(404).json(err))
}

exports.deleteProfileAndUser = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    )
  })
}
