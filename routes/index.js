const express = require('express');
const router = express.Router();
// const userRouter = require('./user.js');

// const authRouter = require('./auth.js');
const authRouter = require('./kakao.js');

router.use("/auth", authRouter);
// router.use("/user", userRouter);

module.exports = router;