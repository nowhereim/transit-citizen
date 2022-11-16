const jwt = require("jsonwebtoken");
const { User } = require("../schemas/user");
const { Token } = require("../schemas/token");
require("dotenv").config();

// 미들웨어 - 사용자인증 (sequelize 변경)
module.exports = async (req, res, next) => {  // async 새로 넣었음.
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다(1).",
    });
    return;
  }

  try {
    // const { userId, nickname }  = jwt.verify(authToken, process.env.SECRET_KEY); // 토큰이 만료되어도 에러가 아니므로 이부분 빼야.

    const authResult = verify(authToken); // access token 검증 -> expired여야 함.
    const decoded = jwt.decode(authToken); // access token 디코딩하여 user의 정보를 가져옴. (만료되든 안되든 무조건 가져욤)

    if (decoded === null) {  // 디코딩 결과가 없으면 권한이 없음을 응답. (=애시당초 잘못된 토큰)
      res.status(401).send({ ok: false, message: "No authorized!" });
      return;
    }
      
    // 리팩터링 전입니다!!
    const refresh = await Token.findOne( { snsId: decoded.snsId } );
    const refreshResult = verify(refresh.refreshToken) // 최초에 회원가입(+로그인)에 성공했다면 refresh.refreshToken은 무조건 존재.
    // refreshToken이 삭제된 상태라면 여기서 에러를 잡아버림
    
    // 재발급을 위해서는 access token이 만료되어 있어야.
    if (authResult.message === "jwt expired") {
      // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야.
      console.log(refreshResult.ok);
      if (refreshResult.ok === false) {
        try {
          await Token.deleteOne({ snsId: decoded.snsId }); // 또 같은 요청이 들어오면 에러날텐데? -> trycatch.
          res.status(401).send({
            ok: false,
            message: "No authorized! 새로 로그인해주세요(1).",
          });
        } catch (error) {res.status(401).send({
          ok: false,
          message: "No authorized! 새로 로그인해주세요(2).",
        }) };
      } else {
        // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급 후 클라에게 반환.
        const newToken = jwt.sign({ snsId: decoded.snsId }, process.env.SECRET_KEY, { expiresIn: "1h", });

        res.status(200).send({
          ok: true,
          data: {newToken: newToken},
        });
      }
    } else {
      // 3. 액세스가 만료된 게 아니라면 무조건 로그인 허용.
      User.findOne({ snsId: decoded.snsId }).then((user) => {
        res.locals.user = user;
        next();
      });
    }
      
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다(2).",
    });
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