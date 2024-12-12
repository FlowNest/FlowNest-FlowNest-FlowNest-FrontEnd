import React from 'react';
import "@/styles/components/mensajeEmisor.scss";

interface MensajeEmisorProps {
  mensaje: string;
  hora: string;
  fecha: string;
}

export const MensajeEmisor: React.FC<MensajeEmisorProps> = ({ mensaje, hora, fecha }) => {
  return (
    <div className="contenedorTextoMensajeEmisor">
      <div className="globoMensajeEmisor">
      <div className="textoMensajeEmisor">
        {mensaje}
      </div>
      <div className="horaMensajeEmisor">
        {hora}
      </div>
      </div>
    </div>
  );
};
