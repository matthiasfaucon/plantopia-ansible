import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Genus = sequelize.define('Genus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Genus; 