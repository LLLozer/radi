import { Publicacion, Usuario, Comentario } from '../models/index.js';

// ==========================================
// CREAR UN NUEVO CASO O DEBATE
// ==========================================
export const crearPublicacion = async (req, res) => {
  try {
    const { titulo, contenido, es_anonimo, condicion, nivel_educativo } = req.body;
    const autor_id = req.usuario.id; // Viene del middleware verificarToken

    const nuevaPublicacion = await Publicacion.create({
      titulo,
      contenido,
      es_anonimo,
      condicion,
      nivel_educativo,
      autor_id
    });

    res.status(201).json({ mensaje: 'Publicación creada con éxito.', publicacion: nuevaPublicacion });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ error: 'Error al publicar el caso.' });
  }
};

// ==========================================
// OBTENER PUBLICACIONES (Con filtros)
// ==========================================
export const obtenerPublicaciones = async (req, res) => {
  try {
    const { condicion, nivel_educativo } = req.query; // Para filtrar desde el frontend

    let filtros = {};
    if (condicion) filtros.condicion = condicion;
    if (nivel_educativo) filtros.nivel_educativo = nivel_educativo;

    const publicaciones = await Publicacion.findAll({
      where: filtros,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Usuario,
          as: 'autor',
          attributes: ['nombre_completo', 'rol', 'titulo_profesional'] // Nunca enviamos la contraseña
        },
        {
          model: Comentario,
          as: 'comentarios',
          attributes: ['id'] // Solo traemos los IDs para saber cuántas respuestas tiene
        }
      ]
    });

    // Filtramos el nombre si la publicación es anónima
    const publicacionesFormateadas = publicaciones.map(pub => {
      const pubJSON = pub.toJSON();
      if (pubJSON.es_anonimo) {
        pubJSON.autor.nombre_completo = 'Docente Anónimo';
      }
      return pubJSON;
    });

    res.status(200).json(publicacionesFormateadas);
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    res.status(500).json({ error: 'Error al obtener el foro.' });
  }
};