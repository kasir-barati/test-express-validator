const router = require('express').Router();

const validate = require('../middleware/validate');
const userController = require('../controller/user');
const authValidator = require('../validator/auth');

router
  .route('/users')
  .get(
    authValidator.accessTokenValidator.strict,
    validate,
    userController.getUsers,
  );

module.exports = router;
