import { Router } from 'express';
import { registrarUsuario, loginUsuario, logoutUsuario } from '../controllers/auth.controller.js';

export const authRoutes = Router();

// ==========================================
// RUTAS DE AUTENTICACIÓN (Base: /api/auth)
// ==========================================

// Endpoint para registrar un nuevo docente o profesional
// POST /api/auth/registro
authRoutes.post('/auth/registro', registrarUsuario);

// Endpoint para iniciar sesión (genera la cookie con el JWT)
// POST /api/auth/login
authRoutes.post('/auth/login', loginUsuario);

// Endpoint para cerrar sesión (destruye la cookie)
// POST /api/auth/logout
authRoutes.post('/logout', logoutUsuario);
