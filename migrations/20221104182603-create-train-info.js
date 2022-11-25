"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TrainInfos", {
      trainId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      trainnumber: {
        type: Sequelize.INTEGER,
      },
      stationName: {
        type: Sequelize.STRING,
      },
      arrivalstation: {
        type: Sequelize.STRING,
      },
      appearance: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      trainplace: {
        type: Sequelize.INTEGER,
      },
      trainline: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TrainInfos");
  },
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
};
