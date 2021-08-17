const Mascota = require('../schemas/Mascota');
const Image = require('../schemas/Image');
const ValidateForm = require('../schemas/validateForm');
const { appConfig } = require('../config');

const Ajv = require("ajv");
const ajv = new Ajv(); // Validador
const validate = ajv.compile(ValidateForm);

const mascotaService = require('../services/mascota.service');

exports.getMascotas = async (req, res) => {
    return await mascotaService.getMascotas()
        .then(resp => res.status(201).send({ mascotas: resp }))
        .catch(err => res.status(500).send({ msj: err }));

};

exports.getMascota = async (req, res) => {
    const id = req.params.id;
    try {
        const resp = await mascotaService.getMascota(id);
        res.status(200).send(resp);
    } catch (err) {
        res.status(500).send({ msj: err })
    }
}

exports.postMascota = async (req, res) => {
    const { body } = req;
    const valid = validate(body);
    if (!valid) res.status(500).send(validate.errors)
    else {
        try {
            const resp = await mascotaService.postMascota(body);
            res.status(201).send(resp)
        } catch (err) {
            res.status(500).send({ msj: err })
        }

    }
}

exports.deleteMascota = async (req, res) => {
    const _id = req.params.id;

    await mascotaService.deleteMascota(_id)
        .then(() => res.send({
            state: true,
            msj: "Eliminado"
        }))
        .catch(() => res.state(500).send({
            state: false,
            msj: "No Editado"
        }));
}

exports.putMascota = async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const valid = validate(body);
    if (!valid) res.status(500).send(validate.errors)
    else {
        await mascotaService.putMascota(_id, body)
            .then(() => res.send({
                state: true,
                msj: "Editado"
            }))
            .catch(() => res.state(500).send({
                state: false,
                msj: "No Editado"
            }));

    }
}

exports.uploadImageMascota = async (req, res) => {
    const _id = req.params.id;
    const { file } = req;
    const { host, port } = appConfig;

    const b = { imagen: `${host}:${port}/public/${file.filename}` }

    try {
        const resp = await mascotaService.uploadImage(_id, b);
        res.status(201).send(resp)
    } catch (err) {
        res.status(500).send({ msj: err })
    }
}



// GRIDF
exports.gridf = async (req, res, next) => {
    // check for existing images


    let newImage = new Image({
        caption: req.body.caption,
        filename: req.file.filename,
        fileid: req.file.id
    });

    newImage.save().then(image => {
        res.status(200).json({
            success: true,
            image
        });
    }).catch(err => res.status(500).json(err));

}

exports.getGridf = async (req, res, next) => {
    Image.find((err, files) => {
        if (!files || files.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No files available"
            });
        }
        files.map(file => {
            if (file.contentType === 'image/jpeg'
                || file.contentType === 'image/png'
                || file.contentType === 'image/jpg'
                || file.contentType === 'image/svg+xml') {
                file.isImage = true
            } else {
                file.isImage = false;
            }
        });

        res.status(200).json({
            success: true,
            files
        })
    })
}
let { image, imageDelete } = require('../mongodb');
exports.getImage = async (req, res, next) => {
    Image.find((err, files) => {
        if (!files || files.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No files available"
            });
        }
        console.log(files[0])

        // render image to browser
        image(req.params.filename, res)

    })
}

exports.deleteImage = async (req, res) => {
    imageDelete(req.params.id, res);
    // Image.findOne({ _id: req.params.id })
    // .then((image) => {
    //     if (image) {
    //         Image.deleteOne({ _id: req.params.id })
    //         .then(() => {
    //             return res.status(200).json({
    //                 success: true,
    //                 message: `File with ID: ${req.params.id} deleted`,
    //                     });
    //                 })
    //                 .catch(err => { return res.status(500).json(err) });
    //         } else {
    //             res.status(200).json({
    //                 success: false,
    //                 message: `File with ID: ${req.params.id} not found`,
    //             });
    //         }
    //     })
    //     .catch(err => res.status(500).json(err));
}