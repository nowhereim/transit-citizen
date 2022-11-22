const AuthServices = require('../services/authServices');

class AuthControllers {

    constructor() {
        this.authServices = new AuthServices;
    }

    getUserPhoneNumber = async(req, res) => {
        try {
            const { phoneNumber } = req.body;
            console.log(`도착한 폰 번호: ${phoneNumber} `);
            await this.authServices.sendAuthorityCheckMessage( phoneNumber );
            return res.send({ 
                msg: '인증 메시지를 전송했습니다' 
            });
        } catch (error) {
            console.log(error);
        }
    }

    compareAuthInputWithOurs = async (req, res) => {
        try {
            const { phoneNumber, authCode } = req.body;
            console.log(`도착한 폰 번호: ${phoneNumber} `);
            console.log(`도착한 인증번호: ${authCode} `);
            if ( !phoneNumber || !authCode ) {
                return res.status(400).send({ 
                    error: '필수 입력 정보가 비어있습니다.'
                });
            }
            const test = await this.authServices.checkAuthNumber( phoneNumber, authCode );
            if ( test === null ) {
                return res.status(400).send({ msg: '인증변호가 만료되었습니다'});
            }
            return res.status(200).send({ msg: '성공' });
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = AuthControllers;