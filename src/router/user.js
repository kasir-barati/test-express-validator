const router = require("express").Router();

const validate = require("../middleware/validate");
const userController = require("../controller/user");
const authValidator = require("../controller/auth.validator");

router
  .route("/users")
  .get(authValidator.verifyJwtToken, validate, userController.getUsers);

module.exports = router;
