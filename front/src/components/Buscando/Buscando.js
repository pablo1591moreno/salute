import React, { useContext, useEffect, useState } from 'react';
import DatosContext from '../Context/MyContext';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Buscando() {
  const { datosCompartidos } = useContext(DatosContext);
  const [misDatos, setMisDatos] = useState(null);
  const [otrosDatos, setOtrosDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    socket.on('chat_message', (data) => {
      const { usuario, mensaje } = data;
      const [nombre, pais, brindopor, datosImagen] = mensaje.split(', ');
      if (usuario === socket.id) {
        console.log(data)
        setMisDatos({ nombre, pais, brindopor, datosImagen });
        
      } else {
        const exist = otrosDatos.some((datos) => datos.usuario === usuario);
        

        if (!exist) {
          setOtrosDatos((prevDatos) => [
            ...prevDatos,
            { nombre, pais, brindopor, datosImagen },
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
      const { nombre, pais, brindopor, datosImagen} = otrosDatos[0];
      setMisDatos({ nombre, pais, brindopor, datosImagen });
      setCargando(false); // Desactivar la bandera de carga
    }
  }, [datosCompartidos, otrosDatos]);

  if (cargando) {
    return <p>Cargando...</p>;
  }


  return (
    <div>
      {otrosDatos.map((datos) => (
        <div key={datos.usuario}>
          <p>Nombre: {datos.nombre}</p>
          <p>País: {datos.pais}</p>
          <p>brindo por: {datos.brindopor}</p>
          <img src={datos.datosImagen} alt='foto' />
        </div>
      ))}
      {misDatos && (
        <div>
          <p>Nombre: {misDatos.nombre}</p>
          <p>País: {misDatos.pais}</p>
          <p>brindo por: {misDatos.brindopor}</p>
          <img src={misDatos.datosImagen} alt='foto' />
        </div>
      )}
    </div>
  );
}

export default Buscando;
