// const express = require("express");
// const app = express();
// const port = 3000;

// // const request = require("request"); // npm install request

// // const url = "https://api.github.com/users/username"; // replace username with your username
// // const SERVICE_KEY = 123; // replace 123 with your service key
// // const requestUrl = `${url}?serviceKey=${SERVICE_KEY}$seriesCd=01`; // replace 01 with your series code

// // request.get(requestUrl, (err, res, body) => {
// //   // request.get() is deprecated
// //   if (err) {
// //     // Handle error if any
// //     console.log(err); // Print the error if one occurred
// //   } else {
// //     // Print the response status code if a response was received
// //     console.log(body); // Print the HTML for the Google homepage.
// //   }
// // });


// const Http = require('http');
// const routes = require('./routes');
// const cors = require('cors');

// const http = Http.createServer(app);

// //app.config['JSON_AS_ASCII'] = False
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use(
//     cors({
//         origin: '*',
//     })
// );
// app.use('/', routes);

// // 좌석에 앉고싶은데 좌석이 없어서 불편한 사람들을 위한 프로그램
// //앉은사람이

// // 받은값 : 좌석번호, 좌석상태(앉았는지 안앉았는지)
// // 보낼값 : 좌석번호, 좌석상태(앉았는지 안앉았는지)
// // 좌석번호는 1~100까지 있음

// // const trainNum = 7343;
// // let X = String(trainNum).split("").slice(2).join("");
// // console.log(X);

// //

// //1.  핸드폰번호를 인증 하고 수집
// //2.  이후 소셜 로그인
// //3.  핸드폰번호와 소셜 로그인을 통한 회원가입
// //4.  jwt
// //5. 해당역,내리는역,해당역의칸번호,인상착의(자신의 위치 등록하기) 받아야함
// //6.  해당열차의 고유번호를 입력받아 호선, 열차번호, 칸 위치 로 쪼개도록 한다.

// // socketio 실시간 데이터 전송
// // s3 이미지 업로드
// // api 다량의데이터를 받아서 처리
// // redis 캐시

// // mysql2 데이터베이스
// // sequelize orm
// // nginx 로드밸런싱
// // https 적용

// // 백엔드 사이드 프로젝트 (webRTC)
// //swopenapi.seoul.go.kr/api/subway/sample/xml/realtimeStationArrival/1/5/%EA%B0%95%EB%82%A8

// http: app.listen(port, () => {
//   console.log(port);
// });

// module.exports = http;

const express = require('express');
const Http = require('http');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

const connect = require("./schemas");
connect();

// const passport = require('passport');
// const passportConfig = require('./passport');

const app = express();
const http = Http.createServer(app);
const port = 3000;

//app.config['JSON_AS_ASCII'] = False
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(passport.initialize());
// passportConfig;

app.use(
    cors({
        origin: '*',
    })
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', routes);

http.listen(port, () => {
    console.log(`열려라 서버~ : port ${port}`);
});

module.exports = http;
