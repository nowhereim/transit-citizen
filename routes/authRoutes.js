const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/authControllers');
this.authControllers = new AuthControllers();


// 메시지 보내기
router.post('/phone', this.authControllers.getUserPhoneNumber);

// 인증 번호 비교
router.post('/compare', this.authControllers.compareAuthInputWithOurs);


module.exports = router;