const AuthRepositories = require('../repositories/authRepositories');
const crypto = require('crypto');
const SensServices = require('./sensServices');

class AuthServices {

    constructor() {
        this.authRepositories = new AuthRepositories;
        this.sensServices = new SensServices;
    }

    sendAuthorityCheckMessage = async( phone ) => {
        try {
            if ( phone ) {  // 폰 번호가 있다면
                // 인증 번호 발급 ( 6자리 )
                const authNumber = crypto.randomBytes(6).toString('hex').slice(6);

                // 인증 번호 발급하고 3분 지나면 디비 날리는 함수 호출
                setTimeout(() => { this.authRepositories.destroyUserData(phone); }, 180000);

                // 해당 유저 번호로 인증 번호 보내기
                const message = `본인 확인을 위해 인증번호 [${authNumber}]를 입력해주세요`;
                this.sensServices.send_message( phone, message );

                // 폰 번호, 인증 번호 디비에 저장
                await this.authRepositories.pushPhoneAuthData({
                    phone, 
                    auth: authNumber
                });

            }
        } catch (error) {
            throw error;
        }
    }

    checkAuthNumber = async( phone, auth ) => {
        try {
             const data = await this.authRepositories.findUserData({ phone, auth });
             console.log(data.length);
             if (data.length === 0) {
                throw -1
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = AuthServices;