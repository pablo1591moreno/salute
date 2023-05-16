import { io } from "socket.io-client";
import { useState, useEffect, useContext } from "react"
import DatosContext from '../Context/MyContext';
  
const socket = io('http://localhost:3000')

function Conectado() {
    const [estaConectado, setEstaConectado] = useState(false)
    const [nuevoMensaje, setNuevoMensaje] = useState('')
    const datosCompartidos = useContext(DatosContext);

    useEffect(() => {
        if (datosCompartidos) {
            console.log(datosCompartidos.datosImagen,  
                datosCompartidos.nombre,
                datosCompartidos.pais,
                datosCompartidos.brindopor);
        }
    }, [datosCompartidos]);


    useEffect(() => {

        socket.on('connect', () => setEstaConectado(true))

        socket.on('chat_message', (data) => {
            console.log(data)
        })

        return () => {
            socket.off('connect')
            socket.off('chat_message')
        }

    }, [])

    const enviarMensaje = () => {
        socket.emit('chat_message', {
            usuario: socket.id,
            mensaje: nuevoMensaje
        })
    }

    return (
        <>
            <h2> {estaConectado ? 'CONECTADO' : 'NO CONECTADO'} </h2>
            <input
                type='text'
                onChange={e => setNuevoMensaje(e.target.value)}
            />
            <button onClick={enviarMensaje} >enviar</button>
        </>
    )

}

export default Conectado;