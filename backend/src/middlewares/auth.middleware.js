import jwt from 'jsonwebtoken';

// ==========================================
// MIDDLEWARE: VERIFICAR USUARIO LOGUEADO
// ==========================================
export const verificarToken = (req, res, next) => {
  try {
    // 1. Extraer el token desde las cookies (requiere cookie-parser en app.js)
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        error: 'Acceso denegado. Debes iniciar sesión para realizar esta acción.' 
      });
    }

    // 2. Verificar si el token es válido y no ha expirado
    const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Inyectar los datos del usuario en la petición (request)
    // Así los controladores sabrán exactamente quién está publicando
    req.usuario = usuarioDecodificado; 

    // 4. Todo está en orden, permitir que la petición continúe
    next();

  } catch (error) {
    // Si el token fue modificado, es falso o ya pasaron 24hs (caducó)
    return res.status(401).json({ error: 'Token inválido o sesión expirada. Vuelve a ingresar.' });
  }
};