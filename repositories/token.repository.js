const Token = require('../schemas/token');



class TokenRepository {
    
    getTokenInfo = async (snsId) => {
        const tokenInfo = await Token.findOne({ snsId: snsId });
        return tokenInfo;
    };
    
    createToken = async (snsId, token, refreshToken) => {
        await Token.create({ snsId: snsId, accessToken: token, refreshToken: refreshToken });
    };
    
    updateToken = async (snsId, token, refreshToken) => {
        await Token.updateOne({ snsId: snsId }, { $set: { accessToken: token, refreshToken: refreshToken } });
      };

}
  
module.exports = TokenRepository;