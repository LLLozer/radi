import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Importar la instancia de sequelize y los modelos desde el index
import {sequelize} from "../backend/src/config/db.js"
import { routes } from './src/routes/index.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

// ==========================================
// MIDDLEWARES GLOBALES
// ==========================================

// Configuración de CORS para permitir peticiones desde el frontend (ej. React/Vite)
app.use(cors({
  origin: 'http://localhost:5173', // La URL de tu React (Vite)
  credentials: true
}));

app.use(express.json()); // Permite a Express leer JSON en el req.body
app.use(cookieParser()); // Permite a Express leer req.cookies

// ==========================================
// REGISTRO DE RUTAS
// ==========================================
app.use("/api", routes)

// ==========================================
// INICIALIZACIÓN DE LA BASE DE DATOS Y SERVIDOR
// ==========================================
const iniciarServidor = async () => {
  try {
    // 1. Probar la conexión a MySQL
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida correctamente.');

    // 2. Sincronizar los modelos
    // alter: true actualiza las tablas si agregas columnas nuevas sin borrar los datos
    await sequelize.sync({ alter: true }); 
    console.log('✅ Modelos sincronizados con la base de datos.');

    // 3. Levantar el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor RADI (Red de Acompañamiento Docente) corriendo en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error crítico al iniciar el servidor:', error);
  }
};

iniciarServidor();