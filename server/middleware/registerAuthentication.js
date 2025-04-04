const ExpressValidator = require('express-validator').ExpressValidator;

const { body } = new ExpressValidator(
  {
    confirmPassword: (value, {req}) => {
      if (value !== req.body.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    },
    compareOldPasswords: (value, {req}) => {
      if (value === req.body.oldPassword) {
        throw new Error('New password cannot be the same as old password');
      }
      return true;
    },
  },
);


const checkUserName = () => {
  return body('userName').
  trim().
  isLength({min: 3}).
  withMessage('Username must be at least 3 characters long')
};

const checkEmail = () => {
  return body('email').
  trim().
  isEmail().
  withMessage('Please enter a valid email address')
};

const checkPassword = () => {
  return body('password').
  trim().
  isLength({min: 8}).
  withMessage('Password must be at least 8 characters long')
}

const checkGender = () => {
  return body('gender').
  trim().
  notEmpty().
  withMessage('Please select gender')
}

const checkEmailOrUserName = () => {
  return (req, res, next) => {
    if (req.body.email) {
      body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email address')(req, res, next);
    } else {
      body('userName')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')(req, res, next);
    }
  };
};


module.exports = {checkUserName, checkEmail, checkPassword, checkGender , checkEmailOrUserName};
