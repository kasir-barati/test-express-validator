const phone = require("phone");
const { check } = require("express-validator");

const {
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

module.exports.refreshTokenValidator = check("refreshToken")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("emptyRefreshToken")
  .bail();

module.exports.phoneNumberValidator = check("phoneNumber")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("E_EMPTY_PHONE")
  .bail()

  .customSanitizer(persianToEnglish)
  .customSanitizer(arabicToEnglish)
  .custom(customPhoneValidator)
  .withMessage("E_FORMAT_PHONE");

// module.exports.postGetToken = check('refreshToken')

module.exports.verifyCodeValidator = check("verifyCode")
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
