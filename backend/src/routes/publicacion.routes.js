import { Router } from 'express';
import { crearPublicacion, obtenerPublicaciones, obtenerPublicacionPorId } from '../controllers/publicacion.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

export const publicacionRoutes = Router();

publicacionRoutes.get('/publicaciones', obtenerPublicaciones); // Pública
publicacionRoutes.post('/publicaciones/crear-publicacion', verificarToken, crearPublicacion); // Protegida
publicacionRoutes.get('/publicaciones/:id', obtenerPublicacionPorId)
