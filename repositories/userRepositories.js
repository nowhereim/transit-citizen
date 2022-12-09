const User = require("../schemas/user");
const bcrpyt = require("bcrypt");

class userRepositories {
  
  createLocalAccount = async (snsId, password) => {
    try {
      const repassword = await bcrpyt.hash(password, 5);
      await User.create({
        snsId,
        password: repassword,
        provider: "local",
      });
      return;
    } catch (error) {
      throw error;
    }
  };

  updateUserInfo = async (snsId, nickname, gender) => {
    try {
      await User.findOneAndUpdate({ snsId }, { nickname, gender });
      return;
    } catch (error) {
      throw error;
    }
  };

  updatePhoneNumber = async (snsId, phoneNumber) => {
    try {
      await User.findOneAndUpdate({ snsId }, { phoneNumber });
      return;
    } catch (error) {
      throw error;
    }
  };

  updateRProfile = async (snsId, representProfile) => {
    try {
      const createdUserInfoData = await User.findOneAndUpdate(
        { snsId },
        { representProfile }
      );
      return createdUserInfoData;
    } catch (error) {
      throw error;
    }
  };

  getUserInfo = async (snsId) => {
    const userInfo = await User.findOne({ snsId: snsId });
    return userInfo;
  };

  findById = async (snsId) => {
    try {
      return await User.findOne({ snsId });
    } catch (error) {
      throw error;
    }
  };

  findByNickname = async (nickname) => {
    try {
      return await User.findOne({ nickname });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userRepositories;
