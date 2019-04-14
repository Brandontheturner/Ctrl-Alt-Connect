const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePasswordInput(data) {
  let errors = {}

  // Ensure empty strings before Validator gets a hold of it
  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : ''
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : ''
  data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : ''

  if (Validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = 'Old password field is required'
  }
  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = 'New password field is required'
  }
  if (Validator.isEmpty(data.newPassword2)) {
    errors.newPassword2 = 'Confirm password field is required'
  }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = 'Password must be between 6 and 30 characters'
  }
  if (!Validator.equals(data.newPassword, data.newPassword2)) {
    errors.newPassword2 = 'Passwords must match'
  }

  return { errors, isValid: isEmpty(errors) }
}
