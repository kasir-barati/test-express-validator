const { signToken } = require('../util/jwt');

/**@type {import("express").RequestHandler} */
module.exports.postLogin = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: '123456',
    error: null,
  });
};
/**@type {import("express").RequestHandler} */
module.exports.upsertUser = async (req, res, next) => {
  if (req.userId) return next();

  req.userId = 123345546;
  next();
};

/**@type {import("express").RequestHandler} */
module.exports.postGetToken = async (req, res, next) => {
  let accessToken = await signToken(
    req.userId,
    'accessToken',
  );
  let refreshToken = await signToken(
    req.userId,
    'refreshToken',
  );
  res.status(200).json({
    success: true,
    data: {
      accessToken,
      refreshToken,
    },
    error: null,
  });
};

/**@type {import("express").RequestHandler} */
module.exports.postVerify = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      verifyCode: '',
    },
    error: null,
  });
};
