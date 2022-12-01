const multer = require("multer");

const storage = multer.memoryStorage();

const imagesUpload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png"|| file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('.png .jpg .jpeg 형식의 파일만 업로드 가능'));
        }
    }
}).fields([
    { name : 'representProfile', maxCount: 1 },
    { name : 'profileImage', maxCount: 5 }
]);

const representProfileUpload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png"|| file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('.png .jpg .jpeg 형식의 파일만 업로드 가능'));
        }
    }
}).single('representProfile');

module.exports = { 
    representProfileUpload, 
    imagesUpload 
}