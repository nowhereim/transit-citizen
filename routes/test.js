const express = require("express");
const router = express.Router();
const { User } = require("../schemas/user.js");
// const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/test.js');
// require("dotenv").config();

//
router.get("/info", authMiddleware, async (req, res) => {
    const snsId = res.locals.user.snsId;
    const userinfo = await User.findOne({ snsId:snsId })
    res.json({ userinfo: userinfo });
});

module.exports = router;