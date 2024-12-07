"use client";

import React from 'react';
import SideNav from '@/components/sidenav';
import ContenedorPagina from '@/components/contenedor-pagina';
import "@/styles/chats.scss"

export default function ChatsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="contenedorPrincipalChats">
            <div className="fondoVerde">

            </div>
            <div className="contenedorChats">
                <div className="barraNavegacion">
                <SideNav />
                </div>
                <main className="chats">
                    <ContenedorPagina>{children}</ContenedorPagina>
                </main>
            </div>
        </div>
    );
}
