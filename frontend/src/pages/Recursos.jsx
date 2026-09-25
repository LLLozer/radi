import { useState, useEffect, useContext } from "react";
import clienteAxios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Recursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);

  const { usuario } = useContext(AuthContext);

  const [nuevoRecurso, setNuevoRecurso] = useState({
    titulo: "",
    descripcion: "",
    formato: "DOCUMENTO",
    condicion: "OTRO",
    nivel_educativo: "PRIMARIO",
    archivo_url: "",
  });
  // Estado para el filtro activo (por defecto muestra todos)
  const [filtroActual, setFiltroActual] = useState("TODOS");

  useEffect(() => {
    const obtenerRecursos = async () => {
      try {
        const respuesta = await clienteAxios.get("/recursos");
        setRecursos(respuesta.data);
      } catch (error) {
        console.error("Error al obtener recursos:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerRecursos();
  }, []);

  const handleSubirRecurso = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await clienteAxios.post(
        "/recursos/crear-recurso",
        nuevoRecurso,
      );
      const recursoCreado = {
        ...respuesta.data,
        autor: { nombre_completo: usuario.nombre_completo, rol: usuario.rol },
      };
      setRecursos([recursoCreado, ...recursos]);
      setMostrarModal(false);
      setNuevoRecurso({
        titulo: "",
        descripcion: "",
        formato: "DOCUMENTO",
        condicion: "OTRO",
        nivel_educativo: "PRIMARIO",
        archivo_url: "",
      });
    } catch (error) {
      console.error("Error al subir el recurso:", error);
      alert("Hubo un error al subir el recurso. Verifica la consola.");
    }
  };

  const formatearEnlace = (url) => {
    if (!url) return "#";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  };

  if (cargando)
    return (
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>
        Cargando biblioteca...
      </h3>
    );

  // Filtramos la lista en tiempo real según el botón presionado
  const recursosFiltrados =
    filtroActual === "TODOS"
      ? recursos
      : recursos.filter((rec) => rec.condicion === filtroActual);

  return (
    <div
      style={{
        maxWidth: "900px",
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
        <div>
          <h2 style={{ margin: 0, color: "#333" }}>Materiales Educativos</h2>
          <p style={{ margin: "5px 0 0 0", color: "#666" }}>
            Encuentra guías, plantillas y herramientas adaptadas.
          </p>
        </div>
        <button
          onClick={() => setMostrarModal(true)}
          style={{
            padding: "10px 15px",
            backgroundColor: "#6f42c1",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Subir Material
        </button>
      </div>
      {/* --- FILTROS (CHIPS) --- */}
      {/* --- FILTROS (CHIPS) --- */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        {[
          "TODOS",
          "AUTISMO",
          "TDAH",
          "DISLEXIA",
          "DIFICULTAD_APRENDIZAJE",
          "SORDERA",
          "OTRO",
        ].map((filtro) => (
          <button
            key={filtro}
            onClick={() => setFiltroActual(filtro)}
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              border: "1px solid #6f42c1",
              backgroundColor:
                filtroActual === filtro ? "#6f42c1" : "transparent",
              color: filtroActual === filtro ? "white" : "#6f42c1",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
          >
            {filtro === "OTRO"
              ? "GENERAL / OTRO"
              : filtro === "DIFICULTAD_APRENDIZAJE"
                ? "DIF. APRENDIZAJE"
                : filtro}
          </button>
        ))}
      </div>

      {/* --- MODAL PARA SUBIR RECURSO --- */}
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
            <h3 style={{ marginTop: 0, color: "#6f42c1" }}>
              Aportar material a la biblioteca
            </h3>
            <form
              onSubmit={handleSubirRecurso}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <input
                type="text"
                placeholder="Título del recurso"
                required
                value={nuevoRecurso.titulo}
                onChange={(e) =>
                  setNuevoRecurso({ ...nuevoRecurso, titulo: e.target.value })
                }
                style={{
                  padding: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <textarea
                placeholder="Breve descripción..."
                required
                rows="3"
                value={nuevoRecurso.descripcion}
                onChange={(e) =>
                  setNuevoRecurso({
                    ...nuevoRecurso,
                    descripcion: e.target.value,
                  })
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
                  value={nuevoRecurso.condicion}
                  onChange={(e) =>
                    setNuevoRecurso({
                      ...nuevoRecurso,
                      condicion: e.target.value,
                    })
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
                  <option value="OTRO">Uso General / Otro</option>
                </select>
                <select
                  value={nuevoRecurso.nivel_educativo}
                  onChange={(e) =>
                    setNuevoRecurso({
                      ...nuevoRecurso,
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
              <input
                type="text"
                placeholder="URL del archivo"
                required
                value={nuevoRecurso.archivo_url}
                onChange={(e) =>
                  setNuevoRecurso({
                    ...nuevoRecurso,
                    archivo_url: e.target.value,
                  })
                }
                style={{
                  padding: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
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
                    backgroundColor: "#6f42c1",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Compartir Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- LISTA DE RECURSOS --- */}
      {recursosFiltrados.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <p style={{ color: "#666" }}>
            El repositorio está vacío. ¡Sé el primero en aportar material!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {recursosFiltrados.map((rec) => (
            <div
              key={rec.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#e2d9f3",
                    color: "#6f42c1",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {rec.formato || "DOCUMENTO"}
                </span>
                <span
                  style={{
                    backgroundColor: "#17a2b8",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  {rec.condicion || "GENERAL"} -{" "}
                  {rec.nivel_educativo || "PRIMARIO"}
                </span>
              </div>
              <h3 style={{ margin: "10px 0", fontSize: "18px", color: "#333" }}>
                {rec.titulo}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", flexGrow: 1 }}>
                {rec.descripcion}
              </p>
              <div
                style={{
                  marginTop: "15px",
                  borderTop: "1px solid #eee",
                  paddingTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "12px", color: "#999" }}>
                  Subido por: {rec.autor?.nombre_completo || "Usuario"}
                </span>
                <a
                  href={formatearEnlace(rec.archivo_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "#0056b3",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  Ver Recurso
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recursos;
