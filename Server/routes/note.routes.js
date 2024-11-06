const express = require('express');
const router = express.Router();

const { authJwt } = require('../middleware');
const controller = require('../controllers/note.controller');

//#region GET
router.get(
  '/',
  [authJwt.verifyToken],
  controller.getUserNotes
)
//#endregion

//#region POST
router.post(
  '/',
  [authJwt.verifyToken],
  controller.addNote
)

//#endregion

//#region PUT
router.put(
  '/',
  [authJwt.verifyToken],
  controller.updateNote
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
