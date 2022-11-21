const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const server = require("http").createServer(app);
const crypto = require("crypto");
const connect = require("./schemas");
connect();
require("dotenv").config();
const RedisMo = require("./redisMo");
const redis = require("redis");
const upload = require("./upload");
const deleteim = require("./delete");
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
app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.engine("ejs", require("ejs").__express);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // 메인 페이지
  res.render("socket"); // socket.ejs
});

app.post("/uploadFile", (req, res) => {
  upload.single("image")(req, res, (err) => {
    res.status(201).send("uploaded");
  });
});

app.post("/deleteFile", (req, res) => {
  deleteim(req, res, () => {
    res.status(201).send("deleted");
  });
});

const User = require("./schemas/user");

io.on("connection", (socket) => {
  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });

  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
  });

  socket.on("randomjoin", async (msg) => {
    User.updateOne(
      { nickname: msg.nickname },
      { $unset: { location: "" } },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    socket.on("end", (msg) => {
      try {
        clearInterval(interval);
      } catch (e) {
        console.log(e + "there is no interval");
      }
    });
    const gender = msg.gender;
    const dropstation = msg.dropstation;
    const trainNum = msg.train;
    const trainline = trainNum.toString().slice(0, 1);
    const train = trainNum.toString().slice(1, 2);
    const trainNumthird = trainNum.toString().slice(2, 4);
    const socketjoinNumber = trainline + trainNumthird;

    socket.emit("maching", {
      msg: "매칭 중 입니다. 참여인원이 2인 이상이 되면 매칭이 시작됩니다.",
    });

    //redis ttl 설정
    User.updateOne(
      { nickname: msg.nickname },
      { $set: { location: socketjoinNumber } },
      (err, data) => {
        if (err) {
          console.log(err);
        }
      }
    );
    RedisMo.setArr(
      {
        key: "Arrtest",
        value: {
          gender: gender,
          dropstation: dropstation,
          nickName: msg.nickname,
          trainSection: train,
          socketjoinNumber: socketjoinNumber,
          roomkey: "",
          fair: "",
        },
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    let count = 0;
    const interval = setInterval(() => {
      redisClient.get("Arrtest", (err, res) => {
        const arr = JSON.parse(res);
        const result = arr.reduce((acc, cur) => {
          if (cur.socketjoinNumber === socketjoinNumber && cur.fair === "") {
            acc.push(cur);
          }
          return acc;
        }, []);
        if (err) {
          console.log(err);
        } else if (result.length >= 2) {
          const ranNum = Math.floor(Math.random() * result.length);
          const roomkey =
            ranNum + crypto.randomBytes(2).toString("hex") + socketjoinNumber;
          if (result[ranNum].nickName !== msg.nickname) {
            const name = result[ranNum].nickName;
            User.updateOne(
              { nickname: name },
              { $unset: { location: "" } },
              (err, data) => {
                if (data.modifiedCount === 0) {
                  clearInterval(interval);
                  return interval;
                } else {
                  RedisMo.delarrTwo({ own: msg.nickname, other: name });
                  socket.join(roomkey);
                  io.emit(msg.nickname, {
                    roomkey: roomkey,
                    ownself: msg.nickname,
                    fair: name,
                    train: train,
                    debug: " mached part 1",
                  });
                  io.emit(name, {
                    msg: "매칭이 완료되었습니다. 채팅방으로 이동합니다.",
                    roomkey: roomkey,
                    fair: msg.nickname,
                    train: train,
                    debug: "1번 에밋 부분",
                  });
                  User.updateOne(
                    { nickname: msg.nickname },
                    { $unset: { location: "" } },
                    (err) => {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                  clearInterval(interval);
                }
              }
            );
          }
          if (
            result[ranNum].nickName === msg.nickname &&
            result[ranNum] === 0
          ) {
            ranNum = ranNum + 1;
            const ranNum =
              userone + crypto.randomBytes(2).toString("hex") + usertwo;

            User.updateOne(
              { nickname: result[ranNum].nickName },
              { $unset: { location: "" } },
              (err, data) => {
                if (data.modifiedCount === 0) {
                  clearInterval(interval);
                  return interval;
                } else {
                  RedisMo.delarrTwo({
                    own: msg.nickname,
                    other: result[ranNum].nickName,
                  });
                  socket.join(roomkey);
                  io.emit(msg.nickname, {
                    roomkey: roomkey,
                    fair: result[ranNum].nickName,
                    train: train,
                    debug: " mached part 2",
                  });
                  io.emit(result[ranNum].nickName, {
                    msg: "매칭이 완료되었습니다. 채팅방으로 이동합니다.",
                    roomkey: roomkey,
                    fair: msg.nickname,
                    train: train,
                    debug: " mached part 2",
                  });
                  User.updateOne(
                    { nickname: msg.nickname },
                    { $unset: { location: "" } },
                    (err) => {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                  clearInterval(interval);
                }
              }
            );
          }
          if (
            result[ranNum].nickName === msg.nickname &&
            result[ranNum] !== 0 &&
            ranNum !== 0
          ) {
            const name = result[ranNum - 1].nickName;
            User.updateOne(
              { nickname: name },
              { $unset: { location: "" } },
              (err, data) => {
                if (data.modifiedCount === 0) {
                  clearInterval(interval);
                  return interval;
                } else {
                  RedisMo.delarrTwo({ own: msg.nickname, other: name });
                  socket.join(roomkey);
                  io.emit(msg.nickname, {
                    roomkey: roomkey,
                    ownself: msg.nickname,
                    fair: name,
                    train: train,
                    debug: " mached part 3",
                  });
                  io.emit(name, {
                    msg: "매칭이 완료되었습니다. 채팅방으로 이동합니다.",
                    roomkey: roomkey,
                    fair: msg.nickname,
                    train: train,
                    debug: " mached part 3",
                  });
                  User.updateOne(
                    { nickname: msg.nickname },
                    { $unset: { location: "" } },
                    (err) => {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                  clearInterval(interval);
                }
              }
            );
          } else if (
            result[ranNum].nickName === msg.nickname &&
            result[ranNum] !== 0 &&
            ranNum === 0
          ) {
            const name = result[ranNum + 1].nickName;
            User.updateOne(
              { nickname: result[ranNum].nickName },
              { $unset: { location: "" } },
              (err, data) => {
                if (data.modifiedCount === 0) {
                  clearInterval(interval);
                  return interval;
                } else {
                  RedisMo.delarrTwo({ own: msg.nickname, other: name });
                  socket.join(roomkey);
                  io.emit(msg.nickname, {
                    roomkey: roomkey,
                    ownself: msg.nickname,
                    fair: name,
                    train: train,
                    debug: " mached part 4",
                  });
                  io.emit(name, {
                    msg: "매칭이 완료되었습니다. 채팅방으로 이동합니다.",
                    roomkey: roomkey,
                    fair: msg.nickname,
                    train: train,
                    debug: " mached part 4",
                  });
                  User.updateOne(
                    { nickname: msg.nickname },
                    { $unset: { location: "" } },
                    (err) => {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                  clearInterval(interval);
                }
              }
            );
          }
          clearInterval(interval);
        }
      });
      count = count + 1;
      if (count === 5) {
        io.emit(msg.nickname, {
          fail: "매칭 가능한 상대방이 없습니다. 다시 시도해주세요.",
        });
        clearInterval(interval);
        RedisMo.delarr(msg.nickname);
      }
    }, 5000);
  });

  socket.on("persnalchat", (data) => {
    io.to(data.roomkey).emit("broadcast", {
      name: data.nickname,
      msg: data.msg,
    });
  });

  socket.on("joinFair", (data) => {
    User.updateOne(
      { nickname: data.name },
      { $unset: { location: "" } },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    socket.join(data.roomkey);
  });

  socket.on("disconnect", (data) => {
    RedisMo.delarr(socket["nickname"]);
  });
});

server.listen(port, () => {});
