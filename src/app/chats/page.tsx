"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/chats.scss";
import "@/styles/pagina-chats.scss";
import { PaginaBienvenida } from "@/components/paginaBienvenida";
import { HeaderPaginas } from "@/components/headerPaginas";
import { ContactoMensaje } from "@/components/contactomensaje";
import { PaginaMensajes } from "@/components/paginaMensajes";

const Chats = () => {
    const router = useRouter();

    // Lista de contactos como un JSON
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

    // Estado para rastrear el contacto seleccionado
    const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

    const handleContactoClick = (id:any) => {
        setContactoSeleccionado(id);
    };

    return (
        <div className="contenedorPaginaChats">
            <div className="contactos">
                <HeaderPaginas titulo={"Chats"} />
                {contactos.map((contacto) => (
                    <div
                        key={contacto.id}
                        onClick={() => handleContactoClick(contacto.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <ContactoMensaje
                            url={contacto.url}
                            nombre={contacto.nombre}
                            mensaje={contacto.mensaje}
                            fecha={contacto.fecha}
                        />
                    </div>
                ))}
            </div>
            <div className="mensajes">
                {contactoSeleccionado ? (
                    <PaginaMensajes contactoId={contactoSeleccionado} />
                ) : (
                    <PaginaBienvenida />
                )}
            </div>
        </div>
    );
};

export default Chats;
