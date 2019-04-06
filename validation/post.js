const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  let errors = {}

  // Ensure empty strings before Validator gets a hold of it
  data.text = !isEmpty(data.text) ? data.text : ''

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required'
  } else if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Text must be between 10 and 300 characters'
  }

  return { errors, isValid: isEmpty(errors) }
}
