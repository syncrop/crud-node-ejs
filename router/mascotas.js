const express = require('express');
const multer = require('multer');
const mimeTypes = require('mime-types');
const router = express.Router();
const Ajv = require("ajv");

const ajv = new Ajv(); // Validador

const Mascota = require('../models/mascota'); //Modelo

const schema = {
    type: "object",
    properties: {
        nombre: { type: "string" },
        descripcion: { type: "string" },
        imagen: { type: "string" },
    },
    required: ["nombre", "descripcion"],
    additionalProperties: false
}

const validate = ajv.compile(schema);

// OBTENER TODAS LAS MASCOTAS
router.get('/', async (req, res) => {
    try {
        const arrayMascotasDB = await Mascota.find()
        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
        })

    } catch (error) {
        console.log(error)
    }
})

// CREAR NUEVA MASCOTA
router.get('/crear', (req, res) => {
    res.render('crear');
});
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        cb("", Date.now() + '.' + mimeTypes.extension(file.mimetype))
    }
});
const upload = multer({
    storage: storage
});
router.post('/', upload.single('imagen'), async (req, res) => {
    req.body = { ...req.body, 'imagen': req.file.filename }
    const body = req.body;
    const valid = validate(body);
    if (!valid) console.log(validate.errors);
    else {
        await Mascota.create(body)
            .then(() => res.redirect('/mascotas'))
            .catch(err => console.log('error', err));
    }
})

// ACTUALIZAR Y ELIMIANAR
router.get('/:id', async (req, res) => {

    const _id = req.params.id;

    try {
        const mascotaDB = await Mascota.findOne({ _id: _id });

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
router.delete('/:id', async (req, res) => {
    const _id = req.params.id;

    await Mascota.findByIdAndDelete({ _id: _id })
        .then(() => res.json({
            estado: true,
            mensaje: 'Eliminado'
        }))
        .catch(err => {
            res.json({
                estado: false,
                mensaje: 'Fallo eliminar'
            })
            console.log(err)
        });
})
router.put('/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const valid = validate(body);
    if (!valid) console.log(validate.errors);
    else {
        await Mascota.findByIdAndUpdate(_id, body, { useFindAndModify: false })
            .then(() => res.json({
                estado: true,
                mensaje: "Editado"
            }))
            .catch(() => res.json({
                estado: false,
                mensaje: "No Editado"
            }));
    }
})

module.exports = router;