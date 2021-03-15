// @ts-check
const router = require('express').Router();

const validate = require('../middleware/validate');
const testController = require('../controller/test');
const testValidator = require('../validator/test');
const logger = require('../middleware/logger');

// router
//   .route('/auth/login2')
//   .post(
//     authValidator.passwordValidator.strict,
//     validate,
//     authController.postLogin,
//   );

router
  .route('/test/is-url')
  .post(
    testValidator.isUrl.strict,
    validate,
    testController.isUrl,
  );

router
  .route('/test/number-min-max')
  .post(
    logger(
      'route',
      'test',
      'testValidator.numberMinMaxValidator.strict',
    ),
    testValidator.numberMinMaxValidator.strict,
    logger('route', 'test', 'validate'),
    validate,
    logger(
      'route',
      'test',
      'testController.numberMinMaxValidator',
    ),
    testController.numberMinMaxValidator,
  );

module.exports = router;
