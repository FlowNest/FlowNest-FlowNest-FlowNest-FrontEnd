// estadoContacto.tsx
import React from 'react';
import { Avatar } from "@nextui-org/react";
import "@/styles/components/estadoContacto.scss";

// Definir el tipo de las props
interface EstadoContactoProps {
    nombre: string;
    avatar: string;
    dia: string;
    hora: string;
}

export const EstadoContacto: React.FC<EstadoContactoProps> = ({ nombre, avatar, dia, hora }) => {
    return (
        <div className='contenedorEstadoContacto'>
            <div>
                <Avatar isBordered color="success" src={avatar} />
            </div>
            <div>
                <div className="nombreEstado">
                    <p>{nombre}</p>
                </div>
                <div className="fechaEstado">
                    <p>{`${dia} conectado a las ${hora}`}</p>
                </div>
            </div>
        </div>
    );
};
