import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';

export const Publicacion = sequelize.define('Publicacion', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  es_anonimo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  condicion: {
    type: DataTypes.ENUM('AUTISMO', 'DIFICULTAD_APRENDIZAJE', 'SORDERA', 'TDAH', 'DISLEXIA', 'OTRO'),
    allowNull: false,
  },
  nivel_educativo: {
    type: DataTypes.ENUM('INICIAL', 'PRIMARIO', 'SECUNDARIO'),
    allowNull: false,
  }
}, { 
  tableName: 'publicaciones',
  timestamps: true 
});
