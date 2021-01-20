const { validationResult } = require("express-validator");

const BaseError = require("../util/base-error");

class UnProcessableEntity extends BaseError {
  constructor(validationsErrors) {
    super("E_VALIDATION", 422, false, validationsErrors, false);
  }
}

/**@type {import("express").RequestHandler} */
module.exports = (req, res, next) => {
  let validationsErrors = validationResult(req);

  validationsErrors.isEmpty()
    ? next()
    : next(new UnProcessableEntity(validationsErrors));
};
