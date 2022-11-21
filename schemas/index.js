var mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  mongoose.connect(
    process.env.MONGOOSE_URL,
    // "mongodb+srv://cipal:sipal@aso.2fruiog.mongodb.net/?retryWrites=true&w=majority",
    // "mongodb+srv://hello:hello123@cluster0.0k542js.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "ASOproject" },
    (error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다.");
  connect();
});

module.exports = connect;
