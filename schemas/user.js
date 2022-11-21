var mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require("moment");
require("moment-timezone");
const now = moment().format("YYYY-MM-DD HH:mm:ss");

const userSchema = new Schema({
    snsId: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    representProfile: {
        type: String
    },
    profileImage: {
        type: Array
    },
    nickname: {
        type: String,
    },
    gender: {
        type: Boolean
    },
    statusmessage: {
        type: String
    },
    status: {
        type: String
    },
    createdAt: {
        type: String,
        defualt: now,
        required: true
    },
    updatedAt: {
        type: String,
        defualt: now,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);