import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js'; 

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre_completo, email, password, rol, titulo_profesional, matricula } = req.body;

    // 1. Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // 2. Encriptar la contraseña
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 3. Crear el usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      nombre_completo,
      email,
      password_hash,
      rol: rol || 'DOCENTE', // Por defecto será docente si no se especifica
      titulo_profesional: rol === 'PROFESIONAL' ? titulo_profesional : null,
      matricula: rol === 'PROFESIONAL' ? matricula : null,
    });

    res.status(201).json({ 
      mensaje: 'Usuario registrado con éxito.', 
      usuario: {
        id: nuevoUsuario.id,
        nombre_completo: nuevoUsuario.nombre_completo,
        rol: nuevoUsuario.rol
      } 
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor al registrar el usuario.' });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar el usuario
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: 'Credenciales inválidas.' });
    }

    // 2. Comparar la contraseña ingresada con el hash de la BD
    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) {
      return res.status(400).json({ error: 'Credenciales inválidas.' });
    }

    // 3. Generar el JSON Web Token (JWT)
    // Guardamos en el token datos no sensibles pero útiles para validar permisos rápidos
    const tokenPayload = {
      id: usuario.id,
      rol: usuario.rol,
      cuenta_verificada: usuario.cuenta_verificada
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1d' // El token expira en 1 día
    });

    // 4. Configurar la Cookie y enviarla al cliente
    res.cookie('token', token, {
      httpOnly: true, // Previene ataques XSS (el token no es accesible vía JavaScript del frontend)
      secure: process.env.NODE_ENV === 'production', // En producción (HTTPS) se pone en true
      sameSite: 'strict', // Previene ataques CSRF
      maxAge: 24 * 60 * 60 * 1000 // 1 día en milisegundos
    });

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso.',
      usuario: {
        id: usuario.id,
        nombre_completo: usuario.nombre_completo,
        rol: usuario.rol,
        cuenta_verificada: usuario.cuenta_verificada
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' });
  }
};

export const logoutUsuario = (req, res) => {
  // Para cerrar sesión, simplemente limpiamos la cookie
  res.clearCookie('token');
  res.status(200).json({ mensaje: 'Sesión cerrada con éxito.' });
};