const Mascota = require('../schemas/Mascota');
const mascotaModel = require('../models/mascotaModel');

exports.getMascotas = async () => {
    return await mascotaModel.getMascotas()
        .then(resp => resp)
        .catch(err => err);
}

exports.getMascota = async (id) => {
    return await mascotaModel.getMascotaById(id)
        .then(resp => resp)
        .catch(err => err);        
}

exports.postMascota = async (body) => {
    try {
        return await mascotaModel.createMascota(body)
    } catch (error) {
        return error
    }  
}

exports.deleteMascota = async (id) => {
    try {
        return await mascotaModel.deleteMascota(id)
    } catch (error) {
        return error
    }  
}

exports.putMascota = async (id, body) => {
    try {
        return await mascotaModel.putMascota(id, body)
    } catch (error) {
        return error
    }  
}

