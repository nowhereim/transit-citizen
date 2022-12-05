const AuthRepositories = require("../repositories/authRepositories");
const crypto = require("crypto");
const SensServices = require("./sensServices");

class AuthServices {
  constructor() {
    this.authRepositories = new AuthRepositories();
    this.sensServices = new SensServices();
  }

  sendAuthorityCheckMessage = async (phoneNumber) => {
    try {
      if (phoneNumber) {
        // 인증 번호 발급 ( 6자리 ) : 3분 후 만료
        const authNumber = crypto.randomBytes(6).toString("hex").slice(6);

        const message = `:: 환승시민 :: 본인 확인을 위해 인증번호 [${authNumber}]를 입력해주세요`;

        this.sensServices.send_message(phoneNumber, message);

        await this.authRepositories.pushPhoneAuthData({
          phoneNumber,
          authCode: authNumber,
        });
      }
    } catch (error) {
      throw new Error("유저정보없음");
    }
  };

  checkAuthNumber = async (phoneNumber, authCode) => {
    try {
      const data = await this.authRepositories.findUserData({
        phoneNumber,
        authCode,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AuthServices;
