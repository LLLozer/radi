import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Foro = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  // Estado para el filtro activo del foro
  const [filtroActual, setFiltroActual] = useState('TODOS');

  // Aún necesitamos el usuario para saber quién está publicando el caso
  const { usuario } = useContext(AuthContext);

  const [nuevoCaso, setNuevoCaso] = useState({
    titulo: "",
    contenido: "",
    condicion: "AUTISMO",
    nivel_educativo: "PRIMARIO",
    es_anonimo: false,
  });

  useEffect(() => {
    const obtenerCasos = async () => {
      try {
        const respuesta = await clienteAxios.get("/publicaciones");
        setPublicaciones(respuesta.data);
      } catch (error) {
        console.error("Error al obtener los casos:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerCasos();
  }, []);

  const handleCrearCaso = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await clienteAxios.post(
        "/publicaciones/crear-publicacion",
        nuevoCaso,
      );

      const dataPublicacion = respuesta.data.publicacion || respuesta.data;

      // Armamos la publicación completa agregando el autor y un arreglo vacío de comentarios
      const nuevaPublicacion = {
        ...dataPublicacion,
        autor: {
          nombre_completo: nuevoCaso.es_anonimo
            ? "Docente Anónimo"
            : usuario.nombre_completo,
        },
        comentarios: [], // Agregamos esto para que el .length de las respuestas no dé error
      };

      setPublicaciones([nuevaPublicacion, ...publicaciones]);
      setMostrarModal(false);
      setNuevoCaso({
        titulo: "",
        contenido: "",
        condicion: "AUTISMO",
        nivel_educativo: "PRIMARIO",
        es_anonimo: false,
      });
    } catch (error) {
      console.error("Error al crear el caso:", error);
      alert("Hubo un error al publicar. Intenta de nuevo.");
    }
  };

  if (cargando)
    return (
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>
        Cargando casos...
      </h3>
    );
  
  // Filtramos la lista según la condición seleccionada
  const publicacionesFiltradas = filtroActual === 'TODOS' 
    ? publicaciones 
    : publicaciones.filter(pub => pub.condicion === filtroActual);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Foro de Casos RADI</h2>
        <button
          onClick={() => setMostrarModal(true)}
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Publicar un Caso
        </button>
      </div>

      {/* --- FILTROS (CHIPS) DEL FORO --- */}
      {/* --- FILTROS (CHIPS) DEL FORO --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        {['TODOS', 'AUTISMO', 'TDAH', 'DISLEXIA', 'DIFICULTAD_APRENDIZAJE', 'SORDERA', 'OTRO'].map(filtro => (
          <button
            key={filtro}
            onClick={() => setFiltroActual(filtro)}
            style={{
              padding: '6px 16px', borderRadius: '20px', border: '1px solid #0056b3',
              backgroundColor: filtroActual === filtro ? '#0056b3' : 'transparent',
              color: filtroActual === filtro ? 'white' : '#0056b3',
              cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.2s'
            }}
          >
            {filtro === 'OTRO' ? 'GENERAL / OTRO' 
              : filtro === 'DIFICULTAD_APRENDIZAJE' ? 'DIF. APRENDIZAJE' 
              : filtro}
          </button>
        ))}
      </div>

      {/* --- MODAL PARA CREAR CASO --- */}
      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Compartir un nuevo caso</h3>

            <form
              onSubmit={handleCrearCaso}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <input
                type="text"
                placeholder="Título resumido del caso"
                required
                value={nuevoCaso.titulo}
                onChange={(e) =>
                  setNuevoCaso({ ...nuevoCaso, titulo: e.target.value })
                }
                style={{
                  padding: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <textarea
                placeholder="Describe la situación en el aula..."
                required
                rows="4"
                value={nuevoCaso.contenido}
                onChange={(e) =>
                  setNuevoCaso({ ...nuevoCaso, contenido: e.target.value })
                }
                style={{
                  padding: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                  resize: "vertical",
                }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <select
                  value={nuevoCaso.condicion}
                  onChange={(e) =>
                    setNuevoCaso({ ...nuevoCaso, condicion: e.target.value })
                  }
                  style={{ padding: "8px", flex: 1 }}
                >
                  <option value="AUTISMO">Autismo (CEA)</option>
                  <option value="TDAH">TDAH</option>
                  <option value="DISLEXIA">Dislexia</option>
                  <option value="DIFICULTAD_APRENDIZAJE">
                    Dificultad de Aprendizaje
                  </option>
                  <option value="SORDERA">Sordera / Hipoacusia</option>
                  <option value="OTRO">Otro</option>
                </select>
                <select
                  value={nuevoCaso.nivel_educativo}
                  onChange={(e) =>
                    setNuevoCaso({
                      ...nuevoCaso,
                      nivel_educativo: e.target.value,
                    })
                  }
                  style={{ padding: "8px", flex: 1 }}
                >
                  <option value="INICIAL">Nivel Inicial</option>
                  <option value="PRIMARIO">Nivel Primario</option>
                  <option value="SECUNDARIO">Nivel Secundario</option>
                </select>
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={nuevoCaso.es_anonimo}
                  onChange={(e) =>
                    setNuevoCaso({ ...nuevoCaso, es_anonimo: e.target.checked })
                  }
                />{" "}
                Publicar de forma anónima
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  style={{
                    padding: "8px 15px",
                    border: "1px solid #ccc",
                    backgroundColor: "transparent",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#0056b3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* --- FIN DEL MODAL --- */}

      {/* Lista de Publicaciones */}
      {publicacionesFiltradas.length === 0 ? (
        <p>No hay casos publicados aún. ¡Sé el primero!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {publicacionesFiltradas.map((pub) => (
            <div
              key={pub.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <h3 style={{ margin: 0, color: "#0056b3" }}>{pub.titulo}</h3>
                <span
                  style={{
                    backgroundColor: "#17a2b8",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    height: "fit-content",
                  }}
                >
                  {pub.condicion}
                </span>
              </div>
              <p
                style={{
                  margin: "0 0 15px 0",
                  color: "#444",
                  lineHeight: "1.5",
                }}
              >
                {pub.contenido}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#666",
                  borderTop: "1px solid #ddd",
                  paddingTop: "10px",
                }}
              >
                <span>
                  👤 Publicado por:{" "}
                  <strong>{pub.autor?.nombre_completo}</strong>{" "}
                  <span style={{ marginLeft: "10px" }}>
                    💬 {pub.comentarios?.length} respuestas
                  </span>
                </span>
                <Link
                  to={`/foro/${pub.id}`}
                  style={{
                    textDecoration: "none",
                    backgroundColor: "#e9ecef",
                    color: "#333",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  Ver caso completo ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Foro;
