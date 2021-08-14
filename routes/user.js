const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// when user enrolls into the application for the first time
router.post('/signup', userController.signup);
// when user logs in into the app
router.post('/login', userController.login);


module.exports = router;