const express = require("express");
const router = express.Router();
const AuthRoutes = require("./authRoutes");
const UserRoutes = require("./userRoutes");
const ProfileRoutes = require("./profileRoutes");
const oauthRoutes = require("./kakaoLogin");
const gauthRoutes = require("./googleLogin");
const nauthRoutes = require("./naverLogin");
router.use("/oauth", oauthRoutes);

router.use("/gauth", gauthRoutes);

router.use("/nauth", nauthRoutes);

// 각종 인증 기능
router.use("/auth2", AuthRoutes);

// 유저 정보
router.use("/user", UserRoutes);

// 프로필 정보
router.use("/profile", ProfileRoutes);

module.exports = router;
