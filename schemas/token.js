var mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    snsId: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, // data 생성 당시의 시간
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Token', userSchema);