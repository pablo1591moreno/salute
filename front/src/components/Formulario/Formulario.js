import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { DatosContext } from '../DatosContext';


const paisesLatinoamericanos = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Haití",
  "Honduras",
  "Jamaica",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "República Dominicana",
  "Uruguay",
  "Venezuela"
];

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [brindoPor, setBrindoPor] = useState("");
  const [formularioCompleto, setFormularioCompleto] = useState(false);
  const navigate = useNavigate();
  const { datosCompartidos, setDatosCompartidos } = useContext(DatosContext); 

  const manejarCambioNombre = (e) => {
    setNombre(e.target.value);
    setFormularioCompleto(e.target.value && pais && brindoPor);
  };

  const manejarCambioPais = (e) => {
    setPais(e.target.value);
    setFormularioCompleto(nombre && e.target.value && brindoPor);
  };

  const manejarCambioBrindoPor = (e) => {
    setBrindoPor(e.target.value);
    setFormularioCompleto(nombre && pais && e.target.value);
  };

  // Maneja la activación de la cámara y redirige a la ruta correspondiente si el formulario está completo
  const manejarCamaraActivada = async () => {
    if (formularioCompleto) {
      setDatosCompartidos({
        ...datosCompartidos,
        nombre: nombre,
        pais: pais,
        brindopor: brindoPor
      });
      navigate("/deteccion_objetos");
    } else {
      alert("Por favor completa el formulario antes de activar la cámara.");
    }
  };



  return (
    <form>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" value={nombre} onChange={manejarCambioNombre} />
      </div>
      <div>
        <label htmlFor="pais">País:</label>
        <select id="pais" value={pais} onChange={manejarCambioPais}>
          <option value="">Selecciona un país</option>
          {paisesLatinoamericanos.map((pais) => (
            <option key={pais} value={pais}>
              {pais}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="brindoPor">Brindo por/para:</label>
        <input type="text" id="brindoPor" value={brindoPor} onChange={manejarCambioBrindoPor} />
      </div>
      <button type="button" onClick={manejarCamaraActivada}>Activar cámara</button>
    </form>
  );
};

export default Formulario;