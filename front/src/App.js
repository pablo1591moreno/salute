import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Formulario from "./components/Formulario/Formulario"
import Inicio from './components/Inicio/Inicio';
import DeteccionObjetos from "./components/ConfirmarImagen/ConfirmarImagen"
import Conectado from "./components/Conectando/Conectando"
import  DatosContext  from './components/Context/MyContext';
import Buscando from './components/Buscando/Buscando';


function App() {
  const [paginaActual, setPaginaActual] = useState('inicio');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaginaActual('formulario');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

   // Define el estado y la función para compartir los datos
   const [datosCompartidos, setDatosCompartidos] = useState({
    nombre: '',
    pais: '',
    brindopor: '',
    datosImagen: null
  });

  return (
    <div className="App">
    <DatosContext.Provider value={{ datosCompartidos, setDatosCompartidos }}>
      <Router>
        <Routes>
          {paginaActual === 'inicio' && (
            <Route path="/" element={<Inicio />} />
          )}
          {paginaActual === 'formulario' && (
            <Route path="/" element={<Formulario />} />
          )}
          <Route path="/deteccion_objetos" element={<DeteccionObjetos/>} />
          <Route path="/conectando" element={<Conectado/>} />
          <Route path="/Buscando" element={<Buscando/>} />
        </Routes>
      </Router>
      </DatosContext.Provider>
    </div>
  );
}

export default App;

