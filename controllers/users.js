const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
  res.render('users/register')
}

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash('success', `Welcome to CampApp, ${username} !`);
      res.redirect('/campgrounds')
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register')
  }
}

module.exports.renderLogin = (req, res) => {
  res.render('users/login')
}

module.exports.login = (req, res) => {
  const { username } = req.body
  req.flash('success', `Welcome back, ${username} !`);
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'See you next time!');
    res.redirect('/');
  });
}