const phone = require('phone');
const { check } = require('express-validator');

const { verifyToken } = require('../util/jwt');

const {
  refreshTokenKey: REFRESH_TOKEN_KEY,
  accessTokenHeaderKey: ACCESS_TOKEN_HEADER_KEY,
  verificationCodeLen: VERIFICATION_CODE_LEN,
  phoneValidationCountry: PHONE_VALIDATION_COUNTRY,
} = require('../config');

// const REGX_PERSIAN_NAME = /^[کگۀی،تثجحخدغيًٌٍَُپٰچژ‌ء-ةذ-عف-ٔ ]+$/;

function persianToEnglish(strnig) {
  return strnig.replace(/[۰-۹]/g, (digit) =>
    '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit),
  );
}

function arabicToEnglish(string) {
  return string.replace(/[٠-٩]/g, (digit) =>
    '٠١٢٣٤٥٦٧٨٩'.indexOf(digit),
  );
}

function customPhoneValidator(phoneNumber) {
  return phone(
    phoneNumber,
    PHONE_VALIDATION_COUNTRY,
    false,
  )[0];
}

function phoneNumberValidator() {
  return check('phoneNumber')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('E_EMPTY_PHONE')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('E_EMPTY_PHONE')
    .bail()

    .customSanitizer(persianToEnglish)
    .customSanitizer(arabicToEnglish)
    .custom(customPhoneValidator)
    .withMessage('E_FORMAT_PHONE')

    .custom((phoneNumber, { req }) => {
      req.body.phoneNumber = phoneNumber;
      return true;
    });
}

module.exports.phoneNumberValidator = {
  strict: phoneNumberValidator(),
  optional: phoneNumberValidator().optional(),
};
// module.exports.postGetToken = check('refreshToken')

function verifyCodeValidator() {
  return check('verifyCode')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('E_EMPTY_VERIFYCODE')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('E_EMPTY_VERIFYCODE')
    .bail()

    .customSanitizer(persianToEnglish)
    .customSanitizer(arabicToEnglish)
    .matches(/[0-9]/)
    .isLength({
      max: VERIFICATION_CODE_LEN,
      min: VERIFICATION_CODE_LEN,
    })
    .withMessage('E_FORMAT_VERIFYCODE')

    .custom((verifyCode, { req }) => {
      req.body.verifyCode = verifyCode;
      return true;
    });
}

module.exports.verifyCodeValidator = {
  strict: verifyCodeValidator(),
  optional: verifyCodeValidator().optional(),
};

function passwordValidator() {
  return check('password')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('E_EMPTY_PASSWORD')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('E_EMPTY_PASSWORD')
    .bail()

    .matches(/(?=.*[A-Z].*[A-Z])/)
    .withMessage('E_UPPERCASE_LETTER_PASSWORD')

    .matches(/(?=.*[a-z].*[a-z].*[a-z])/)
    .withMessage('E_LOWERCASE_LETTER_PASSWORD')

    .matches(/(?=.*[!@#$&*])/)
    .withMessage('E_SPECIAL_CHARACTER_PASSWORD')

    .matches(/(?=.*[0-9].*[0-9])/)
    .withMessage('E_NUMBER_PASSWORD')

    .isLength({ min: 8 })
    .withMessage('E_MIN_LENGTH_PASSWORD')

    .custom((password, { req }) => {
      req.body.password = password;
      return true;
    });
}

module.exports.passwordValidator = {
  strict: passwordValidator(),
  optional: passwordValidator().optional(),
};

function refreshTokenValidator() {
  return check(REFRESH_TOKEN_KEY)
    .custom(async (refreshToken, { req }) => {
      try {
        req.userId = await verifyToken(
          refreshToken,
          'refreshToken',
        );
        return Promise.resolve();
      } catch (error) {
        req.userId = null;
        return Promise.reject(error);
      }
    })
    .withMessage('E_UNAUTHENTICATED');
}

module.exports.refreshTokenValidator = {
  strict: refreshTokenValidator(),
  optional: refreshTokenValidator().optional(),
};

function accessTokenValidator() {
  return check(ACCESS_TOKEN_HEADER_KEY)
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('E_UNAUTHENTICATED')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('E_UNAUTHENTICATED')

    .custom(async (accessToken, { req }) => {
      try {
        req.userId = await verifyToken(
          accessToken,
          'accessToken',
        );
        return Promise.resolve();
      } catch (error) {
        console.error('error: ', error);
        return Promise.reject(error);
      }
    })
    .withMessage('E_UNAUTHENTICATED');
}

module.exports.accessTokenValidator = {
  strict: accessTokenValidator(),
  optional: accessTokenValidator().optional(),
};
