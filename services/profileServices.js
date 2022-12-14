const cloudinary = require("cloudinary");
const { uploader } = require("cloudinary");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
const ProfileRepositories = require("../repositories/profileRepositories");

class ProfileServices {
  constructor() {
    this.profileRepository = new ProfileRepositories();
  }

  editUserProfileInfo = async (snsId, nickname, statusmessage) => {
    try {
      const dbProfileInfo = await this.profileRepository.editProfileInfo_DB(
        snsId, nickname, statusmessage
      );
      return dbProfileInfo;
    } catch (error) {
      throw error;
    }
  };

  editUserImageProfileInfo = async (snsId, representProfile, profileImage) => {
    try {
      const urls = [];
      const refile = parser
                      .format( ".png", representProfile[0].buffer)
                      .content;
      cloudinary.v2.uploader.upload(refile, async (error, result) => {
        if (error) throw new Error("이미지 업로드 불가");
        await this.profileRepository.editRepresentProfileInfo_DB(
          snsId, result.url
          );
      });
      await Promise.all( profileImage.map( async (file) => {
          const refiles = parser.format(".png", file.buffer).content;
          await cloudinary.v2.uploader.upload(refiles, (error, result) => {
            if (error) throw new Error("이미지 업로드 불가");
            const re = result.url.split("/");
            re.splice(6, 0, "h_300,w_300").join("/");
            urls.push(re.join("/"));
          });
        })
      );
      const dbImageProfileInfo =
        await this.profileRepository.editProfileImageInfo_DB(snsId, urls);
      return dbImageProfileInfo;
    } catch (error) {
      throw error;
    }
  };

  getUserProfileInfo = async (snsId) => {
    try {
      const dbProfileInfo = await this.profileRepository.findProfileInfo_DB( snsId );
      return dbProfileInfo;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ProfileServices;
