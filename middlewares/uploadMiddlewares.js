const multer = require("multer");

const storage = multer.memoryStorage();

const profileUploads = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }
}).fields([
    { name : 'pinnedProfile', maxCount: 1 },
    { name : 'profileImage', maxCount: 4 }
]);

module.exports = profileUploads;