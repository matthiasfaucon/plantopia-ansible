const fs = require('fs').promises;
const path = require('path');

module.exports = {
  async up(queryInterface) {
    try {
      const plantsData = JSON.parse(
        await fs.readFile(path.join(__dirname, 'data.json'), 'utf8')
      ).data
      const genusData = JSON.parse(
        await fs.readFile(path.join(__dirname, 'genus.json'), 'utf8')
      );

      const plants = plantsData.map(plant => ({
        common_name: plant.common_name,
        description: plant.description,
        genus_id: plant.genus_id,
        genus: genusData.find(genus => genus.id === plant.genus_id).name,
        image_url: plant.image_url,
        created_at: new Date(),
      }));

      await queryInterface.bulkInsert('Genera', genusData, {
        updateOnDuplicate: ['name']
      })
      await queryInterface.bulkInsert('Plants', plants, {
        updateOnDuplicate: ['common_name', 'description', 'genus_id', 'genus', 'image_url']
      });

      console.log('Seeding completed successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Plants', null, {});
    await queryInterface.bulkDelete('Genera', null, {});
  }
};