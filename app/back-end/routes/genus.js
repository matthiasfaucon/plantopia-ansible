import express from 'express';
import cors from 'cors';
import Genus from '../models/Genus.js';

const router = express.Router();

router.use(express.json({ limit: '10mb' }));
router.use(express.urlencoded({ limit: '10mb', extended: true }));
router.use(cors());

// Get all genus
router.get('/', async (req, res) => {
    try {
        const genus = await Genus.findAll({
            order: [['name', 'ASC']]
        });
        return res.send(genus);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

export default router;