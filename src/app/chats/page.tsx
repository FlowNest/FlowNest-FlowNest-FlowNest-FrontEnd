"use client";

import React from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import "@/styles/chats.scss";
import "@/styles/pagina-chats.scss";
import { PaginaBienvenida } from "@/components/paginaBienvenida";

const Chats = () => {
    const router = useRouter();
    return (
        <div className="contenedorPaginaChats">
            <div className="contactos">

            </div>
            <div className="mensajes">
                <PaginaBienvenida></PaginaBienvenida>
            </div>
        </div>
    );
}

export default Chats;