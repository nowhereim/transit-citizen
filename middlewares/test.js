const jwt = require("jsonwebtoken");
const { User } = require("../schemas/user.js");
const { Token } = require("../schemas/token.js");
require("dotenv").config();

// 미들웨어 - 사용자인증 (sequelize 변경)
module.exports = async (req, res, next) => {  // async 새로 넣었음.
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({errorMessage: "로그인 후 이용 가능한 기능입니다(0).",});
    return;
  }

  try {
    const authResult = verify(authToken); // access token 검증 -> expired여야 함.
    console.log(authResult);
    const decoded = jwt.decode(authToken); // access token 디코딩하여 user의 정보를 가져옴. (만료되든 안되든 무조건 가져욤)
    console.log(decoded);
    if (decoded === null) {  // 디코딩 결과가 없으면 권한이 없음을 응답. (= 애시당초 잘못된 토큰)
      res.status(401).send({errorMessage: "로그인 후 이용 가능한 기능입니다(1).",});
      return;
    }
    console.log("안녕");    
    if (authResult.ok === true) {      // 1. 액세스가 만료된 게 아니라면 무조건 로그인 허용.
        await User.findOne({ snsId: decoded.snsId }).then((user) => {
          res.locals.user = user;
          console.log(res.locals.user);
            next();
    });
          
    // 여기서부터는 무조건 액세스 만료     
    const refresh = await Token.findOne( { snsId: decoded.snsId } );
    const refreshResult = verify(refresh.refreshToken) // 최초에 회원가입(+로그인)에 성공했다면 refresh.refreshToken은 무조건 존재.
    // refreshToken이 삭제된 상태라면 여기서 에러를 잡아버림
    if (!refreshResult) { throw new Error ('로그인 후 이용 가능한 기능입니다(3).')};  
    console.log(refreshResult.ok);
        
    // 2. access token이 만료, refresh token도 만료 된 경우 => 새로 로그인해야.
    if (refreshResult.ok === false) {
        // try {
          await Token.deleteOne({ snsId: decoded.snsId }); // 또 같은 요청이 들어오면 에러날텐데? --> trycatch.
          res.status(401).send({ errorMessage: "로그인 후 이용 가능한 기능입니다(2).", });
        // } catch (error) {res.status(401).send({
        //   ok: false,
        //   message: "No authorized! 새로 로그인해주세요(2).",
        // }) };
      } else {
        // 3. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급 후 클라에게 반환.
        const newJwtToken = jwt.sign({ snsId: decoded.snsId }, process.env.SECRET_KEY, { expiresIn: "15s", });

        res.status(200).send({
          ok: true,
          data: {newJwtToken: newJwtToken},
        });
      }
    }
      
  } catch (err) {
    res.status(401).send({errorMessage: "로그인 후 이용 가능한 기능입니다(4).",});
  }
    
    
    
    
  function verify(token) { // token 검증
    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
      return {
        ok: true,
        snsId: decoded.snsId,
        role: decoded.role,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  }
};