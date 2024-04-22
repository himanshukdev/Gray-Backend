const Router = require('express').Router();
const passport = require('passport');
const { registerUser } = require('../controllers/auth.controller');

Router.post('/register', registerUser);

// User login
Router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful', user: req.user });
});

Router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    return res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = Router;
