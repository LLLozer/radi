import { Recurso, Usuario } from '../models/index.js';

// ==========================================
// COMPARTIR UN NUEVO MATERIAL
// ==========================================
export const subirRecurso = async (req, res) => {
  try {
    const { titulo, descripcion, archivo_url, formato, condicion, nivel_educativo } = req.body;
    const autor_id = req.usuario.id;

    // Nota: archivo_url vendría del frontend tras subir el PDF/DOCX a un servicio como AWS S3 o Cloudinary.
    const nuevoRecurso = await Recurso.create({
      titulo,
      descripcion,
      archivo_url,
      formato,
      condicion,
      nivel_educativo,
      autor_id
    });

    res.status(201).json({ mensaje: 'Material compartido con la comunidad.', recurso: nuevoRecurso });
  } catch (error) {
    console.error('Error al compartir recurso:', error);
    res.status(500).json({ error: 'Error al subir el material.' });
  }
};

// ==========================================
// EXPLORAR MATERIALES
// ==========================================
export const obtenerRecursos = async (req, res) => {
  try {
    const { condicion, formato } = req.query;
    
    let filtros = {};
    if (condicion) filtros.condicion = condicion;
    if (formato) filtros.formato = formato;

    const recursos = await Recurso.findAll({
      where: filtros,
      order: [['descargas', 'DESC'], ['createdAt', 'DESC']], // Ordenamos por los más populares primero
      include: [{
        model: Usuario,
        as: 'autor',
        attributes: ['nombre_completo']
      }]
    });

    res.status(200).json(recursos);
  } catch (error) {
    console.error('Error al obtener recursos:', error);
    res.status(500).json({ error: 'Error al cargar la biblioteca.' });
  }
};