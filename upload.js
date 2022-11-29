const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
require("dotenv").config();
AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();
const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
  ".txt",
  ".zip",
  ".hwp",
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".txt",
  ".cmd",
  ".MP4",
];
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "anths3",
    key: (req, file, callback) => {
      // 파일 이름 설정
      const uploadDirectory = "myproject"; // 폴더명
      const extension = path.extname(file.originalname); // 확장자
      console.log(extension);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("허용되지 않은 확장자입니다."));
      }
      callback(null, `${uploadDirectory}/${Date.now().toString()}${extension}`);
    },
    acl: "public-read-write",
  }),
});

module.exports = upload;
