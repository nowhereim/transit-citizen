const express = require("express");
const router = express.Router();
trainInfoControllers = require("../controllers/trainInfoControllers");
trainInfocontrollers = new trainInfoControllers();
router.post("/", trainInfocontrollers.createTrain);

module.exports = router;
