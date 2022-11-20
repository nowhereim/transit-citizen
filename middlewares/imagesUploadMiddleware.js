const multer = require("multer");

const storage = multer.memoryStorage();

module.exports = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}).fields([
    { name : 'representProfile', maxCount: 1 },
    { name : 'profileImage', maxCount: 5 }
]);