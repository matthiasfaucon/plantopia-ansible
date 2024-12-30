import express from 'express';
import Plant from '../models/Plant.js';
import { Op } from 'sequelize';
const router = express.Router();

// Get all plants
router.get('/', async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        const perPage = 12;
        const where = {};

        if (req.query.common_name) {
            where.common_name = { [Op.like]: `%${req.query.common_name.toLowerCase()}%` };
        }
        
        if (req.query.genus) {
            where.genus_id = parseInt(req.query.genus);
        }

        const { count, rows } = await Plant.findAndCountAll({
            where,
            limit: perPage,
            offset: (page - 1) * perPage
        });
        
        const totalPages = Math.ceil(count / perPage);
        return res.send({ data: rows, totalPages });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

// Get a single plant
router.get('/:id', async (req, res) => {
    try {
        const plant = await Plant.findByPk(parseInt(req.params.id));
        return res.send(plant);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

// Create a new plant
router.post('/', async (req, res) => {
    try {
        const plantData = {
            ...req.body,
            genus_id: parseInt(req.body.genusTab.id),
            genus: req.body.genusTab.name
        };
        delete plantData.genusTab;
        
        const plant = await Plant.create(plantData);
        return res.send({ message: 'Plant added', code: 201, id: plant.id });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

// Update a plant
router.put('/:id', async (req, res) => {
    try {
        const plantData = {
            ...req.body,
            genus_id: parseInt(req.body.genusTab.id),
            genus: req.body.genusTab.name
        };
        delete plantData.genusTab;

        await Plant.update(plantData, {
            where: { id: parseInt(req.params.id) }
        });
        return res.send({ message: 'Plant updated', code: 200 });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

// Delete a plant
router.delete('/:id', async (req, res) => {
    try {
        await Plant.destroy({
            where: { id: parseInt(req.params.id) }
        });
        return res.send({ message: 'Plant deleted', code: 200 });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

export default router;
