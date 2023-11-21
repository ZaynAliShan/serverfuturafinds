const { StatusCodes } = require("http-status-codes");

const notFound = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Route doest not exist" });
};

module.exports = notFound;
