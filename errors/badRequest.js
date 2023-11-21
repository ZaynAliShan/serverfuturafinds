const CustomAPIERROR = require("./customAPI");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomAPIERROR {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
