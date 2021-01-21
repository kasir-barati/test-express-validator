const config = {
  verificationCodeLen: 6,
  phoneValidationCountry: 'ir',
  appPort: process.env.APP_PORT,
  appHost: process.env.APP_HOST,
  accessTokenHeaderKey: 'authorization',
  refreshTokenKey: 'refreshToken',
  accessTokenAlgorithm: process.env.ACCESS_TOKEN_ALGORITHM,
  accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
  refreshTokenAlgorithm:
    process.env.REFRESH_TOKEN_ALGORITHM,
  refreshTokenSecretKey:
    process.env.REFRESH_TOKEN_SECRET_KEY,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn:
    process.env.REFRESH_TOKEN_EXPIRES_IN,
};

module.exports = config;

if (
  !(
    config.appHost &&
    config.appPort &&
    config.verificationCodeLen &&
    config.phoneValidationCountry &&
    config.accessTokenHeaderKey &&
    config.accessTokenSecretKey &&
    config.accessTokenAlgorithm &&
    config.accessTokenExpiresIn &&
    config.refreshTokenExpiresIn &&
    config.refreshTokenAlgorithm &&
    config.refreshTokenSecretKey
  )
) {
  console.log('FATAL. ENV', config);
  throw new Error('ENV failed');
}
