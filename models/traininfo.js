"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TrainInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TrainInfo.init(
    {
      trainId: DataTypes.INTEGER,
      trainnumber: DataTypes.INTEGER,
      stationName: DataTypes.STRING,
      arrivalstation: DataTypes.STRING,
      appearance: DataTypes.STRING,
      trainplace: DataTypes.INTEGER,
      trainline: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TrainInfo",
    }
  );
  return TrainInfo;
};
