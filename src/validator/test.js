// @ts-check
const { check } = require('express-validator');

const {
  arabicNumberToEnglish,
  persianNumberToEnglish,
} = require('../util/convertor');

function isUrl() {
  return check('test').isURL().withMessage('E_FORMAT_URL');
}

function numberMinMaxValidator() {
  return (
    check('num')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .withMessage('E_EMPTY_COUNT')
      .bail()

      .notEmpty({
        ignore_whitespace: true,
      })
      .withMessage('E_EMPTY_COUNT')
      .bail()

      .customSanitizer(arabicNumberToEnglish)
      .customSanitizer(persianNumberToEnglish)
      .isNumeric()
      .withMessage('E_FORMAT_COUNT')
      .bail()

      // FIXME: wrong way
      // .isLength({
      //   max: 25,
      //   min: 10,
      // })
      // .withMessage('E_BETWEEN_25_10_NUM')
      .custom((num) => {
        if (num > 25) {
          return Promise.reject();
        }
        return Promise.resolve();
      })
      .withMessage('E_MAX_NUM')
      .bail()

      .custom((num) => {
        if (num < 10) {
          return Promise.reject();
        }
        return Promise.resolve();
      })
      .withMessage('E_MIN_NUM')
      .bail()

      .custom((count, { req }) => {
        req.body.count = count;
        return Promise.resolve();
      })
  );
}

module.exports = {
  isUrl: {
    strict: isUrl(),
    optional: isUrl().optional(),
  },
  numberMinMaxValidator: {
    strict: numberMinMaxValidator(),
    optional: numberMinMaxValidator().optional(),
  },
};
