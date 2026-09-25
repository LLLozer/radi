import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
      
      {/* Cabecera / Hero Section */}
      <header style={{ backgroundColor: '#0056b3', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 20px 0', letterSpacing: '2px' }}>RADI</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'normal', margin: '0 0 40px 0' }}>
          Red de Acompañamiento Docente Inclusivo
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 40px auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
          Conectamos a docentes y profesionales de la educación para compartir estrategias, recursos y experiencias sobre neurodiversidad en el aula.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link 
            to="/login" 
            style={{ padding: '12px 24px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            Ingresar a la Plataforma
          </Link>
          <a 
            href="#caracteristicas" 
            style={{ padding: '12px 24px', backgroundColor: 'transparent', color: 'white', textDecoration: 'none', border: '2px solid white', borderRadius: '5px', fontSize: '1.1rem' }}
          >
            Conocer más
          </a>
        </div>
      </header>

      {/* Sección de Características */}
      <section id="caracteristicas" style={{ padding: '60px 20px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', color: '#0056b3', marginBottom: '40px' }}>¿Qué encontrarás en RADI?</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '280px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💬</div>
            <h4 style={{ fontSize: '1.2rem', color: '#333' }}>Foro de Casos</h4>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              Plantea desafíos del aula de forma anónima y recibe consejos prácticos de colegas y profesionales especializados.
            </p>
          </div>

          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '280px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📚</div>
            <h4 style={{ fontSize: '1.2rem', color: '#333' }}>Repositorio</h4>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              Descarga pictogramas, guías adaptadas y plantillas creadas y validadas por la comunidad educativa.
            </p>
          </div>

          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '280px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🤝</div>
            <h4 style={{ fontSize: '1.2rem', color: '#333' }}>Red de Apoyo</h4>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              Rompe el aislamiento docente. Encuentra respuestas y herramientas respaldadas por psicopedagogos y especialistas.
            </p>
          </div>

        </div>
      </section>

      {/* Footer / Pie de página */}
      <footer style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', padding: '20px' }}>
        <p style={{ margin: 0 }}>© 2026 RADI - Todos los Derechos Reservados.</p>
      </footer>

    </div>
  );
};

export default Landing;