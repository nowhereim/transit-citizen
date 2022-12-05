const express = require("express");
const router = express.Router();

const imagesUploadMiddleware = require("../middlewares/imagesUploadMiddleware");
const authMiddleware = require("../middlewares/auth_middleware");
const { imagesUpload } = imagesUploadMiddleware;
const ProfileControllers = require("../controllers/profileControllers");
this.profileControllers = new ProfileControllers();

// 프로필 정보 변경
router.post(
  "/",
  // authMiddleware,
  imagesUpload,
  this.profileControllers.editProfileInfo
);

// 프로필 정보 가져오기
router.get("/", this.profileControllers.showProfileInfo);
// authMiddleware, 
module.exports = router;
