const { otpCodesExpiresIn } = require('../config');

const otpCodes = {};

/**
 *
 * @param {String} userId
 * @param {String} otpCode
 */
module.exports.saveOtpCode = (userId, otpCode) => {
  let userOtpCode = {
    value: otpCode,
  };

  userOtpCode.timeoutId = setTimeout(() => {
    if (otpCodes[userId]) {
      clearTimeout(otpCodes[userId].timeoutId);
    }
    delete otpCodes[userId];
  }, otpCodesExpiresIn);

  otpCodes[userId] = userOtpCode;
};

/**
 *
 * @param {String} userId
 * @param {String} otpCode
 */
module.exports.deleteOtpCode = (userId, otpCode) => {
  if (!otpCodes[userId]) {
    throw new Error('E_NO_OTP_CODE');
  } else if (otpCodes[userId].value === otpCode) {
    clearTimeout(otpCodes[userId].timeoutId);
    delete otpCodes[userId];
  } else {
    throw new Error('E_WRONG_OTP_CODE');
  }
};
