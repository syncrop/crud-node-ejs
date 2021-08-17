const config = {
    appConfig: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
        mongoUri: process.env.DB_URI,
    },
}

module.exports = config