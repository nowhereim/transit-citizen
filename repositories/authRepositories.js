const Auth = require("../schemas/auth");
const User = require("../schemas/user");

class AuthRepositories {
  findUserData = async ({ snsId, phoneNumber, authCode }) => {
    try {
      const data = await Auth.findOne({ snsId, phoneNumber, authCode });
      if (data !== null)
        await User.findOneAndUpdate({ snsId }, { phoneNumber });
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

  pushPhoneAuthData = async (snsId, phoneNumber, authCode) => {
    try {
      await Auth.create(snsId, phoneNumber, authCode);
      return;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AuthRepositories;
