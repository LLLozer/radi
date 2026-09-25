import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clienteAxios from '../api/axios';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    email: '',
    password: '',
    rol: 'DOCENTE', // Valor por defecto
    titulo_profesional: '' // Opcional, se muestra solo si es PROFESIONAL
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Enviamos el POST a la ruta de registro del backend
      await clienteAxios.post('/auth/registro', formData);
      
      // Si fue exitoso, avisamos y redirigimos al Login
      alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
      navigate('/login');

    } catch (err) {
      setError(err.response?.data?.error || 'Error al conectar con el servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#0056b3', margin: '0 0 10px 0' }}>RADI</h1>
        <h2>Crear una nueva cuenta</h2>
      </div>

      {error && (
        <div style={{ backgroundColor: '#ffcccc', color: '#cc0000', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre Completo</label>
          <input 
            type="text" 
            required 
            value={formData.nombre_completo}
            onChange={(e) => setFormData({...formData, nombre_completo: e.target.value})}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo Electrónico</label>
          <input 
            type="email" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña (min. 6 caracteres)</label>
          <input 
            type="password" 
            required 
            minLength="6"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>¿Cuál es tu rol?</label>
          <select 
            value={formData.rol}
            onChange={(e) => setFormData({...formData, rol: e.target.value})}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="DOCENTE">Docente</option>
            <option value="PROFESIONAL">Profesional Clínico / Especialista</option>
            <option value="ESTUDIANTE">Estudiante de Magisterio / Psicología</option>
            <option value="FAMILIAR">Familiar</option>
            <option value="OTRO">Otro</option>
          </select>
        </div>

        {/* Solo mostramos el campo de Título si eligió el rol PROFESIONAL */}
        {formData.rol === 'PROFESIONAL' && (
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Especialidad / Título (Opcional)</label>
            <input 
              type="text" 
              placeholder="Ej: Psicopedagogo, Fonoaudiólogo..."
              value={formData.titulo_profesional}
              onChange={(e) => setFormData({...formData, titulo_profesional: e.target.value})}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
        )}

        <button 
          type="submit" 
          style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', marginTop: '10px', fontWeight: 'bold' }}
        >
          Registrarme
        </button>

      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>¿Ya tienes una cuenta? <Link to="/login" style={{ color: '#0056b3' }}>Inicia sesión aquí</Link></p>
      </div>

    </div>
  );
};

export default Registro;