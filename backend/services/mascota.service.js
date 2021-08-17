const Mascota = require('../schemas/Mascota');
const mascotaModel = require('../models/mascota.model');

exports.getMascotas = async () => {
    return await mascotaModel.getMascotas()
        .then(resp => resp)
        .catch(err => err);
}

exports.getMascota = async (id) => {
    try{
        const mascota = await mascotaModel.getMascotaById(id);
        return { data: mascota, status: 'OK'}
    }catch(err){
        return err;
    }  
}

exports.postMascota = async (body) => {
    try {
        const mascota = await mascotaModel.createMascota(body);
        return { data: mascota, status: 'OK' };    
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
        await mascotaModel.putMascota(id, body);
        return { data: 'Editado', status: 'OK' };  
    } catch (error) {
        return error
    }  
}


exports.uploadImage = async (id, body) => {
    try {
        return await mascotaModel.putMascota(id, body)
    } catch (error) {
        return error
    }  
}

