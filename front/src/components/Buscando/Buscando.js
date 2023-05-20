import React, { useContext, useEffect, useState } from 'react';
import DatosContext from '../Context/MyContext';
import { io } from 'socket.io-client';
import "./Buscando.css"

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
        setMisDatos({ usuario, nombre, pais, brindopor, datosImagen });
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
      const { nombre, pais, brindopor, datosImagen } = otrosDatos[0];
      setMisDatos({ nombre, pais, brindopor, datosImagen });
      setCargando(false);
    }
  }, [datosCompartidos, otrosDatos]);

  if (cargando) {
    return <p>Buscando...</p>;
  }



  return (
    <div className="contenedorBusqueda">
      <div className='dosImagenes'>
        {otrosDatos.map((datos) => (
          <div className="imageOtro">
            <img src={datos.datosImagen} alt="foto" />
          </div>
        ))}
        {misDatos && (
          <div className="tuImage">
            <img src={misDatos.datosImagen} alt="foto" />
          </div>
        )}
      </div>
      <div className='textos'>
        {otrosDatos.map((datos) => (
          <div className="nombreOtro">
            <p>Tú y {datos.nombre} de {datos.pais}</p>
            <p>Están brindando por...</p>
          </div>
        ))}
        {misDatos && (
          <div className="tuBrindis">
            <p>Tú {misDatos.brindopor}</p>
          </div>
        )}
        {otrosDatos.map((datos) => (
          <div className="brindisOtro">
            <p>{datos.nombre} {datos.brindopor}</p>
          </div>
        ))}
        <button className='compartir'>compartir</button>
      </div>
    </div>
  );


}

export default Buscando;
