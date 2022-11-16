const { User } = require('../models');
const { Op } = require("sequelize");

class AuthRepositories {

    // 데이터베이스에 유저 폰 번호, 인증번호 저장
    pushPhoneAuthData = async ({ phone, auth }) => {
        try {
            const createdData = await User.create({ phone, auth });
            return createdData;
        } catch (error) {
            throw error;
        }
    }

    // 데이터베이스에서 유저 정보 찾기
    findUserData = async ({ phone, auth }) => {
        try {
            const data = await User.findAll({ 
                where: {
                    [Op.and] : [{phone}, {auth}]
                }
            });
            return data;
        } catch (error) {
            throw Error('유저 정보 없음');
        }
    }


    // 데이터베이스 유저 정보 날리기
    destroyUserData = async ( phone ) => {
        try {
            await User.destroy({ where: { phone: phone }});
            return;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthRepositories;