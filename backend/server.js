require('dotenv').config()
const app = require('./app')
const { appConfig } = require('./config')
const mongodb = require('./mongodb')

// Conexion DDBB
mongodb()

app.listen(appConfig.port, () => {
    console.log('servidor a su servicio en el puerto', appConfig.port)
});