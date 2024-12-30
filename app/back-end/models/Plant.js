import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Genus from './Genus.js';

const Plant = sequelize.define('Plant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  common_name: {
    type: DataTypes.STRING
  },
  genus_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Genus,
      key: 'id'
    }
  },
  genus: {
    type: DataTypes.STRING
  },
  image_url: {
    type: DataTypes.TEXT
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

Plant.belongsTo(Genus, { foreignKey: 'genus_id' });
Genus.hasMany(Plant, { foreignKey: 'genus_id' });

export default Plant; 