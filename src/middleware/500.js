/**
 *
 * @param {import("express").RequestHandler} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = (error, req, res, next) => {
  res.status(500).json({
    data: null,
    error: "E_SERVER",
  });
};
