const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname+'/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = process.env.port || 3000;

//Conexion a BBDD
const mongoose = require('mongoose');
const user = "user";
const pass = "NIwtZiLrTtoXADso";
const dbName = "veterinaria";
const uri = `mongodb+srv://user:NIwtZiLrTtoXADso@cluster0.ojlaz.mongodb.net/veterinaria?retryWrites=true&w=majority`;
mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error: '+e));

//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Router
app.use('/', require('./router/rutasWeb'));
app.use('/mascotas', require('./router/mascotas'));

//Middleware
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Página no encontrada"
    })
})

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
});