const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Generate JWT Tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      userId: user.userId,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.userId,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Signup function
const registerUser = async ({ firstName, lastName, username, email, contact, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    username,
    email,
    contact, 
    password: hashedPassword,
    role,
  });

  await user.save();

  // Return the required fields for the frontend
  return {
    userId: user.userId?.toString(), // or user._id if you use _id
    role: user.role,
  };
  
};

// Signin function
const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const tokens = generateTokens(user);

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
