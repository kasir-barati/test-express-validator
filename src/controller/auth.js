/**@type {import("express").RequestHandler} */
module.exports.postLogin = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
};

/**@type {import("express").RequestHandler} */
module.exports.postGetToken = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      accessToken: "",
      refreshToken: "",
    },
    error: null,
  });
};

/**@type {import("express").RequestHandler} */
module.exports.postVerify = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      verifyCode: "",
    },
    error: null,
  });
};
