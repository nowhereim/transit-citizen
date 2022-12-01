const express = require("express");
const Http = require("http");
const routes = require("./routes");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const upload = require("./randomChat/upload");
const deleteim = require("./randomChat/delete");
const connect = require("./schemas");
const cloudinaryConfig = require("./config/cloudconfig");
const authMiddleware = require("./middlewares/auth_middleware.js");
const helmet = require("helmet");
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy({ setTo: "PHP 8.0.26" }));
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
require("dotenv").config();
connect();
app.use(cors());

app.engine("ejs", require("ejs").__express);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(function (req, res, next) {
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": req.headers.origin,
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers":
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authorization, refreshToken, cache-control",
  });
  next();
});

app.use(cloudinaryConfig);

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.render("socket"); // socket.ejs
});

// app.use(helmet());
// app.use(helmet.contentSecurityPolicy()); //contentSecurityPolicy의 역할은 바로 브라우저가 로딩하는 리소스를 제한하는 것이다. 이를 통해 XSS, 클릭재킹, 데이터 인젝션 등의 공격을 방어할 수 있다.
// app.use(helmet.frameguard()); // frameguard의 역할은 X-Frame-Options 헤더를 설정하는 것이다. 이 헤더는 페이지가 iframe 안에 포함되는 것을 막아준다. 이는 클릭재킹 공격을 방지하는데 도움이 된다.
// app.use(helmet.hsts()); //hsts의 역할은 Strict-Transport-Security 헤더를 설정하는 것이다. 이 헤더는 HTTPS를 사용하는 동안에만 웹사이트에 접근할 수 있도록 한다. 이는 중간자 공격을 방지하는데 도움이 된다.
// app.use(helmet.xssFilter()); //xssFilter의 역할은 X-XSS-Protection 헤더를 설정하는 것이다. 이 헤더는 브라우저가 XSS 공격을 감지하고 방어하는 것을 허용하도록 한다.
app.use("/", routes);

app.get("/authbaby", authMiddleware, (req, res) => {
  res.send("authbaby success");
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

module.exports = server;
