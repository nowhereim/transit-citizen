const AuthServices = require('../services/authServices');

class AuthControllers {

    constructor() {
        this.authServices = new AuthServices;
    }

    // 전화 번호 받아서 인증 번호 발송하는 메서드
    getUserPhoneNumber = async(req, res) => {
        try {
            const { phone } = req.body;
            await this.authServices.sendAuthorityCheckMessage(phone);
            res.send('인증 메시지를 전송했습니다');
        } catch (error) {
            console.log(error);
        }
    }

    // 인증 번호 받아서 디비에 있는 값이랑 비교하는 메서드
    compareAuthInputWithOurs = async(req, res) => {
        try {
            const { phone, auth } = req.body;
            const test = await this.authServices.checkAuthNumber( phone, auth );
            if(test === -1) {
                res.status(400).send('없음');
            }
            res.status(400).send('성공');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AuthControllers;