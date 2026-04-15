const prisma = require('../config/prisma');
const { maestros_departamento } = require('@prisma/client');

const validateDepartamento = (departamento) => {
    if (departamento !== null && !Object.values(maestros_departamento).includes(departamento)) {
        throw new Error('Departamento no valido');
    }
};

const handleUniqueConstraint = (error) => {
    if (error && error.code === 'P2002') {
        throw new Error('Telefono o correo ya registrado');
    }
    throw error;
};

const createMaestro = async ({ name, telefono, email, departamento = null }) => {
    if (!name || !telefono || !email) {
        throw new Error('Nombre, telefono y correo son requeridos');
    }

    validateDepartamento(departamento);

    try {
        return await prisma.maestros.create({
            data: {
                name,
                telefono,
                email,
                departamento
            }
        });
    } catch (error) {
        handleUniqueConstraint(error);
    }
};

const getMaestros = async () => {
    return await prisma.maestros.findMany({
        orderBy: {
            id: 'desc'
        }
    });
};

const getMaestroById = async (id) => {
    const maestro = await prisma.maestros.findUnique({
        where: { id: Number(id) }
    });

    if (!maestro) {
        throw new Error('Maestro no encontrado');
    }

    return maestro;
};

const updateMaestro = async (id, { name, telefono, email, departamento }) => {
    const maestro = await prisma.maestros.findUnique({
        where: { id: Number(id) }
    });

    if (!maestro) {
        throw new Error('Maestro no encontrado');
    }

    const data = {
        ...(name !== undefined ? { name } : {}),
        ...(telefono !== undefined ? { telefono } : {}),
        ...(email !== undefined ? { email } : {})
    };

    if (departamento !== undefined) {
        validateDepartamento(departamento);
        data.departamento = departamento;
    }

    if (Object.keys(data).length === 0) {
        throw new Error('No hay datos para actualizar');
    }

    try {
        return await prisma.maestros.update({
            where: { id: Number(id) },
            data
        });
    } catch (error) {
        handleUniqueConstraint(error);
    }
};

const deleteMaestro = async (id) => {
    const maestro = await prisma.maestros.findUnique({
        where: { id: Number(id) }
    });

    if (!maestro) {
        throw new Error('Maestro no encontrado');
    }

    await prisma.maestros.delete({
        where: { id: Number(id) }
    });

    return { message: 'Maestro eliminado correctamente' };
};

module.exports = {
    createMaestro,
    getMaestros,
    getMaestroById,
    updateMaestro,
    deleteMaestro
};
