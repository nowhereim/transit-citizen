const server = require("../app");
const crypto = require("crypto");
const connect = require("../schemas");
const Redis = require("ioredis");
const redisClient = new Redis();
//{ host: "cache.amazonaws.com" },TODO: 위치 재설정중입니다. *태환
connect();
require("dotenv").config();
const Maching = require("../schemas/maching");
const User = require("../schemas/user");
const io = require("socket.io")(server, {
  cors: {
    origin: "*", //FIXME: 배포시에는 주소를 바꿔야합니다. *태환
    methods: ["GET", "POST"],
    credentials: true,
  },
  adapter: require("socket.io-redis")({
    pubClient: redisClient,
    subClient: redisClient.duplicate(),
  }),
});

//TODO: 배포시에는 console 전부 삭제해주시거나 가려주세요. *태환
io.on("connection", (socket) => {
  socket.on("nickname", (nickname) => {
    console.log(nickname);
    socket["nickname"] = nickname;
  });

  socket.on("leaveRoom", (roomName) => {
    console.log(roomName);
    socket.leave(roomName);
  });

  socket.on("counteruser", (data) => {
    User.findOne({ nickname: data.fair }, (err, user) => {
      console.log(user);
      if (user) {
        io.emit(data.ownself, user);
      } else {
        io.emit(data.ownself, "상대방 정보가 없습니다. 다시 확인해주세요.");
      }
    });
  });
  console.log(this);
  socket.on("hello", (date) => {
    console.log(date);
  });

  // TODO: 메모리 누수 발생가능성 재검토 *태환
  socket.on("randomjoin", (msg) => {
    try {
      const gender = msg.gender;
      const dropstation = msg.dropstation;
      const trainNum = msg.train;
      const trainline = trainNum.toString().slice(0, 1);
      const train = trainNum.toString().slice(1, 2);
      const trainNumthird = trainNum.toString().slice(2, 4);
      const socketjoinNumber = trainline + trainNumthird;
    } catch (e) {
      console.log(e + "randomjoin 데이터 형식 확인해주세요.");
    }

    if (trainNum.length !== 4) {
      socket.emit(msg.nickname, {
        msg: "열차 번호를 다시 확인해주세요.",
      });
      return;
    }
    socket.on("end", (msg) => {
      try {
        clearInterval(interval);
      } catch (e) {
        console.log(e + "there is no interval");
      }
    });

    socket.emit("maching", {
      msg: "매칭 중 입니다. 참여인원이 2인 이상이 되면 매칭이 시작됩니다.",
    });
    Maching.findOne({ nickname: msg.nickname }, (err, result) => {
      if (result === null) {
        Maching.create({
          nickname: msg.nickname,
          location: socketjoinNumber,
          dropstation: dropstation,
        });
      }
    });

    let count = 0;
    //TODO: 인터벌을 사용하지않고 매칭하는방법을 찾는중입니다. *태환
    const interval = setInterval(() => {
      Maching.find(
        {
          location: socketjoinNumber,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (err) {
              console.log(err);
            } else if (result.length >= 2) {
              machingFunction(result);
            }
          }
        },
      );
      count = count + 1;
      if (count === 10) {
        io.emit(msg.nickname, {
          fail: "매칭 가능한 상대방이 없습니다. 다시 시도해주세요.",
        });
        clearInterval(interval);
        Maching.deleteOne({ nickname: msg.nickname }, (err, data) => {});
      }
    }, 5000);
    // TODO: 메모리 누수 발생가능성 재검토필요!! *태환
    const machingFunction = (result) => {
      clearInterval(interval);
      const ranNum = Math.floor(Math.random() * result.length);
      const roomkey =
        ranNum + crypto.randomBytes(2).toString("hex") + socketjoinNumber;
      if (result[ranNum].nickname !== msg.nickname) {
        const name = result[ranNum].nickname;
        repeatFunction({
          nickname: msg.nickname,
          name: name,
          roomkey: roomkey,
          train: train,
          debug: "debug line 131",
        });
      }
      if (result[ranNum].nickname === msg.nickname && result[ranNum] === 0) {
        ranNum = ranNum + 1;
        const name = result[ranNum].nickname;
        repeatFunction({
          nickname: msg.nickname,
          name: name,
          roomkey: roomkey,
          train: train,
          debug: "debug line 142",
        });
      }
      if (
        result[ranNum].nickname === msg.nickname &&
        result[ranNum] !== 0 &&
        ranNum !== 0
      ) {
        const name = result[ranNum - 1].nickname;
        repeatFunction({
          nickname: msg.nickname,
          name: name,
          roomkey: roomkey,
          train: train,
          debug: "debug line 156",
        });
      } else if (
        result[ranNum].nickname === msg.nickname &&
        result[ranNum] !== 0 &&
        ranNum === 0
      ) {
        const name = result[ranNum + 1].nickname;
        repeatFunction({
          nickname: msg.nickname,
          name: name,
          roomkey: roomkey,
          train: train,
          debug: "debug line 169",
        });
      }
    };
    const repeatFunction = (value) => {
      Maching.deleteOne({ nickname: value.nickname }, (err, data) => {});
      Maching.deleteOne({ nickname: value.name }, (err, data) => {
        try {
          if (data.deletedCount === 0) {
            return interval;
          } else {
            socket.join(value.roomkey);
            repeatEmit(value);
          }
        } catch (error) {
          console.log(error + "deletedCount error line 184");
        }
      });
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
      profile: data.profile,
      name: data.nickname,
      msg: data.msg,
      url: data.url,
    });
  });

  socket.on("joinFair", (data) => {
    socket.join(data.roomkey);
  });

  socket.on("disconnect", (data) => {
    Maching.deleteOne({ nickname: socket["nickname"] }, () => {});
  });
});
