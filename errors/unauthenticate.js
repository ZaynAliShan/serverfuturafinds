const CustomAPIERROR = require("./customAPI");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomAPIERROR {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
