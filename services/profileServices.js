const cloudinary = require("cloudinary");
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const ProfileRepositories = require('../repositories/profileRepositories');

class ProfileServices {

    constructor() {
        this.profileRepository = new ProfileRepositories();
    }

    editUserProfileInfo = async ( snsId, nickname, statusmessage ) => {
        try {
            if ( snsId && nickname ) {
                const dbProfileInfo = await this.profileRepository.editProfileInfo_DB(
                    snsId,
                    nickname,
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

    editUserImageProfileInfo = async ( snsId, representProfile, profileImage ) => {
        try {

            if ( !snsId ) {
                throw new Error('필수 필드 값이 비어있습니다 :: profileServices.js');
            }

            if ( !profileImage && !representProfile ) { 
                // profileImage === [] && representProfile === null
                const dbImageProfileInfo 
                    = await this.profileRepository.findProfileInfo_DB( snsId );
                return dbImageProfileInfo;
            }

            if ( representProfile || profileImage ) {

                const representProfileBuffer = representProfile[0].buffer;
                const refile = parser.format('.png', representProfileBuffer).content;
                const urls = [];
                var i = 0;

                cloudinary.v2.uploader.upload( refile, async (error, result) => {
                    if ( error ) {
                        throw new Error('이미지 업로드 불가');
                    };

                    await this.profileRepository.editRepresentProfileInfo_DB( 
                        snsId,
                        result.url
                    );

                });
                

                await ( async function() {
                    for (const file of profileImage) {
                        i++
                        const buffer = file.buffer;
                        const refiles = parser.format('.png', buffer).content;

                        await cloudinary.v2.uploader.upload( refiles, async (error, result) => {

                            if(error) {
                                return res.send(error.message);
                            }
                            urls.push( result.url );
                        });
                    }
                })();
                
                const dbImageProfileInfo = await this.profileRepository.editProfileImageInfo_DB(
                    snsId,
                    urls
                );

                return dbImageProfileInfo;
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