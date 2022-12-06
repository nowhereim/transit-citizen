const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const Token = require("../schemas/token");

require("dotenv").config();

// 미들웨어 - 사용자인증 (sequelize 변경)
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res
      .status(401)
      .send({
        ok: 1,
        errorMessage: "비정상적인 활동이 감지되어 로그아웃됩니다(1).",
      });
    return;
  }

  try {
    const authResult = verify(authToken); // access token 검증 -> 위변조 없어야하며 + expired여야 함.

    if (authResult.message === "invalid signature") {
      // 위변조 검증
      res
        .status(401)
        .send({
          ok: 2,
          errorMessage: "비정상적인 활동이 감지되어 로그아웃됩니다(2-1).",
        });
      return;
    }

    const decoded = jwt.decode(authToken); // access token 디코딩하여 user의 정보를 가져옴. (만료되든 안되든 무조건 가져욤)

    if (decoded === null) {
      // 디코딩 결과가 없으면 권한이 없음을 응답. (=애시당초 잘못된 토큰)
      res
        .status(401)
        .send({
          ok: 2,
          errorMessage: "비정상적인 활동이 감지되어 로그아웃됩니다(2).",
        });
      return;
    }

    if (authResult.message === "jwt expired") {
      const refresh = await Token.findOne({ snsId: decoded.snsId });
      // console.log(refresh);
      const refreshResult = verify(refresh.refreshToken); // 최초에 회원가입(+로그인)에 성공했다면 refresh.refreshToken은 무조건 존재.
      // console.log(refreshResult);

      // console.log("리프레시 만료?", refreshResult.message);

      if (refreshResult.ok === false) {
        // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야. ()
        res
          .status(401)
          .send({
            ok: 3,
            errorMessage: "액세스만료, 리프레시만료. 로그아웃됩니다(3).",
          });
      } else {
        // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급 후 클라에게 반환.
        const token = await Token.findOne({ snsId: decoded.snsId });
        if (token.accessToken !== authToken) {
          // console.log("token.accessToken", token.accessToken);
          // console.log("authToken", authToken);

          res
            .status(401)
            .send({
              ok: 4,
              errorMessage:
                "만료된 토큰으로 한번만 재발급이 가능합니다. 로그아웃됩니다(4).",
            });
        } else {
          const newToken = jwt.sign(
            { snsId: decoded.snsId },
            process.env.SECRET_KEY,
            { expiresIn: "24h" },
          );
          await Token.updateOne(
            { snsId: decoded.snsId },
            { $set: { accessToken: newToken } },
          );
          await User.findOne({ snsId: decoded.snsId }).then((user) => {
            res.locals.user = { user: user, newToken: newToken };
            next();
          });
        }
      }
    } else {
      // 3. 액세스가 만료된 게 아니라면 (+위변조도 없어야) 무조건 로그인 허용.
      // console.log( "---통과--->", decoded.snsId);
      await User.findOne({ snsId: decoded.snsId }).then((user) => {
        res.locals.user = { user: user };
        next();
      });
    }
  } catch (err) {
    res
      .status(401)
      .send({ ok: 5, errorMessage: "로그인 후 이용 가능한 기능입니다(5)." });
  }
};

function verify(token) {
  // token 검증 (1.위변조 + 2.만료를 한번에 검증 / 위변조가 되어도 에러, 만료가 되어도 에러, 메세지는 다름.)
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
