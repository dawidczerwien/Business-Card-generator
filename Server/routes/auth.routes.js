const express = require('express');
const router = express.Router();

const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');

//#region POST
router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);
router.post('/signin', controller.signin);
//#endregion


//#region GET
router.get('/confirmation/:jwt_token', controller.confirmation);
//#endregion


module.exports = router;
