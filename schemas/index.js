require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(
      `${process.env.MONGO}`,
    { dbName : "ASOproject" }
    );
};

connect().catch((err) => console.log(err));


module.exports = connect;