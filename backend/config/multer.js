const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'.'+file.mimetype.split('/')[1])
    }
})

const upload = multer({storage})

module.exports = upload