const express = require('express');
const router = express.Router();
const iaController = require('../controllers/ia.controller');

router.get('/ia/resumen/:id', iaController.generarResumenAlumno);

module.exports = router;
