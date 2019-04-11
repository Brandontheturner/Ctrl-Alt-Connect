const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Input Validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')
// Load Profile / User Models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

const profile = require('../../controllers/profile')

/*************************************
 *  @route  -->  GET api/profile/test
 *  @desc   -->  Tests profile route
 *  @access -->  Public
 */
router.get('/test', profile.test)

/******************************************
 *  @route  -->  GET api/profile
 *  @desc   -->  Get current users profile
 *  @access -->  Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), profile.get)

/*************************************
 *  @route  -->  GET api/profile/all
 *  @desc   -->  Get all profiles
 *  @access -->  Public
 */
router.get('/all', profile.getAll)

/***********************************************
 *  @route  -->  GET api/profile/handle/:handle
 *  @desc   -->  Get a profile by handle
 *  @access -->  Public
 */
router.get('/:handle', profile.getByHandle)

/***********************************************
 *  @route  -->  GET api/profile/uder/:userId
 *  @desc   -->  Get a profile by userId
 *  @access -->  Public
 */
router.get('/user/:userId', profile.getById)

/*********************************************
 *  @route  -->  POST api/profile
 *  @desc   -->  Create / Update user profile
 *  @access -->  Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  profile.createOrUpdate
)

/*********************************************
 *  @route  -->  POST api/profile/experience
 *  @desc   -->  Add experience to profile
 *  @access -->  Private
 */
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  profile.addExperience
)

/*********************************************
 *  @route  -->  POST api/profile/education
 *  @desc   -->  Add education to profile
 *  @access -->  Private
 */
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  profile.addEducation
)

/*****************************************************
 *  @route  -->  DELETE api/profile/experience/:expId
 *  @desc   -->  Delete experience item from profile
 *  @access -->  Private
 */
router.delete(
  '/experience/:expId',
  passport.authenticate('jwt', { session: false }),
  profile.deleteExperience
)

/*****************************************************
 *  @route  -->  DELETE api/profile/education/:eduId
 *  @desc   -->  Delete education item from profile
 *  @access -->  Private
 */
router.delete(
  '/education/:eduId',
  passport.authenticate('jwt', { session: false }),
  profile.deleteEducation
)

/*****************************************
 *  @route  -->  DELETE api/profile
 *  @desc   -->  Delete user and profile
 *  @access -->  Private
 */
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  profile.deleteProfileAndUser
)

module.exports = router
