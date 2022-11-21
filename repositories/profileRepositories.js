const User = require('../schemas/user');

class ProfileRepositories {

    editProfileInfo_DB = async ( snsId, nickname, statusmessage ) => {
        try {
            if ( snsId ) {
                const editedProfileData = await User.findOneAndUpdate(
                    { snsId },
                    { 
                        nickname, 
                        statusmessage
                    }
                );
                return editedProfileData;
            } else {
                throw new Error('snsId 값이 없으면 닉네임과 상태 메시지 값을 변경할 수 없습니다');
            }
        } catch (error){
            console.log(error.name);
            console.log(error.message);
        }
    }


    editRepresentProfileInfo_DB = async ( snsId, representProfile ) => {
        try {
            if ( snsId ) {
                const editedProfileImageData = await User.findOneAndUpdate(
                    { snsId },
                    { representProfile }
                );
                return editedProfileImageData;
            } else {
                throw new Error('snsId 값이 없으면 대표 프로필을 변경할 수 없습니다');
            }
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        }
    }
    

    editProfileImageInfo_DB = async ( snsId, profileImage ) => {
        try {
            if ( snsId ) {
                const editedProfileImageData = await User.findOneAndUpdate(
                    { snsId },
                    { profileImage }
                );
                return editedProfileImageData;
            } else {
                throw new Error('snsId 값이 없으면 유저 프로필 이미지를 바꿀 수 없습니다');
            }
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        }
    }


    findProfileInfo_DB = async ( snsId ) => {
        try {
            if ( snsId ) {
                const profileData = await User.findOne({ snsId });
                return profileData;
            } else {
                throw new Error('snsId 값이 없으면 유저 프로필 정보를 찾을 수 없습니다');
            }
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        }
    }

    
    deleteProfileInfo_DB = async ( snsId ) => {
        try {
            if ( snsId ) {
                const deletedProfileData = await User.deleteOne({ snsId });
                return deletedProfileData;
            } else {
                throw new Error('snsId 값이 없으면 유저 프로필 정보를 삭제할 수 없습니다');
            }
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        }
    }

}

module.exports = ProfileRepositories;