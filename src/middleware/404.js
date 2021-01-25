/**
 *
 * @param {import("express").RequestHandler} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = (req, res, next) => {
  res.status(404).json({
    success: false,
    data: null,
    error: 'E_PAGE_NOT_FOUND',
  });
};
