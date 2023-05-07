import React, { useRef, useEffect, useState } from 'react';

const CamaraActivada = () => {
    const [modoCamara, setModoCamara] = useState('usuario');
    const [foto, setFoto] = useState(null);
    const [mostrarCamara, setMostrarCamara] = useState(true);
    const refVideo = useRef(null);
    const refCanvas = useRef(null);
    const refFoto = useRef(null);

    // Efecto para obtener acceso a la cámara
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: modoCamara } })
            .then(stream => {
                refVideo.current.srcObject = stream;
                refVideo.current.play();
            })
            .catch(error => console.error(error));
    }, [modoCamara]);

    // Función para tomar una foto de la cámara y almacenarla en el estado 'foto'
    const tomarFoto = () => {
        const canvas = refCanvas.current;
        const context = canvas.getContext('2d');
        canvas.width = refVideo.current.videoWidth;
        canvas.height = refVideo.current.videoHeight;
        context.drawImage(refVideo.current, 0, 0);

        const dataURL = canvas.toDataURL('image/jpeg');
        setFoto(dataURL);
        setMostrarCamara(false);
    };

    // Función para cambiar entre los modos de la cámara o tomar otra foto
    const cambiarCamOtomarOtra = () => {
        setModoCamara(modoCamara === 'usuario' ? 'environment' : 'usuario');
        setFoto(null);
        setMostrarCamara(true);
    };

    return (
        <>
            {mostrarCamara && <video ref={refVideo} />}
            {foto && <img ref={refFoto} src={foto} alt="Foto Tomada" />}
            {mostrarCamara &&
                <>
                    <canvas ref={refCanvas} style={{ display: 'none' }} />
                    <button onClick={tomarFoto}>Tomar Foto</button>
                    <button onClick={cambiarCamOtomarOtra}>Cambiar Cámara</button>
                </>
            }
            {!mostrarCamara &&
                <>
                    <button onClick={cambiarCamOtomarOtra}>Tomar Otra Foto</button>
                    <button >Continuar</button>
                </>
            }
        </>
    );
};

export default CamaraActivada;