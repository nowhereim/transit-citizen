const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const upload = require("./upload");
const deleteim = require("./delete");
require("dotenv").config();

app.use(cors());

app.engine("ejs", require("ejs").__express);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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
