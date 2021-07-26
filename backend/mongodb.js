//Conexion a BBDD
const mongoose = require('mongoose');

async function connectdb(){
    const uri = `mongodb+srv://user:NIwtZiLrTtoXADso@cluster0.ojlaz.mongodb.net/veterinaria?retryWrites=true&w=majority`;
    mongoose.connect(uri, 
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
        .then(() => console.log('Base de datos conectada'))
        .catch(e => console.log('error: '+e));
}

module.exports = connectdb;