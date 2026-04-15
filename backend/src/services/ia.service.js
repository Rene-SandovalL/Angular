const { GoogleGenerativeAI } = require('@google/generative-ai');
const prisma = require('../config/prisma');

let genAI = null;

const getGenAI = () => {
    if (!genAI) {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error('GEMINI_API_KEY no esta configurada');
        }

        genAI = new GoogleGenerativeAI(apiKey);
    }

    return genAI;
};

const PROMPT_TEMPLATE = `Eres un sistema academico formal. Genera un "Resumen Formal de Expediente Escolar" con los datos del alumno proporcionados.

El formato de respuesta DEBE ser EXACTAMENTE el siguiente (respeta los campos y el orden):

---
RESUMEN FORMAL DE EXPEDIENTE ESCOLAR

ID Alumno: {id}
Nombre Completo: {name}
Matricula: {matricula}
Carrera: {carrera}
Semestre: {semestre}
Correo: {correo}

OBSERVACIONES:
[Genera un parrafo breve y formal describiendo al alumno como estudiante activo de la institucion, mencionando su carrera, semestre actual y matricula. Usa un tono institucional y profesional.]

Fecha de generacion: {fecha_actual}
---

Datos del alumno:
ID: {id}
Nombre: {name}
Matricula: {matricula}
Carrera: {carrera}
Semestre: {semestre}
Correo: {correo}

IMPORTANTE: Responde SOLO con el resumen formal, sin explicaciones adicionales. Manten el formato exacto.`;

const generarResumenAlumno = async (alumnoId) => {
    const alumno = await prisma.alumnos.findUnique({
        where: { id: Number(alumnoId) }
    });

    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }

    const fechaActual = new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const prompt = PROMPT_TEMPLATE
        .replace(/{id}/g, String(alumno.id))
        .replace(/{name}/g, alumno.name)
        .replace(/{matricula}/g, alumno.matricula)
        .replace(/{carrera}/g, alumno.carrera)
        .replace(/{semestre}/g, String(alumno.semestre))
        .replace(/{correo}/g, alumno.correo)
        .replace(/{fecha_actual}/g, fechaActual);

    let resumen = '';
    let lastError = null;
    const modelErrors = [];

    const modelNames = [...new Set([
        process.env.GEMINI_MODEL,
        'gemini-3-flash-preview'
    ].filter(Boolean))];

    for (const modelName of modelNames) {
        try {
            const model = getGenAI().getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            resumen = result.response.text();
            if (resumen) {
                break;
            }
        } catch (error) {
            lastError = error;
            modelErrors.push({
                model: modelName,
                message: error?.message || 'Error desconocido'
            });
        }
    }

    if (!resumen) {
        const quotaError = modelErrors.find((item) => /429|quota exceeded/i.test(item.message));
        if (quotaError) {
            throw new Error(`GEMINI_QUOTA_EXCEEDED: ${quotaError.message}`);
        }

        const cause = lastError?.message || 'Error desconocido al invocar Gemini';
        throw new Error(`GEMINI_REQUEST_ERROR: ${cause}`);
    }

    return {
        alumno: {
            id: alumno.id,
            name: alumno.name,
            matricula: alumno.matricula,
            carrera: alumno.carrera,
            semestre: alumno.semestre,
            correo: alumno.correo
        },
        resumen,
        fechaGeneracion: fechaActual
    };
};

module.exports = {
    generarResumenAlumno
};
