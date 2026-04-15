const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnos.controller');

router.post('/alumnos', alumnosController.createAlumno);
router.get('/alumnos', alumnosController.getAlumnos);
router.get('/alumnos/:id', alumnosController.getAlumnoById);
router.patch('/alumnos/:id', alumnosController.updateAlumno);
router.delete('/alumnos/:id', alumnosController.deleteAlumno);

module.exports = router;
