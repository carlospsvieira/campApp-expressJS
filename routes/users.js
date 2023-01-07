const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

const failure = { failureFlash: true, failureRedirect: '/login' }
router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', failure), users.login)

router.get('/logout', users.logout)

module.exports = router;