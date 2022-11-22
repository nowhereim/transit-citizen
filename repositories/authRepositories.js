const Auth = require('../schemas/auth');

class AuthRepositories {

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