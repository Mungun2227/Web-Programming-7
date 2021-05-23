const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.userId = !isEmpty(data.userId) ? data.userId : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.userId))
    errors.userId = 'UserId field is required';

  if (Validator.isEmpty(data.password))
    errors.password = 'Password field is required';
  return {
    errors,
    validation: isEmpty(errors),
  };
};
