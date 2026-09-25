import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';

export const Comentario = sequelize.define('Comentario', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  destacado_profesional: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, { 
  tableName: 'comentarios',
  timestamps: true 
});
