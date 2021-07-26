const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const swagger = require('./swagger/swagger');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(swagger);

app.use('/public', express.static(`${__dirname}/uploads`))


app.use('/mascotas', require('./routes/routes'));


module.exports = app