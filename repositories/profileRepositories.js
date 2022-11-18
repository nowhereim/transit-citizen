const User = require('../schemas/user');

class ProfileRepositories {

    editProfileInfo_DB = async (
        snsId,
        nickname,
        representProfile,
        profileImage,
        statusmessage
    ) => {
            try {
                if( snsId ) {
                    const editedProfileData = await User.findOneAndUpdate(
                        { snsId },
                        { 
                            nickname, 
                            representProfile, 
                            profileImage, 
                            statusmessage  
                        }
                    );
                    return editedProfileData;
                } else {
                    throw new Error('snsId 값이 없으면 유저 프로필 정보를 수정할 수 없습니다');
                }
            } catch (error){
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
                throw new Error('snsId 값이 없으면 유저 프로필 정보를 삭제할 수 없습니다')
            }
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        }
    }

}

module.exports = ProfileRepositories;