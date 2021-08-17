//initialize gridfs storage engine
const methodOverride = require('method-override');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const { appConfig } = require('../config');
const crypto = require('crypto');
const path = require('path');

//create storage engine
const { mongoUri } = appConfig;
const storage = new GridFsStorage({
    url: mongoUri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            //encrypt filename before storing it
            crypto.randomBytes(16, (err, buf) => {
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);

                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({storage})

module.exports = upload