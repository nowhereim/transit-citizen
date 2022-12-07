const ProfileServices = require("../services/profileServices");

class ProfileControllers {
  constructor() {
    this.profileServices = new ProfileServices();
  }

  // 프로필 업데이트 기능
  editProfileInfo = async (req, res, next) => {
    try {
      const snsId = res.locals.user.user.snsId;
      const { nickname, statusmessage } = req.body;
      if (!snsId) return res.status(400).send({ error: "알 수 없는 사용자" });
      if (!nickname && !statusmessage && !req.files)
        return res.status(200).send({ msg: "변경된 내용이 없습니다" });
      if (!req.files)
        return res.status(400).send({ error: "대표 프로필을 설정해주세요" });
      if (!req.files.representProfile)
        return res.status(400).send({ error: "대표 프로필을 설정해주세요" });
      const { representProfile, profileImage } = req.files;
      await this.profileServices.editUserProfileInfo(
        snsId,
        nickname,
        statusmessage
      );
      await this.profileServices.editUserImageProfileInfo(
        snsId,
        representProfile,
        profileImage
      );
      return res
        .status(200)
        .send({ status: 200, msg: "유저 프로필 정보가 수정되었습니다" });
    } catch (error) {
      next(error);
    }
  };

  // 프로필 조회
  showProfileInfo = async (req, res, next) => {
    try {
      const snsId = res.locals.user.user.snsId;
      console.log(res.locals.user.user.snsId);
      if (!snsId) {
        return res.status(400).send({
          error: "유저 정보가 비어있습니다",
        });
      }
      const userProfileInfo = await this.profileServices.getUserProfileInfo(
        snsId
      );
      res.status(200).json({
        msg: "유저 프로필이 조회되었습니다",
        body: userProfileInfo,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProfileControllers;
