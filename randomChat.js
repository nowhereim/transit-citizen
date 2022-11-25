const server = require("./app");
const crypto = require("crypto");
const connect = require("./schemas");
connect();
require("dotenv").config();
const RedisMo = require("./sdFucntion");
const Preliminaryfunction = require("./dbpassFunction");
const redis = require("redis");
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

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const User = require("./schemas/user");

io.on("connection", (socket) => {
  socket.on("nickname", (nickname) => {
    console.log(nickname);
    socket["nickname"] = nickname;
  });

  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
  });

  socket.on("randomjoin", (msg) => {
    Preliminaryfunction.unset({ name: msg.nickname });
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
    Preliminaryfunction.set({ name: msg.nickname, location: socketjoinNumber });

    RedisMo.setArr({
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
    });

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
            repeatFunction({
              nickname: msg.nickname,
              name: name,
              roomkey: roomkey,
              train: train,
              debug: "debug line 158",
            });
            clearInterval(interval);
          }
          if (
            result[ranNum].nickName === msg.nickname &&
            result[ranNum] === 0
          ) {
            ranNum = ranNum + 1;
            const ranNum =
              userone + crypto.randomBytes(2).toString("hex") + usertwo;
            const name = result[ranNum].nickName;
            repeatFunction({
              nickname: msg.nickname,
              name: name,
              roomkey: roomkey,
              train: train,
              debug: "debug line 175",
            });
            clearInterval(interval);
          }
          if (
            result[ranNum].nickName === msg.nickname &&
            result[ranNum] !== 0 &&
            ranNum !== 0
          ) {
            const name = result[ranNum - 1].nickName;
            repeatFunction({
              nickname: msg.nickname,
              name: name,
              roomkey: roomkey,
              train: train,
              debug: "debug line 190",
            });
            clearInterval(interval);
          } else if (
            result[ranNum].nickName === msg.nickname &&
            result[ranNum] !== 0 &&
            ranNum === 0
          ) {
            const name = result[ranNum + 1].nickName;
            repeatFunction({
              nickname: msg.nickname,
              name: name,
              roomkey: roomkey,
              train: train,
              debug: "debug line 203",
            });
            clearInterval(interval);
          }
          clearInterval(interval);
        }
      });
      count = count + 1;
      if (count === 10) {
        io.emit(msg.nickname, {
          fail: "매칭 가능한 상대방이 없습니다. 다시 시도해주세요.",
        });
        clearInterval(interval);
        RedisMo.delarr(msg.nickname);
      }
    }, 5000);
    const repeatFunction = (value) => {
      User.updateOne(
        { nickname: value.name },
        { $unset: { location: "" } },
        (err, data) => {
          if (data.modifiedCount === 0) {
            return interval;
          } else {
            RedisMo.delarrTwo({ own: value.nickname, other: value.name });
            socket.join(value.roomkey);
            repeatEmit(value);
          }
        }
      );
    };
  });

  const repeatEmit = (value) => {
    io.emit(value.nickname, {
      roomkey: value.roomkey,
      ownself: value.nickname,
      fair: value.name,
      train: value.train,
      debug: value.debug,
    });
    io.emit(value.name, {
      msg: "매칭이 완료되었습니다. 채팅방으로 이동합니다.",
      roomkey: value.roomkey,
      fair: value.nickname,
      train: value.train,
      debug: value.debug,
    });
  };

  socket.on("persnalchat", (data) => {
    io.to(data.roomkey).emit("broadcast", {
      name: data.nickname,
      msg: data.msg,
    });
  });

  socket.on("joinFair", (data) => {
    Preliminaryfunction.unset({ name: data.name });
    socket.join(data.roomkey);
  });

  socket.on("disconnect", (data) => {
    RedisMo.delarr(socket["nickname"]);
  });
});
