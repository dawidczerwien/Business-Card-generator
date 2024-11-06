const express = require('express');
const router = express.Router();

const { authJwt } = require('../middleware');
const controller = require('../controllers/card.controller');

//#region GET
router.get(
  '/:id',
  controller.getBusinessCard
)
//#endregion

//#region POST 
router.post(
  '/',
  [authJwt.verifyToken],
  controller.addCard
)

//#endregion

//#region PUT
router.put(
  '/',
  controller.saveClientContactInfo
)

//#endregion

//#region DELETE
router.delete(
  '/',
  [authJwt.verifyToken],
  controller.deleteNote
)

//#endregion

module.exports = router;
