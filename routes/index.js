const express = require('express');
const router = express.Router();
const AuthRoutes = require('./authRoutes');

// 휴대폰 인증 및 정보 수집
router.use('/auth', AuthRoutes);

module.exports=router;
