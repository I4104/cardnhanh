'use strict';
const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/home.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');

router.post("/postCard", [authMiddleware.isAuth, authMiddleware.data], homeController.postCard);
router.use("/", authMiddleware.data, homeController.index);

module.exports = router;