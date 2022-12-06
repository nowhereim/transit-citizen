const express = require("express");
const router = express.Router();
const userValidation = require("../validation/userValidation");
const signupValidation = require("../validation/signupValidation");
const validationMiddleware = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/auth_middleware");
const isNotLoggedIn = require("../middlewares/isNotLoggedInMiddleware");
const imagesUploadMiddleware = require("../middlewares/imagesUploadMiddleware");
const { representProfileUpload } = imagesUploadMiddleware;
const UserControllers = require("../controllers/userControllers");
this.userControllers = new UserControllers();

// 로컬 회원가입
router.post(
  "/signup",
  isNotLoggedIn,
  validationMiddleware(signupValidation.signup),
  this.userControllers.localSignUpInfo,
);

// 유저 정보 입력
router.post(
  "/",
  authMiddleware,
  representProfileUpload,
  validationMiddleware(userValidation.user),
  this.userControllers.getRepeuiredUserInfo,
);

// 유저 닉네임 중복 검사
router.post("/check", authMiddleware, this.userControllers.nicknameCheck);

// 로그인 (/user/login)
router.post("/login", this.userControllers.login);

// 유저 아이디 중복 검사
router.post("/checkid", this.userControllers.userIdCheck);

module.exports = router;
