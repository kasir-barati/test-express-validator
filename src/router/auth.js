const router = require("express").Router();

const validate = require("../middleware/validate");
const authController = require("../controller/auth");
const authValidator = require("../controller/auth.validator");

router
  .route("/auth/login")
  .post(authValidator.postLogin, validate, authController.postLogin);
router
  .route("/auth/get-token")
  .post(authValidator.postGetToken, validate, authController.postGetToken);
router
  .route("/auth/verify")
  .post(authValidator.postVerify, validate, authController.postVerify);

module.exports = router;