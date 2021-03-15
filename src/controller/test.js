// @ts-check

/**@type {import('express').RequestHandler} */
function isUrl(req, res, next) {
  res.json({
    success: true,
    data: req.body,
    error: null,
  });
}

/**@type {import('express').RequestHandler} */
function numberMinMaxValidator(req, res, next) {
  res.json({
    success: true,
    data: req.body,
    error: null,
  });
}

module.exports = {
  isUrl,
  numberMinMaxValidator,
};
