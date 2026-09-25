import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Nos permite saber en qué ruta estamos

  /// Si estamos en Landing, Login o Registro, no mostramos la barra
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/registro') {
    return null; 
  }

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <nav style={{ 
      backgroundColor: '#0056b3', 
      padding: '15px 30px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      color: 'white', 
      fontFamily: 'sans-serif',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        {/* Logo */}
        <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '1px' }}>RADI</h1>
        
        {/* Links de navegación */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link 
            to="/foro" 
            style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontWeight: location.pathname.includes('/foro') ? 'bold' : 'normal',
              borderBottom: location.pathname.includes('/foro') ? '2px solid white' : 'none',
              paddingBottom: '3px'
            }}
          >
            Foro de Casos
          </Link>
          <Link 
            to="/recursos" 
            style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontWeight: location.pathname.includes('/recursos') ? 'bold' : 'normal',
              borderBottom: location.pathname.includes('/recursos') ? '2px solid white' : 'none',
              paddingBottom: '3px'
            }}
          >
            Repositorio
          </Link>
        </div>
      </div>

      {/* Controles de Usuario */}
      {usuario && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '14px' }}>👤 {usuario.nombre_completo}</span>
          <button 
            onClick={handleCerrarSesion} 
            style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Salir
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;