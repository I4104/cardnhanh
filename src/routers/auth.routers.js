'use strict';
const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/auth.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');

router.get("/login", authMiddleware.isLogin, authController.login);
router.get("/logout", authMiddleware.isAuth, authController.logout);
router.get("/register", authMiddleware.isLogin, authController.register);

router.post("/create", authController.create);
router.post("/auth", authController.auth);

router.get("/", authMiddleware.isAuth, authController.profile);

module.exports = router;