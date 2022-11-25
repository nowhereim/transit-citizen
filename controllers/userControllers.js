const UserServices = require('../services/userServices');
const phoneNumberCheck = /^(010)([0-9]{4})([0-9]{4})$/;

class userControllers {

    constructor() {
        this.userServices = new UserServices;
    } 

    getRepeuiredUserInfo = async(req, res) => {
        try {
            const { snsId } = res.locals.user;
            const representProfile = req.file.buffer;
            const { nickname, phoneNumber, gender } = req.body; 

            if ( !snsId || !nickname || !phoneNumber || !gender ) {
                return res.status(400).send({ 
                    msg: "필수 정보는 모두 입력해주세요"
                });
            }

            if (phoneNumber.search(phoneNumberCheck) === -1 ) {
                return res
                    .status(400)
                    .send({ error: '잘못된 형식입니다' });
            }

            const userNicknameCheck = await this
                                            .userServices
                                            .checkIsSameUser( nickname );
            if ( userNicknameCheck === false ) {
                return res.status(400).send({
                    error: "중복된 유저입니다."
                });
            }

            if ( phoneNumber.search(phoneNumberCheck) === -1) {
                return res.status(400).send({
                    error: "잘못된 형식의 폰 번호 입니다."
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
            res.status(400).send({ error: "필수 정보를 모두 입력해주세요"});
            console.log(error);
        }
    }
}

module.exports = userControllers;