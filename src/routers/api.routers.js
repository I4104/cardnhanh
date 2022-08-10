'use strict';
const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/api.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');

router.get("/get_api", [authMiddleware.isAuth, authMiddleware.data], apiController.get_api);

router.use("/", [authMiddleware.isAuth, authMiddleware.data], apiController.index);


module.exports = router;