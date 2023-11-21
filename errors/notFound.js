const CustomAPIERROR = require("./customAPI");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends CustomAPIERROR {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
