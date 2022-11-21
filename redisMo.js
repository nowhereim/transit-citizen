const redis = require("redis");
require("dotenv").config();

//* Redis 연결
const redisClient = redis.createClient({
  legacyMode: true,
}); // legacy 모드 반드시 설정 !!
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
// 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용
const redisCli = redisClient.v4;
// redisClient.auth(process.env.redisAuth);
// redisCli.auth(process.env.redisAuth);
// 객체로 받아서 redis에 저장하는 함수
// exports.setObj = (value) => {
//   redisClient.set("user", JSON.stringify(value), (err, res) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(res);
//     }
//   });
// };
// //단일 값 으로 저장 하는 함수
// exports.setkey = (value) => {
//   console.log(value.key + "이게뭐고");
//   redisClient.set(value.key, value.value, (err, res) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(res);
//     }
//   });
// };
// exports.setArrfair = async (value) => {
//   await redisClient.get(value.key, async (err, res) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const arr = JSON.parse(res);
//       const result = arr.filter((v) => v.nickName !== value.value.nickName);
//       result.push(value.value);
//       await redisClient.set("Arrtest", JSON.stringify(result), (err, res) => {
//         if (err) {
//           console.error(err);
//         } else {
//         }
//       });
//     }
//   });
// };

// exports.setArrown = async (value) => {
//   await redisClient.get(value.key, async (err, res) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const arr = JSON.parse(res);
//       const result = arr.filter(
//         (v) =>
//           v.nickName !== value.value.nickName &&
//           v.nickName !== value.value2.nickName
//       );
//       result.push(value.value, value.value2);
//       await redisClient.set("Arrtest", JSON.stringify(result), (err, res) => {
//         if (err) {
//           console.error(err);
//         } else {
//           // console.log("이거 왜 안되는 건교? ㅅㅂ");
//         }
//       });
//     }
//   });
// };

// exports.setArrfair = async (value) => {
//   await redisClient.get(value.key, async (err, res) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const arr = JSON.parse(res);
//       const result = arr.filter((v) => v.nickName !== value.value.nickName);
//       result.push(value.value);
//       await redisClient.set("Arrtest", JSON.stringify(result), (err, res) => {
//         if (err) {
//           console.error(err);
//         } else {
//         }
//       });
//     }
//   });
// };
// // const result = arr.filter(
// //   (v) => v.nickName !== value.own && v.nickName !== value.other
// // );
// // 기존 내용을 가져와서 삭제하고 다시 저장하는 방식
// exports.addArr = (value) => {
//   console.log(value.value.nickName + "addArr이게 넘어오는 벨류값 입니다.");
//   redisClient.get("Arrtest", (err, res) => {
//     const arr = JSON.parse(res);
//     const result = arr.filter((v) => v.nickName !== value.value.namnickNamee);
//     result.push(value.value);
//     redisClient.set("Arrtest", JSON.stringify(result), (err, res) => {});
//   });
// };

// exports.findFair = (value) => {
//   redisClient.get("Arrtest", (err, res) => {
//     const arr = JSON.parse(res);
//     const result = arr.filter((v) => v.socketjoinNumber === value);
//     console.log(result.length);
//   });
// };
// //필터메소드로 찾아서 삭제 맵은 null값이 들어가서 안됨
exports.delarr = async (value) => {
  try {
    redisClient.get("Arrtest", async (err, res) => {
      // console.log(value + "여기 잘 봐라 이름 <<<<<<<<<<<<<<");
      const arr = JSON.parse(res);
      const result = arr.filter((v) => v.nickName !== value);
      await redisClient.set(
        "Arrtest",
        JSON.stringify(result),
        (err, res) => {}
      );
      // console.log(value + "<<<<<<<<<<<<<<<<< delarr 삭제 완료");
    });
  } catch (e) {
    console.log("삭제 할 값이 없음");
  }
};
// redis의 기존 벨류에 새로운 벨류를 추가하는 함수
exports.setArr = async (value) => {
  redisClient.get(value.key, async (err, res) => {
    if (err) {
      console.error(err);
    } else {
      let arr = JSON.parse(res);
      if (arr.length === 0) {
        await redisClient.set(
          value.key,
          JSON.stringify([value.value]),
          (err, res) => {
            if (err) {
              console.error(err);
            }
          }
        );
      } else {
        const result = arr.reduce((acc, cur) => {
          if (cur.nickName !== value.value.nickName) {
            return [value.value, cur];
          } else {
            return arr;
          }
        }, []);
        await redisClient.set(value.key, JSON.stringify(result), (err, res) => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  });
};

exports.delarrTwo = async (value) => {
  try {
    redisClient.get("Arrtest", async (err, res) => {
      const arr = JSON.parse(res);
      const result = arr.reduce((acc, cur) => {
        return cur.nickName !== value.own && value.other ? [cur] : [];
      }, []);
      await redisClient.set(
        "Arrtest",
        JSON.stringify(result),
        (err, res) => {}
      );
    });
  } catch (e) {
    console.log(e + "삭제 할 값이 없음");
  }
};

//redis를 깃허브에서 윈도우에 다운로드하고 그리고 설치하고
//사용해야 에러가 안난다 시바거
