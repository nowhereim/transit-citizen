const ProfileRepositories = require('../repositories/profileRepositories');

class ProfileServices {

    constructor() {
        this.profileRepository = new ProfileRepositories();
    }

    editUserProfileInfo = async ( snsId, nickname, representProfile, profileImage, statusmessage ) => {
        try {

            if ( snsId && nickname && representProfile && profileImage ) {
                const dbProfileInfo = await this.profileRepository.editProfileInfo_DB(
                    snsId,
                    nickname,
                    representProfile,
                    profileImage,
                    statusmessage
                );
                return dbProfileInfo;
            } else {
                throw new Error(
                    ':: 필수 입력 필드 값은 반드시 모두 채워져야 합니다 :: profileServices.js ::'
                );
            }
            
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        }
    }

    getUserProfileInfo = async ( snsId ) => {
        try {
            if ( snsId ) {
                const dbProfileInfo = await this.profileRepository.findProfileInfo_DB(snsId);
                return dbProfileInfo;
            } else {
                throw new Error(
                    ':: 유저 정보를 찾을 수 없습니다 :: profileServices.js ::'
                );
            }

        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        }
    }



}

module.exports = ProfileServices;