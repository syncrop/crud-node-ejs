const Mascota = require('../schemas/mascota');
const ValidateForm = require('../schemas/validateForm');
const Ajv = require("ajv");
const ajv = new Ajv(); // Validador
const validate = ajv.compile(ValidateForm);

exports.getMascotas = async (req, res) => {
    await Mascota.find()
        .then(resp => res.send({ mascotas: resp }))
        .catch(err => res.status(500).send({ msj: err }))
};

exports.postMascota = async (req, res) => {
    const body = req.body;
    const valid = validate(body);
    if (!valid) res.status(500).send(validate.errors)
    else {
        await Mascota.create(body)
            .then(() => res.status(200).send({ msj: "OK" }))
            .catch(err => res.status(500).send({ msj: err }));
    }
}

exports.getMascota = async (req, res) => {
    const _id = req.params.id;

    await Mascota.findOne({ _id: _id })
        .then((resp => res.send({ mascota: resp })))
        .catch(err => res.status(500).send({ msj: err }));
}

exports.deleteMascota = async (req, res) => {
    const _id = req.params.id;

    await Mascota.findByIdAndDelete({ _id: _id })
        .then(() => res.send({
            state: true,
            msj: 'Eliminado'
        }))
        .catch(err =>
            res.status(500).send({
                state: false,
                msj: 'Fallo eliminar'
            })
        );
}

exports.putMascota = async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const valid = validate(body);
    if (!valid) res.status(500).send(validate.errors)
    else {
        await Mascota.findByIdAndUpdate(_id, body, { useFindAndModify: false })
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