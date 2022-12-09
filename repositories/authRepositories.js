const Auth = require("../schemas/auth");

class AuthRepositories {
  findPhoneAuthData = async ({ phoneNumber, authCode }) => {
    try {
      return await Auth.findOne({ phoneNumber, authCode });
    } catch (error) {
      throw error;
    }
  };

  getSamePhoneNumber = async (phoneNumber) => {
    try {
      return await Auth.findOne({ phoneNumber });
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
