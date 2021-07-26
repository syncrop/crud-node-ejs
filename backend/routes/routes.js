const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');
const storage = require('../config/multer');


router.get('/', mascotaController.getMascotas);
router.get('/:id', mascotaController.getMascota);
router.post('/', storage.single('imagen'), mascotaController.postMascota);
router.put('/:id', mascotaController.putMascota);
router.delete('/:id', mascotaController.deleteMascota);

module.exports = router;
