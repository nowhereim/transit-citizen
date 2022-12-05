const Token = require('../schemas/token');
const Token_local = require('../schemas/token_local');


class TokenRepository {
    
    getTokenInfo = async (userId) => {
        const tokenInfo = await Token_local.findOne({ userId: userId });
        return tokenInfo;
    };
    
    createToken = async (userId, token, refreshToken) => {
        await Token_local.create({ userId: userId, accessToken: token, refreshToken: refreshToken });
    };
    
    updateToken = async (userId, token, refreshToken) => {
        await Token_local.updateOne({ userId: userId }, { $set: { accessToken: token, refreshToken: refreshToken } });
      };

}
  
module.exports = TokenRepository;