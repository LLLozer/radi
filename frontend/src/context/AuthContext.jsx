import { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const AuthContext = createContext();

// Creamos el componente proveedor que envolverá nuestra app
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al recargar la página, buscamos si ya había un usuario guardado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('radi_usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  // Función para guardar los datos cuando inicia sesión
  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('radi_usuario', JSON.stringify(datosUsuario)); // Guardamos en memoria local
  };

  // Función para borrar los datos cuando cierra sesión
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('radi_usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};