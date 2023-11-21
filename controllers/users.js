const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const User = require("../models/User");

// Get All Users
const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ total: user.length, user });
};

// Show User
const showUser = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

module.exports = { getAllUsers, showUser };
