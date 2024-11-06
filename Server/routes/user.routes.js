const express = require('express');
const router = express.Router();

const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

//#region GET
router.get('/all', controller.allAccess);
router.get('/user', [authJwt.verifyToken], controller.userBoard);

router.get(
  '/admin',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);
router.get(
  '/mod',
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);
//#endregion

module.exports = router;
