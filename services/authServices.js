const AuthRepositories = require("../repositories/authRepositories");
const UserRepositories = require("../repositories/userRepositories");
const crypto = require("crypto");
const SensServices = require("./sensServices");

class AuthServices {
  constructor() {
    this.authRepositories = new AuthRepositories();
    this.userRepositories = new UserRepositories();
    this.sensServices = new SensServices();
  }

  sendAuthorityCheckMessage = async (phoneNumber) => {
    try {
      // 인증 번호 6자리 발급 ( 3분 후 만료 )
      const authNumber = crypto.randomBytes(6).toString("hex").slice(6);
      const message = `:: 환승시민 :: 본인 확인을 위해 인증번호 [${authNumber}]를 입력해주세요`;
      const data = await this.authRepositories.getSamePhoneNumber(phoneNumber);
      if (data !== null)
        throw new Error(
          "이미 인증번호가 전송된 유저입니다. 3분 뒤 다시 시도해주세요"
        );
      this.sensServices.send_message(phoneNumber, message);
      await this.authRepositories.pushPhoneAuthData({
        phoneNumber,
        authCode: authNumber,
      });
      return;
    } catch (error) {
      throw error;
    }
  };

  checkAuthNumber = async (snsId, phoneNumber, authCode) => {
    try {
      const empty = await this.authRepositories.findPhoneAuthData({
        phoneNumber,
        authCode,
      });
      if (empty !== null)
        await this.userRepositories.updatePhoneNumber(snsId, phoneNumber);
      return empty;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AuthServices;
