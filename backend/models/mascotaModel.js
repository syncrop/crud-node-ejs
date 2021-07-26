'use strict';

const Mascota = require('../schemas/Mascota');

exports.getMascotas = () => {
    return Mascota.find((err, doc) => {
        if(err){
            return err;
        }
        return doc;
    })
}

exports.getMascotaById = (id) => {
    return Mascota.findById(id, (err, doc) => {
        if(err){
            return err;
        }
        return doc;
    })
}

exports.createMascota = (body) => {
    const newMascota = new Mascota(body);

    return newMascota.save((err, doc) => {
        if(err){
            return err;
        }
        return doc;
    })
}

exports.deleteMascota = (id) => {

    return Mascota.findByIdAndDelete(id, (err, doc) => {
        if(err){
            return err;
        }
        return doc;
    })
}

exports.putMascota = (id, body) => {

    return Mascota.findByIdAndUpdate({_id: id}, body, { useFindAndModify: false }, (err, doc) => {
        if(err){
            return err;
        }
        return doc;
    })
}

// 