const AuthRepositories = require("../repositories/authRepositories");
const crypto = require("crypto");
const SensServices = require("./sensServices");

class AuthServices {
  constructor() {
    this.authRepositories = new AuthRepositories();
    this.sensServices = new SensServices();
  }

  sendAuthorityCheckMessage = async (snsId, phoneNumber) => {
    try {
      // 인증 번호 6자리 발급 ( 3분 후 만료 )
      const authNumber = crypto.randomBytes(6).toString("hex").slice(6);
      const message = `:: 환승시민 :: 본인 확인을 위해 인증번호 [${authNumber}]를 입력해주세요`;
      this.sensServices.send_message(phoneNumber, message);
      await this.authRepositories.pushPhoneAuthData({
        snsId,
        phoneNumber,
        authCode: authNumber,
      });
    } catch (error) {
      throw error;
    }
  };

  checkAuthNumber = async (snsId, phoneNumber, authCode) => {
    try {
      const data = await this.authRepositories.findUserData({
        snsId,
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
