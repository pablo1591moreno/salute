import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario/Formulario';
import Inicio from './components/Inicio/Inicio';
import DeteccionObjetos from "./components/ConfirmarImagen/ConfirmarImagen"


function App() {
  const [paginaActual, setPaginaActual] = useState('inicio');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaginaActual('formulario');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {paginaActual === 'inicio' && (
            <Route path="/" element={<Inicio />} />
          )}
          {paginaActual === 'formulario' && (
            <Route path="/" element={<Formulario />} />
          )}
          <Route path="/deteccion_objetos" element={<DeteccionObjetos/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

