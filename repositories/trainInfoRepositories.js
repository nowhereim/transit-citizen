const { TrainInfo } = require("../models");
console.log(123);

class TrainRepository {
  createTrain = async (
    trainplace,
    stationName,
    arrivalstation,
    appearance,
    trainNum,
    trainline
  ) => {
    console.log(stationName);
    const train = await TrainInfo.create({
      stationName: stationName,
      arrivalstation: arrivalstation,
      appearance: appearance,
      trainline: trainline,
      trainnumber: trainNum,
      trainplace: trainplace,
    });
    return train;
  };

  //   redis에 저장하기
  redis = async () => {
    const redis = require("redis");
    const client = redis.createClient({legacyMode: true});




    client.set("train", JSON.stringify(train));
    client.get("train", (err, data) => {
      console.log(JSON.parse(data));
    });
    client.quit();
  };
}
module.exports = TrainRepository;
