const User = require("../schemas/user");

class ProfileRepositories {
  editProfileInfo_DB = async (snsId, nickname, statusmessage) => {
    try {
      return await User.findOneAndUpdate(
        { snsId },
        { nickname, statusmessage }
      );
    } catch (error) {
      throw error;
    }
  };
  editRepresentProfileInfo_DB = async (snsId, representProfile) => {
    try {
      return await User.findOneAndUpdate(
        { snsId }, 
        { representProfile } 
      );
    } catch (error) {
      throw error;
    }
  };
  editProfileImageInfo_DB = async (snsId, profileImage) => {
    try {
      return await User.findOneAndUpdate(
        { snsId }, { profileImage }
      );
    } catch (error) {
      throw error;
    }
  };
  findProfileInfo_DB = async (snsId) => {
    try {
      return await User.findOne({ snsId });
    } catch (error) {
      throw error;
    }
  };
  deleteProfileInfo_DB = async (snsId) => {
    try {
      return await User.deleteOne({ snsId });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ProfileRepositories;
