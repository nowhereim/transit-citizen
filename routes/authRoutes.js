const express = require('express');
const router = express.Router();
//const smsMiddleware = require("../middlewares/smsMiddleware");
const AuthControllers = require('../controllers/authControllers');
authControllers = new AuthControllers();


// 메시지 보내기
router.post('/phone', authControllers.getUserPhoneNumber);

// 인증 번호 비교
router.post('/compare', authControllers.compareAuthInputWithOurs);


module.exports = router;