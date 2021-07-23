const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotas');

router.get('/', mascotaController.getMascotas);
router.post('/', mascotaController.postMascota);
router.get('/:id', mascotaController.getMascota);
router.put('/:id', mascotaController.putMascota);
router.delete('/:id', mascotaController.deleteMascota);

module.exports = router;
