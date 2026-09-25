import { useState, useContext } from "react"; // Agregamos useContext
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Importamos nuestro contexto
import clienteAxios from "../api/axios"; // Nuestra configuración con withCredentials

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { iniciarSesion } = useContext(AuthContext); // Extraemos la función

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Enviamos las credenciales al backend
      const respuesta = await clienteAxios.post("/auth/login", {
        email,
        password,
      });
      iniciarSesion(respuesta.data.usuario);

      console.log("Ingreso exitoso:", respuesta.data);

      // ¡Magia! El backend ya nos envió la cookie httpOnly con el JWT.
      // El navegador la guardó automáticamente.

      // Redirigimos al usuario al foro
      navigate("/foro");
    } catch (err) {
      // Si las credenciales son inválidas, mostramos el mensaje del backend
      setError(
        err.response?.data?.error || "Error al conectar con el servidor.",
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Ingresar a RADI</h2>
      <p>Red de Acompañamiento Docente</p>

      {error && (
        <div
          style={{
            backgroundColor: "#ffcccc",
            color: "#cc0000",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Correo Electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#0056b3",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Iniciar Sesión
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          ¿Aún no tienes cuenta?{" "}
          <Link to="/registro" style={{ color: "#0056b3" }}>
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
