import React from 'react';
import { User } from "@nextui-org/react";
import "@/styles/components/contactoMensaje.scss";

// Define el tipo de las props
type ContactoMensajeProps = {
    url: string;     // URL de la imagen del avatar
    nombre: string;  // Nombre del contacto
    mensaje: string; // Mensaje del contacto
    fecha: string;   // Fecha del mensaje
};

export const ContactoMensaje: React.FC<ContactoMensajeProps> = ({ url, nombre, mensaje, fecha }) => {
    return (
        <div className='contenedorMensaje'>
            <div className="contenedorImagen">
                <img src={url} alt={nombre} className='imagen' />
            </div>
            <div className="contenedorDescripcion">
                <div className="encabezadoContacto">
                    <p className="nombreContacto">
                        {nombre}
                    </p>
                    <p className="fechaMensaje">
                        {fecha}
                    </p>
                </div>
                <p className="previsualizacionMensaje">
                    {mensaje}
                </p>
            </div>
        </div>
    );
};
