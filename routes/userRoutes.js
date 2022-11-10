const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

const multer = require('multer');
const path = require('path');

// 저장 관련 설정
const storage = multer.diskStorage({
    destination: (req, file, done) => done(null, './uploads'),
    filename: (req, file, done) => {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        const uniqueName = basename + `${Date.now()}` + ext;
        done(null, uniqueName);
    }
})

// 멀터 정의
const uploadMultipartData = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB로 제한
}).single("profileImage");

// 이미지 받기
router.post('/', (req, res) => {
    uploadMultipartData(req, res, async (error) => {
        if (error) {
            res.send('올바르지 않은 파일 형식입니다');
        }
        // 유저 정보 디비 저장
        const userData = await User.create({
            profileImage: req.file.path,        // 성별
            phoneNumber : req.body.phoneNumber, // 핸드폰 번호
            nickname    : req.body.nickname,    // 닉네임
            gender      : req.body.gender       // 성별
        });
        console.log(`데이터 생성 : ${userData}`);

        res.send('정보가 저장되었습니다');
    });
});

module.exports = router;