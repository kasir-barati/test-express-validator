const { signToken } = require('../util/jwt');
const {
  saveOtpCode,
  deleteOtpCode,
} = require('../util/otp');

/**@type {import("express").RequestHandler} */
module.exports.postLogin = (req, res, next) => {
  let otpCode = Math.ceil(Math.random() * 1_000_000);

  saveOtpCode(req.userId, String(otpCode));

  res.status(200).json({
    success: true,
    data: otpCode,
    error: null,
  });
};
/**@type {import("express").RequestHandler} */
module.exports.upsertUser = async (req, res, next) => {
  if (req.userId) return next();

  req.userId = Math.ceil(Math.random() * 1_000_000);
  next();
};

/**@type {import("express").RequestHandler} */
module.exports.getToken = async (req, res, next) => {
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
  const { verifyCode } = req.body;

  try {
    deleteOtpCode(req.userId, verifyCode);
    res.status(200).json({
      success: true,
      data: null,
      error: null,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      data: null,
      error: error.message,
    });
  }
};
