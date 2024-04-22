/* eslint-disable no-console */
const User = require('../models/user.model');

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists', data: null, error: null });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully', data: null, error: null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error', data: null, error: null });
  }
};

module.exports = {
  registerUser,
};
