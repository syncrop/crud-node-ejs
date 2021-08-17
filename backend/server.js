require('dotenv').config()
const app = require('./app')
const { appConfig } = require('./config')
const {connectdb} = require('./mongodb')

// Conexion DDBB
connectdb();


app.listen(appConfig.port, () => {
    console.log('servidor a su servicio en el puerto', appConfig.port)
});