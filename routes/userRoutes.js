const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth_middleware');
const representProfileUpload = require("../middlewares/imagesUploadMiddleware");
const UserControllers = require('../controllers/userControllers');
this.userControllers = new UserControllers();

// 유저 정보 입력
router.post('/', authMiddleware, representProfileUpload, this.userControllers.getRepeuiredUserInfo );


module.exports = router;