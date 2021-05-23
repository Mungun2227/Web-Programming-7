const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');

router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;
