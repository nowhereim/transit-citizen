require('dotenv').config();

const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_SECURE}@${process.env.MONGODB_URL}`,
    { dbName : "ASO" }
    );
};

connect().catch((err) => console.log(err));

module.exports = connect;