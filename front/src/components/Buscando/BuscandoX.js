import React from 'react'
import "./Buscando.css"
import bebida from './img/ElnOUOHXgAcmcT0.jpg'
import bebida2 from './img/cerve.jpeg'

function BuscandoX() {
    return (
        <div>
            <div className="container">
                <div className="imageOtro">
                    <img src={bebida} alt="foto" />
                </div>
                <div className="tuImage">
                    <img src={bebida2} alt="foto" />
                </div>
            </div>
            <div className='textos'>
                <div className='espacio' >
                    <div className="nombreOtro">
                        <h1>Tú y pablo de mexico</h1>
                        <h2>Están brindando por...</h2>
                    </div>
                    <div className="tuBrindis">
                        <h3>Tú por amigos</h3>
                    </div>
                    <div className="brindisOtro">
                        <h3>luis por su perro peluza</h3>
                    </div>
                </div>
            <button className='compartir'>compartir</button>
            </div>
        </div>

    )
}

export default BuscandoX