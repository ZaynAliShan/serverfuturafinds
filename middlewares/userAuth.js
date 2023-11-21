const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const userAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  // Checking token of user
  if (!token) {
    throw new UnauthenticatedError("Please show your token");
  }
  // Token Verification
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userID, userName, userRole } = payload;
    req.user = { userID, userName, userRole };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token is not valid" });
  }
};

const userRoleAuth = (req, res, next) => {
  if (req.user.userRole !== "admin") {
    throw new UnauthenticatedError("Only Admins can access this resource");
  }
  next();
};

module.exports = { userAuthMiddleware, userRoleAuth };
