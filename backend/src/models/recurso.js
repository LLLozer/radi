import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Recurso = sequelize.define(
  "Recurso",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    archivo_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    formato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    condicion: {
      type: DataTypes.ENUM(
        "AUTISMO",
        "DIFICULTAD_APRENDIZAJE",
        "SORDERA",
        "TDAH",
        "DISLEXIA",
        "OTRO",
      ),
      allowNull: false,
      defaultValue: "OTRO",
    },
    nivel_educativo: {
      type: DataTypes.ENUM("INICIAL", "PRIMARIO", "SECUNDARIO"),
      allowNull: false,
    },
    descargas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "recursos",
    timestamps: true,
  },
);
