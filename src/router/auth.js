const router = require("express").Router();

const validate = require("../middleware/validate");
const authController = require("../controller/auth");
const authValidator = require("../controller/auth.validator");

router
  .route("/auth/login2")
  .post(authValidator.passwordValidator, validate, authController.postLogin);

router
  .route("/auth/login")
  .post(authValidator.phoneNumberValidator, validate, authController.postLogin);
router
  .route("/auth/get-token")
  .post(
    authValidator.refreshTokenValidator,
    validate,
    authController.postGetToken
  );
router
  .route("/auth/verify")
  .post(authValidator.verifyCodeValidator, validate, authController.postVerify);

module.exports = router;
