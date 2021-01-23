const { validationResult } = require('express-validator');

const ResponseError = require('../util/response-error');

class UnProcessableEntity extends ResponseError {
  constructor(validationsErrors) {
    super(
      'E_VALIDATION',
      422,
      false,
      validationsErrors,
      false,
    );
  }
}

/**@type {import("express").RequestHandler} */
module.exports = (req, res, next) => {
  let validationsErrors = validationResult(req);
  validationsErrors.isEmpty()
    ? next()
    : next(new UnProcessableEntity(validationsErrors));
};
