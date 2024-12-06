import React from "react";
import "@/styles/components/paginaMensajes.scss";

// Definimos el tipo de las props
interface PaginaMensajesProps {
    contactoId: number;
}

export const PaginaMensajes: React.FC<PaginaMensajesProps> = ({ contactoId }) => {
    return (
        <div className="contenedorPaginaMensajes">
            <div className="hedaerMensajes">

            </div>
        </div>
    );
};
