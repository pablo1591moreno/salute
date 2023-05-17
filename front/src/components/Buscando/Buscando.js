import React, { useContext, useEffect, useState } from 'react';
import DatosContext from '../Context/MyContext';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Buscando() {
  const { datosCompartidos } = useContext(DatosContext);
  const [misDatos, setMisDatos] = useState(null);
  const [otrosDatos, setOtrosDatos] = useState([]);

  useEffect(() => {
    socket.on('chat_message', (data) => {
      const { usuario, mensaje } = data;
      const [nombre, pais, brindopor, datosImagen] = mensaje.split(', ');

      if (usuario === socket.id) {
        setMisDatos({ nombre, pais });
      } else {
        const exist = otrosDatos.some((datos) => datos.usuario === usuario);

        if (!exist) {
          setOtrosDatos((prevDatos) => [
            ...prevDatos,
            { usuario, nombre, pais, brindopor, datosImagen },
          ]);
        }
      }
    });

    return () => {
      socket.off('chat_message');
    };
  }, [otrosDatos]);

  useEffect(() => {
    if (datosCompartidos) {
      const { nombre, pais, brindopor, datosImagen } = datosCompartidos;
      setMisDatos(datosCompartidos);
      socket.emit('chat_message', {
        usuario: socket.id,
        mensaje: `${nombre}, ${pais}, ${brindopor}, ${datosImagen.src}`,
      });
    }
  
    // Verificar si hay datos recibidos de otros usuarios
    if (otrosDatos.length > 0) {
      // Mostrar los datos recibidos en pantalla
      const { nombre, pais } = otrosDatos[0];
      setMisDatos({ nombre, pais });
    }
  }, [datosCompartidos, otrosDatos]);
  
  return (
    <div>
      {otrosDatos.map((datos) => (
        <div key={datos.usuario}>
          <p>Datos del otro usuario ({datos.usuario}):</p>
          <p>Nombre: {datos.nombre}</p>
          <p>País: {datos.pais}</p>
        </div>
      ))}

      {misDatos && (
        <div>
          <p>Enviado</p>
          <p>Mis datos:</p>
          <p>Nombre: {misDatos.nombre}</p>
          <p>País: {misDatos.pais}</p>
        </div>
      )}

      {otrosDatos.length === 0 && !misDatos && (
        <p>No hay nadie con quien brindar en este momento</p>
      )}
    </div>
  );
}

export default Buscando;