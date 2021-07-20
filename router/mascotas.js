const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require('multer');
const Grid = require('gridfs-stream');
const mimeTypes = require('mime-types');
const router = express.Router();

const Mascota = require('../models/mascota'); //Modelo
const user = "user";
const pass = "NIwtZiLrTtoXADso";
const dbName = "veterinaria";
const uri = `mongodb+srv://user:NIwtZiLrTtoXADso@cluster0.ojlaz.mongodb.net/veterinaria?retryWrites=true&w=majority`;

const conn= mongoose.createConnection(uri);

// GET Mascotas
router.get('/', async(req, res) => {
    //1. Load the mongoose driver
    const mongooseDrv = require("mongoose");
    //2. Connect to MongoDB and its database
    mongooseDrv.connect(uri);
    //3. The Connection Object
    var connection = mongooseDrv.connection;
    if (connection !== "undefined") {
        console.log(connection.readyState.toString());
        //4. The Path object
        var path = require("path");
        //5. The grid-stream
        var grid = require("gridfs-stream");
        //6. The File-System module
        var fs = require("fs");
        //7.Read the video/image file from the videoread folder
        var filesrc = path.join(__dirname, "./uploads/example.png");
        //8. Establish connection between Mongo and GridFS
        Grid.mongo = mongooseDrv.mongo;
        //9.Open the connection and write file
        connection.once("open", async() => {
            // Init stream
            console.log("Connection Open");
            
            // res.render("mascotas", {
            //             arrayMascotas: arrayMascotasDB})
            var gfs = grid(conn.db, {useNewUrlParser: true, useUnifiedTopology: true});
            gfs.collection('public/uploads')
            // if (gfs) {
            //     console.log("entra")
            // }
        })
        const arrayMascotasDB = await Mascota.find()
        //Create storage engine
        const storage = new GridFsStorage({
            url: uri,
            file: (req, file) => new Promise((resolve, reject) => {
                crypto.getRandomValues(16, (err, buf) => {
                    if(err){
                        return reject(err);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'public/uploads'
                    };
                    resolve(fileInfo);
                });
            })
        });
        const upload = multer({storage});
        res.render("mascotas", {
                        arrayMascotas: arrayMascotasDB})
    }

    // try {   
    //     const arrayMascotasDB = await Mascota.find()
    //     // console.log(arrayMascotasDB)
    //     res.render("mascotas", {
    //         arrayMascotas: arrayMascotasDB
    //         // arrayMascotas: [
    //         //     {id: 'jfasdf', nombre: 'rex', descripcion: 'rex descripcion'},
    //         //     {id: 'asdf', nombre: 'chachan', descripcion: 'chachan descripcion'},
    //         //     {id: 'jfasdfasdf', nombre: 'toos', descripcion: 'toos descripcion'},
    //         // ]
    //     })

    // } catch (error) {
    //     console.log(error)
    // }    
})

// CREAR NUEVA MASCOTA
router.get('/crear', (req, res) => {
    res.render('crear');
});
// const storage = multer.diskStorage({
//     destination: 'uploads/',
//     filename: function(req,file,cb){
//         cb("", Date.now() + '.' + mimeTypes.extension(file.mimetype))
//     }
// });
// const upload = multer({
//     storage: storage
// });
// router.post('/', upload.single('imagen') , async (req, res) => {
//     req.body = {...req.body, 'imagen': req.file.path}
//     const body = req.body;
//     try {
//         // const mascotaDB = new Mascota(body);
//         // await mascotaDB.save();

//         await Mascota.create(body);

//         res.redirect('/mascotas')
//     } catch (error) {
//         console.log('error', error);
//     }
// })

router.get('/:id', async(req, res) => {

    const _id = req.params.id;

    try {
        const mascotaDB = await Mascota.findOne({_id: _id});

        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    } catch (error) {
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })
    }
})

router.delete('/:id', async(req,res) => {
    const _id = req.params.id;

    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: _id});

        if (mascotaDB) {
            res.json({
                estado: true,
                mensaje: 'Eliminado'
            })
        }else{
            res.json({
                estado: false,
                mensaje: 'Fallo eliminar'
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.put('/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;

    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(_id, body, { useFindAndModify: false});
        console.log(mascotaDB)

        res.json({
            estado: true,
            mensaje: "Editado"
        })
    } catch (error) {
        res.json({
            estado: false,
            mensaje: "No Editado"
        })
    }
})

module.exports = router;