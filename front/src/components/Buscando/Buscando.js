import React, { useContext, useEffect } from 'react';
import DatosContext from '../Context/MyContext';

function Buscando() {
  const { datosCompartidos } = useContext(DatosContext);

  useEffect(() => {
    // Se ejecuta cuando cambian los datos compartidos
    if (datosCompartidos) {
      const { nombre, pais, brindopor, datosImagen } = datosCompartidos;
      console.log(nombre, pais, brindopor, datosImagen);
    }
  }, [datosCompartidos]);

  return (
    <div>
      {datosCompartidos ? (
        // Si hay datos compartidos disponibles
        <div>
          <p>Nombre: {datosCompartidos.nombre}</p>
          <p>País: {datosCompartidos.pais}</p>
          <p>Brindo por/para: {datosCompartidos.brindopor}</p>
          <img src={datosCompartidos.datosImagen.src} alt="Imagen" />
        </div>
      ) : (
        // Si no hay datos compartidos disponibles
        <p>Buscando...</p>
      )}
    </div>
  );
}

export default Buscando;
