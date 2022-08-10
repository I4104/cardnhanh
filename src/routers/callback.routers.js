'use strict';
const express = require('express');
const router = express.Router();

const callbackController = require('../app/controllers/callback.controller');

router.get("/gachthevip", callbackController.gachthevip);
router.get("/gachthe1s", callbackController.gachthe1s);

module.exports = router;