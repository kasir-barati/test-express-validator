const jsonwebtoken = require('jsonwebtoken');

const BaseError = require('./base-error');

const {
  accessTokenSecretKey: ACCESS_TOKEN_SECRET_KEY,
  refreshTokenSecretKey: REFRESH_TOKEN_SECRET_KEY,
  accessTokenAlgorithm: ACCESS_TOKEN_ALGORITHM,
  refreshTokenAlgorithm: REFRESH_TOKEN_ALGORITHM,
  accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
} = require('../config');

class UnAuthenticated extends BaseError {
  /**@param {Error} error */
  constructor(error) {
    super('E_UNAUTHENTICATED', 401, false, error, false);
  }
}

/**
 *
 * @param {String} token
 * @param {'accessToken'|'refreshToken'} tokenType
 */
module.exports.verifyToken = (token, tokenType) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(
      token,
      tokenType === 'accessToken'
        ? ACCESS_TOKEN_SECRET_KEY
        : REFRESH_TOKEN_SECRET_KEY,
      {
        // algorithms:
        //   tokenType === 'accessToken'
        //     ? ACCESS_TOKEN_ALGORITHM
        //     : REFRESH_TOKEN_ALGORITHM,
      },
      (error, decoded) => {
        error
          ? reject(new UnAuthenticated(error))
          : resolve(decoded?.userId);
      },
    );
  });
};

/**
 *
 * @param {String} userId
 * @param {'accessToken'|'refreshToken'} tokenType
 */
module.exports.signToken = (userId, tokenType) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      { userId },
      tokenType === 'accessToken'
        ? ACCESS_TOKEN_SECRET_KEY
        : REFRESH_TOKEN_SECRET_KEY,
      {
        // algorithm:
        //   tokenType === 'accessToken'
        //     ? ACCESS_TOKEN_ALGORITHM
        //     : REFRESH_TOKEN_ALGORITHM,
        expiresIn:
          tokenType === 'accessToken'
            ? Number(ACCESS_TOKEN_EXPIRES_IN)
            : Number(REFRESH_TOKEN_EXPIRES_IN),
      },
      (error, encoded) => {
        console.error(error);
        error ? reject(error) : resolve(encoded);
      },
    );
  });
};
