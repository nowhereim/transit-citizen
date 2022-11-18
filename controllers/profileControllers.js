const ProfileServices = require('../services/profileServices');

class ProfileControllers {

    constructor() {
        this.profileServices = new ProfileServices;
    }

    // 프로필 수정
    editProfileInfo = async (req, res) => {
        try {
            const { snsId } = res.locals.user;
            const { nickname, representProfile, profileImage, statusmessage } = req.body;

            if ( !snsId || !representProfile || !profileImage ) {
                return res.status(400).send({ 
                    error: "필수 입력 필드 값이 비어있습니다"
                });
            }

            const updatedData = await this.profileServices.editUserProfileInfo(
                snsId,
                nickname,
                representProfile,
                profileImage,
                statusmessage
            );
                
            res.status(200).send({ 
                success: "유저 프로필이 수정되었습니다",
                body: updatedData
            });

        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        }
    }

    // 프로필 조회
    showProfileInfo = async (req, res) => {
        try {

            const { snsId }  = res.locals.user;

            if ( !snsId ) {
                return res.status(400).send({ 
                    error: "유저 정보가 비어있습니다" 
                });
            }

            const userProfileInfo = await this.profileServices.getUserProfileInfo( snsId );

            res.status(200).json({ 
                msg: "유저 프로필이 조회되었습니다",
                body: userProfileInfo
            });

        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        }

    }
    
}

module.exports = ProfileControllers;