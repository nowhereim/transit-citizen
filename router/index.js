const express = require("express");
const router = express.Router();
const train = require("./train");

router.use("/train", train);

module.exports = router;
