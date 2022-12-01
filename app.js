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
  res.render("socket");
});
app.use("/", routes);

app.get("/authbaby", authMiddleware, (req, res) => {
  res.send("authbaby success");
});

app.post("/uploadFile", (req, res) => {
  upload.single("image")(req, res, (err) => {
    console.log(req.body);
    res.status(201).send({ name: req.body.name, img: res.req.file.location });
  });
});

app.post("/deleteFile", (req, res) => {
  deleteim(req, res, () => {
    res.status(201).send("deleted");
  });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = server;
