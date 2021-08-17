const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Image = Schema({
    caption: String,
    filename: String,
    fileId: String
})

module.exports = mongoose.model('Image', Image)