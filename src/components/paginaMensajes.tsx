import React from "react";
import "@/styles/components/paginaMensajes.scss";
import { Input } from "@nextui-org/input";
import {Button, ButtonGroup} from "@nextui-org/button";
import { Icon } from '@iconify/react';

// Definimos el tipo de las props
interface PaginaMensajesProps {
    contactoId: number;
}

export const PaginaMensajes: React.FC<PaginaMensajesProps> = ({ contactoId }) => {
    const contactos = [
        {
            id: 1,
            url: "https://avatars.githubusercontent.com/u/30373425?v=4",
            nombre: "John Doe",
            mensaje: "¡Hola! ¿Cómo estás?",
            fecha: "2024-12-05",
        },
        {
            id: 2,
            url: "https://avatars.githubusercontent.com/u/4567890?v=4",
            nombre: "Jane Smith",
            mensaje: "¿Te gustaría reunirte mañana?",
            fecha: "2024-12-04",
        },
        {
            id: 3,
            url: "https://avatars.githubusercontent.com/u/789123?v=4",
            nombre: "Michael Brown",
            mensaje: "Gracias por la ayuda de ayer.",
            fecha: "2024-12-03",
        },
        {
            id: 4,
            url: "https://avatars.githubusercontent.com/u/112233?v=4",
            nombre: "Emily Davis",
            mensaje: "¡Felices fiestas!",
            fecha: "2024-12-01",
        },
    ];

    // Encuentra el contacto que coincide con el contactoId
    const contacto = contactos.find((contacto) => contacto.id === contactoId);

    // Si no se encuentra el contacto, mostramos un mensaje de error
    if (!contacto) {
        return <div>Contacto no encontrado</div>;
    }

    return (
        <div className="contenedorPaginaMensajes">
            <div className="headerMensajes">
                <div className="contenedorImagen">
                    <img src={contacto.url} alt={contacto.nombre} className="imagen" />
                </div>
                <div className="nombreContacto">
                    <p className="nombre">{contacto.nombre}</p>
                    <p className="fechaConexion">{contacto.fecha}</p>
                </div>
            </div>
            <div className="contenedorMensajes">
                principal
            </div>
            <div className="contenedorEnviarMensaje">
                <form action="" className="enviarMensaje">
                    <input type="text" className="mensajeInput"/>
                    <button className="botonMensaje"><Icon icon="fluent:send-24-filled" width="40" height="40" /></button>
                </form>
            </div>
        </div>
    );
};
