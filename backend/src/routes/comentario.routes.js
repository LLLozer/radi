import { Router } from 'express';
import { crearComentario } from '../controllers/comentario.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

export const comentarioRoutes = Router();

comentarioRoutes.post('/comentarios/crear-comentario', verificarToken, crearComentario); // Protegida
