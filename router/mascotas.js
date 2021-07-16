const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota'); //Modelo

router.get('/', async(req, res) => {
    try {
        
        const arrayMascotasDB = await Mascota.find()
        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
            // arrayMascotas: [
            //     {id: 'jfasdf', nombre: 'rex', descripcion: 'rex descripcion'},
            //     {id: 'asdf', nombre: 'chachan', descripcion: 'chachan descripcion'},
            //     {id: 'jfasdfasdf', nombre: 'toos', descripcion: 'toos descripcion'},
            // ]
        })
    } catch (error) {
        console.log(error)
    }    
})

router.get('/crear', (req, res) => {
    res.render('crear');
})
router.post('/', async (req, res) => {
    const body = req.body;
    try {
        // const mascotaDB = new Mascota(body);
        // await mascotaDB.save();

        await Mascota.create(body);

        res.redirect('/mascotas')
    } catch (error) {
        console.log('error', error);
    }
})

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