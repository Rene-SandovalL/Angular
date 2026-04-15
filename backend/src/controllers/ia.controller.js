const iaService = require('../services/ia.service');

const generarResumenAlumno = async (req, res) => {
    try {
        const result = await iaService.generarResumenAlumno(req.params.id);
        res.json(result);
    } catch (error) {
        if (error.message === 'Alumno no encontrado') {
            return res.status(404).json({ message: error.message });
        }

        if (error.message === 'GEMINI_API_KEY no esta configurada') {
            return res.status(500).json({ message: error.message });
        }

        return res.status(500).json({ message: 'No se pudo generar el resumen con IA' });
    }
};

module.exports = {
    generarResumenAlumno
};
