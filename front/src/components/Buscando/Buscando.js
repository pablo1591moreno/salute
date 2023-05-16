import React, { useContext, useEffect } from 'react';
import DatosContext from '../Context/MyContext';

function Buscando() {
  const { datosCompartidos } = useContext(DatosContext);

  useEffect(() => {
    if (datosCompartidos) {
      const { nombre, pais, brindopor, datosImagen } = datosCompartidos;
      // Puedes utilizar los valores como desees dentro del componente
      console.log(nombre, pais, brindopor, datosImagen);
    }
  }, [datosCompartidos]);

  return (
    <div>
      {datosCompartidos ? (
        <div>
          <p>Nombre: {datosCompartidos.nombre}</p>
          <p>País: {datosCompartidos.pais}</p>
          <p>Brindo por/para: {datosCompartidos.brindopor}</p>
          <img src={datosCompartidos.datosImagen.src} alt="Imagen" />
        </div>
      ) : (
        <p>Buscando...</p>
      )}
    </div>
  );
}

export default Buscando;
