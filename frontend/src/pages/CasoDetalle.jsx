import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const CasoDetalle = () => {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const { usuario } = useContext(AuthContext);
  
  const [caso, setCaso] = useState(null);
  const [comentario, setComentario] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerCaso = async () => {
      try {
        // Asumimos que tu backend tiene una ruta GET /api/publicaciones/:id
        const respuesta = await clienteAxios.get(`/publicaciones/${id}`);
        setCaso(respuesta.data);
      } catch (error) {
        console.error('Error al obtener el caso:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerCaso();
  }, [id]);

  const handleComentar = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await clienteAxios.post('/comentarios/crear-comentario', {
        contenido: comentario,
        publicacion_id: id
      });
      const dataComentario = respuesta.data.comentario || respuesta.data;
      
      // Agregamos el comentario nuevo a la lista visualmente
      // Le agregamos un autor "falso" temporalmente para que se vea hasta que recargue
      const nuevoComentario = {
        ...dataComentario,
        autor: { nombre_completo: usuario.nombre_completo, rol: usuario.rol }
      };

      setCaso({
        ...caso,
        comentarios: [...caso.comentarios, nuevoComentario]
      });
      
      setComentario(''); // Limpiamos la caja de texto
    } catch (error) {
      console.error('Error al comentar:', error);
      alert('Hubo un error al enviar tu comentario.');
    }
  };

  if (cargando) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando detalles...</h3>;
  if (!caso) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Caso no encontrado</h3>;

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      <Link to="/foro" style={{ textDecoration: 'none', color: '#0056b3', marginBottom: '20px', display: 'inline-block' }}>
        ← Volver al foro
      </Link>

      {/* --- DETALLE DEL CASO --- */}
      <div style={{ border: '1px solid #0056b3', borderRadius: '8px', padding: '20px', backgroundColor: '#f4f9ff', marginBottom: '30px' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>{caso.titulo}</h2>
        <span style={{ backgroundColor: '#17a2b8', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
          {caso.condicion} - {caso.nivel_educativo}
        </span>
        <p style={{ marginTop: '15px', lineHeight: '1.6', fontSize: '16px' }}>{caso.contenido}</p>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          Publicado por: <strong>{caso.autor?.nombre_completo}</strong>
        </p>
      </div>

      {/* --- SECCIÓN DE COMENTARIOS --- */}
      <h3>Respuestas y Estrategias ({caso.comentarios?.length || 0})</h3>
      
      {/* Formulario para nuevo comentario */}
      <form onSubmit={handleComentar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
        <textarea 
          placeholder="Escribe tu consejo o estrategia desde tu experiencia..." 
          required 
          rows="3"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
        />
        <div style={{ textAlign: 'right' }}>
          <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Enviar respuesta
          </button>
        </div>
      </form>

      {/* Lista de comentarios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {caso.comentarios?.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>Aún no hay respuestas. ¡Sé el primero en ayudar!</p>
        ) : (
          caso.comentarios?.map((com, index) => (
            <div key={com.id || index} style={{ borderLeft: '4px solid #28a745', padding: '10px 15px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ margin: '0 0 10px 0', lineHeight: '1.5' }}>{com.contenido}</p>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Respondido por: <strong>{com.autor?.nombre_completo}</strong> 
                <span style={{ marginLeft: '10px', backgroundColor: '#e9ecef', padding: '2px 6px', borderRadius: '4px' }}>
                  {com.autor?.rol}
                </span>
                {com.destacado_profesional && (
                  <span style={{ marginLeft: '10px', color: '#d39e00', fontWeight: 'bold' }}>⭐ Destacado</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default CasoDetalle;