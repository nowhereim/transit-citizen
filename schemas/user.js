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
    profileImage: {
        type: String,
        // required: true
    },
    phoneNumber: {
        type: String,
        // required: true
    },
    nickname: {
        type: String,
        // required: true
    },
    gender: {
        type: Boolean, // 남: 0, 여: 1
        // required: true    
    },
    status: {
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