const express = require('express');
const router = express.Router();
const maestrosController = require('../controllers/maestros.controller');

router.post('/maestros', maestrosController.createMaestro);
router.get('/maestros', maestrosController.getMaestros);
router.get('/maestros/:id', maestrosController.getMaestroById);
router.patch('/maestros/:id', maestrosController.updateMaestro);
router.delete('/maestros/:id', maestrosController.deleteMaestro);

module.exports = router;
