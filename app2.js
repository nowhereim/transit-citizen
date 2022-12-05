const express = require("express");
const routes = require("./routes");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
// const upload = require("./randomChat/upload");
// const deleteim = require("./randomChat/delete");
const connect = require("./schemas");
const cloudinaryConfig = require("./config/cloudconfig");
const authMiddleware = require("./middlewares/auth_middleware");
// const helmet = require("helmet");
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy({ setTo: "PHP 8.0.26" }));
// app.use(helmet.hsts());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());
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
  res.render("socket");
});

app.use("/", routes);

// app.get("/authbaby", authMiddleware, (req, res) => {
//   console.log("어스베이비 통과")// res.status(401).send("authbaby 정상요청되었습니다.");
// });
// app.post("/authbaby", authMiddleware, (req, res) => {
//   console.log("어스베이비 통과")
// });

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(3000, () => {
    console.log('서버오픈')
} )