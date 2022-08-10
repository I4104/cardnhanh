'use strict';
const express = require('express');
const router = express.Router();

const historyController = require('../app/controllers/history.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');

router.use("/withdraw", [authMiddleware.isAuth, authMiddleware.data], historyController.show_withdraw);
router.use("/get_withdraw", [authMiddleware.isAuth, authMiddleware.data], historyController.withdraw);

router.use("/card", [authMiddleware.isAuth, authMiddleware.data], historyController.card);
router.post("/card_by_date", [authMiddleware.isAuth, authMiddleware.data], historyController.card_by_date);


router.use("/balance", [authMiddleware.isAuth, authMiddleware.data], historyController.balance);
router.get("/get_balance", [authMiddleware.isAuth, authMiddleware.data], historyController.get_balance);

router.use("/", [authMiddleware.isAuth, authMiddleware.data], historyController.index);


module.exports = router;