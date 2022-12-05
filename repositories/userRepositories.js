const User = require("../schemas/user");
const bcrpyt = require("bcrypt");

class userRepositories {
  createLocalUserInfo_DB = async (snsId, password) => {
    try {
      const repassword = await bcrpyt.hash(password, 5);
      await User.create({
        snsId,
        password: repassword,
        provider: "local",
      });
      return;
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };

  createUserInfo_DB = async (snsId, nickname, gender) => {
    try {
      await User.findOneAndUpdate({ snsId }, { nickname, gender });
      return;
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };

  createUserRequiredProfile_DB = async (snsId, representProfile) => {
    try {
      if (snsId) {
        const createdUserInfoData = await User.findOneAndUpdate(
          { snsId },
          { representProfile }
        );
        return createdUserInfoData;
      } else {
        throw new Error("snsId 값이 없으면 유저 정보를 조회 할 수 없습니다.");
      }
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };

  getUserInfo_DB = async (snsId) => {
    try {
      if (snsId) {
        const deletedProfileData = await User.findOne({ snsId });
        return deletedProfileData;
      } else {
        throw new Error(
          "snsId 값이 없으면 유저 프로필 정보를 삭제할 수 없습니다"
        );
      }
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };

  isSameUser_DB = async (nickname) => {
    try {
      if (nickname) {
        const data = await User.findOne({ nickname });
        return data;
      } else {
        throw error;
      }
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };

  getUserInfo = async (snsId) => {
    const userInfo = await User.findOne({ snsId });
    return userInfo;
  };

  isSameUserId_DB = async (snsId) => {
    try {
      const data = await User.findOne({ snsId });
      return data;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userRepositories;
