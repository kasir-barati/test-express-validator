/**
 *
 * @param {import("express").RequestHandler} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = (error, req, res, next) => {
  switch (error.status) {
    case 422:
      res.status(500).json({
        data: null,
        error: error.parent.array(),
      });
      break;
    case 500:
      next();
      break;
  }
};
