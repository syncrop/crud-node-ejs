const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = process.env.port || 3000;

//Conexion a BBDD
const uri = `mongodb+srv://user:NIwtZiLrTtoXADso@cluster0.ojlaz.mongodb.net/veterinaria?retryWrites=true&w=majority`;
mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error: '+e));

//Router
app.use('/mascotas', require('./src/routes/routes'));

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
});