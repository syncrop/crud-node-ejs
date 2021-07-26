const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');
const storage = require('../config/multer');


/**
 * @swagger
 * /mascotas:
 *  get:
 *      description: get all mascotas
 *      responses:
 *        200:
 *          description: Success
 *  post:
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - name: nombre
 *          in: formData
 *          description: Nombre de la mascota
 *          required: true
 *          type: string
 *        - name: descripcion
 *          in: formData
 *          description: Descripcion de la mascota
 *          required: true
 *          type: string
 *        - name: imagen
 *          in: formData
 *          description: Imagen de la mascota
 *          required: true
 *          type: file
 *      responses:
 *        201:
 *          description: Created
 * /mascotas/{id}:
 *  get:
 *      description: get by id a mascota
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Nombre de la mascota
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Success
 *  delete:
 *      description: delete by id a mascota
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Nombre de la mascota
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Delete
 *  put:
 *      description: update by id a mascota
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Nombre de la mascota
 *          required: true
 *          type: string
 *        - name: nombre
 *          in: formData
 *          description: Nombre de la mascota
 *          required: true
 *          type: string
 *        - name: descripcion
 *          in: formData
 *          description: Descripcion de la mascota
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Delete
 */
router.get('/', mascotaController.getMascotas);
router.get('/:id', mascotaController.getMascota);
router.post('/', storage.single('imagen'), mascotaController.postMascota);
router.put('/:id', mascotaController.putMascota);
router.delete('/:id', mascotaController.deleteMascota);

module.exports = router;
