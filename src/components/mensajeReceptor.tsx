import React from 'react';
import "@/styles/components/mensajeReceptor.scss";

interface MensajeReceptorProps {
    mensaje: string;
    hora: string;
    fecha: string;
}

export const MensajeReceptor: React.FC<MensajeReceptorProps> = ({ mensaje, hora, fecha }) => {
    return (
        <div className="contenedorTextoMensajeReceptor">
            <div className="globoMensajeReceptor">

                <div className="textoMensajeReceptor">
                    {mensaje}
                </div>
                <div className="horaMensajeReceptor">
                    {hora}
                </div>
            </div>
        </div>
    );
};
