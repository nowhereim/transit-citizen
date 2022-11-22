const AuthRepositories = require('../repositories/authRepositories');
const crypto = require('crypto');
const SensServices = require('./sensServices');

class AuthServices {

    constructor() {
        this.authRepositories = new AuthRepositories;
        this.sensServices = new SensServices;
    }

    sendAuthorityCheckMessage = async( phoneNumber ) => {
        try {
            if ( phoneNumber ) {
                // 인증 번호 발급 ( 6자리 )
                const authNumber = crypto.randomBytes(6).toString('hex').slice(6);

                // 인증 번호 발급하고 3분 후 만료
                setTimeout(() => { 
                    this.authRepositories.destroyUserData(phoneNumber); 
                }, 180000);

                const message = `:: 환승시민 :: 본인 확인을 위해 인증번호 [${authNumber}]를 입력해주세요`;

                this.sensServices.send_message( phoneNumber, message );
                

                await this.authRepositories.pushPhoneAuthData({
                    phoneNumber, 
                    authCode: authNumber
                });
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthServices;