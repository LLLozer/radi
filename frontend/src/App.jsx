import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Recursos from "./pages/Recursos";
import CasoDetalle from "./pages/CasoDetalle";
import Registro from './components/Registro';
import Landing from "./pages/Landing";
import { AuthProvider } from "./context/AuthContext"; // Importar
import Navbar from "./components/Navbar"; // <-- Importamos la Navbar
import Foro from "./pages/Foro";

import Login from "./pages/Login";

function App() {
  return (
    // Todo lo que esté dentro de AuthProvider tendrá acceso a la sesión
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/foro" element={<Foro />} />
          <Route path="/foro/:id" element={<CasoDetalle />} />
          <Route path="/recursos" element={<Recursos />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
