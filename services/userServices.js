const cloudinary = require("cloudinary");
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const userRepositories = require('../repositories/userRepositories');


class userServices {

    constructor() {
        this.userRepositories = new userRepositories;
    }

    createUserRequiredInfo = async ( snsId, nickname, phoneNumber, gender ) => {
        try {
            if ( snsId ) {
                const createdUserInfoData = await this.userRepositories.createUserInfo_DB(
                    snsId,
                    nickname,
                    phoneNumber,
                    gender
                );
                return createdUserInfoData;
            } else {
                throw new Error('snsId 값이 없으면 유저 정보를 조회할 수 없습니다');
            }
        } catch (error) {
            console.log(error);
        }
    }

    getUserRequiredProfile = async ( snsId, representProfile ) => {
        try {
            if ( snsId ) {
                const refile = parser.format('.png', representProfile).content;

                cloudinary.v2.uploader.upload( refile, async (error, result) => {
                    if ( error ) {
                        throw new Error('이미지 업로드 불가');
                    };

                    const createdUserInfoData = await this.userRepositories.createUserRequiredProfile_DB(
                        snsId,
                        result.url
                    );
                    return createdUserInfoData
                });
            } else {
                throw new Error('snsId 값이 없으면 유저 정보를 조회할 수 없습니다');
            }
        } catch (error) {
            console.log(error);
        }
    }

    checkIsSameUser = async ( nickname ) => {
        try { 
            if (nickname) {
                const data = await this.userRepositories.isSameUser_DB(nickname);
                if ( data !== null ) return false;
                return;
            }
        } catch (error) {
            throw new Error('nickname이 정의되지 않았습니다');
        }
    }
}

module.exports = userServices;