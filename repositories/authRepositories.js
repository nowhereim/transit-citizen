const Auth = require('../schemas/auth');

class AuthRepositories {

    findUserData = async ({ phoneNumber, authCode }) => {
        try {
            const data = await Auth.findOne({ phoneNumber,authCode });
            return data;
        } catch (error) {
            throw Error('유저 정보 없음');
        }
    }

    destroyUserData = async ( phoneNumber ) => {
        try {
            await Auth.deleteOne({ phoneNumber }); 
            return;
        } catch (error) {
            throw error;
        }
    }

    pushPhoneAuthData = async ( phoneNumber, authCode ) => {
        try {
            await Auth.create( phoneNumber, authCode );
            return;
        } catch (error) {
            throw error;
        }
    }

    

}

module.exports = AuthRepositories;