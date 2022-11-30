const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  legacyMode: true,
});
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then();
const redisCli = redisClient.v4;
// redisClient.auth(process.env.redisAuth);
// redisCli.auth(process.env.redisAuth);

exports.delarr = async (value) => {
  try {
    redisClient.get("Arrtest", async (err, res) => {
      const arr = JSON.parse(res);
      const result = arr.filter((v) => v.nickName !== value);
      await redisClient.set(
        "Arrtest",
        JSON.stringify(result),
        (err, res) => {}
      );
    });
  } catch (e) {
    console.log("삭제 할 값이 없음");
  }
};
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

exports.setUser = async (value) => {
  redisClient.set(value.nickName, JSON.stringify(value), (err, res) => {
    if (err) {
      console.error(err);
    }
  });
};
