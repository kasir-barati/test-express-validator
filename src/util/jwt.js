const jsonwebtoken = require("jsonwebtoken");

const {
  jwtSecretKey: JWT_SECRET_KEY,
  jwtAlgorithms: JWT_ALGORITHM,
  accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
} = require("../config");

/**
 *
 * @param {String} token
 * @param {'accessToken'|'refreshToken'} tokenType
 */
module.exports.verifyToken = (token, tokenType) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(
      token,
      JWT_SECRET_KEY,
      {
        algorithms: JWT_ALGORITHM,
      },
      (error, decoded) => {
        error ? reject(error) ? resolve(decoded?.userId ?? null)
      }
    );
  })
};

/**
 *
 * @param {String} userId
 * @param {'accessToken'|'refreshToken'} tokenType
 */
module.exports.signToken = (userId, tokenType) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      userId,
      JWT_SECRET_KEY,
      {

        algorithm: JWT_ALGORITHM,
        expiresIn:
          tokenType === "accessToken"
            ? ACCESS_TOKEN_EXPIRES_IN
            : REFRESH_TOKEN_EXPIRES_IN,
      },
      (error, encoded) => {
        error ? reject(error) : resolve(encoded);
      }
    );
  });
};
