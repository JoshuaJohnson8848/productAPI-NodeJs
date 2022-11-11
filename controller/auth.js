const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const existingEmail = await User.find({ email: email });
    if (existingEmail) {
      const error = new Error('Email Already Exist , Try A Different Email');
      error.status = 422;
      throw error;
    }
    const hashPass = await bcrypt.hash(password, 12);
    if (!hashPass) {
      const error = new Error('Password Creation Failed');
      error.status = 422;
      throw error;
    }
    const user = new User({
      username: username,
      email: email,
      password: hashPass,
    });
    const createdUser = await user.save();
    res
      .status(201)
      .json({ message: 'User created Successfully', user: createdUser });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
