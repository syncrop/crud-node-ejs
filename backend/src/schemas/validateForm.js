const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

//Crear modelo
const ValidateForm = mongoose.model('schema', schema); 

module.exports = schema;