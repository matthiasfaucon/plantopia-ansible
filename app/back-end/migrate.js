import fs from 'fs/promises';
import sequelize from './config/database.js';
import Plant from './models/Plant.js';
import Genus from './models/Genus.js';

async function migrate() {
  try {
    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ force: true });

    // Lire les données JSON
    const plantsData = JSON.parse(await fs.readFile('data.json', 'utf8')).data;
    const genusData = JSON.parse(await fs.readFile('genus.json', 'utf8'));

    // Migrer les genus
    await Genus.bulkCreate(genusData);

    // Migrer les plants
    await Plant.bulkCreate(plantsData);

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate(); 