const router = require('express').Router();

const validate = require('../middleware/validate');
const authController = require('../controller/auth');
const authValidator = require('../controller/auth.validator');

// router
//   .route('/auth/login2')
//   .post(
//     authValidator.passwordValidator.strict,
//     validate,
//     authController.postLogin,
//   );

router
  .route('/auth/login')
  .post(
    authValidator.accessTokenValidator.strict,
    authValidator.phoneNumberValidator.strict,
    validate,
    authController.postLogin,
  );
router
  .route('/auth/get-token')
  .post(
    authValidator.refreshTokenValidator.optional,
    validate,
    authController.upsertUser,
    authController.postGetToken,
  );
router
  .route('/auth/verify')
  .post(
    authValidator.accessTokenValidator.strict,
    authValidator.verifyCodeValidator.strict,
    validate,
    authController.postVerify,
  );

module.exports = router;
