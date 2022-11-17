require('dotenv').config();


const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(
    //`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_SECURE}@${process.env.MONGODB_URL}`,
      `mongodb+srv://cipal:sipal@aso.2fruiog.mongodb.net/?retryWrites=true&w=majority`,
    { dbName : "ASOproject" }
    );
};

connect().catch((err) => console.log(err));


module.exports = connect;

