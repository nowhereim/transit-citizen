const User = require("../schemas/user");
const Local = require("../schemas/local");

class userRepositories {
  createUserInfo_DB = async (snsId, nickname, phoneNumber, gender) => {
    try {
      if (snsId) {
        const createdUserInfoData = await User.findOneAndUpdate(
          { snsId },
          {
            nickname,
            phoneNumber,
            gender,
          }
        );
        return createdUserInfoData;
      } else {
        throw new Error("snsId 값이 없으면 유저 정보를 조회할 수 없습니다");
      }
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


  getUserInfo = async (userId) => {
    const userInfo = await Local.findOne({ userId });
     return userInfo;
  }
  
  getUserInfo_join = async (id) => {
    // const userInfo = await User.findById(id).populate("");
    const userInfo = await User.findOne({ userLocal : id }).populate("");
     return userInfo;
  }

}

module.exports = userRepositories;
