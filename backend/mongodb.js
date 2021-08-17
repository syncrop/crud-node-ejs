//Conexion a BBDD
const mongoose = require('mongoose');
const { appConfig } = require('./config');
const { mongoUri } = appConfig;

module.exports = { 
    connectdb, image, imageDelete, getGfsUpload
};

let gfs;

async function getGfsUpload(){
    return gfs;
}

async function connectdb() {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoUri,
            { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
        )
            .then(() => console.log('Base de datos conectada'))
            .catch(e => console.log('error: ' + e));
    
        const connect = mongoose.connection;
        connect.once('open', () => {
            gfs = new mongoose.mongo.GridFSBucket(connect.db, {
                bucketName: "uploads"
            });
            resolve(true);
        });
        connect.once('error', () => {
            console.log(error);
            reject(error);    
        });
    })
}

async function image(filename, res){
    return new Promise((resolve, reject) => {
        gfs.openDownloadStreamByName(filename).pipe(res)
            .then(() => resolve(true))
            .catch(() => reject(false));
    })
}

async function imageDelete(id, res){
    return new Promise((resolve, reject) => {
        gfs.delete({ _id: id }).then(() => {
            imageDelete(id, res);
            return res.status(200).json({
                success: true,
                message: `File with ID: ${id} deleted`,
                    });
                })
                .catch(err => { return res.status(500).json(err) });
    })
}

