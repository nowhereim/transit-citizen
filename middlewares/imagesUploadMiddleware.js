const multer = require("multer");

const storage = multer.memoryStorage();

const imagesUpload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}).fields([
    { name : 'representProfile', maxCount: 1 },
    { name : 'profileImage', maxCount: 5 }
]);

const representProfileUpload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}).single('representProfile');

module.exports = { 
    representProfileUpload, 
    imagesUpload 
}