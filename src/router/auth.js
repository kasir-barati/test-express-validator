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
    authValidator.loginValidator,
    validate,
    authController.postLogin,
  );
router
  .route('/auth/get-token')
  .post(
    authValidator.refreshTokenValidator.optional,
    validate,
    authController.upsertUser,
    authController.getToken,
  );
router
  .route('/auth/verify')
  .post(
    authValidator.accessTokenValidator.strict,
    authValidator.verifyCodeValidator.strict,
    validate,
    authController.postVerify,
  );

router
  .route('/is-url')
  .post(
    authValidator.isUrl.strict,
    validate,
    (req, res, next) => {
      res.json({
        success: true,
        data: req.body,
        error: null,
      });
    },
  );

module.exports = router;
