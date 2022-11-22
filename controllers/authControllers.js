const AuthServices = require('../services/authServices');

class AuthControllers {

    constructor() {
        this.authServices = new AuthServices;
    }

    getUserPhoneNumber = async(req, res) => {
        try {
            const { phoneNumber } = req.body;
            await this.authServices.sendAuthorityCheckMessage( phoneNumber );
            return res.send({ msg: '인증 메시지를 전송했습니다' });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AuthControllers;