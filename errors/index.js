const CustomAPIError = require("./customAPI");
const BadRequestError = require("./badRequest");
const NotFoundError = require("./notFound");
const UnauthenticatedError = require("./unauthenticate");

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
};
