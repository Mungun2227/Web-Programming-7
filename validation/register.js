const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.userId = !isEmpty(data.userId) ? data.userId : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.userId))
    errors.userId = 'User Id field is required';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is not matching';
  }

  if (Validator.isEmpty(data.password))
    errors.password = 'Password field is required';

  if (Validator.isEmpty(data.password2))
    errors.password2 = 'Confirm password field is required';

  if (!Validator.isLength(data.password, { min: 8, max: 30 }))
    errors.password = 'Password must be at least 8 characters';

  if (!Validator.equals(data.password, data.password2))
    errors.password2 = 'Passwords should be match';

  return {
    errors,
    validation: isEmpty(errors),
  };
};
