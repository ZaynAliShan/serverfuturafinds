const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const User = require("../models/User");

// Register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide name, email and password");
  }

  // Validation for email that already exists
  const isEmailExists = await User.findOne({ email });
  if (isEmailExists) {
    throw new BadRequestError("User with this email already exists");
  }

  // Creating User
  const user = await User.create({ name, email, password, role: "user" });

  // Creating Token & sending cookie
  const userToken = {
    userID: user._id,
    userName: user.name,
    userRole: user.role,
  };
  const token = user.createToken(userToken);

  res.cookie('token', token, {
    httpOnly: true, // The cookie cannot be accessed by client-side APIs, such as JavaScript.
    secure: true, // The cookie will only be sent over HTTPS.
    sameSite: 'None', // The cookie is sent to the server even in cross-site requests.
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // The cookie expires in 3 days.
  });
  

  res.status(StatusCodes.CREATED).json({ user });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // Checking if Email is valid or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Incorrect credentials");
  }

  // Checking if password is valid or not
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError("Incorrect credentials");
  }

  // Creating Token & sending cookie
  const userToken = {
    userID: user._id,
    userName: user.name,
    userRole: user.role,
  };
  const token = user.createToken(userToken);

  res.cookie('token', token, {
    httpOnly: true, // The cookie cannot be accessed by client-side APIs, such as JavaScript.
    secure: true, // The cookie will only be sent over HTTPS.
    sameSite: 'None', // The cookie is sent to the server even in cross-site requests.
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // The cookie expires in 3 days.
  });
  
  

  res.status(StatusCodes.OK).json({ user });
};

// Logout
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(Date.now()) // Expire immediately
  });  

  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

module.exports = { register, login, logout };
