const AuthServices = require("../services/authServices");
const phoneNumberCheck = /^(010)([0-9]{4})([0-9]{4})$/;
const authCheck = /^[0-9a-zA-Z]{6}$/;

class AuthControllers {
  constructor() {
    this.authServices = new AuthServices();
  }

  getUserPhoneNumber = async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber || phoneNumber.search(phoneNumberCheck) === -1) {
        return res.status(400).send({ error: "잘못된 형식입니다" });
      }
      await this.authServices.sendAuthorityCheckMessage(phoneNumber);
      return res.status(200).send({ msg: "인증번호가 전송 되었습니다" });
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };
  compareAuthInputWithOurs = async (req, res) => {
    try {
      const { phoneNumber, authCode } = req.body;
      if (!phoneNumber || !authCode)
        return res.status(400).send({ error: "잘못된 형식입니다" });
      if (
        (phoneNumber.search(phoneNumberCheck) || authCode.search(authCheck)) ===
        -1
      ) {
        return res.status(400).send({ error: "잘못된 인증번호 입니다" });
      }
      const isEmpty = await this.authServices.checkAuthNumber(
        phoneNumber,
        authCode
      );
      if (isEmpty === null)
        return res.status(400).send({ error: "인증에 실패하였습니다" });
      return res.status(200).send({ msg: "인증되었습니다" });
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };
}

module.exports = AuthControllers;
