const AWS = require("aws-sdk");
let s3 = new AWS.S3();

const deleteim = (req, res, next) => {
  console.log(req.body);
  const { key } = req.body;
  s3.deleteObject(
    {
      Bucket: "anths3", // 사용자 버켓 이름
      Key: `${key}`, // 버켓 내 경로
    },
    (err, data) => {
      if (err) {
        throw err;
      }
      console.log("s3 deleteObject ", data);
    }
  );
  next();
};

module.exports = deleteim;
