const UserServices = require('../services/userServices');

class userControllers {

    constructor() {
        this.userServices = new UserServices;
    } 

    getRepeuiredUserInfo = async(req, res) => {
        try {
            const { snsId } = res.locals.user;
            const representProfile = req.file.buffer;
            const { nickname, phoneNumber, gender } = req.body; 

            if ( !snsId || !representProfile ||!nickname || !phoneNumber || !gender ) {
                return res.status(400).send({ 
                    msg: "필수 정보는 모두 입력해주세요"
                });
            }

            await this.userServices.getUserRequiredProfile(
                snsId,
                representProfile
            );

            await this.userServices.createUserRequiredInfo(
                snsId,
                nickname,
                phoneNumber,
                gender
            );

            res.status(200).send({ 
                msg: "유저 필수 정보가 입력되었습니다."
            });

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userControllers;