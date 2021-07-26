const Mascota = require('../schemas/Mascota');
const ValidateForm = require('../schemas/validateForm');
const { appConfig } = require('../config');

const Ajv = require("ajv");
const ajv = new Ajv(); // Validador
const validate = ajv.compile(ValidateForm);

const mascotaService = require('../services/mascotaService');

exports.getMascotas = async (req, res) => {
    return await mascotaService.getMascotas()
        .then(resp => res.status(201).send({ mascotas: resp }))
        .catch(err => res.status(500).send({ msj: err }));

};

exports.getMascota = async (req, res) => {
    const id = req.params.id;

    return await mascotaService.getMascota(id)
        .then((resp => res.send({ mascota: resp })))
        .catch(err => res.status(500).send({ msj: err }));        
}

exports.postMascota = async (req, res) => {
    const {body, file} = req;
    const { host, port } = appConfig;
    const b = {...body, imagen: `${host}:${port}/public/${file.filename}`}
    const valid = validate(b);    

    if (!valid) res.status(500).send(validate.errors)
    else {
        await mascotaService.postMascota(b)
            .then(() => res.status(200).send({ msj: "OK" }))
            .catch(err => res.status(500).send({ msj: err }));
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