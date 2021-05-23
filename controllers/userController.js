const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');

const registerUser = (req, res) => {
  const { errors, validation } = validateRegisterInput(req.body);

  if (!validation) return res.status(400).json(errors);

  User.findOne({ userId: req.body.userId }).then((userInfo) => {
    if (userInfo) {
      return res.status(400).json({ email: 'userId already exists' });
    } else {
      const newUser = new User({
        userId: req.body.userId,
        email: req.body.email,
        password: req.body.password,
      });
      newUser
        .save()
        .then((success) => {
          console.log(newUser);
          return res.status(201).json(success);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

const loginUser = (req, res) => {
  const { errors, validation } = validateLoginInput(req.body);

  if (!validation) return res.status(400).json(errors);

  const userId = req.body.userId;
  const password = req.body.password;

  User.findOne({ userId: userId }).then((userInfo) => {
    if (!userInfo) {
      return res.status(404).json({ response: 'userId not found' });
    }
    if (password === userInfo.password) {
      const payload = {
        userId: userInfo.userId,
        email: userInfo.email,
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 600 }, //10 min
        (err, token) => {
          //   if (err) return res.status(500);
          res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: 'Password incorrect' });
    }
  });
};

module.exports = { registerUser, loginUser };
