const express = require('express');
const router = express.Router();
const AuthRoutes = require('./authRoutes');
const UserRoutes = require('./userRoutes');

// 휴대폰 인증 및 정보 수집
router.use('/auth', AuthRoutes);

// 소셜 로그인 이후 과정
// 유저 필수 정보 수집 ( 프로필 이미지 파일, 폰 번호, 닉네임, 성별 )
router.use('/user', UserRoutes);


module.exports=router;
