const maestrosService = require('../services/maestros.service');

const createMaestro = async (req, res) => {
    try {
        const maestro = await maestrosService.createMaestro(req.body);
        res.json(maestro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMaestros = async (req, res) => {
    try {
        const maestros = await maestrosService.getMaestros();
        res.json(maestros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMaestroById = async (req, res) => {
    try {
        const maestro = await maestrosService.getMaestroById(req.params.id);
        res.json(maestro);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateMaestro = async (req, res) => {
    try {
        const maestro = await maestrosService.updateMaestro(req.params.id, req.body);
        res.json(maestro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMaestro = async (req, res) => {
    try {
        await maestrosService.deleteMaestro(req.params.id);
        res.json({ message: 'Maestro eliminado correctamente' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createMaestro,
    getMaestros,
    getMaestroById,
    updateMaestro,
    deleteMaestro
};
