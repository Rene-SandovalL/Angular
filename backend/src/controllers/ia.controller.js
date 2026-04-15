const iaService = require('../services/ia.service');

const generarResumenAlumno = async (req, res) => {
    try {
        const result = await iaService.generarResumenAlumno(req.params.id);
        res.json(result);
    } catch (error) {
        const message = error?.message || 'Error desconocido';

        if (error.message === 'Alumno no encontrado') {
            return res.status(404).json({ message: error.message });
        }

        if (error.message === 'GEMINI_API_KEY no esta configurada') {
            return res.status(500).json({ message: error.message });
        }

        if (message.startsWith('GEMINI_QUOTA_EXCEEDED:')) {
            return res.status(429).json({
                message: 'Tu proyecto de Gemini no tiene cuota disponible. Revisa plan/billing o usa otra API key con cuota activa.'
            });
        }

        if (message.startsWith('GEMINI_REQUEST_ERROR:')) {
            return res.status(502).json({ message });
        }

        return res.status(500).json({ message: `No se pudo generar el resumen con IA: ${message}` });
    }
};

module.exports = {
    generarResumenAlumno
};
