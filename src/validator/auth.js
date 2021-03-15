// @ts-check
const phone = require('phone');
const { check, oneOf } = require('express-validator');

const {
  arabicNumberToEnglish,
  persianNumberToEnglish,
} = require('../util/convertor');
const { verifyToken } = require('../util/jwt');

const {
  refreshTokenKey: REFRESH_TOKEN_KEY,
  accessTokenHeaderKey: ACCESS_TOKEN_HEADER_KEY,
  verificationCodeLen: VERIFICATION_CODE_LEN,
  phoneValidationCountry: PHONE_VALIDATION_COUNTRY,
} = require('../config');

// const REGX_PERSIAN_NAME = /^[کگۀی،تثجحخدغيًٌٍَُپٰچژ‌ء-ةذ-عف-ٔ ]+$/;

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
    .bail()

    .notEmpty({ ignore_whitespace: true })
    .withMessage('E_EMPTY_PHONE')
    .bail()

    .customSanitizer(persianNumberToEnglish)
    .customSanitizer(arabicNumberToEnglish)
    .custom(customPhoneValidator)
    .withMessage('E_FORMAT_PHONE')

    .custom((phoneNumber, { req }) => {
      req.body.phoneNumber = phoneNumber;
      return true;
    });
}

function verifyCodeValidator() {
  return check('verifyCode')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('E_EMPTY_VERIFYCODE')
    .bail()

    .notEmpty({ ignore_whitespace: true })
    .withMessage('E_EMPTY_VERIFYCODE')
    .bail()

    .customSanitizer(persianNumberToEnglish)
    .customSanitizer(arabicNumberToEnglish)
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

function passwordValidator() {
  return check('password')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('E_EMPTY_PASSWORD')
    .bail()

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

function accessTokenValidator() {
  return check(ACCESS_TOKEN_HEADER_KEY)
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('E_UNAUTHENTICATED')
    .bail()

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

function emailValidator() {
  return check('email')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('E_EMPTY_EMAIL')
    .bail()

    .notEmpty({ ignore_whitespace: true })
    .withMessage('E_EMPTY_EMAIL')
    .bail()

    .normalizeEmail()
    .isEmail()
    .withMessage('E_FORMAT_EMAIL')

    .custom((email, { req }) => {
      req.body.email = email;
    });
}

module.exports = {
  emailValidator: {
    strict: emailValidator(),
    optional: emailValidator().optional(),
  },
  loginValidator: oneOf([
    emailValidator(),
    phoneNumberValidator(),
  ]),
  accessTokenValidator: {
    strict: accessTokenValidator(),
    optional: accessTokenValidator().optional(),
  },
  refreshTokenValidator: {
    strict: refreshTokenValidator(),
    optional: refreshTokenValidator().optional(),
  },
  passwordValidator: {
    strict: passwordValidator(),
    optional: passwordValidator().optional(),
  },
  verifyCodeValidator: {
    strict: verifyCodeValidator(),
    optional: verifyCodeValidator().optional(),
  },
  phoneNumberValidator: {
    strict: phoneNumberValidator(),
    optional: phoneNumberValidator().optional(),
  },
};
