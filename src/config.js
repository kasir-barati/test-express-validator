const config = {
  verificationCodeLen: 6,
  phoneValidationCountry: "ir",
  appPort: process.env.APP_PORT,
  appHost: process.env.APP_HOST,
  jwtHeaderKey: "authorization",
  jwtBodyKey: "accessToken",
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtAlgorithm: process.env.JWT_ALGORITHM,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

module.exports = config;

if (
  !(
    config.appHost &&
    config.appPort &&
    config.verificationCodeLen &&
    config.phoneValidationCountry &&
    config.jwtHeaderKey &&
    config.jwtBodyKey &&
    config.jwtSecretKey &&
    config.jwtAlgorithm &&
    config.accessTokenExpiresIn &&
    config.refreshTokenExpiresIn
  )
) {
  console.log("FATAL. ENV", this);
  throw new Error("ENV failed");
}
