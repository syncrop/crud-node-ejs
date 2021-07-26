const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const routerSwagger = express.Router();

// Extended: https://swagger.io/specification/#indoObject
const swaggerOptions = {
    swaggerDefinition: {
        swagger: '2.0',
        info: {
            title: 'Mascotas API',
            description: 'Mascotas API',
            contact: {
                name: 'Alberto Pulido'
            },
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]        
    },
    apis: ['./routes/routes.js']
};

const specs = swaggerJsDoc(swaggerOptions);

routerSwagger.use('/api-docs', swaggerUI.serve);
routerSwagger.get('/api-docs', swaggerUI.setup(specs, { explorer: true }));

module.exports = routerSwagger;