const express = require('express');
const router = express.Router();

const ProfileControllers = require('../controllers/profileControllers');
this.profileControllers = new ProfileControllers();

// 프로필 정보 변경
router.post('/', this.profileControllers.editProfileInfo );

// 프로필 정보 가져오기
router.get('/', this.profileControllers.showProfileInfo );

module.exports = router;