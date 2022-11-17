require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(
    ``,
    { dbName : "ASOproject" }
    );
};

connect().catch((err) => console.log(err));


module.exports = connect;


