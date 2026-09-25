import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';

export const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('DOCENTE', 'PROFESIONAL', 'ADMIN'),
    defaultValue: 'DOCENTE',
  },
  titulo_profesional: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cuenta_verificada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, { 
  tableName: 'usuarios',
  timestamps: true 
});
