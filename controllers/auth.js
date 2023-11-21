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

  //   Validation for email that already exists
  const isEmailExists = await User.findOne({ email });
  if (isEmailExists) {
    throw new BadRequestError("User with this email already exists");
  }

  //   Creating User
  const user = await User.create({ name, email, password, role: "user" });

  //   Creating Token & sending cookie
  const userToken = {
    userID: user._id,
    userName: user.name,
    userRole: user.role,
  };
  const token = user.createToken(userToken);
  user.sendCookies(res, token);
  res.status(StatusCodes.OK).json({ user });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // Checking is Email valid or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Please provide correct email");
  }

  // Checking is password valid or not
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError("Please provide correct password");
  }

  // Creating Token & sending cookie
  const userToken = {
    userID: user._id,
    userName: user.name,
    userRole: user.role,
  };
  const token = user.createToken(userToken);
  user.sendCookies(res, token);
  res.status(StatusCodes.OK).json({ user });
};

// Logout
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

module.exports = { register, login, logout };
