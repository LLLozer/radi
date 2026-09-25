import { Router } from 'express';
import { crearRecurso, obtenerRecursos } from '../controllers/recursos.controller.js';
// Importa tu middleware que verifica el token (ajusta la ruta si es necesario)
import { verificarToken } from '../middlewares/auth.middleware.js'; 

export const recursosRoutes = Router();

// GET /api/recursos - Público (o protegido si prefieres)
recursosRoutes.get('/recursos', verificarToken, obtenerRecursos);

// POST /api/recursos/crear - Protegido (solo usuarios logueados)
recursosRoutes.post('/recursos/crear-recurso', verificarToken, crearRecurso);