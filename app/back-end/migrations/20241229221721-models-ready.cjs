'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Genus table
    await queryInterface.createTable('Genera', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // Create Plants table
    await queryInterface.createTable('Plants', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      common_name: {
        type: Sequelize.STRING
      },
      genus_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Genera',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      genus: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plants');
    await queryInterface.dropTable('Genera');
  }
};