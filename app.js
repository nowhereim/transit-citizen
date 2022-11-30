const express = require("express");
const Http = require("http");
const routes = require("./routes");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const upload = require("./upload");
const deleteim = require("./delete");
const connect = require("./schemas");
const cloudinaryConfig = require("./config/cloudconfig");
const authMiddleware = require("./middlewares/auth_middleware.js");
require("dotenv").config();
connect();

// app.use(cors());

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

app.use("/", routes);

app.get("/", (req, res) => {
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

module.exports = server;
