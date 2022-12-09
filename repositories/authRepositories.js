const Auth = require("../schemas/auth");
const User = require("../schemas/user");

class AuthRepositories {
  findUserData = async ({ snsId, phoneNumber, authCode }) => {
    try {
      const data = await Auth.findOne({ snsId, phoneNumber, authCode });
      // // 없애는 명분 :: snsId 못 받으니까 snsId를 이용해 디비 업데이트 하는 부분 삭제
      // if (data !== null)
      //   await User.findOneAndUpdate({ snsId }, { phoneNumber });
      return data;
    } catch (error) {
      throw error;
    }
  };

  destroyUserData = async (phoneNumber) => {
    try {
      await Auth.deleteOne({ phoneNumber });
      return;
    } catch (error) {
      throw error;
    }
  };

  pushPhoneAuthData = async (phoneNumber, authCode) => {
    try {
      await Auth.create(phoneNumber, authCode);
      return;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AuthRepositories;
