require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(
    `mongodb+srv://hello:hello123@cluster0.0k542js.mongodb.net/?retryWrites=true&w=majority`,
    { dbName : "ASOproject" }
    );
};

connect().catch((err) => console.log(err));


module.exports = connect;


