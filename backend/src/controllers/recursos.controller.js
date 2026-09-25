import { Recurso } from "../models/recurso.js";
import { Usuario } from "../models/usuario.js";

// Crear un nuevo recurso
export const crearRecurso = async (req, res) => {
  try {
    const { titulo, descripcion, formato, condicion, archivo_url, nivel_educativo } = req.body;
    
    const autor_id = req.usuario.id; 

    const nuevoRecurso = await Recurso.create({
      titulo,
      descripcion,
      formato,            // <--
      condicion,
      archivo_url,        // <--
      nivel_educativo,    // <--
      autor_id
    });

    const recursoCompleto = await Recurso.findByPk(nuevoRecurso.id, {
      include: [{ model: Usuario, as: 'autor', attributes: ['nombre_completo', 'rol'] }]
    });

    res.status(201).json(recursoCompleto);
  } catch (error) {
    console.error('Error al crear el recurso:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Obtener todos los recursos
export const obtenerRecursos = async (req, res) => {
  try {
    const recursos = await Recurso.findAll({
      include: [
        { model: Usuario, as: "autor", attributes: ["nombre_completo", "rol"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(recursos);
  } catch (error) {
    console.error("Error al obtener recursos:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
