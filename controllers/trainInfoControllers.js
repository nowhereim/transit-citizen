const TrainService = require("../services/trainInfoServices");

class Traincontroller {
  // 인스턴스 생성
  trainservice = new TrainService();

  createTrain = async (req, res) => {
    const { trainNumber, stationName, arrivalstation, appearance } = req.body;
    const trainservice = await this.trainservice.createTrain(
      trainNumber,
      stationName,
      arrivalstation,
      appearance
    );
    console.log(trainservice);
    res.status(200).json({ message: trainservice });
  };
}

module.exports = Traincontroller;
