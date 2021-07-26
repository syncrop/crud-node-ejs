const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MascotaSchema = Schema({
    nombre: String,
    descripcion: String,
    imagen: String
})

module.exports = mongoose.model('Mascota', MascotaSchema)