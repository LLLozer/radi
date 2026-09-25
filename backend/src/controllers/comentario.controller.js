import { Comentario } from '../models/index.js';

// ==========================================
// RESPONDER A UN CASO (Comentar)
// ==========================================
export const crearComentario = async (req, res) => {
  try {
    const { contenido, publicacion_id } = req.body;
    const usuario = req.usuario; // Extraído del token por el middleware

    // Verificamos si el usuario es un profesional validado para darle la insignia de "Destacado"
    const esDestacado = usuario.rol === 'PROFESIONAL' && usuario.cuenta_verificada;

    const nuevoComentario = await Comentario.create({
      contenido,
      publicacion_id,
      autor_id: usuario.id,
      destacado_profesional: esDestacado
    });

    res.status(201).json({ 
      mensaje: 'Respuesta publicada.', 
      comentario: nuevoComentario 
    });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error al enviar la respuesta.' });
  }
};