const prisma = require('../config/prisma');
const { alumnos_carrera } = require('@prisma/client');

const validateCarrera = (carrera) => {
    if (!Object.values(alumnos_carrera).includes(carrera)) {
        throw new Error('Carrera no valida');
    }
};

const handleUniqueConstraint = (error) => {
    if (error && error.code === 'P2002') {
        throw new Error('Ya existe un alumno con matricula registrada');
    }
    throw error;
};

const createAlumno = async ({ name, matricula, carrera, semestre, correo }) => {
    if (!name || !matricula || !carrera || semestre === undefined || !correo) {
        throw new Error('Nombre, matricula, carrera, semestre y correo son requeridos');
    }

    validateCarrera(carrera);

    const semestreNumber = Number(semestre);
    if (!Number.isInteger(semestreNumber) || semestreNumber < 1 || semestreNumber > 12) {
        throw new Error('Semestre debe ser un numero entero entre 1 y 12');
    }

    const existingAlumno = await prisma.alumnos.findUnique({
        where: { matricula }
    });

    if (existingAlumno) {
        throw new Error('Ya existe un alumno con matricula registrada');
    }

    return await prisma.alumnos.create({
        data: {
            name,
            matricula,
            carrera,
            semestre: semestreNumber,
            correo
        }
    });
};

const getAlumnos = async () => {
    return await prisma.alumnos.findMany({
        orderBy: {
            id: 'desc'
        }
    });
};

const getAlumnoById = async (id) => {
    const alumno = await prisma.alumnos.findUnique({
        where: { id: Number(id) }
    });

    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }

    return alumno;
};

const updateAlumno = async (id, { name, matricula, carrera, semestre, correo }) => {
    const alumno = await prisma.alumnos.findUnique({
        where: { id: Number(id) }
    });

    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }

    const data = {
        ...(name !== undefined ? { name } : {}),
        ...(matricula !== undefined ? { matricula } : {}),
        ...(correo !== undefined ? { correo } : {})
    };

    if (carrera !== undefined) {
        validateCarrera(carrera);
        data.carrera = carrera;
    }

    if (semestre !== undefined) {
        const semestreNumber = Number(semestre);
        if (!Number.isInteger(semestreNumber) || semestreNumber < 1 || semestreNumber > 12) {
            throw new Error('Semestre debe ser un numero entero entre 1 y 12');
        }
        data.semestre = semestreNumber;
    }

    if (Object.keys(data).length === 0) {
        throw new Error('No hay datos para actualizar');
    }

    try {
        return await prisma.alumnos.update({
            where: { id: Number(id) },
            data
        });
    } catch (error) {
        handleUniqueConstraint(error);
    }
};

const deleteAlumno = async (id) => {
    const alumno = await prisma.alumnos.findUnique({
        where: { id: Number(id) }
    });

    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }

    await prisma.alumnos.delete({
        where: { id: Number(id) }
    });

    return { message: 'Alumno eliminado correctamente' };
};

module.exports = {
    createAlumno,
    getAlumnos,
    getAlumnoById,
    updateAlumno,
    deleteAlumno
};
