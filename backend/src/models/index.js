import {sequelize} from '../config/db.js';
import {Usuario} from './usuario.js';
import {Publicacion} from './publicacion.js';
import {Comentario} from './comentario.js';
import {Recurso} from './recurso.js';

// Relación: Un Usuario tiene muchas Publicaciones (1:N)
Usuario.hasMany(Publicacion, { foreignKey: 'autor_id', as: 'publicaciones' });
Publicacion.belongsTo(Usuario, { foreignKey: 'autor_id', as: 'autor' });

// Relación: Un Usuario tiene muchos Comentarios (1:N)
Usuario.hasMany(Comentario, { foreignKey: 'autor_id', as: 'comentarios' });
Comentario.belongsTo(Usuario, { foreignKey: 'autor_id', as: 'autor' });

// Relación: Una Publicación tiene muchos Comentarios (1:N)
Publicacion.hasMany(Comentario, { foreignKey: 'publicacion_id', as: 'comentarios', onDelete: 'CASCADE' });
Comentario.belongsTo(Publicacion, { foreignKey: 'publicacion_id', as: 'publicacion' });

// Relación: Un Usuario sube muchos Recursos (1:N)
Usuario.hasMany(Recurso, { foreignKey: 'autor_id', as: 'recursos' });
Recurso.belongsTo(Usuario, { foreignKey: 'autor_id', as: 'autor' });

export {
  sequelize,
  Usuario,
  Publicacion,
  Comentario,
  Recurso
};