const phone = require("phone");
const { check, oneOf, header, body } = require("express-validator");

const {} = require("../util/jwt");

const {
  jwtBodyKey: ACCESS_TOKEN_BODY_KEY,
  jwtHeaderKey: ACCESS_TOKEN_HEADER_KEY,
  verificationCodeLen: VERIFICATION_CODE_LEN,
  phoneValidationCountry: PHONE_VALIDATION_COUNTRY,
} = require("../config");

// const REGX_PERSIAN_NAME = /^[کگۀی،تثجحخدغيًٌٍَُپٰچژ‌ء-ةذ-عف-ٔ ]+$/;

function persianToEnglish(strnig) {
  return strnig.replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit));
}

function arabicToEnglish(string) {
  return string.replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit));
}

function customPhoneValidator(phoneNumber) {
  return phone(phoneNumber, PHONE_VALIDATION_COUNTRY, false)[0];
}

module.exports.phoneNumberValidator = check("phoneNumber")
  .exists({ checkFalsy: true, checkNull: true })
  .withMessage("E_EMPTY_PHONE")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("E_EMPTY_PHONE")
  .bail()

  .customSanitizer(persianToEnglish)
  .customSanitizer(arabicToEnglish)
  .custom(customPhoneValidator)
  .withMessage("E_FORMAT_PHONE");

// module.exports.postGetToken = check('refreshToken')

module.exports.verifyCodeValidator = check("verifyCode")
  .exists({ checkFalsy: true, checkNull: true })
  .withMessage("E_EMPTY_VERIFYCODE")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("E_EMPTY_VERIFYCODE")
  .bail()

  .customSanitizer(persianToEnglish)
  .customSanitizer(arabicToEnglish)
  .matches(/[0-9]/)
  .isLength({
    max: VERIFICATION_CODE_LEN,
    min: VERIFICATION_CODE_LEN,
  })
  .withMessage("E_FORMAT_VERIFYCODE");

module.exports.passwordValidator = check("password")
  .exists({ checkFalsy: true, checkNull: true })
  .withMessage("E_EMPTY_PASSWORD")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("E_EMPTY_PASSWORD")
  .bail()

  .matches(/(?=.*[A-Z].*[A-Z])/)
  .withMessage("E_UPPERCASE_LETTER_PASSWORD")

  .matches(/(?=.*[a-z].*[a-z].*[a-z])/)
  .withMessage("E_LOWERCASE_LETTER_PASSWORD")

  .matches(/(?=.*[!@#$&*])/)
  .withMessage("E_SPECIAL_CHARACTER_PASSWORD")

  .matches(/(?=.*[0-9].*[0-9])/)
  .withMessage("E_NUMBER_PASSWORD")

  .isLength({ min: 8 })
  .withMessage("E_MIN_LENGTH_PASSWORD")

  .custom((password, { req }) => {
    req.body.password = password;
    return true;
  });

module.exports.accessTokenValidator = oneOf([
  header(ACCESS_TOKEN_HEADER_KEY)
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("E_UNAUTHENTICATED")
    .bail()

    .notEmpty({ ignore_whitespace: true })
    .withMessage("E_UNAUTHENTICATED")
    .bail()

    .custom(verifyAccessToken)
    .withMessage("E_UNAUTHENTICATED"),
  body(ACCESS_TOKEN_BODY_KEY)
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("E_UNAUTHENTICATED")
    .bail()

    .notEmpty({ ignore_whitespace: true })
    .withMessage("E_UNAUTHENTICATED")
    .bail()

    .custom(verifyAccessToken)
    .withMessage("E_UNAUTHENTICATED"),
]);
